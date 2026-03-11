import { IUserRepository } from '../repositories/interfaces';
import { comparePassword, hashPassword, signToken } from '../utils/security';

export class AuthService {
  constructor(private userRepo: IUserRepository) {}

  async register(name: string, email: string, password: string) {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) throw new Error('Email already exists');
    const password_hash = await hashPassword(password);
    const user = await this.userRepo.create(name, email, password_hash);
    const token = signToken(user.id);
    return { user, token };
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');
    const valid = await comparePassword(password, user.password_hash);
    if (!valid) throw new Error('Invalid credentials');
    const token = signToken(user.id);
    return { user, token };
  }

  async me(userId: string) {
    return this.userRepo.findById(userId);
  }
}
