import { Project, Tag, Task, User } from '../models/types';

export interface IUserRepository {
  create(name: string, email: string, password_hash: string): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}

export interface IProjectRepository {
  create(name: string, ownerId: string): Promise<Project>;
  listByOwner(ownerId: string): Promise<Project[]>;
  findById(id: string, ownerId: string): Promise<Project | null>;
  delete(id: string, ownerId: string): Promise<void>;
}

export interface ITaskRepository {
  create(input: Omit<Task, 'id' | 'created_at' | 'status'> & { status?: Task['status'] }): Promise<Task>;
  listByOwner(ownerId: string, todayOnly?: boolean): Promise<Task[]>;
  update(id: string, ownerId: string, data: Partial<Task>): Promise<Task | null>;
  delete(id: string, ownerId: string): Promise<void>;
  complete(id: string, ownerId: string): Promise<Task | null>;
}

export interface ITagRepository {
  create(name: string, color: string, userId: string): Promise<Tag>;
  listByUser(userId: string): Promise<Tag[]>;
  delete(id: string, userId: string): Promise<void>;
}
