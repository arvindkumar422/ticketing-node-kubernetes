import {Message} from 'node-nats-streaming';
import {Subjects, Listener, TicketCreatedEvent} from '@arvindtix/common';
import {queueGroupName} from './QueueGroupName';
import { Ticket } from '../../models/ticket';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = queueGroupName;
    async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        const {id, title, price} = data;
        const tick = Ticket.build({
            id,title,price
        });
        await tick.save();
        msg.ack();
    }
}