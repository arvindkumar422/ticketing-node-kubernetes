import { natsUtil } from './models/nats-singleton';
import { OrderCreatedListener } from './events/listeners/OrderCreatedListener';

const startApp = async () => {
    if (!process.env.NATS_CLIENT_ID) {
        throw new Error('NATS_CLIENT_ID is not defined!');
    }
    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error('NATS_CLUSTER_ID not defined!');
    }
    if (!process.env.NATS_URL) {
        throw new Error('NATS_URL not defined!');
    }
    try {
        await natsUtil.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL);
        natsUtil.client.on('close', () => {
            console.log('NATS connection terminated!');
            process.exit();
        });
        process.on('SIGINT', () => natsUtil.client.close());
        process.on('SIGTERM', () => natsUtil.client.close());

        new OrderCreatedListener(natsUtil.client).listen();
    }
    catch (err) {
        console.log(err);
    }
}

startApp();

