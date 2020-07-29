import { Message } from 'node-nats-streaming';
import { Subjects, Listener, OrderCreatedEvent } from '@arvindtix/common';
import { queueGroupName } from './QueueGroupName';
import { expirationQueue } from '../../queues/expiration-queue';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;
    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const del = new Date(data.expiresAt).getTime() - new Date().getTime();
        console.log('Order will expire in : ' + del + ' ms');

        await expirationQueue.add(
            {
                orderId: data.id
            },
            {
                delay: del
            }
        );

        msg.ack();
    }

}