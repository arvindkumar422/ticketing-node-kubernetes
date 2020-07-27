import { Publisher, Subjects, OrderCreatedEvent } from '@arvindtix/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}