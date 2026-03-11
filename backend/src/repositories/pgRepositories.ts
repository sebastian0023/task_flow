import { pool } from '../config/db';
import { Project, Tag, Task, User } from '../models/types';
import { IProjectRepository, ITagRepository, ITaskRepository, IUserRepository } from './interfaces';

export class UserRepository implements IUserRepository {
  async create(name: string, email: string, password_hash: string): Promise<User> {
    const q = `INSERT INTO users(name, email, password_hash) VALUES($1,$2,$3) RETURNING *`;
    const { rows } = await pool.query(q, [name, email, password_hash]);
    return rows[0];
  }
  async findByEmail(email: string): Promise<User | null> {
    const { rows } = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    return rows[0] ?? null;
  }
  async findById(id: string): Promise<User | null> {
    const { rows } = await pool.query('SELECT * FROM users WHERE id=$1', [id]);
    return rows[0] ?? null;
  }
}

export class ProjectRepository implements IProjectRepository {
  async create(name: string, ownerId: string): Promise<Project> {
    const { rows } = await pool.query(
      'INSERT INTO projects(name, owner_id) VALUES($1,$2) RETURNING *',
      [name, ownerId]
    );
    return rows[0];
  }
  async listByOwner(ownerId: string): Promise<Project[]> {
    const { rows } = await pool.query('SELECT * FROM projects WHERE owner_id=$1 ORDER BY created_at DESC', [ownerId]);
    return rows;
  }
  async findById(id: string, ownerId: string): Promise<Project | null> {
    const { rows } = await pool.query('SELECT * FROM projects WHERE id=$1 AND owner_id=$2', [id, ownerId]);
    return rows[0] ?? null;
  }
  async delete(id: string, ownerId: string): Promise<void> {
    await pool.query('DELETE FROM projects WHERE id=$1 AND owner_id=$2', [id, ownerId]);
  }
}

export class TaskRepository implements ITaskRepository {
  async create(input: Omit<Task, 'id' | 'created_at' | 'status'> & { status?: Task['status'] }): Promise<Task> {
    const { rows } = await pool.query(
      `INSERT INTO tasks(title, description, status, due_date, project_id, assigned_user_id)
      VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
      [input.title, input.description, input.status ?? 'pending', input.due_date, input.project_id, input.assigned_user_id]
    );
    return rows[0];
  }
  async listByOwner(ownerId: string, todayOnly = false): Promise<Task[]> {
    const todayClause = todayOnly ? "AND DATE(t.due_date)=CURRENT_DATE" : '';
    const { rows } = await pool.query(
      `SELECT t.* FROM tasks t
       JOIN projects p ON t.project_id = p.id
       WHERE p.owner_id=$1 ${todayClause}
       ORDER BY t.created_at DESC`,
      [ownerId]
    );
    return rows;
  }
  async update(id: string, ownerId: string, data: Partial<Task>): Promise<Task | null> {
    const { rows } = await pool.query(
      `UPDATE tasks t SET
        title = COALESCE($3, t.title),
        description = COALESCE($4, t.description),
        status = COALESCE($5, t.status),
        due_date = COALESCE($6, t.due_date),
        assigned_user_id = COALESCE($7, t.assigned_user_id)
      FROM projects p
      WHERE t.id=$1 AND t.project_id = p.id AND p.owner_id=$2
      RETURNING t.*`,
      [id, ownerId, data.title, data.description, data.status, data.due_date, data.assigned_user_id]
    );
    return rows[0] ?? null;
  }
  async delete(id: string, ownerId: string): Promise<void> {
    await pool.query(
      `DELETE FROM tasks t USING projects p
      WHERE t.id=$1 AND t.project_id=p.id AND p.owner_id=$2`,
      [id, ownerId]
    );
  }
  async complete(id: string, ownerId: string): Promise<Task | null> {
    return this.update(id, ownerId, { status: 'completed' } as Partial<Task>);
  }
}

export class TagRepository implements ITagRepository {
  async create(name: string, color: string, userId: string): Promise<Tag> {
    const { rows } = await pool.query('INSERT INTO tags(name, color, user_id) VALUES($1,$2,$3) RETURNING *', [name, color, userId]);
    return rows[0];
  }
  async listByUser(userId: string): Promise<Tag[]> {
    const { rows } = await pool.query('SELECT * FROM tags WHERE user_id=$1 ORDER BY name', [userId]);
    return rows;
  }
  async delete(id: string, userId: string): Promise<void> {
    await pool.query('DELETE FROM tags WHERE id=$1 AND user_id=$2', [id, userId]);
  }
}
