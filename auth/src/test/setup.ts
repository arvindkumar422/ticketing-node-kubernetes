import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import {app} from '../app';

let mongo : any;

beforeAll(async () => {
    console.log('test begin auth..2nd interation');
    process.env.JWT_KEY = 'arbitrary';

    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(
        mongoUri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
});

beforeEach(async () => {
    const col = await mongoose.connection.db.collections();     

    col.forEach(async element => {
        await element.deleteMany({});
    });
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
})