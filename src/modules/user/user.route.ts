import  { Router, type NextFunction, type Request, type Response } from 'express';
import { z } from 'zod';
import { loginSchema, registerSchema } from './user.validate.js';
import { login, register } from './user.controller.js';

const router = Router();
function validateRequest(schema: z.ZodSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.flatten().fieldErrors });
    }
    next();
  };
}

router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);

export default router;