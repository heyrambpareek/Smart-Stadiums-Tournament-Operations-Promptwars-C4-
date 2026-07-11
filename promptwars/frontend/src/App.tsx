import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState, type ReactNode } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import FanDashboard from './pages/FanDashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AiAssistant from './pages/AiAssistant';
import AccessibilityDashboard from './pages/AccessibilityDashboard';
import TransportHub from './pages/TransportHub';
import SustainabilityDashboard from './pages/SustainabilityDashboard';
// Legacy organizer dashboard kept at ./pages/OrganizerDashboard.tsx
// New admin-focused dashboard below:
import OrganizerAdminDashboard from './pages/OrganizerAdminDashboard';
import AiDecisionCenter from './pages/AiDecisionCenter';
import LoginPage from './pages/LoginPage';
import OrganizerLoginPage from './pages/OrganizerLoginPage';
import VolunteerLoginPage from './pages/VolunteerLoginPage';
import AdminLoginPage from './pages/AdminLoginPage';

const ProtectedRoute = ({ children, requiredRole }: { children: ReactNode; requiredRole?: string }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem('stadiummind-auth') === 'true');
    setIsReady(true);
  }, []);

  if (!isReady) return null;

  if (!isAuthenticated) {
    if (requiredRole === 'organizer') return <Navigate to="/organizer-login" replace />;
    if (requiredRole === 'volunteer') return <Navigate to="/volunteer-login" replace />;
    if (requiredRole === 'admin') return <Navigate to="/admin-login" replace />;
    return <Navigate to="/login" replace />;
  }

  if (requiredRole) {
    const role = localStorage.getItem('stadiummind-role');
    if (role !== requiredRole) {
      if (role === 'volunteer') return <Navigate to="/volunteer" replace />;
      if (role === 'admin') return <Navigate to="/admin" replace />;
      if (role === 'organizer') return <Navigate to="/organizer" replace />;
      return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-fifa-dark">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/volunteer-login" element={<VolunteerLoginPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/organizer-login" element={<OrganizerLoginPage />} />
            <Route path="/fan" element={<ProtectedRoute><FanDashboard /></ProtectedRoute>} />
            <Route path="/volunteer" element={<ProtectedRoute requiredRole="volunteer"><VolunteerDashboard /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/assistant" element={<ProtectedRoute><AiAssistant /></ProtectedRoute>} />
            <Route path="/accessibility" element={<ProtectedRoute><AccessibilityDashboard /></ProtectedRoute>} />
            <Route path="/transport" element={<ProtectedRoute><TransportHub /></ProtectedRoute>} />
            <Route path="/sustainability" element={<ProtectedRoute><SustainabilityDashboard /></ProtectedRoute>} />
            <Route path="/organizer" element={<ProtectedRoute requiredRole="organizer"><OrganizerAdminDashboard /></ProtectedRoute>} />
            <Route path="/decision-center" element={<ProtectedRoute><AiDecisionCenter /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
