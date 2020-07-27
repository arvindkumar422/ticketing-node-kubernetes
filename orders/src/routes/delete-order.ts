import express, { Request, Response } from 'express';
import { Order } from '../models/order';
import { GenericError, NotAuthorizedError, OrderStatus } from '@arvindtix/common';
import { OrderCancelledPublisher } from '../events/ordercancel.publisher';
import { natsUtil } from '../models/nats-singleton';

const router = express.Router();

router.delete('/api/orders/:orderid', async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderid).populate('ticket');
    if(!order) {
        throw new GenericError('Order not found..!');
    }
    if(order.id !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }
    order.status = OrderStatus.Cancelled;
    await order.save();
    new OrderCancelledPublisher(natsUtil.client).publish({
        id: order.id,
        ticket: {
            id: order.ticket.id
        }
    });
    res.status(204).send(order);
});

export { router as deleteOrderRouter };