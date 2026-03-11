import { ProjectService } from '../src/services/projectService';
import { IProjectRepository } from '../src/repositories/interfaces';

const projectRepo: jest.Mocked<IProjectRepository> = {
  create: jest.fn(),
  listByOwner: jest.fn(),
  findById: jest.fn(),
  delete: jest.fn()
};

describe('ProjectService', () => {
  const service = new ProjectService(projectRepo);
  beforeEach(() => jest.clearAllMocks());

  it('creates project', async () => {
    projectRepo.create.mockResolvedValue({ id: 'p1', name: 'App', owner_id: 'u1', created_at: 'now' });
    const project = await service.create('App', 'u1');
    expect(project.name).toBe('App');
  });

  it('lists projects', async () => {
    projectRepo.listByOwner.mockResolvedValue([{ id: 'p1', name: 'App', owner_id: 'u1', created_at: 'now' }]);
    const projects = await service.list('u1');
    expect(projects).toHaveLength(1);
  });
});
