import { TaskList } from '../components/TaskList';

export const TodaysTasksWidget = () => (
  <section className="p-4"><h3 className="font-semibold mb-2">Today's Tasks</h3><TaskList todayOnly /></section>
);
