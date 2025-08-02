import User from './user.model.js';
import bcrypt from 'bcrypt';

export async function registerUser(username: string, email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  return user;
}

export async function loginUser(email: string, password: string) {
  const user = await User.findOne({ email });
  if (!user) return null;
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;
  return user;
}
