import mongoose from 'mongoose';
import {app} from './app';

const startApp = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
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

