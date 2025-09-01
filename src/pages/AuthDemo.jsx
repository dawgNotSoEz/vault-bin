import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Shield, Mail, Lock, User, ArrowRight, GitHub, Google } from 'lucide-react'
import { Box } from '../components/Box'
import { cn } from '../lib/utils'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

function AuthDemo() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    agreeToTerms: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const auth = useAuth()

  // Demo accounts for quick login
  const demoAccounts = [
    { email: 'demo@vaultbin.com', password: 'demo123', role: 'Demo User' },
    { email: 'admin@vaultbin.com', password: 'admin123', role: 'Admin' },
    { email: 'dev@vaultbin.com', password: 'dev123', role: 'Developer' }
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Demo login simulation
    if (isLogin) {
      // Check if credentials match demo accounts
      const demoAccount = demoAccounts.find(
        acc => acc.email === formData.email && acc.password === formData.password
      )
      
      if (demoAccount || formData.email === 'user@demo.com') {
        const userObj = {
          email: formData.email,
          role: demoAccount?.role || 'User',
          name: formData.email.split('@')[0]
        }
        auth.login(userObj)
        navigate('/')
      } else {
        alert('Invalid credentials. Try demo@vaultbin.com / demo123')
      }
    } else {
      // Simulate signup
      const newUser = {
        email: formData.email,
        role: 'User',
        name: formData.username || formData.email.split('@')[0]
      }
      auth.login(newUser)
      navigate('/')
    }
    
    setIsLoading(false)
  }

  const handleDemoLogin = (account) => {
    setFormData({
      ...formData,
      email: account.email,
      password: account.password
    })
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const formVariants = {
    hidden: { opacity: 0, x: isLogin ? -20 : 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }

  return (
    <div className="min-h-screen bg-orbit flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Side - Branding & Features */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                VaultBin
              </h1>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Secure Paste
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                Sharing
              </span>
            </h2>
            
            <p className="text-white/70 text-lg mb-8 max-w-md mx-auto lg:mx-0">
              Share code, notes, and documents securely with end-to-end encryption, 
              real-time collaboration, and enterprise-grade privacy.
            </p>

            {/* Features */}
            <div className="space-y-4 max-w-md mx-auto lg:mx-0">
              {[
                { icon: Shield, text: "End-to-end encryption" },
                { icon: User, text: "Real-time collaboration" },
                { icon: Lock, text: "Private & secure sharing" }
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-white/80">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-4 h-4" />
                  </div>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Demo Accounts */}
          <Box className="max-w-md mx-auto lg:mx-0">
            <Box.Header>
              <h3 className="text-lg font-semibold text-white">Quick Demo Access</h3>
              <p className="text-white/60 text-sm">Try with these demo accounts</p>
            </Box.Header>
            <Box.Body className="space-y-3">
              {demoAccounts.map((account, index) => (
                <button
                  key={index}
                  onClick={() => handleDemoLogin(account)}
                  className="w-full p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all duration-200 text-left"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">{account.email}</div>
                      <div className="text-white/60 text-sm">{account.role}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/40" />
                  </div>
                </button>
              ))}
            </Box.Body>
          </Box>
        </div>

        {/* Right Side - Auth Form */}
        <div className="flex items-center justify-center">
          <motion.div 
            className="w-full max-w-md"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            key={isLogin ? 'login' : 'signup'}
          >
            <Box>
              <Box.Header>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                  </h2>
                  <p className="text-white/60">
                    {isLogin 
                      ? 'Sign in to access your secure pastes' 
                      : 'Join thousands of developers using VaultBin'
                    }
                  </p>
                </div>
              </Box.Header>

              <Box.Body>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Social Login */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all duration-200 text-white"
                    >
                      <GitHub className="w-4 h-4" />
                      <span className="text-sm">GitHub</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all duration-200 text-white"
                    >
                      <Google className="w-4 h-4" />
                      <span className="text-sm">Google</span>
                    </button>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-3 bg-gray-900 text-white/60">or continue with email</span>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    {!isLogin && (
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Username
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                          <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-transparent"
                            placeholder="Enter your username"
                            required={!isLogin}
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-transparent"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-transparent"
                          placeholder="Enter your password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                  </div>

                  {!isLogin && (
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-transparent"
                            placeholder="Confirm your password"
                            required={!isLogin}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Remember Me / Forgot Password */}
                  <div className="flex items-center justify-between">
                    {isLogin ? (
                      <>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-white/20 bg-white/5 text-violet-500 focus:ring-violet-400/50"
                          />
                          <span className="ml-2 text-sm text-white/60">Remember me</span>
                        </label>
                        <button
                          type="button"
                          className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
                        >
                          Forgot password?
                        </button>
                      </>
                    ) : (
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleInputChange}
                          className="rounded border-white/20 bg-white/5 text-violet-500 focus:ring-violet-400/50 mt-0.5"
                          required
                        />
                        <span className="ml-2 text-sm text-white/60">
                          I agree to the{' '}
                          <button type="button" className="text-violet-400 hover:text-violet-300 transition-colors">
                            Terms of Service
                          </button>{' '}
                          and{' '}
                          <button type="button" className="text-violet-400 hover:text-violet-300 transition-colors">
                            Privacy Policy
                          </button>
                        </span>
                      </label>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading || (!isLogin && !formData.agreeToTerms)}
                    className={cn(
                      "w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2",
                      "bg-gradient-to-r from-violet-500 to-purple-600 text-white",
                      "hover:from-violet-400 hover:to-purple-500 hover:shadow-lg hover:shadow-violet-500/25",
                      "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none",
                      isLoading && "cursor-wait"
                    )}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        {isLogin ? 'Signing In...' : 'Creating Account...'}
                      </>
                    ) : (
                      <>
                        {isLogin ? 'Sign In' : 'Create Account'}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </Box.Body>

              <Box.Footer className="text-center">
                <p className="text-white/60">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-violet-400 hover:text-violet-300 transition-colors font-medium"
                  >
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </Box.Footer>
            </Box>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default AuthDemo
