import { useCompleteTask, useTasks } from '../hooks/useTasks';
import { TaskCard } from './TaskCard';

export const TaskList = ({ todayOnly = false }: { todayOnly?: boolean }) => {
  const { data = [] } = useTasks(todayOnly);
  const complete = useCompleteTask();
  return (
    <div className="space-y-3">
      {data.map((task: any) => (
        <TaskCard key={task.id} task={task} onComplete={() => complete.mutate(task.id)} />
      ))}
    </div>
  );
};
