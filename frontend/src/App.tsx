import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { ProjectView } from './pages/ProjectView';
import { Register } from './pages/Register';
import { Settings } from './pages/Settings';
import { TaskManager } from './pages/TaskManager';
import { TodaysTasksWidget } from './pages/TodaysTasksWidget';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <nav className="p-3 bg-slate-200 space-x-3 text-sm">
      <Link to="/">Dashboard</Link><Link to="/tasks">Task Manager</Link><Link to="/project">Project</Link><Link to="/today">Today</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/project" element={<ProjectView />} />
      <Route path="/tasks" element={<TaskManager />} />
      <Route path="/today" element={<TodaysTasksWidget />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  </BrowserRouter>
);

export default App;
