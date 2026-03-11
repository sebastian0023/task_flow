import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { ProjectService } from '../services/projectService';

export class ProjectController {
  constructor(private projectService: ProjectService) {}

  create = async (req: AuthRequest, res: Response): Promise<void> => {
    const project = await this.projectService.create(req.body.name, req.userId as string);
    res.status(201).json(project);
  };

  list = async (req: AuthRequest, res: Response): Promise<void> => {
    const projects = await this.projectService.list(req.userId as string);
    res.status(200).json(projects);
  };

  get = async (req: AuthRequest, res: Response): Promise<void> => {
    const project = await this.projectService.get(req.params.id, req.userId as string);
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.status(200).json(project);
  };

  delete = async (req: AuthRequest, res: Response): Promise<void> => {
    await this.projectService.delete(req.params.id, req.userId as string);
    res.status(204).send();
  };
}
