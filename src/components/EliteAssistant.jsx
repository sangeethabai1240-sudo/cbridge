import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Key } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const EveRobotSvg = ({ isThinking }) => (
  <svg width="60" height="75" viewBox="0 0 100 120" style={{ filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.3))' }}>
    <defs>
      <linearGradient id="body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </linearGradient>
      <linearGradient id="face-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#020617" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
    </defs>
    
    <ellipse cx="15" cy="65" rx="8" ry="18" fill="url(#body-grad)" className="eve-hand-left" />
    <ellipse cx="50" cy="75" rx="35" ry="40" fill="url(#body-grad)" className="eve-body" />
    <ellipse cx="85" cy="65" rx="8" ry="18" fill="url(#body-grad)" className="eve-hand-right" />

    <g className="eve-head">
      <path d="M 20 40 C 20 10, 80 10, 80 40 C 80 55, 20 55, 20 40" fill="url(#body-grad)" />
      <path d="M 25 35 C 25 20, 75 20, 75 35 C 75 48, 25 48, 25 35" fill="url(#face-grad)" />
      
      <ellipse cx="38" cy="32" rx="8" ry={isThinking ? "3" : "4"} fill="#3b82f6" className={isThinking ? "eve-eyes-squint" : "eve-eyes"} style={{ filter: 'drop-shadow(0 0 5px #3b82f6)' }} />
      <ellipse cx="62" cy="32" rx="8" ry={isThinking ? "3" : "4"} fill="#3b82f6" className={isThinking ? "eve-eyes-squint" : "eve-eyes"} style={{ filter: 'drop-shadow(0 0 5px #3b82f6)' }} />
      
      <ellipse cx="33" cy="41" rx="6" ry="3" fill="#ec4899" className="eve-blush" style={{ filter: 'drop-shadow(0 0 5px #ec4899)' }} />
      <ellipse cx="67" cy="41" rx="6" ry="3" fill="#ec4899" className="eve-blush" style={{ filter: 'drop-shadow(0 0 5px #ec4899)' }} />
    </g>
  </svg>
);

export default function EliteAssistant() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_key') || '');
  
  const [messages, setMessages] = useState([
    { text: "Directive: Serve and Mentor. I am Elite. You can configure my API key in settings, or we can use my built-in mock algorithms to practice.", sender: "elite" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if(scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping, showConfig]);

  const saveKey = () => {
    localStorage.setItem('gemini_key', apiKey);
    setShowConfig(false);
    setMessages(prev => [...prev, { text: "API Key received. Neural link established. I can now access the global network.", sender: "elite" }]);
  };

  const getGeminiResponse = async (userText) => {
    try {
      const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: `You are Elite, an advanced, friendly, slightly robotic AI mentor resembling EVE from WALL-E. The user's name is ${user?.name}. You guide them in their tech career, job applications, and coding interviews.` }] },
          contents: [{ parts: [{ text: userText }] }]
        })
      });
      const data = await resp.json();
      if(data.error) throw new Error(data.error.message);
      return data.candidates[0].content.parts[0].text;
    } catch (e) {
      console.error(e);
      return `Error in neural link: ${e.message}\nReverting to local mock core.`;
    }
  };

  const getMockResponse = (query) => {
    const q = query.toLowerCase();
    if (q.includes("progress")) return `Scanning... ${user?.name}, you have ${user?.skills.length} skills logged and ${user?.connections} connections.`;
    if (q.includes("google")) return "Google: Elite tier company. Focus on dynamic programming and system design before applying.";
    if (q.includes("quiz me")) return "Directive: Quiz. What HTML tag is used to embed javascript? A) <script> B) <js>. Reply A or B.";
    if (q === "a") return "Affirmative. <script> is correct.";
    return "Understood. I lack a live API key for full contextual analysis, but I am processing your input.";
  };

  const handleSend = async () => {
    if(!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { text: userMsg, sender: "user" }]);
    setInput("");
    setIsTyping(true);
    
    let botReply = '';
    if (apiKey && apiKey.length > 20) {
      botReply = await getGeminiResponse(userMsg);
    } else {
      await new Promise(res => setTimeout(res, 1200));
      botReply = getMockResponse(userMsg);
    }

    setIsTyping(false);
    setMessages(prev => [...prev, { text: botReply, sender: "elite" }]);
  };

  return (
    <>
      <button 
        style={{
          position: 'fixed', bottom: '2rem', right: '2rem',
          background: 'transparent', border: 'none', cursor: 'pointer',
          zIndex: 1000, opacity: isOpen ? 0 : 1, transition: 'opacity 0.3s'
        }}
        onClick={() => setIsOpen(true)}
      >
        <EveRobotSvg isThinking={false} />
      </button>

      {isOpen && (
        <div className="glass-panel card-3d" style={{
          position: 'fixed', bottom: '2rem', right: '1rem',
          width: '90%', maxWidth: '350px', height: '540px', maxHeight: '80vh',
          display: 'flex', flexDirection: 'column',
          zIndex: 1000, overflow: 'hidden'
        }}>
          <div style={{ padding: '0.75rem 1rem', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ marginTop: '-15px' }}><EveRobotSvg isThinking={isTyping} /></div>
              <h3 style={{ margin: 0, color: 'var(--text-main)', letterSpacing: '1px' }}>E l i t e</h3>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
               <Key size={18} style={{ cursor: 'pointer', color: apiKey ? 'var(--success)' : 'var(--text-muted)' }} onClick={() => setShowConfig(!showConfig)}/>
               <X size={20} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => setIsOpen(false)}/>
            </div>
          </div>
          
          {showConfig ? (
            <div style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--bg-dark)' }}>
               <h4>Neural Link Configuration</h4>
               <p className="text-muted" style={{ fontSize: '0.85rem' }}>Provide a Gemini API Key to unlock Elite's true intelligence capabilities.</p>
               <input 
                 type="password" 
                 placeholder="Paste API Key here..." 
                 value={apiKey} 
                 onChange={e => setApiKey(e.target.value)} 
               />
               <button className="btn" onClick={saveKey}>Save Configuration</button>
               <button className="btn-secondary" onClick={() => setShowConfig(false)}>Cancel</button>
            </div>
          ) : (
            <>
              <div ref={scrollRef} style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {messages.map((msg, idx) => (
                  <div key={idx} style={{
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    background: msg.sender === 'user' ? 'var(--primary)' : 'var(--bg-card)',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: msg.sender === 'elite' ? '1px solid var(--border-color)' : 'none',
                    maxWidth: '85%',
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {msg.text}
                  </div>
                ))}
                {isTyping && (
                  <div style={{ alignSelf: 'flex-start', background: 'var(--bg-card)', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <span className="typing-dot"></span>
                    <span className="typing-dot" style={{ margin: '0 4px' }}></span>
                    <span className="typing-dot"></span>
                  </div>
                )}
              </div>

              <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem', background: 'var(--bg-card)' }}>
                <input 
                  type="text" 
                  placeholder="Query Elite..." 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  style={{ background: 'var(--bg-dark)' }}
                  disabled={isTyping}
                />
                <button className="btn" style={{ padding: '0.5rem 1rem' }} onClick={handleSend} disabled={isTyping}>
                  <Send size={18} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
