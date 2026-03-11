import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { ProjectController } from '../controllers/projectController';
import { TagController } from '../controllers/tagController';
import { TaskController } from '../controllers/taskController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { ProjectRepository, TagRepository, TaskRepository, UserRepository } from '../repositories/pgRepositories';
import { AuthService } from '../services/authService';
import { ProjectService } from '../services/projectService';
import { TagService } from '../services/tagService';
import { TaskService } from '../services/taskService';

const router = Router();

const userRepo = new UserRepository();
const projectRepo = new ProjectRepository();
const taskRepo = new TaskRepository();
const tagRepo = new TagRepository();

const authController = new AuthController(new AuthService(userRepo));
const projectController = new ProjectController(new ProjectService(projectRepo));
const taskController = new TaskController(new TaskService(taskRepo));
const tagController = new TagController(new TagService(tagRepo));

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/me', authMiddleware, authController.me);

router.post('/projects', authMiddleware, projectController.create);
router.get('/projects', authMiddleware, projectController.list);
router.get('/projects/:id', authMiddleware, projectController.get);
router.delete('/projects/:id', authMiddleware, projectController.delete);

router.post('/tasks', authMiddleware, taskController.create);
router.get('/tasks', authMiddleware, taskController.list);
router.put('/tasks/:id', authMiddleware, taskController.update);
router.delete('/tasks/:id', authMiddleware, taskController.delete);
router.patch('/tasks/:id/complete', authMiddleware, taskController.complete);

router.post('/tags', authMiddleware, tagController.create);
router.get('/tags', authMiddleware, tagController.list);
router.delete('/tags/:id', authMiddleware, tagController.delete);

export default router;
