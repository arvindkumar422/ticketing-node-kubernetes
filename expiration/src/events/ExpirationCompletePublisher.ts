import { Publisher, Subjects, ExpirationCompleteEvent } from '@arvindtix/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}