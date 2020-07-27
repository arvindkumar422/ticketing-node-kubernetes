import { Publisher, Subjects, TicketUpdatedEvent } from '@arvindtix/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;


}