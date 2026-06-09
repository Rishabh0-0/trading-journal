import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CircleDollarSign } from 'lucide-react';
import useAppStore from '../store/useAppStore';

export default function LoginPage() {
  const { login } = useAppStore();
  
  // Initialize state based on current URL path
  const [isLogin, setIsLogin] = useState(() => window.location.pathname !== '/register');

  // Form states
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Sync state if back button is pressed
  useEffect(() => {
    const handlePopState = () => {
      setIsLogin(window.location.pathname !== '/register');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const toggleMode = () => {
    const newIsLogin = !isLogin;
    setIsLogin(newIsLogin);
    setError(null);
    setSuccess(false);
    
    // Update URL smoothly without full reload
    window.history.pushState({}, '', newIsLogin ? '/login' : '/register');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (identifier && password) {
      setIsLoading(true);
      try {
        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
        const response = await fetch(`http://localhost:8080${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: identifier, // generic field mapped to email or username
            password: password,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || (isLogin ? 'Invalid credentials' : 'Registration failed'));
        }

        if (isLogin) {
          const data = await response.json();
          login(data.token);
        } else {
          setSuccess(true);
          setTimeout(() => {
            setIsLogin(true);
            setSuccess(false);
            window.history.pushState({}, '', '/login');
          }, 1500);
        }
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-primary bg-grid-pattern p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-[400px] rounded-3xl border border-border-default bg-bg-secondary p-8 shadow-xl shadow-black/5 overflow-hidden relative"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-blue/10 text-accent-blue glow-blue">
            <CircleDollarSign size={36} strokeWidth={2.5} />
          </div>
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-text-primary">
            Trade<span className="text-gradient">Vault</span>
          </h1>
          <AnimatePresence mode="wait">
            <motion.p
              key={isLogin ? "login-subtitle" : "signup-subtitle"}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="text-sm font-medium text-text-tertiary"
            >
              {isLogin ? 'Sign in to access your journal' : 'Create an account to start journaling'}
            </motion.p>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.form
            key={isLogin ? "login-form" : "signup-form"}
            initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                {isLogin ? 'Email or Username' : 'Email Address'}
              </label>
              <input
                type={isLogin ? "text" : "email"}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full rounded-xl border border-border-default bg-bg-input px-4 py-3 text-sm font-medium text-text-primary placeholder:text-text-tertiary focus-ring transition-colors hover:border-border-hover"
                placeholder={isLogin ? "trader@example.com or username" : "trader@example.com"}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                  Password
                </label>
                {isLogin && (
                  <a href="#" className="text-xs font-bold text-accent-blue hover:text-accent-blue/80 transition-colors">
                    Forgot password?
                  </a>
                )}
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-border-default bg-bg-input px-4 py-3 text-sm font-medium text-text-primary placeholder:text-text-tertiary focus-ring transition-colors hover:border-border-hover"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="rounded-lg bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-500 border border-red-500/20"
              >
                {error}
              </motion.div>
            )}

            {success && !isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="rounded-lg bg-green-500/10 px-4 py-3 text-sm font-semibold text-green-500 border border-green-500/20"
              >
                Registration successful! Redirecting to login...
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading || success}
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-accent-blue to-accent-green px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent-blue/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading 
                ? (isLogin ? 'Signing In...' : 'Creating Account...') 
                : (isLogin ? 'Sign In' : 'Sign Up')}
            </button>
          </motion.form>
        </AnimatePresence>

        <div className="mt-8 text-center text-xs font-medium text-text-tertiary">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button" 
            onClick={toggleMode}
            className="font-bold text-accent-blue hover:underline transition-colors cursor-pointer"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
