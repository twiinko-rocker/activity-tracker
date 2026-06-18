import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import LogActivity from './pages/LogActivity';
import { ActivityList } from './components/ActivityList';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <div>
      <div className="nav">
        <h2>🏃 Activity Tracker</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="welcome">
        <h3 style={{ textAlign: 'center', color: '#333', marginBottom: '1rem' }}>
          Welcome, {user?.name}!
        </h3>
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