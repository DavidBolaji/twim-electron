import { Document, Schema, model, Types } from 'mongoose';

// Create the interface
export interface Content extends Document {
    _id: any;
    courseId: typeof Types.ObjectId;
    name: string;
    pos: number;
    video: string;
    duration: number;
}

// Create the schema
const ContentSchema = new Schema<Content>({
    courseId: {
        type: Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    video: String,
    pos: {
        type: Number,
        required: true
    },
    duration: Number
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: "updatedAt"
    }
});

// Create and export user model
export const ContentModel = model<Content>("Content", ContentSchema);