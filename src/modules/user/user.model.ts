import mongoose, { Schema, Document } from 'mongoose';
import { CommonFieldsSchema, type ICommonFields } from '../../models/common/CommonModelFields.js';

export interface IUser extends Document, ICommonFields {
  username: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true, index: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  ...CommonFieldsSchema,
}, { timestamps: false });

UserSchema.index({ email: 1, is_delete: 1 });

export default mongoose.model<IUser>('User', UserSchema);