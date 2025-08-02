import type { Request, Response } from 'express';
import { registerUser, loginUser } from './user.service.js';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    await registerUser(username, email, password);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ error: errMsg });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful' });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: errMsg });
  }
};