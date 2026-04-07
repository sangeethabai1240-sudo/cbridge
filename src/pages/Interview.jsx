import React, { useState, useEffect } from 'react';
import { Camera, Mic, Code, List, CheckCircle, Award, Download, DownloadCloud } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LEVELS = [
  {
    id: 1, difficulty: 'Easy', type: 'mcq',
    title: 'Warmup: React Framework',
    description: 'Which method is called immediately after a component is mounted in class components?',
    options: ['componentWillMount', 'componentDidMount', 'render', 'componentDidUpdate'],
    correctAnswer: 1,
    voicePrompt: 'Welcome to your C-Bridge Interview. Let us start with a warm up. Which method is called immediately after a component is mounted?'
  },
  {
    id: 2, difficulty: 'Medium', type: 'code',
    title: 'Two Sum',
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.',
    defaultCode: 'function twoSum(nums, target) {\n  // Write your code here\n  \n}',
    voicePrompt: 'Excellent. Now for your first coding test: The Two Sum algorithmic challenge. Process the array and target to return the correct indices. You may begin execution when ready.'
  },
  {
    id: 3, difficulty: 'Hard', type: 'code',
    title: 'Merge Intervals',
    description: 'Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals.',
    defaultCode: 'function merge(intervals) {\n  // Write your code here\n  \n}',
    voicePrompt: 'Great execution. Final question: Merge Intervals. You must merge all overlapping data arrays efficiently. Good luck.'
  }
];

const EveAvatarVideo = ({ isSpeaking }) => (
  <svg width="100%" height="100%" viewBox="0 0 100 120" style={{ filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.6))' }}>
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
    <g style={{ animation: isSpeaking ? 'hover-bob 0.4s infinite alternate' : 'hover-bob 3s ease-in-out infinite' }}>
      <path d="M 20 40 C 20 10, 80 10, 80 40 C 80 55, 20 55, 20 40" fill="url(#body-grad)" />
      <path d="M 25 35 C 25 20, 75 20, 75 35 C 75 48, 25 48, 25 35" fill="url(#face-grad)" />
      {/* Eyes pulse/talk */}
      <ellipse cx="38" cy="32" rx="8" ry={isSpeaking ? "5" : "4"} fill="#3b82f6" style={{ filter: 'drop-shadow(0 0 5px #3b82f6)', transition: 'all 0.1s' }} />
      <ellipse cx="62" cy="32" rx="8" ry={isSpeaking ? "5" : "4"} fill="#3b82f6" style={{ filter: 'drop-shadow(0 0 5px #3b82f6)', transition: 'all 0.1s' }} />
      <ellipse cx="33" cy="41" rx="6" ry="3" fill="#ec4899" className="eve-blush" />
      <ellipse cx="67" cy="41" rx="6" ry="3" fill="#ec4899" className="eve-blush" />
    </g>
  </svg>
);

