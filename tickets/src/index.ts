import mongoose from 'mongoose';
import { app } from './app';
import { natsUtil } from './models/nats-singleton';
import { OrderCreatedListener } from './events/listeners/OrderCreatedListener';
import { OrderCancelledListener } from './events/listeners/OrderCancelledListener';

const startApp = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error('Mongo url is not defined!');
    }
    if (!process.env.NATS_CLIENT_ID) {
        throw new Error('NATS_CLIENT_ID not defined!');
    }
    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error('NATS_CLUSTER_ID not defined!');
    }
    if (!process.env.NATS_URL) {
        throw new Error('NATS_URL not defined!!');
    }
    try {
        await natsUtil.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL);
        natsUtil.client.on('close', () => {
            console.log('NATS connection terminated');
            process.exit();
        });
        process.on('SIGINT', () => natsUtil.client.close());
        process.on('SIGTERM', () => natsUtil.client.close());

        new OrderCreatedListener(natsUtil.client).listen();
        new OrderCancelledListener(natsUtil.client).listen();

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        console.log("Established MongoDB connection!")
    }
    catch (err) {
        console.log(err);
    }

    app.listen(3000, () => {
        console.log("Listening on 3000!!");
    });

}

startApp();

