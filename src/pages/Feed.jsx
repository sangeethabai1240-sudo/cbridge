import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Send, ThumbsUp, MessageSquare, Share2, Award, PlusCircle, MoreHorizontal, Search } from 'lucide-react';

export default function Feed() {
  const { user, showToast } = useAuth();
  const [postText, setPostText] = useState('');
  
  const [posts, setPosts] = useState([
    { 
      id: 1, 
      author: "David Chen", 
      role: "AI Researcher at OpenAI (Stranger)", 
      content: "Just finished hooking up the latest transformers model to our new API infrastructure. The latency drops are absolutely INSANE! Check out the architecture diagram below. 👇", 
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      likes: 1240, hasLiked: false, time: "2h ago", avatar: "D"
    },
    { 
      id: 2, 
      author: "Sarah Jenkins", 
      role: "Frontend Engineer (Friend)", 
      content: "Finally perfected the dark mode glassmorphism UI for my new portfolio site. Vanilla CSS is highly underrated! 🎨✨", 
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      likes: 85, hasLiked: true, time: "5h ago", avatar: "S"
    },
    { 
      id: 3, 
      author: "Alex Rivera", 
      role: "Cybersecurity Analyst (Stranger)", 
      content: "Spent the weekend patching kernel vulnerabilities. Reminder: NEVER ignore your dependency warnings! Here's a snippet of the attack vector we stopped.", 
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      likes: 412, hasLiked: false, time: "1d ago", avatar: "A"
    }
  ]);

  const handlePost = () => {
    if(!postText.trim()) return;
    setPosts([{ 
      id: Date.now(), author: user.name, role: user.role, content: postText, 
      likes: 0, hasLiked: false, time: "Just now", avatar: user.name.charAt(0).toUpperCase() 
    }, ...posts]);
    setPostText('');
  };

  const handleLike = (id) => {
    setPosts(posts.map(p => {
      if(p.id === id) {
        return { ...p, likes: p.hasLiked ? p.likes - 1 : p.likes + 1, hasLiked: !p.hasLiked };
      }
      return p;
    }));
  };

  return (
    <div className="content-container grid-feed">
      
      {/* 1. Left Sidebar - Profile Dashboard */}
      <div className="glass-panel card-3d hide-mobile" style={{ height: 'fit-content', position: 'sticky', top: '100px' }}>
        <div style={{ background: 'var(--bg-card-hover)', height: '80px', borderRadius: '12px 12px 0 0' }}></div>
        <div style={{ padding: '0 1rem 1rem 1rem', textAlign: 'center', marginTop: '-40px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary)', color: 'white', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', border: '4px solid var(--bg-card)', fontWeight: 'bold' }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h3 style={{ marginTop: '0.5rem' }}>{user.name}</h3>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>{user.role}</p>
          
          <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
            <span className="text-muted">Connections</span>
            <span className="text-primary" style={{ fontWeight: 'bold' }}>{user.connections}</span>
          </div>
          
          <button className="btn" onClick={() => showToast("Project draft opened!")} style={{ width: '100%', marginTop: '1.5rem' }}><PlusCircle size={18}/> Post Project</button>
        </div>
      </div>

      {/* 2. Main Instagram Style Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Create Post */}
        <div className="glass-panel p-4" style={{ borderRadius: '16px' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'var(--primary)', color: 'white', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <textarea 
                placeholder="Share your code, projects, or thoughts..." 
                rows="2"
                value={postText}
                onChange={e => setPostText(e.target.value)}
                style={{ background: 'var(--bg-card)', border: 'none' }}
              ></textarea>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                <button onClick={() => showToast("Reward features coming soon!")} className="btn-secondary" style={{ padding: '0.5rem', borderRadius: '8px', cursor: 'pointer', border: 'none', color: 'var(--accent)', background: 'transparent' }}><Award size={20} /></button>
                <button className="btn" onClick={handlePost} style={{ padding: '0.5rem 1.5rem', borderRadius: '20px' }}>Post <Send size={16} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Global Network Feed Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <hr style={{ flex: 1, borderColor: 'var(--border-color)' }} />
          <span className="text-muted" style={{ fontSize: '0.9rem', letterSpacing: '2px' }}>GLOBAL EXPLORE</span>
          <hr style={{ flex: 1, borderColor: 'var(--border-color)' }} />
        </div>

        {/* Posts */}
        {posts.map(post => (
          <div key={post.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', borderRadius: '16px', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-card)' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                 <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
                  {post.avatar}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem' }}>{post.author}</h4>
                  <p className="text-muted" style={{ fontSize: '0.8rem' }}>{post.role} • {post.time}</p>
                </div>
              </div>
              <MoreHorizontal size={20} className="text-muted" onClick={() => showToast("Options menu triggered")} style={{ cursor: 'pointer' }}/>
            </div>
            
            {/* Context */}
            <div style={{ padding: '1rem 1.5rem' }}>
              <p style={{ lineHeight: '1.5', fontSize: '0.95rem' }}>{post.content}</p>
            </div>

            {/* Rich Media / Code Image */}
            {post.image && (
              <img src={post.image} alt="Code Snippet" className="feed-image" style={{ marginTop: 0, borderRadius: 0, borderLeft: 'none', borderRight: 'none' }} />
            )}

            {/* Interaction Bar */}
            <div style={{ padding: '1rem 1.5rem', display: 'flex', background: 'var(--bg-card-hover)', gap: '1.5rem' }}>
              <button 
                onClick={() => handleLike(post.id)}
                style={{ background: 'transparent', border: 'none', color: post.hasLiked ? 'var(--primary)' : 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s', fontWeight: post.hasLiked ? 'bold' : 'normal' }} 
              >
                <ThumbsUp size={20} fill={post.hasLiked ? "var(--primary)" : "none"} /> {post.likes}
              </button>
              <button onClick={() => showToast("Opening comment thread...")} style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MessageSquare size={20} /> <span className="hide-mobile">Comment</span>
              </button>
              <button onClick={() => showToast("Link successfully copied to clipboard!")} style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
                <Share2 size={20} /> <span className="hide-mobile">Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Right Sidebar - Suggested Companies & Find Devs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="hide-mobile">
        
        <div className="glass-panel p-4 card-3d">
          <h4 style={{ marginBottom: '1rem' }}>Suggested Companies</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
               <div style={{ width: '40px', height: '40px', background: 'var(--bg-card-hover)', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>G</div>
               <div style={{ flex: 1 }}><h5 style={{ margin: 0 }}>Google</h5><span style={{ fontSize: '0.75rem' }} className="text-muted">Hiring 50+ Roles</span></div>
               <button onClick={() => showToast("You are now following Google!")} className="btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}>Follow</button>
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
               <div style={{ width: '40px', height: '40px', background: 'var(--bg-card-hover)', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>S</div>
               <div style={{ flex: 1 }}><h5 style={{ margin: 0 }}>Stripe</h5><span style={{ fontSize: '0.75rem' }} className="text-muted">Hiring 12+ Roles</span></div>
               <button onClick={() => showToast("You are now following Stripe!")} className="btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}>Follow</button>
             </div>
          </div>
        </div>

        <div className="glass-panel p-4 card-3d">
          <h4 style={{ marginBottom: '1rem' }}>Find Developers</h4>
          <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>Search for friends or discover top talent worldwide.</p>
          <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-card)', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <Search size={16} className="text-muted" style={{ margin: '0 0.5rem' }} />
            <input type="text" placeholder="e.g. React Engineers" style={{ border: 'none', background: 'transparent', padding: 0 }} />
          </div>
        </div>

      </div>

    </div>
  );
}
