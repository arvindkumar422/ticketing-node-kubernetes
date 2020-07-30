import { Publisher, Subjects, PaymentCreatedEvent } from '@arvindtix/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}