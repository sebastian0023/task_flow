import { ITagRepository } from '../repositories/interfaces';

export class TagService {
  constructor(private tagRepo: ITagRepository) {}
  create(name: string, color: string, userId: string) {
    return this.tagRepo.create(name, color, userId);
  }
  list(userId: string) {
    return this.tagRepo.listByUser(userId);
  }
  delete(id: string, userId: string) {
    return this.tagRepo.delete(id, userId);
  }
}
