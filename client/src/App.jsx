import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import LogActivity from './pages/LogActivity';
import { ActivityList } from './components/ActivityList';
import { useNavigate, Link } from 'react-router-dom';


const Dashboard = () => {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div>
      <div className="nav">
        <h2>🏃 Activity Tracker</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/log-activity">+ Log Activity</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="dashboard">
        <ActivityList />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/log-activity" element={
          <ProtectedRoute>
            <LogActivity />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;