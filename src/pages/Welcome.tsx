import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, User, Zap, Target, TrendingUp } from 'lucide-react';
import Logo from '../components/Logo';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { colors, fonts, spacing } from '../utils/theme';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const handleContinue = (): void => {
    navigate('/avatar');
  };

  const features = [
    {
      icon: Target,
      title: 'Goal Tracking',
      description: 'Track and achieve your productivity goals with precision',
    },
    {
      icon: TrendingUp,
      title: 'Progress Analytics',
      description: 'Visualize your productivity patterns and improvements',
    },
    {
      icon: Zap,
      title: 'Quick Actions',
      description: 'Execute tasks efficiently with smart automation',
    },
  ];

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
      {/* Animated background elements */}
      <motion.div
        style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: `radial-gradient(circle, ${colors.primary}15 0%, transparent 70%)`,
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
          bottom: '10%',
          right: '15%',
          width: '200px',
          height: '200px',
          background: `radial-gradient(circle, ${colors.secondary}15 0%, transparent 70%)`,
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

      <div style={{
        width: '100%',
        maxWidth: '1200px',
        display: 'grid',
        gridTemplateColumns: window.innerWidth >= 1024 ? '1fr 400px' : '1fr',
        gap: window.innerWidth >= 1024 ? spacing['3xl'] : spacing['2xl'],
        alignItems: 'center',
        zIndex: 10,
        padding: `0 ${spacing.lg}`,
      }}>
        {/* Left Column - Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Logo */}
          <motion.div 
            style={{ marginBottom: spacing['2xl'] }}
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
                size={32} 
                style={{ color: colors.secondary }}
              />
              <h1 style={{
                fontSize: '3rem',
                fontWeight: '800',
                color: colors.textPrimary,
                margin: 0,
                background: `linear-gradient(135deg, ${colors.textPrimary} 0%, ${colors.primaryLight} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontFamily: fonts.logo,
              }}>
                Welcome to ApplyWizz!
              </h1>
            </motion.div>

            <motion.p 
              style={{
                fontSize: '1.4rem',
                color: colors.textSecondary,
                margin: 0,
                marginBottom: spacing.sm,
                lineHeight: 1.6,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Supercharge your productivity with intelligent task management
            </motion.p>

            <motion.p 
              style={{
                fontSize: '1.1rem',
                color: colors.textMuted,
                margin: 0,
                marginBottom: spacing['3xl'],
                lineHeight: 1.6,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Let's start by creating your personalized avatar to make your experience unique
            </motion.p>
          </motion.div>

          {/* Features */}
          <motion.div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: spacing.md,
              marginBottom: spacing['3xl'],
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.md,
                  padding: spacing.md,
                  backgroundColor: `${colors.surface}80`,
                  borderRadius: '12px',
                  border: `1px solid ${colors.surfaceLight}40`,
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ 
                  backgroundColor: `${colors.surfaceLight}60`,
                  scale: 1.02,
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: `${colors.primary}20`,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <feature.icon size={20} style={{ color: colors.primary }} />
                </div>
                <div>
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: colors.textPrimary,
                    margin: 0,
                    marginBottom: spacing.xs,
                  }}>
                    {feature.title}
                  </h4>
                  <p style={{
                    fontSize: '0.85rem',
                    color: colors.textMuted,
                    margin: 0,
                  }}>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <Button
              onClick={handleContinue}
              size="lg"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing.md,
                fontSize: '1.1rem',
                padding: `${spacing.lg} ${spacing['2xl']}`,
                boxShadow: `0 8px 32px ${colors.primary}40`,
              }}
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
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Column - Avatar Preview */}
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: spacing.xl,
          }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card style={{
            width: '100%',
            maxWidth: '400px',
            padding: spacing['3xl'],
            textAlign: 'center',
            backgroundColor: `${colors.surface}90`,
            backdropFilter: 'blur(10px)',
          }}>
            <CardHeader>
              <CardTitle style={{ fontSize: '1.5rem', marginBottom: spacing.md }}>
                Your Journey Starts Here
              </CardTitle>
              <CardDescription style={{ fontSize: '1rem' }}>
                Personalize your experience with a unique avatar
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Avatar Preview */}
              <motion.div
                style={{
                  width: '200px',
                  height: '200px',
                  margin: `0 auto ${spacing.xl} auto`,
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
                transition={{ duration: 1, delay: 0.6, type: 'spring', bounce: 0.3 }}
                whileHover={{ scale: 1.05 }}
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

              <motion.p
                style={{
                  fontSize: '0.9rem',
                  color: colors.textMuted,
                  margin: 0,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Choose from multiple avatar styles and colors
              </motion.p>
            </CardContent>
          </Card>

          {/* Progress indicator */}
          <motion.div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: spacing.sm,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
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
              color: colors.textMuted,
              fontSize: '0.85rem',
              textAlign: 'center',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            Step 1 of 3 - Avatar Setup
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Welcome;