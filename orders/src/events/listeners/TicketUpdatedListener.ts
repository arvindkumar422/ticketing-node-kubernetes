import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketUpdatedEvent, GenericError } from '@arvindtix/common';
import { queueGroupName } from './QueueGroupName';
import { Ticket } from '../../models/ticket';

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
    queueGroupName = queueGroupName;
    async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
        const tick = await Ticket.findByEvent(data);
        if(!tick) {
            throw new GenericError('Tickt not found!');
        }
        const { title, price } = data;
        tick.set({title, price})
        await tick.save();
        msg.ack();
    }
}