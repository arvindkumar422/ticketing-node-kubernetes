import { Message } from 'node-nats-streaming';
import { Subjects, Listener, GenericError, ExpirationCompleteEvent, OrderStatus } from '@arvindtix/common';
import { queueGroupName } from './QueueGroupName';
import { Order } from '../../models/order';
import { OrderCancelledPublisher } from '../ordercancel.publisher';

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
    queueGroupName = queueGroupName;
    async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
        const ord = await Order.findById(data.orderId).populate('ticket');
        if(!ord) { throw new GenericError('Order not found!'); }
        if(ord.status === OrderStatus.Complete) { msg.ack(); }

        ord.set({
            status: OrderStatus.Cancelled
        });
        await ord.save();

        await new OrderCancelledPublisher(this.client).publish({
            id: ord.id,
            version: ord.version,
            ticket: {
                id: ord.ticket.id
            }
        });

        msg.ack();
    }
}