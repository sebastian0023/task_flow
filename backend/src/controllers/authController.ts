import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { AuthService } from '../services/authService';

export class AuthController {
  constructor(private authService: AuthService) {}

  register = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;
    const data = await this.authService.register(name, email, password);
    res.status(201).json(data);
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const data = await this.authService.login(email, password);
    res.status(200).json(data);
  };

  me = async (req: AuthRequest, res: Response): Promise<void> => {
    const user = await this.authService.me(req.userId as string);
    res.status(200).json(user);
  };
}
