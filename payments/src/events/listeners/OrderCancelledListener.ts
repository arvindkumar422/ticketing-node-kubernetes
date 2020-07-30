import { Message } from 'node-nats-streaming';
import { Subjects, Listener, OrderCancelledEvent, GenericError, OrderStatus } from '@arvindtix/common';
import { queueGroupName } from './QueueGroupName';
import { Order } from '../../models/order';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;
    async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
        const ord = await Order.findOne({
            _id: data.id, version: data.version - 1
        });
        if (!ord) { throw new GenericError('Order not found!'); }
        ord.set({ status: OrderStatus.Cancelled });
        await ord.save();
        msg.ack();
    }
}