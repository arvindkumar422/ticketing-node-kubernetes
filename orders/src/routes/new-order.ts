import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';
import { GenericError, OrderStatus } from '@arvindtix/common';
import { Order } from '../models/order';
import { OrderCreatedPublisher } from '../events/ordercreate.publisher';
import { natsUtil } from '../models/nats-singleton';

const router = express.Router();
const EXPIRE_SECONDS = 15 * 60;

router.post('/api/orders', async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    const tick = await Ticket.findById(ticketId);
    if (!tick) {
        throw new GenericError('Ticket not found..');
    }

    // check if there exists in order in which ticket is already reserved. W can proceed only if there aren't any.
    const isReserved = await tick.isReserved();
    if (isReserved) {
        throw new GenericError('Ticket already reserved.');
    }

    const expire = new Date();
    expire.setSeconds(expire.getSeconds() + EXPIRE_SECONDS);

    const order = Order.build({
        userId: req.currentUser!.id,
        status: OrderStatus.Created,
        expiresAt: expire,
        ticket: tick
    });

    await order.save();

    new OrderCreatedPublisher(natsUtil.client).publish({
        id: order.id,
        status: OrderStatus.Created,
        userId: order.userId,
        expiresAt: order.expiresAt.toISOString(),
        ticket: {
            id: tick.id,
            price: tick.price
        }
    });

    res.status(201).send(order);
});

export { router as newOrderRouter };