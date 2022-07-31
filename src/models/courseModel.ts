import { Document, Schema, model, Types, Mongoose, ObjectId } from 'mongoose';

// Create the interface
export interface Course extends Document {
  _id: any;
  name: string;
  photo?: string;
}

// Create the schema
const CourseSchema = new Schema<Course>({
  name: {
    type: String,
    required: true
  },
  photo: String,
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: "updatedAt"
  }
});

// Create and export user model
export const CourseModel = model<Course>("Course", CourseSchema);