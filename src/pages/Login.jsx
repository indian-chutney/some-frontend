import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import Logo from '../components/Logo';
import { colors, fonts, spacing } from '../utils/theme';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      navigate('/welcome');
    }, 1500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.surface} 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing.lg,
      fontFamily: fonts.body,
    }}>
      <motion.div
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: colors.surface,
          padding: spacing['3xl'],
          borderRadius: '24px',
          border: `1px solid ${colors.surfaceLight}`,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        }}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Logo and Title */}
        <motion.div 
          style={{ textAlign: 'center', marginBottom: spacing['2xl'] }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: spacing.xl }}>
            <Logo size="large" />
          </div>
          <h1 style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            color: colors.textPrimary,
            margin: 0,
            marginBottom: spacing.sm,
          }}>
            Welcome Back
          </h1>
          <p style={{
            color: colors.textSecondary,
            fontSize: '0.95rem',
            margin: 0,
          }}>
            Sign in to continue your productivity journey
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.form 
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Email Field */}
          <div style={{ marginBottom: spacing.lg }}>
            <label style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: colors.textSecondary,
              marginBottom: spacing.sm,
            }}>
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail 
                size={20} 
                style={{
                  position: 'absolute',
                  left: spacing.md,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: colors.textMuted,
                }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{
                  width: '100%',
                  padding: `${spacing.md} ${spacing.md} ${spacing.md} 3rem`,
                  backgroundColor: colors.background,
                  border: `1px solid ${colors.surfaceLight}`,
                  borderRadius: '12px',
                  color: colors.textPrimary,
                  fontSize: '0.95rem',
                  fontFamily: fonts.body,
                  outline: 'none',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.primary;
                  e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.surfaceLight;
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: spacing.xl }}>
            <label style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: colors.textSecondary,
              marginBottom: spacing.sm,
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock 
                size={20} 
                style={{
                  position: 'absolute',
                  left: spacing.md,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: colors.textMuted,
                }}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                style={{
                  width: '100%',
                  padding: `${spacing.md} 3rem ${spacing.md} 3rem`,
                  backgroundColor: colors.background,
                  border: `1px solid ${colors.surfaceLight}`,
                  borderRadius: '12px',
                  color: colors.textPrimary,
                  fontSize: '0.95rem',
                  fontFamily: fonts.body,
                  outline: 'none',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.primary;
                  e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.surfaceLight;
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: spacing.md,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: colors.textMuted,
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: spacing.lg,
              backgroundColor: colors.primary,
              color: colors.textPrimary,
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              fontFamily: fonts.body,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
              transition: 'all 0.2s ease',
            }}
            whileHover={!isLoading ? { backgroundColor: colors.primaryDark } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
          >
            {isLoading ? (
              <motion.div
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: spacing.sm }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  style={{
                    width: '16px',
                    height: '16px',
                    border: `2px solid ${colors.textPrimary}`,
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                Signing In...
              </motion.div>
            ) : (
              'Sign In'
            )}
          </motion.button>
        </motion.form>

        {/* Footer */}
        <motion.div 
          style={{ 
            textAlign: 'center', 
            marginTop: spacing.xl,
            color: colors.textMuted,
            fontSize: '0.85rem',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Don't have an account? <span style={{ color: colors.primary, cursor: 'pointer' }}>Sign up</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;