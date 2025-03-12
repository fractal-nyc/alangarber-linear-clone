import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskView from './pages/TaskView';
import TaskManagement from './pages/TaskManagement';
import useThemeStore from './store/themeStore';
import { Theme } from './types';
import './App.css';
import { useEffect } from 'react';

function App() {
  const { getActiveTheme } = useThemeStore();
  const theme: Theme = getActiveTheme();

  // Apply global theme variables whenever theme changes
  useEffect(() => {
    document.documentElement.style.setProperty('--background', theme.background);
    document.documentElement.style.setProperty('--text', theme.text);
    document.documentElement.style.setProperty('--primary', theme.primary);
    document.documentElement.style.setProperty('--secondary', theme.secondary);
    document.documentElement.style.setProperty('--accent', theme.accent);
  }, [theme]);

  return (
    <Router>
      <div className="app" style={{ backgroundColor: theme.background, color: theme.text }}>
        <header className="app-header" style={{ backgroundColor: theme.primary }}>
          <div className="logo" style={{ color: '#fff' }}>Linear Clone</div>
          <nav>
            <Link to="/" className="nav-link">Task View</Link>
            <Link to="/manage" className="nav-link">Task Management</Link>
          </nav>
        </header>
        <main className="app-content">
          <Routes>
            <Route path="/" element={<TaskView />} />
            <Route path="/manage" element={<TaskManagement />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
