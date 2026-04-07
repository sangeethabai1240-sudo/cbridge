import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';

export default function Signup() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(signup(id, name, password)) {
      navigate('/');
    }
  };

  return (
    <div className="content-container flex flex-col items-center justify-center" style={{ minHeight: '80vh' }}>
      <div className="glass-panel card-3d p-4" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
        <h2 className="text-center text-primary mb-4" style={{ fontSize: '2rem' }}>Join CBridge</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Full Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="John Doe" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>User ID</label>
            <input type="text" value={id} onChange={e => setId(e.target.value)} required placeholder="Choose a User ID" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Create Password" />
          </div>
          <button type="submit" className="btn mt-4" style={{ width: '100%' }}>
            <UserPlus size={20} /> Create Account
          </button>
        </form>

        <p className="text-center mt-4 text-muted" style={{ fontSize: '0.9rem' }}>
          Already have an account? <Link to="/login" className="text-primary">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
