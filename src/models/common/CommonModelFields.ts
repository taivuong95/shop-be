import { Schema } from 'mongoose';

export interface ICommonFields {
  is_active: number;
  is_delete?: number;
  created_at?: Date;
  updated_at?: Date;
  created_by?: string;
  updated_by?: string;
}

export const CommonFieldsSchema = {
  is_active: { type: Number, default: 1 },
  is_delete: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date,  default: Date.now },
  created_by: { type: String },
  updated_by: { type: String },
};
