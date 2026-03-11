import { IProjectRepository } from '../repositories/interfaces';

export class ProjectService {
  constructor(private projectRepo: IProjectRepository) {}
  create(name: string, ownerId: string) {
    return this.projectRepo.create(name, ownerId);
  }
  list(ownerId: string) {
    return this.projectRepo.listByOwner(ownerId);
  }
  get(id: string, ownerId: string) {
    return this.projectRepo.findById(id, ownerId);
  }
  delete(id: string, ownerId: string) {
    return this.projectRepo.delete(id, ownerId);
  }
}
