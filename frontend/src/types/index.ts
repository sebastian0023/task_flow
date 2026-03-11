export interface Project {
  id: string;
  name: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  due_date: string | null;
  project_id: string;
  assigned_user_id: string | null;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}
