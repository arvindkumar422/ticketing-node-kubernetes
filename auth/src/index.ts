import mongoose from 'mongoose';
import {app} from './app';

const startApp = async () => {
    if(!process.env.MONGO_URI) {
        throw new Error('Mongo URL is undefined!');
    }
    try {
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

