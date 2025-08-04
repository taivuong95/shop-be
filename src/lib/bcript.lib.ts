import bcrypt from 'bcrypt';

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10, 'b'));
}
