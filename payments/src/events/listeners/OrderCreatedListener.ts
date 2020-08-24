import {Message} from 'node-nats-streaming';
import {Subjects, Listener, OrderCreatedEvent} from '@arvindtix/common';
import {queueGroupName} from './QueueGroupName';
import { Order } from '../../models/order';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;
    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const {id,userId,version,status} = data;
        const ord = Order.build({
            id,userId,price: data.ticket.price,version,status
        });
        await ord.save(); 
        msg.ack();
    }
}