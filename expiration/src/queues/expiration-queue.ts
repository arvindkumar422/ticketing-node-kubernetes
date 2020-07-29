import Queue from 'bull';
import { ExpirationCompletePublisher } from '../events/ExpirationCompletePublisher';
import { natsUtil } from '../models/nats-singleton';

interface Payload {
  orderId: string;
}

const expirationQueue = new Queue<Payload>('order:expiration', {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expirationQueue.process(async (job) => {
  new ExpirationCompletePublisher(natsUtil.client).publish({
    orderId: job.data.orderId
  });
});

export { expirationQueue };
