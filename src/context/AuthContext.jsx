import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  // Track applied jobs
  const [appliedJobs, setAppliedJobs] = useState([]);
  
  // Track toasts
  const [toastMessage, setToastMessage] = useState(null);

  const login = (id, password) => {
    if (id && password) {
      setUser({ 
        id, 
        name: id.split('@')[0], 
        role: "Software Engineer", 
        skills: ["React", "AI", "JavaScript", "Python"],
        location: "San Francisco, CA",
        github: "",
        portfolio: "",
        eligibilityStatus: "Pending Assessment",
        connections: 142
      });
      return true;
    }
    return false;
  };

  const signup = (id, name, password) => {
    setUser({ 
      id, 
      name, 
      role: "New User", 
      skills: [],
      location: "",
      github: "",
      portfolio: "",
      eligibilityStatus: "Pending Assessment",
      connections: 0
    });
    return true;
  };

  const logout = () => setUser(null);

  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const applyForJob = (job) => {
    setAppliedJobs(prev => [{
      ...job, 
      status: "Application Sent", 
      date: "Just now" 
    }, ...prev]);
  };

  // Eligibility Modifier
  const setEligible = () => {
    setUser(prev => ({...prev, eligibilityStatus: "Certified Eligible 🌟"}));
  };

  // Global Toast function
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser, appliedJobs, applyForJob, setEligible, showToast, toastMessage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
