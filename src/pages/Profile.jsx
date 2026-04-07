import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, Award, BookOpen, Star, FileText, UploadCloud, Edit3, Save, X } from 'lucide-react';

export default function Profile() {
  const { user, updateUser, showToast } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editRole, setEditRole] = useState(user?.role || '');
  const [editSkills, setEditSkills] = useState(user?.skills?.join(', ') || '');
  const [editLocation, setEditLocation] = useState(user?.location || '');
  const [editGithub, setEditGithub] = useState(user?.github || '');
  const [editPortfolio, setEditPortfolio] = useState(user?.portfolio || '');
  
  const [isUploading, setIsUploading] = useState(false);

  const handleSaveProfile = () => {
    updateUser({
      name: editName,
      role: editRole,
      skills: editSkills.split(',').map(s => s.trim()).filter(s => s.length > 0),
      location: editLocation,
      github: editGithub,
      portfolio: editPortfolio
    });
    setIsEditing(false);
    showToast("Profile master intelligence updated.");
  };

  const handleCancelEdit = () => {
    setEditName(user?.name || '');
    setEditRole(user?.role || '');
    setEditSkills(user?.skills?.join(', ') || '');
    setEditLocation(user?.location || '');
    setEditGithub(user?.github || '');
    setEditPortfolio(user?.portfolio || '');
    setIsEditing(false);
  };

  const handleResumeUpload = () => {
    setIsUploading(true);
    showToast("Encrypting and parsing Resume document...");
    setTimeout(() => {
      setIsUploading(false);
      updateUser({ resumeUploaded: true });
      showToast("Resume strictly verified and visible to elite companies.");
    }, 2500);
  };

  return (
    <div className="content-container">
      
      {/* Top Profile Banner */}
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <div style={{ background: 'linear-gradient(135deg, var(--bg-card), var(--primary-glow))', height: '180px' }}></div>
        <div style={{ padding: '0 2rem 2rem 2rem', marginTop: '-60px' }}>
          
          <div style={{ width: '130px', height: '130px', borderRadius: '50%', background: 'var(--bg-dark)', border: '4px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ width: '100%', maxWidth: '600px' }}>
              {isEditing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                   <input type="text" value={editName} onChange={e => setEditName(e.target.value)} placeholder="Full Name" style={{ fontSize: '1.5rem', fontWeight: 'bold' }} />
                   <input type="text" value={editRole} onChange={e => setEditRole(e.target.value)} placeholder="Headline / Role" />
                   <input type="text" value={editLocation} onChange={e => setEditLocation(e.target.value)} placeholder="Location" />
                </div>
              ) : (
                <>
                  <h1 style={{ fontSize: '2rem', margin: 0 }}>{user?.name}</h1>
                  <p className="text-muted" style={{ fontSize: '1.2rem', marginTop: '0.2rem' }}>{user?.role}</p>
                  <p className="text-muted" style={{ marginTop: '0.5rem' }}>{user?.location} • Global Talent Network • {user?.connections} connections</p>
                </>
              )}
            </div>

            <div>
               {isEditing ? (
                 <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn-secondary" onClick={handleCancelEdit}><X size={18} /> Cancel</button>
                    <button className="btn" onClick={handleSaveProfile}><Save size={18} /> Save</button>
                 </div>
               ) : (
                 <button className="btn-secondary" onClick={() => setIsEditing(true)}><Edit3 size={18} /> Edit Profile</button>
               )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', marginTop: '2rem' }}>
        
        {/* Main Details and Resume */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
          
          {/* Skills Card */}
          <div className="glass-panel p-4" style={{ flex: '2 1 400px' }}>
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Award className="text-primary"/> Professional Core Skills</h3>
            
            {isEditing ? (
              <div>
                <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>Enter skills separated by commas</p>
                <textarea rows="3" value={editSkills} onChange={e => setEditSkills(e.target.value)} placeholder="React, Node.js, Python, AWS..."></textarea>
              </div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {user?.skills?.map(skill => (
                  <span key={skill} style={{ padding: '0.5rem 1rem', background: 'var(--bg-card-hover)', borderRadius: '20px', fontSize: '0.9rem', border: '1px solid var(--border-color)', color: 'var(--text-main)', fontWeight: '500' }}>{skill}</span>
                ))}
                {(!user?.skills || user.skills.length === 0) && <p className="text-muted">No tactical skills analyzed yet. Edit profile to update.</p>}
              </div>
            )}
          </div>

          {/* Links Card */}
          <div className="glass-panel p-4" style={{ flex: '1 1 300px' }}>
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Star className="text-accent"/> Professional Links</h3>
            
            {isEditing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <input type="url" value={editGithub} onChange={e => setEditGithub(e.target.value)} placeholder="GitHub Profile URL" />
                <input type="url" value={editPortfolio} onChange={e => setEditPortfolio(e.target.value)} placeholder="Portfolio Website URL" />
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {user?.github && <p><strong>GitHub:</strong> <a href={user.github} target="_blank" rel="noopener noreferrer">{user.github}</a></p>}
                {user?.portfolio && <p><strong>Portfolio:</strong> <a href={user.portfolio} target="_blank" rel="noopener noreferrer">{user.portfolio}</a></p>}
                {(!user?.github && !user?.portfolio) && <p className="text-muted">No links added yet. Edit profile to add.</p>}
              </div>
            )}
          </div>

          {/* Resume Upload Card */}
          <div className="glass-panel p-4" style={{ flex: '1 1 300px' }}>
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FileText className="text-accent"/> Document Vault</h3>
            
            <div className="card-3d" style={{ background: 'var(--bg-dark)', padding: '1.5rem', borderRadius: '12px', border: '1px dashed var(--border-color)', textAlign: 'center' }}>
               {user?.resumeUploaded ? (
                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '60px', height: '60px', background: 'rgba(22, 163, 74, 0.1)', color: 'var(--success)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CheckCircle size={32} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0 }}>Resume_Official.pdf</h4>
                      <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>Verified and Active</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                       <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => showToast("Viewing secure resume document...")}>Preview</button>
                       <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', color: 'var(--danger)' }} onClick={() => { updateUser({ resumeUploaded: false }); showToast("Resume deleted."); }}>Delete</button>
                    </div>
                 </div>
               ) : (
                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <FileText size={40} className="text-muted" />
                    <p className="text-muted" style={{ fontSize: '0.9rem' }}>Upload your resume to allow CBridge algorithms to securely pitch you to companies.</p>
                    <button className="btn" onClick={handleResumeUpload} disabled={isUploading}>
                      {isUploading ? 'Encrypting...' : <><UploadCloud size={18} /> Upload Resume PDF</>}
                    </button>
                 </div>
               )}
            </div>
          </div>
        </div>

        {/* Lower Metrics section */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
          <div className="glass-panel p-4" style={{ flex: '1 1 300px' }}>
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><BookOpen className="text-accent"/> Elite Learning Paths</h3>
            <div className="card-3d" style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
              <h4>Advanced React Patterns</h4>
              <p className="text-muted" style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Recommended based on your last interview. 60% completed.</p>
              <div style={{ height: '6px', width: '100%', background: 'var(--bg-dark)', borderRadius: '3px', marginTop: '1rem' }}>
                <div style={{ height: '100%', width: '60%', background: 'var(--primary)', borderRadius: '3px' }}></div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-4" style={{ flex: '1 1 300px' }}>
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Star className="text-success"/> Interview Status</h3>
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(22, 163, 74, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', color: 'var(--success)' }}>
                <CheckCircle size={40} />
              </div>
              <h2 style={{ marginTop: '1rem' }}>{user?.eligibilityStatus === 'Pending Assessment' ? 'Eligibility Pending' : 'Eligible'}</h2>
              <p className="text-muted" style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                {user?.eligibilityStatus === 'Pending Assessment' ? 'Take an interview with Elite to get certified.' : 'You passed the Elite technical assessment and are verified for hire.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
