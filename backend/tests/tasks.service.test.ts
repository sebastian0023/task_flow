import { TaskService } from '../src/services/taskService';
import { ITaskRepository } from '../src/repositories/interfaces';

const taskRepo: jest.Mocked<ITaskRepository> = {
  create: jest.fn(),
  listByOwner: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  complete: jest.fn()
};

describe('TaskService', () => {
  const service = new TaskService(taskRepo);

  beforeEach(() => jest.clearAllMocks());

  it('creates task with pending status', async () => {
    taskRepo.create.mockResolvedValue({
      id: 't1',
      title: 'Task',
      description: 'desc',
      status: 'pending',
      due_date: null,
      project_id: 'p1',
      assigned_user_id: null,
      created_at: 'now'
    });
    const result = await service.create(
      { title: 'Task', description: 'desc', due_date: null, project_id: 'p1', assigned_user_id: null },
      'u1'
    );
    expect(result.status).toBe('pending');
  });

  it('returns today tasks', async () => {
    taskRepo.listByOwner.mockResolvedValue([]);
    await service.list('u1', true);
    expect(taskRepo.listByOwner).toHaveBeenCalledWith('u1', true);
  });

  it('completes task', async () => {
    taskRepo.complete.mockResolvedValue({
      id: 't1',
      title: 'Task',
      description: 'desc',
      status: 'completed',
      due_date: null,
      project_id: 'p1',
      assigned_user_id: null,
      created_at: 'now'
    });
    const task = await service.complete('t1', 'u1');
    expect(task?.status).toBe('completed');
  });
});
