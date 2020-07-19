import mongoose from 'mongoose';
import { PasswordMgr } from '../middleware/password';

interface UserAttrs {
    email: string;
    password: string;
}

// forcing user model to have a build method.
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
            // keep only id and username, remove password and rename _id to id.
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
            },
            versionKey: false // to exclude the '_v' property in the created model
        }
    }
);

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await PasswordMgr.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };