import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { TagService } from '../services/tagService';

export class TagController {
  constructor(private tagService: TagService) {}

  create = async (req: AuthRequest, res: Response): Promise<void> => {
    const tag = await this.tagService.create(req.body.name, req.body.color, req.userId as string);
    res.status(201).json(tag);
  };

  list = async (req: AuthRequest, res: Response): Promise<void> => {
    const tags = await this.tagService.list(req.userId as string);
    res.status(200).json(tags);
  };

  delete = async (req: AuthRequest, res: Response): Promise<void> => {
    await this.tagService.delete(req.params.id, req.userId as string);
    res.status(204).send();
  };
}
