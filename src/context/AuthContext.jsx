import React, { createContext, useContext, useState, useEffect } from 'react';
import { demoUsers } from '../lib/demoData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored authentication
    const storedUser = localStorage.getItem('vaultbin_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('vaultbin_user');
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email, password) => {
    // TODO: connect backend here
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, use a demo user or create a new one
    let demoUser = demoUsers.find(user => user.email === email) || {
      id: `user-${Date.now()}`,
      name: email.split('@')[0] || 'Demo User',
      username: email.split('@')[0] || 'demouser',
      email: email,
      avatarUrl: `https://api.dicebear.com/7.x/notionists/svg?seed=${email}`,
      plan: 'free',
      theme: 'dark',
      signedIn: true,
      isOnline: true,
      lastSeen: new Date(),
      role: 'user',
      joinedAt: new Date(),
    };

    setUser(demoUser);
    setIsAuthenticated(true);
    localStorage.setItem('vaultbin_user', JSON.stringify(demoUser));
    
    return { success: true, user: demoUser };
  };

  const signUp = async (email, password, name) => {
    // TODO: connect backend here
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create new demo user
    const newUser = {
      id: `user-${Date.now()}`,
      name: name || email.split('@')[0] || 'Demo User',
      username: email.split('@')[0] || 'demouser',
      email: email,
      avatarUrl: `https://api.dicebear.com/7.x/notionists/svg?seed=${email}`,
      plan: 'free',
      theme: 'dark',
      signedIn: true,
      isOnline: true,
      lastSeen: new Date(),
      role: 'user',
      joinedAt: new Date(),
    };

    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('vaultbin_user', JSON.stringify(newUser));
    
    return { success: true, user: newUser };
  };

  const signOut = async () => {
    // TODO: connect backend here
    
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('vaultbin_user');
    
    return { success: true };
  };

  const updateProfile = async (updates) => {
    // TODO: connect backend here
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('vaultbin_user', JSON.stringify(updatedUser));
    
    return { success: true, user: updatedUser };
  };

  // Legacy support for existing code
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('vaultbin_user', JSON.stringify(userData));
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    login, // Legacy support
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
