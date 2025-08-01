import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, User } from 'lucide-react';
import Logo from '../components/Logo';
import { colors, fonts, spacing } from '../utils/theme';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const handleContinue = (): void => {
    navigate('/avatar');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.surface} 50%, ${colors.background} 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing.lg,
      fontFamily: fonts.body,
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Background decorative elements */}
      <motion.div
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: `radial-gradient(circle, ${colors.primary}20 0%, transparent 70%)`,
          borderRadius: '50%',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '15%',
          width: '200px',
          height: '200px',
          background: `radial-gradient(circle, ${colors.secondary}20 0%, transparent 70%)`,
          borderRadius: '50%',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      <motion.div
        style={{
          width: '100%',
          maxWidth: '600px',
          textAlign: 'center',
          zIndex: 10,
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Logo */}
        <motion.div 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginBottom: spacing['2xl'] 
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Logo size="large" />
        </motion.div>

        {/* Welcome Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: spacing.sm,
              marginBottom: spacing.lg,
            }}
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          >
            <Sparkles 
              size={24} 
              style={{ color: colors.secondary }}
            />
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: colors.textPrimary,
              margin: 0,
              background: `linear-gradient(135deg, ${colors.textPrimary} 0%, ${colors.primaryLight} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Welcome!
            </h1>
            <Sparkles 
              size={24} 
              style={{ color: colors.secondary }}
            />
          </motion.div>

          <motion.p 
            style={{
              fontSize: '1.2rem',
              color: colors.textSecondary,
              margin: 0,
              marginBottom: spacing.sm,
              lineHeight: 1.6,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Get ready to supercharge your productivity
          </motion.p>

          <motion.p 
            style={{
              fontSize: '1rem',
              color: colors.textMuted,
              margin: 0,
              marginBottom: spacing['3xl'],
              lineHeight: 1.6,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            First, let's create your unique avatar to personalize your experience
          </motion.p>
        </motion.div>

        {/* Illustration placeholder */}
        <motion.div
          style={{
            width: '200px',
            height: '200px',
            margin: `0 auto ${spacing['2xl']} auto`,
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 50%, ${colors.secondary} 100%)`,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, type: 'spring', bounce: 0.3 }}
        >
          <motion.div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: `conic-gradient(from 0deg, ${colors.primary}40, ${colors.secondary}40, ${colors.primaryLight}40, ${colors.primary}40)`,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <User 
            size={80} 
            style={{ 
              color: colors.textPrimary, 
              zIndex: 2,
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
            }}
          />
        </motion.div>

        {/* Continue Button */}
        <motion.button
          onClick={handleContinue}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing.md,
            margin: '0 auto',
            padding: `${spacing.lg} ${spacing['2xl']}`,
            backgroundColor: colors.primary,
            color: colors.textPrimary,
            border: 'none',
            borderRadius: '16px',
            fontSize: '1.1rem',
            fontWeight: '600',
            fontFamily: fonts.body,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: `0 8px 32px ${colors.primary}40`,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ 
            backgroundColor: colors.primaryDark,
            scale: 1.05,
            boxShadow: `0 12px 40px ${colors.primary}60`,
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Create My Avatar</span>
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ArrowRight size={20} />
          </motion.div>
        </motion.button>

        {/* Progress indicator */}
        <motion.div
          style={{
            marginTop: spacing['2xl'],
            display: 'flex',
            justifyContent: 'center',
            gap: spacing.sm,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {[0, 1, 2].map((step) => (
            <motion.div
              key={step}
              style={{
                width: step === 0 ? '32px' : '8px',
                height: '8px',
                backgroundColor: step === 0 ? colors.primary : colors.surfaceLight,
                borderRadius: '4px',
              }}
              initial={{ width: '8px' }}
              animate={{ width: step === 0 ? '32px' : '8px' }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </motion.div>

        <motion.p
          style={{
            marginTop: spacing.md,
            color: colors.textMuted,
            fontSize: '0.85rem',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          Step 1 of 3 - Avatar Setup
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Welcome;