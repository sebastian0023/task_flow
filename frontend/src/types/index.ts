export interface Project { id: string; name: string; }
export interface Task { id: string; title: string; description: string; status: 'pending' | 'completed'; due_date?: string; }
export interface Tag { id: string; name: string; color: string; }
