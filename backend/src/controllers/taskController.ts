import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { TaskService } from '../services/taskService';

export class TaskController {
  constructor(private taskService: TaskService) {}

  create = async (req: AuthRequest, res: Response): Promise<void> => {
    const task = await this.taskService.create(req.body, req.userId as string);
    res.status(201).json(task);
  };

  list = async (req: AuthRequest, res: Response): Promise<void> => {
    const tasks = await this.taskService.list(req.userId as string, req.query.today === 'true');
    res.status(200).json(tasks);
  };

  update = async (req: AuthRequest, res: Response): Promise<void> => {
    const task = await this.taskService.update(req.params.id, req.userId as string, req.body);
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.status(200).json(task);
  };

  delete = async (req: AuthRequest, res: Response): Promise<void> => {
    await this.taskService.delete(req.params.id, req.userId as string);
    res.status(204).send();
  };

  complete = async (req: AuthRequest, res: Response): Promise<void> => {
    const task = await this.taskService.complete(req.params.id, req.userId as string);
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.status(200).json(task);
  };
}
