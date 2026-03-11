import { TagSelector } from '../components/TagSelector';
import { TaskList } from '../components/TaskList';

export const TaskManager = () => (
  <div className="p-4 space-y-4"><TagSelector /><TaskList /></div>
);
