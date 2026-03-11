import { ITaskRepository } from '../repositories/interfaces';
import { Task } from '../models/types';

export class TaskService {
  constructor(private taskRepo: ITaskRepository) {}
  create(input: Omit<Task, 'id' | 'created_at' | 'status'>, ownerId: string) {
    return this.taskRepo.create({ ...input, status: 'pending' });
  }
  list(ownerId: string, todayOnly = false) {
    return this.taskRepo.listByOwner(ownerId, todayOnly);
  }
  update(id: string, ownerId: string, data: Partial<Task>) {
    return this.taskRepo.update(id, ownerId, data);
  }
  delete(id: string, ownerId: string) {
    return this.taskRepo.delete(id, ownerId);
  }
  complete(id: string, ownerId: string) {
    return this.taskRepo.complete(id, ownerId);
  }
}
