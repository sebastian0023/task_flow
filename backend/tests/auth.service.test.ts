import { AuthService } from '../src/services/authService';
import { IUserRepository } from '../src/repositories/interfaces';

const userRepo: jest.Mocked<IUserRepository> = {
  create: jest.fn(),
  findByEmail: jest.fn(),
  findById: jest.fn()
};

describe('AuthService', () => {
  const service = new AuthService(userRepo);

  beforeEach(() => jest.clearAllMocks());

  it('registers a new user', async () => {
    userRepo.findByEmail.mockResolvedValue(null);
    userRepo.create.mockResolvedValue({
      id: '1',
      name: 'A',
      email: 'a@test.com',
      password_hash: 'hash',
      created_at: new Date().toISOString()
    });
    const result = await service.register('A', 'a@test.com', 'secret');
    expect(result.user.email).toBe('a@test.com');
    expect(result.token).toBeTruthy();
  });

  it('rejects duplicate email', async () => {
    userRepo.findByEmail.mockResolvedValue({
      id: '1',
      name: 'A',
      email: 'a@test.com',
      password_hash: 'hash',
      created_at: new Date().toISOString()
    });
    await expect(service.register('A', 'a@test.com', 'secret')).rejects.toThrow('Email already exists');
  });

  it('logs user in', async () => {
    userRepo.findByEmail.mockResolvedValue({
      id: '1',
      name: 'A',
      email: 'a@test.com',
      password_hash: '$2a$10$4RkOlUQ1eYfiMouDPTkGOu1igFOnzKQ55VV4d2OHhVx8TLfpeUW0q',
      created_at: new Date().toISOString()
    });
    const result = await service.login('a@test.com', 'secret');
    expect(result.user.id).toBe('1');
  });
});
