import { Task } from '../types';

export const TaskCard = ({ task, onComplete }: { task: Task; onComplete: () => void }) => (
  <div className="bg-white p-4 rounded shadow flex justify-between">
    <div>
      <h4 className="font-semibold">{task.title}</h4>
      <p className="text-sm">{task.description}</p>
    </div>
    <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={onComplete}>
      {task.status === 'completed' ? 'Done' : 'Complete'}
    </button>
  </div>
);
