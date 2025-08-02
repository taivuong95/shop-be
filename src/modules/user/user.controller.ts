import type { NextFunction, Request, Response } from 'express';
import { registerUser, getUser } from './user.service.js';
import type { IJwtData } from './user.model.js';
import { signJWT, signRefreshJWT } from '../../helpers/auth.helper.js';

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

export const login = async (req: Request, res: Response,  next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await getUser(
      { email: email },
      {
        username: 1,
        password: 1,
        uuid: 1,
        email: 1,
      },
      { lean: false }
    );

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const passwordIsMatch = await user.comparePassword(password);
    if (!passwordIsMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const jwtData: IJwtData = {
      _id: user._id?.toString() || '',
      uuid: user.uuid,
      username: user.username,
      email: user.email,
    };

    const token = signJWT(jwtData);
    const refreshToken = signRefreshJWT(jwtData);

    res.status(200).json({
      message: 'Login successfull',
      data: { token, refreshToken },
    });
  } catch (error: unknown) {
    next(error);
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: errMsg });
  }
};