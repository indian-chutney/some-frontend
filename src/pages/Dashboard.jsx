import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, TrendingUp, Calendar, Clock, Trophy, Zap } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { colors, fonts, spacing } from '../utils/theme';

const ThanosCharacter = ({ scrollY }) => {
  const scale = useTransform(scrollY, [0, 300], [1, 0.6]);
  const y = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  return (
    <motion.div
      style={{
        scale,
        y,
        opacity,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: spacing.xl,
      }}
    >
      {/* Thanos Character Placeholder */}
      <motion.div
        style={{
          width: '200px',
          height: '280px',
          background: `linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #3b82f6 100%)`,
          borderRadius: '50% 50% 45% 45%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 20px 60px ${colors.primary}40`,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: 'spring', bounce: 0.3 }}
        whileHover={{ scale: 1.05 }}
      >
        {/* Face */}
        <div style={{
          position: 'absolute',
          top: '30%',
          width: '120px',
          height: '80px',
          backgroundColor: colors.surface,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Eyes */}
          <div style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
          }}>
            <motion.div
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: colors.secondary,
                borderRadius: '50%',
                boxShadow: `0 0 10px ${colors.secondary}`,
              }}
              animate={{ 
                boxShadow: [`0 0 10px ${colors.secondary}`, `0 0 20px ${colors.secondary}`, `0 0 10px ${colors.secondary}`],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: colors.secondary,
                borderRadius: '50%',
                boxShadow: `0 0 10px ${colors.secondary}`,
              }}
              animate={{ 
                boxShadow: [`0 0 10px ${colors.secondary}`, `0 0 20px ${colors.secondary}`, `0 0 10px ${colors.secondary}`],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
            />
          </div>
        </div>

        {/* Gauntlet/Power indicator */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '20%',
            right: '10%',
            width: '40px',
            height: '40px',
            background: `linear-gradient(45deg, ${colors.secondary}, ${colors.warning})`,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          animate={{ 
            rotate: [0, 10, -10, 0],
            boxShadow: [`0 0 20px ${colors.secondary}60`, `0 0 30px ${colors.secondary}80`, `0 0 20px ${colors.secondary}60`],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Zap size={20} style={{ color: colors.textPrimary }} />
        </motion.div>
      </motion.div>

      {/* HP Bar */}
      <HPBar />
    </motion.div>
  );
};

const HPBar = () => {
  const hp = 85;

  return (
    <motion.div
      style={{
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.sm,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.9rem',
        fontWeight: '600',
        color: colors.textSecondary,
      }}>
        <span>Productivity Power</span>
        <span>{hp}/100</span>
      </div>
      
      <div style={{
        width: '100%',
        height: '12px',
        backgroundColor: colors.hpBackground,
        borderRadius: '6px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <motion.div
          style={{
            height: '100%',
            background: hp > 70 ? `linear-gradient(90deg, ${colors.hpFull}, ${colors.success})` :
                      hp > 30 ? `linear-gradient(90deg, ${colors.hpMedium}, ${colors.warning})` :
                      `linear-gradient(90deg, ${colors.hpLow}, ${colors.error})`,
            borderRadius: '6px',
            boxShadow: hp > 70 ? `0 0 10px ${colors.hpFull}40` :
                       hp > 30 ? `0 0 10px ${colors.hpMedium}40` :
                       `0 0 10px ${colors.hpLow}40`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${hp}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        
        {/* Shimmer effect */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          }}
          animate={{ left: ['−100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        />
      </div>
    </motion.div>
  );
};

const ProgressCard = ({ icon: Icon, title, value, subtitle, color, delay = 0 }) => {
  return (
    <motion.div
      style={{
        backgroundColor: colors.surface,
        borderRadius: '16px',
        padding: spacing.xl,
        border: `1px solid ${colors.surfaceLight}`,
        position: 'relative',
        overflow: 'hidden',
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        backgroundColor: colors.surfaceLight,
        scale: 1.02,
      }}
    >
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-20%',
        width: '120px',
        height: '120px',
        background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
        borderRadius: '50%',
      }} />

      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: spacing.md,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing.sm,
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: `${color}20`,
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Icon size={20} style={{ color }} />
          </div>
          <span style={{
            fontSize: '0.9rem',
            fontWeight: '500',
            color: colors.textSecondary,
          }}>
            {title}
          </span>
        </div>
      </div>

      <div style={{
        fontSize: '2rem',
        fontWeight: '800',
        color: colors.textPrimary,
        marginBottom: spacing.xs,
      }}>
        {value}
      </div>

      <div style={{
        fontSize: '0.85rem',
        color: colors.textMuted,
      }}>
        {subtitle}
      </div>
    </motion.div>
  );
};

const Dashboard = () => {
  const { scrollY } = useScroll();
  const progressY = useTransform(scrollY, [200, 500], [100, 0]);
  const progressOpacity = useTransform(scrollY, [150, 300], [0, 1]);

  const progressData = [
    {
      icon: Target,
      title: 'Tasks Completed',
      value: '24',
      subtitle: '+12% from yesterday',
      color: colors.success,
    },
    {
      icon: TrendingUp,
      title: 'Productivity Score',
      value: '87%',
      subtitle: 'Above average',
      color: colors.primary,
    },
    {
      icon: Calendar,
      title: 'Streak Days',
      value: '15',
      subtitle: 'Personal best!',
      color: colors.secondary,
    },
    {
      icon: Clock,
      title: 'Focus Time',
      value: '4.2h',
      subtitle: 'Today\'s session',
      color: colors.warning,
    },
    {
      icon: Trophy,
      title: 'Weekly Rank',
      value: '#3',
      subtitle: 'In your team',
      color: colors.primary,
    },
    {
      icon: Zap,
      title: 'Energy Level',
      value: '85%',
      subtitle: 'Ready to conquer!',
      color: colors.success,
    },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.background,
      fontFamily: fonts.body,
      display: 'flex',
    }}>
      <Sidebar />
      
      <main style={{
        flex: 1,
        marginLeft: '280px',
        minHeight: '200vh', // Make it scrollable
      }}>
        {/* Hero Section with Thanos */}
        <div style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: spacing.xl,
          position: 'relative',
        }}>
          <motion.div
            style={{
              textAlign: 'center',
              marginBottom: spacing['2xl'],
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{
              fontSize: '3rem',
              fontWeight: '900',
              color: colors.textPrimary,
              margin: 0,
              marginBottom: spacing.md,
              background: `linear-gradient(135deg, ${colors.textPrimary} 0%, ${colors.primaryLight} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Welcome Back, Hero!
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: colors.textSecondary,
              margin: 0,
            }}>
              Your productivity journey continues...
            </p>
          </motion.div>

          <ThanosCharacter scrollY={scrollY} />

          <motion.div
            style={{
              position: 'absolute',
              bottom: spacing.xl,
              color: colors.textMuted,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: spacing.sm,
            }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>Scroll down to see your progress</span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↓
            </motion.div>
          </motion.div>
        </div>

        {/* Progress Section */}
        <motion.div
          style={{
            y: progressY,
            opacity: progressOpacity,
            padding: spacing.xl,
            paddingTop: spacing['3xl'],
          }}
        >
          <motion.div
            style={{
              textAlign: 'center',
              marginBottom: spacing['2xl'],
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: colors.textPrimary,
              margin: 0,
              marginBottom: spacing.md,
            }}>
              Your Progress
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: colors.textSecondary,
              margin: 0,
            }}>
              Track your productivity achievements and maintain your momentum
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: spacing.xl,
            maxWidth: '1200px',
            margin: '0 auto',
          }}>
            {progressData.map((item, index) => (
              <ProgressCard
                key={item.title}
                {...item}
                delay={index * 0.1}
              />
            ))}
          </div>

          {/* Progress indicator */}
          <motion.div
            style={{
              marginTop: spacing['3xl'],
              display: 'flex',
              justifyContent: 'center',
              gap: spacing.sm,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {[0, 1, 2].map((step) => (
              <motion.div
                key={step}
                style={{
                  width: step === 2 ? '32px' : '8px',
                  height: '8px',
                  backgroundColor: step <= 2 ? colors.primary : colors.surfaceLight,
                  borderRadius: '4px',
                }}
              />
            ))}
          </motion.div>

          <motion.p
            style={{
              marginTop: spacing.md,
              color: colors.textMuted,
              fontSize: '0.85rem',
              textAlign: 'center',
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Step 3 of 3 - Dashboard Complete
          </motion.p>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;