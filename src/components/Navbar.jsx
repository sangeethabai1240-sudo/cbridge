import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, Search, Home, Briefcase, Video, Inbox, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ background: 'rgba(0, 0, 0, 0.9)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 3px rgba(255,215,0,0.1)' }}>
      <div className="content-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
            <Brain size={28} className="text-primary" />
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '-0.5px' }} className="hide-mobile">CBridge</span>
          </Link>
          
          {user && (
            <div style={{ position: 'relative', width: '300px', maxWidth: '250px' }} className="hide-mobile">
              <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-dark)', padding: '0.4rem 1rem', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
                <Search size={16} className="text-muted" style={{ marginRight: '0.5rem' }}/>
                <input 
                  type="text" 
                  placeholder="Search friends, companies..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ border: 'none', background: 'transparent', outline: 'none', color: 'var(--text-main)', width: '100%', padding: '0' }}/>
              </div>
              {searchQuery && (
                 <div className="search-dropdown p-2">
                   <div style={{ padding: '0.5rem', background: 'var(--bg-card-hover)', borderRadius: '4px', marginBottom: '0.2rem', cursor: 'pointer' }}>🌐 <strong>{searchQuery}</strong> in Companies</div>
                   <div style={{ padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}>👥 Search all users named "{searchQuery}"</div>
                   <div style={{ padding: '0.5rem', borderTop: '1px solid var(--border-color)', marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Top Results</div>
                   <div style={{ padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                     <div style={{ width: '24px', height: '24px', background: 'var(--primary)', color: 'white', borderRadius: '50%', textAlign: 'center', fontSize: '0.7rem', lineHeight: '24px' }}>A</div>
                     Alex {searchQuery} (Stranger)
                   </div>
                 </div>
              )}
            </div>
          )}
        </div>

        {user && (
          <div className="nav-links" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link to="/" style={{ fontWeight: '500', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'color 0.2s' }}><Home size={20}/><span className="hide-mobile" style={{ fontSize: '0.85rem', marginTop: '4px' }}>Feed</span></Link>
            <Link to="/jobs" style={{ fontWeight: '500', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'color 0.2s' }}><Briefcase size={20}/><span className="hide-mobile" style={{ fontSize: '0.85rem', marginTop: '4px' }}>Jobs</span></Link>
            <Link to="/interview" style={{ fontWeight: '500', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'color 0.2s' }}><Video size={20}/><span className="hide-mobile" style={{ fontSize: '0.85rem', marginTop: '4px' }}>Interview</span></Link>
            <Link to="/inbox" style={{ fontWeight: '500', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'color 0.2s' }}><Inbox size={20}/><span className="hide-mobile" style={{ fontSize: '0.85rem', marginTop: '4px' }}>Inbox</span></Link>
            <Link to="/profile" style={{ fontWeight: '500', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'color 0.2s' }}><User size={20}/><span className="hide-mobile" style={{ fontSize: '0.85rem', marginTop: '4px' }}>{user.name}</span></Link>
            <button className="btn-secondary hide-mobile" onClick={handleLogout} style={{ padding: '0.4rem 1rem', marginLeft: '1rem' }}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}
