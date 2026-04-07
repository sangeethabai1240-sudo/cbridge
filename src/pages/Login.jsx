import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(login(id, password)) {
      navigate('/');
    }
  };

  return (
    <div className="content-container flex flex-col items-center justify-center" style={{ minHeight: '80vh' }}>
      <div className="glass-panel card-3d p-4" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
        <h2 className="text-center text-primary mb-4" style={{ fontSize: '2rem' }}>CBridge</h2>
        <p className="text-center text-muted mb-4">Sign in to your professional network</p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>User ID</label>
            <input type="text" value={id} onChange={e => setId(e.target.value)} required placeholder="Enter User ID" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Enter Password" />
          </div>
          <button type="submit" className="btn mt-4" style={{ width: '100%' }}>
            <LogIn size={20} /> Login
          </button>
        </form>

        <p className="text-center mt-4 text-muted" style={{ fontSize: '0.9rem' }}>
          New here? <Link to="/signup" className="text-primary">Create a new ID</Link>
        </p>
      </div>
    </div>
  );
}
