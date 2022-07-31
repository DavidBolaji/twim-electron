import { Document, Schema, model, Types, Mongoose, ObjectId } from 'mongoose';

// Create the interface
export interface User extends Document {
    _id: any;
    name: string;
    password: string;
}

// Create the schema
const UserSchema = new Schema<User>({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: "updatedAt"
    }
});

// Create and export user model
export const UserModel = model<User>("User", UserSchema);