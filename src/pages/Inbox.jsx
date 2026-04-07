import React from 'react';
import { Mail, Briefcase, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Inbox() {
  const { appliedJobs } = useAuth();

  const standardMessages = [
    { company: "CBridge Welcome", role: "Platform Update", status: "Message", date: "Today" },
    { company: "StartupInc", role: "React Developer", status: "Rejected", date: "Mar 28" }
  ];

  return (
    <div className="content-container flex flex-col gap-4">
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail className="text-primary"/> Job Inbox & Applications</h2>
      
      {appliedJobs.length === 0 && (
         <div className="glass-panel p-4" style={{ textAlign: 'center', background: 'rgba(59, 130, 246, 0.05)' }}>
            <p className="text-muted">You haven't applied to any jobs yet! Go to the Jobs tab to find opportunities.</p>
         </div>
      )}

      <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Render dynamically applied jobs */}
        {appliedJobs.map((app, idx) => (
          <div key={`app-${idx}`} className="card-3d" style={{ 
            display: 'flex', alignItems: 'center', gap: '1rem', 
            padding: '1.5rem', 
            borderBottom: '1px solid var(--border-color)',
            background: 'var(--bg-card)'
          }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '8px', background: 'var(--bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--primary)' }}>
              <Briefcase size={24} className="text-primary" />
            </div>
            
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0 }}>{app.company} <span style={{ fontWeight: 'normal', color: 'var(--text-muted)' }}>- {app.title}</span></h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                <div style={{ width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%' }}></div>
                <span className="text-accent font-bold">Application Sent & Under Review</span>
              </div>
            </div>
            
            <div className="text-muted" style={{ fontSize: '0.9rem' }}>{app.date}</div>
            
            <button className="btn-secondary" style={{ marginLeft: '1rem', padding: '0.5rem' }}><ExternalLink size={16}/></button>
          </div>
        ))}

        {/* Existing mock messages */}
        {standardMessages.map((msg, idx) => (
          <div key={`msg-${idx}`} style={{ 
            display: 'flex', alignItems: 'center', gap: '1rem', 
            padding: '1.5rem', 
            borderBottom: idx === standardMessages.length - 1 ? 'none' : '1px solid var(--border-color)',
          }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '8px', background: 'var(--bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}>
              <Mail size={24} className="text-muted" />
            </div>
            
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0 }}>{msg.company} <span style={{ fontWeight: 'normal', color: 'var(--text-muted)' }}>- {msg.role}</span></h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                <span className="text-muted">{msg.status}</span>
              </div>
            </div>
            
            <div className="text-muted" style={{ fontSize: '0.9rem' }}>{msg.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
