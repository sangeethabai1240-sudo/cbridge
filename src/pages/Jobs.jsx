import React, { useState } from 'react';
import { Search, MapPin, DollarSign, Building, CheckCircle, FileText, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Helper function to generate 50 mock jobs
const generateJobs = () => {
  const titles = ["React Developer", "Senior UI Engineer", "AI Researcher", "Full Stack Dev", "Backend Engineer", "Data Scientist", "Product Manager", "DevOps Engineer", "Frontend Lead", "Security Analyst"];
  const companies = ["Google", "Meta", "TechNova", "Stripe", "Netflix", "Amazon", "Apple", "OpenAI", "Spotify", "Microsoft"];
  const locations = ["Remote", "San Francisco, CA", "New York, NY", "London, UK", "Austin, TX"];
  
  const jobs = [];
  for(let i=0; i<50; i++) {
    jobs.push({
      id: i,
      title: titles[Math.floor(Math.random() * titles.length)],
      company: companies[Math.floor(Math.random() * companies.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      salary: `$${100 + Math.floor(Math.random()*80)}k - $${180 + Math.floor(Math.random()*60)}k`,
      match: `${75 + Math.floor(Math.random()*24)}%`
    });
  }
  return jobs;
};

const ALL_JOBS = generateJobs();

export default function Jobs() {
  const { applyForJob } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [applyingState, setApplyingState] = useState({});

  const handleApply = (job) => {
    setApplyingState({ ...applyingState, [job.id]: 'attaching' });
    
    setTimeout(() => {
      setApplyingState(prev => ({ ...prev, [job.id]: 'sending' }));
      setTimeout(() => {
         // Apply updates global context
        applyForJob(job);
        setApplyingState(prev => ({ ...prev, [job.id]: 'applied' }));
      }, 1500);
    }, 1500);
  };

  const filteredJobs = ALL_JOBS.filter(j => 
    j.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    j.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="content-container flex flex-col gap-4">
      <div className="glass-panel p-4 flex gap-4" style={{ alignItems: 'center', display: 'flex' }}>
        <Search className="text-muted" />
        <input 
          type="text" 
          placeholder="Search 50+ jobs by title, skill, or company" 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ border: 'none', background: 'transparent', flex: 1, padding: 0, boxShadow: 'none' }} 
        />
      </div>

      <h3 style={{ marginTop: '1rem' }}>Top Matches for You (Based on Elite Assessment)</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {filteredJobs.map((job) => (
          <div key={job.id} className="glass-panel card-3d p-6" style={{padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '8px', background: 'var(--bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}>
                <Building size={24} className="text-primary" />
              </div>
              <div style={{ padding: '0.25rem 0.75rem', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--success)', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.8rem' }}>
                {job.match} Match
              </div>
            </div>
            
            <div>
              <h3 style={{ margin: 0 }}>{job.title}</h3>
              <p className="text-muted" style={{ marginTop: '0.2rem' }}>{job.company}</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={16} /> {job.location}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><DollarSign size={16} /> {job.salary}</div>
            </div>
            
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
               {applyingState[job.id] === 'attaching' && <div className="text-accent" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FileText size={14}/> Attaching Elite Resume...</div>}
               {applyingState[job.id] === 'sending' && <div className="text-primary" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Send size={14}/> Sending to {job.company}...</div>}
               
               <button 
                  className="btn" 
                  style={{ width: '100%', background: applyingState[job.id] === 'applied' ? '' : '' }} 
                  onClick={() => handleApply(job)}
                  disabled={!!applyingState[job.id]}
               >
                 {applyingState[job.id] === 'applied' ? <><CheckCircle size={18}/> Applied</> : 'Easy Apply'}
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
