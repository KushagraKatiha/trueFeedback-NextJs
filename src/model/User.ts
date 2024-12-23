import mongoose, {Schema, Document} from 'mongoose';

export interface Message extends Document {
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    }, 
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpirey: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        trim: true,
        match: [/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi , 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
    verifyCode: {
        type: String,
        required: [true, 'Please provide a verification code']
    },
    verifyCodeExpirey:{
        type: Date,
        required: [true, 'Please provide a verification code expiry date']
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('users', UserSchema) 

export default UserModel;