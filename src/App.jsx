import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Feed from './pages/Feed';
import Jobs from './pages/Jobs';
import Interview from './pages/Interview';
import Inbox from './pages/Inbox';
import Profile from './pages/Profile';
import EliteAssistant from './components/EliteAssistant';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return children;
};

// New Global Toast Component
const GlobalToast = () => {
  const { toastMessage } = useAuth();
  if (!toastMessage) return null;
  return (
    <div style={{ 
      position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', 
      background: 'var(--success)', color: 'white', padding: '0.75rem 1.5rem', 
      borderRadius: '30px', zIndex: 9999, fontWeight: 'bold', 
      boxShadow: '0 10px 20px rgba(0,0,0,0.3)', animation: 'slideUp 0.3s ease' 
    }}>
      {toastMessage}
    </div>
  );
}

function MainLayout() {
  const { user } = useAuth();
  return (
    <>
      <style>
        {`
          @keyframes slideUp {
            from { transform: translate(-50%, 20px); opacity: 0; }
            to { transform: translate(-50%, 0); opacity: 1; }
          }
        `}
      </style>
      
      {user && <Navbar />}
      <div style={{ paddingBottom: '4rem' }}>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
          <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
          <Route path="/interview" element={<ProtectedRoute><Interview /></ProtectedRoute>} />
          <Route path="/inbox" element={<ProtectedRoute><Inbox /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      {user && <EliteAssistant />}
      <GlobalToast />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </AuthProvider>
  );
}
