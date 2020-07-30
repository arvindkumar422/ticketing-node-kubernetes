import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  requireAuth,
  validateReq,
  GenericError,
  NotAuthorizedError,
  OrderStatus
} from '@arvindtix/common';
import { Order } from '../models/order';
import {stripe} from '../stripe';
import { Payment } from '../models/payment';
import { PaymentCreatedPublisher } from '../events/paymentcreate.publisher';
import { natsUtil } from '../models/nats-singleton';

const router = express.Router();

router.post(
  '/api/payments',
  requireAuth,
  [body('token').not().isEmpty(), body('orderId').not().isEmpty()],
  validateReq,
  async (req: Request, res: Response) => {
    const {token, orderId} = req.body;

    const order = await Order.findById(orderId);

    if(!order) { throw new GenericError('Order not found!'); }

    if(order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    if(order.status === OrderStatus.Cancelled) {
      throw new GenericError('Order has been cancelled!');
    }

    const chargeResult = await stripe.charges.create({
      currency: 'usd',
      amount: order.price * 100,
      source: token
    });

    const pay = Payment.build({
      orderId,
      stripeId: chargeResult.id
    });

    await pay.save();

    new PaymentCreatedPublisher(natsUtil.client).publish({
      id: pay.id,
      orderId: pay.orderId,
      stripeId: pay.stripeId
    });

    res.status(201).send({id: pay.id})
  }
);

export { router as createChargeRouter };
