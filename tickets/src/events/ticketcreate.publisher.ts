import { Publisher, Subjects, TicketCreatedEvent } from '@arvindtix/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;


}