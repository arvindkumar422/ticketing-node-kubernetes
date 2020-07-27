import { Publisher, Subjects, OrderCancelledEvent } from '@arvindtix/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}