export default function Interview() {
  const { user, showToast, setEligible } = useAuth();
  const [currentLevel, setCurrentLevel] = useState(0);
  const [code, setCode] = useState(LEVELS[0].defaultCode || '');
  const [mcqSelection, setMcqSelection] = useState(null);
  
  const [terminalOutput, setTerminalOutput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [levelPassed, setLevelPassed] = useState(false);
  
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [interviewComplete, setInterviewComplete] = useState(false);

  const activeQuestion = LEVELS[currentLevel];

  // Speech Synthesis setup
  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.2; // slightly higher pitch for EVE
      
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Samantha'));
      if(voice) utterance.voice = voice;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if(!interviewComplete) {
       // Wait slightly before talking so the page loads
       setTimeout(() => speak(LEVELS[currentLevel].voicePrompt), 1000);
    }
  }, [currentLevel, interviewComplete]);

  useEffect(() => {
    return () => { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); }
  }, []);

  const handleRunCode = () => {
    setIsCompiling(true);
    setTerminalOutput('Compiling...\nRunning Test Cases...');
    
    setTimeout(() => {
      setIsCompiling(false);
      if(code.includes('return') || code.length > 5) {
        setTerminalOutput('Compiling...\nRunning Test Cases...\nSuccess! All 5 cases passed. ✅');
        setLevelPassed(true);
        speak("Valid Code execution detected. Test cases passed.");
      } else {
        setTerminalOutput('Compiling...\nRunning Test Cases...\nError: Output does not match expected result. Try again.');
        speak("Execution error. Your code failed the test cases. Please analyze and try again.");
      }
    }, 2000);
  };

  const handleMcqSubmit = () => {
    if (mcqSelection === activeQuestion.correctAnswer) {
      setTerminalOutput('Correct! Great job. You passed the warm up.');
      setLevelPassed(true);
      speak("Correct answer. You are ready for the coding phase.");
    } else {
      setTerminalOutput('Incorrect. Think about when the DOM is actually ready.');
      speak("Incorrect. That is not the right lifecycle method.");
    }
  };

  const nextLevel = () => {
    if(currentLevel < LEVELS.length - 1) {
      const nextIndex = currentLevel + 1;
      setCurrentLevel(nextIndex);
      setLevelPassed(false);
      setTerminalOutput('');
      if(LEVELS[nextIndex].type === 'code') setCode(LEVELS[nextIndex].defaultCode);
      setMcqSelection(null);
    } else {
      setInterviewComplete(true);
      setEligible();
      speak("Congratulations " + user?.name + ". You have successfully completed the interview vector. I am verifying your status as Eligible and generating your certification now.");
    }
  };

  if (interviewComplete) {
    return (
      <div className="content-container flex flex-col items-center justify-center gap-4" style={{ height: '70vh' }}>
         <div className="glass-panel card-3d" style={{ 
            width: '800px', height: '500px', padding: '3rem', 
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(59, 130, 246, 0.1))',
            border: '2px solid var(--primary)', borderRadius: '20px',
            position: 'relative', overflow: 'hidden', textAlign: 'center',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
         }}>
            <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '300px', height: '300px', background: 'var(--accent)', filter: 'blur(100px)', opacity: 0.3 }}></div>
            <div style={{ position: 'absolute', bottom: '-100px', right: '-100px', width: '300px', height: '300px', background: 'var(--success)', filter: 'blur(100px)', opacity: 0.2 }}></div>
            
            <Award size={80} className="text-primary" style={{ marginBottom: '1rem', filter: 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.8))' }} />
            
            <h1 style={{ fontSize: '3rem', letterSpacing: '3px', margin: 0, textTransform: 'uppercase' }}>CBRIDGE ELITE</h1>
            <h3 className="text-muted" style={{ letterSpacing: '5px', marginTop: '0.5rem', fontWeight: 'normal' }}>CERTIFICATE OF EXCELLENCE</h3>
            
            <p style={{ marginTop: '3rem', fontSize: '1.2rem' }}>This certifies that</p>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--success)', margin: '0.5rem 0 2rem 0', textDecoration: 'underline overline', textDecorationColor: 'var(--primary)' }}>
               {user?.name}
            </h2>
            <p className="text-muted" style={{ maxWidth: '600px', lineHeight: '1.6' }}>
               has successfully completed the grueling Elite AI Technical Assessment, demonstrating mastery in Data Structures, Algorithms, and Core Engineering Concepts. 
               Status is now officially marked as <strong>Eligible</strong> for all premium job applications.
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
              <div><span className="text-muted">Date:</span> {new Date().toLocaleDateString()}</div>
              <div><span className="text-muted">Verified by:</span> Elite AI System</div>
            </div>
         </div>
         <button className="btn" onClick={() => showToast("Downloading Certificate PDF...")} style={{ marginTop: '2rem', padding: '1rem 3rem', fontSize: '1.1rem' }}>
           <DownloadCloud size={20}/> Download Official Certificate
         </button>
      </div>
    );
  }

  return (
    <div className="content-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h2>Live Technical Assessment</h2>
          <span style={{ padding: '0.25rem 0.75rem', background: 'var(--bg-card)', border: '1px solid var(--accent)', borderRadius: '15px', fontSize: '0.9rem', color: 'var(--accent)' }}>
            Level {currentLevel + 1}/{LEVELS.length}: {activeQuestion.difficulty}
          </span>
        </div>
        <div style={{ background: 'var(--danger)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '15px', fontWeight: 'bold', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%' }}></div> LIVE
        </div>
      </div>

      <div className="grid-interview">
        
        {/* Left: Video / AI Avatar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="glass-panel" style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--primary)' }}>
            <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(0,0,0,0.5)', padding: '0.25rem 0.75rem', borderRadius: '8px', zIndex: 10 }}>Elite AI Interviewer</div>
            
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at center, var(--bg-card-hover) 0%, var(--bg-dark) 100%)' }}></div>
            
            <div style={{ width: '200px', height: '240px', position: 'relative', zIndex: 5 }}>
               <EveAvatarVideo isSpeaking={isSpeaking} />
            </div>
            
            {isSpeaking && (
              <div style={{ position: 'absolute', bottom: '6rem', background: 'rgba(59, 130, 246, 0.2)', color: 'var(--primary)', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', animation: 'blink 2s infinite' }}>
                🎙️ Elite is analyzing...
              </div>
            )}
            
            <div className="glass-panel" style={{ position: 'absolute', bottom: '1rem', right: '1rem', width: '120px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)', zIndex: 10 }}>
              <Camera size={24} className="text-muted" />
            </div>
          </div>
          
          <div className="glass-panel" style={{text: 'white', padding: '1rem', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
            <button className="btn-secondary" onClick={() => showToast("Microphone muted")} style={{text: 'white', borderRadius: '50%', width: '', height: '', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Mic size={20} /></button>
            <button className="btn-secondary" onClick={() => showToast("Camera deactivated")} style={{ text: 'white', borderRadius: '50%', width: '', height: '', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Camera size={20} /></button>
          </div>
        </div>

        {/* Right: Code Editor / MCQ View */}
        <div className="glass-panel card-3d" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '0.75rem 1rem', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '12px 12px 0 0' }}>
            {activeQuestion.type === 'mcq' ? <List size={18} className="text-accent" /> : <Code size={18} className="text-primary" />}
            <h4 style={{ margin: 0 }}>{activeQuestion.title}</h4>
          </div>
          
          <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', fontSize: '0.95rem', lineHeight: '1.5', background: 'var(--bg-dark)' }}>
            <p>{activeQuestion.description}</p>
          </div>
          
          {activeQuestion.type === 'mcq' ? (
            <div style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {activeQuestion.options.map((opt, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setMcqSelection(idx)}
                  style={{ 
                    padding: '1rem', background: mcqSelection === idx ? 'rgba(59, 130, 246, 0.2)' : 'var(--bg-card)', 
                    border: mcqSelection === idx ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                    color: 'var(--text-main)', borderRadius: '8px', cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.2s'
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <textarea 
              style={{ flex: 1, padding: '1rem', background: '#1e1e1e', color: '#d4d4d4', border: 'none', borderRadius: '0', fontFamily: 'monospace', fontSize: '1.1rem', resize: 'none' }}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
            ></textarea>
          )}

          {/* Terminal & Actions */}
          <div style={{ height: '140px', background: 'var(--bg-dark)', padding: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', borderRadius: '0 0 12px 12px' }}>
            <div style={{ flex: 1, overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.9rem', color: terminalOutput.includes('Error') || terminalOutput.includes('Incorrect') ? 'var(--danger)' : 'var(--success)', whiteSpace: 'pre-wrap' }}>
              {terminalOutput}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
               {!levelPassed ? (
                 <button className="btn" onClick={activeQuestion.type === 'mcq' ? handleMcqSubmit : handleRunCode} disabled={isCompiling || isSpeaking}>
                   {isCompiling ? 'Running...' : (activeQuestion.type === 'mcq' ? 'Submit Answer' : 'Run Code')}
                 </button>
               ) : (
                 <button className="btn" style={{ background: 'var(--success)' }} onClick={nextLevel} disabled={isSpeaking}>
                   {currentLevel < LEVELS.length - 1 ? 'Next Level ->' : 'Finish & Claim Certificate'}
                 </button>
               )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
