import React, { useState } from 'react';
import { X, Eye, EyeOff, Lock, Mail, User, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

const AuthModal = ({ mode, onClose, onSwitchMode }) => {
  const { signIn, signUp } = useAuth();
  const { success, error } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const isSignUp = mode === 'signup';

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    const levels = ['Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['text-red-500', 'text-yellow-500', 'text-blue-500', 'text-green-500'];
    
    return { level: levels[score] || 'Weak', color: colors[score] || 'text-red-500', score };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validation
      if (!validateEmail(formData.email)) {
        error('Please enter a valid email address');
        return;
      }

      if (!validatePassword(formData.password)) {
        error('Password must be at least 6 characters long');
        return;
      }

      if (isSignUp) {
        if (!formData.name.trim()) {
          error('Please enter your name');
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          error('Passwords do not match');
          return;
        }

        const result = await signUp(formData.email, formData.password, formData.name);
        if (result.success) {
          success('Account created successfully! Welcome to VaultBin.');
          onClose();
        }
      } else {
        const result = await signIn(formData.email, formData.password);
        if (result.success) {
          success('Welcome back to VaultBin!');
          onClose();
        }
      }
    } catch (err) {
      error(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-700">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              {isSignUp ? 'Join VaultBin to start sharing code' : 'Sign in to your VaultBin account'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors p-2 hover:bg-zinc-800 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                <User size={16} className="inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded-lg text-white placeholder-zinc-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              <Mail size={16} className="inline mr-2" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded-lg text-white placeholder-zinc-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              <Lock size={16} className="inline mr-2" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 pr-10 bg-zinc-800 border border-zinc-600 rounded-lg text-white placeholder-zinc-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            
            {isSignUp && formData.password && (
              <div className="mt-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">Password strength:</span>
                  <span className={`font-medium ${passwordStrength.color}`}>
                    {passwordStrength.level}
                  </span>
                </div>
                <div className="w-full bg-zinc-700 rounded-full h-1.5 mt-1">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      passwordStrength.score === 0 ? 'bg-red-500 w-1/4' :
                      passwordStrength.score === 1 ? 'bg-yellow-500 w-2/4' :
                      passwordStrength.score === 2 ? 'bg-blue-500 w-3/4' :
                      'bg-green-500 w-full'
                    }`}
                  />
                </div>
              </div>
            )}
          </div>

          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                <Lock size={16} className="inline mr-2" />
                Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded-lg text-white placeholder-zinc-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                placeholder="Confirm your password"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-brand-600 hover:bg-brand-700 disabled:bg-brand-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-zinc-700 text-center">
          <p className="text-sm text-zinc-400">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => onSwitchMode(isSignUp ? 'signin' : 'signup')}
              className="text-brand-400 hover:text-brand-300 font-medium transition-colors"
            >
              {isSignUp ? 'Sign In' : 'Create Account'}
            </button>
          </p>
          
          {!isSignUp && (
            <p className="text-xs text-zinc-500 mt-2">
              For demo purposes, any email/password combination will work
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;