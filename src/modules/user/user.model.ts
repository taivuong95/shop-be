import mongoose, { Schema, Document, type HydratedDocument } from 'mongoose';
import { CommonFieldsSchema, type ICommonFields } from '../../models/common/CommonModelFields.js';
import bcrypt from 'bcrypt';
export interface IJwtData {
  _id: string;
  uuid: string;
  email: string;
  username: string;
}
export interface IUser extends Document, ICommonFields {
  uuid: string;
  username: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  uuid: { type: String, required: true, unique: true, index: true },
  username: { type: String, required: true, unique: true, index: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  ...CommonFieldsSchema,
}, { timestamps: false });

UserSchema.method<HydratedDocument<IUser>>(
  'comparePassword',
  async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compareSync(candidatePassword, this.password);
  }
);

UserSchema.index({ email: 1, is_delete: 1 });

export default mongoose.model<IUser>('User', UserSchema);