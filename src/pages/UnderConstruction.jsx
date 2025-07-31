import React from 'react';
import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { colors, fonts, spacing } from '../utils/theme';

const UnderConstruction = ({ title, description }) => {
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.xl,
      }}>
        <motion.div
          style={{
            textAlign: 'center',
            maxWidth: '600px',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            style={{
              width: '120px',
              height: '120px',
              margin: `0 auto ${spacing['2xl']} auto`,
              backgroundColor: colors.surface,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `2px solid ${colors.surfaceLight}`,
            }}
            animate={{ 
              rotate: [0, 10, -10, 0],
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Construction 
              size={48} 
              style={{ color: colors.secondary }}
            />
          </motion.div>

          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: colors.textPrimary,
            margin: 0,
            marginBottom: spacing.lg,
          }}>
            {title}
          </h1>

          <p style={{
            fontSize: '1.2rem',
            color: colors.textSecondary,
            margin: 0,
            marginBottom: spacing.md,
            lineHeight: 1.6,
          }}>
            {description}
          </p>

          <p style={{
            fontSize: '1rem',
            color: colors.textMuted,
            margin: 0,
            lineHeight: 1.6,
          }}>
            We're working hard to bring you amazing features. Stay tuned!
          </p>

          <motion.div
            style={{
              marginTop: spacing['2xl'],
              display: 'flex',
              justifyContent: 'center',
              gap: spacing.sm,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {[0, 1, 2].map((dot) => (
              <motion.div
                key={dot}
                style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: colors.secondary,
                  borderRadius: '50%',
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: dot * 0.2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export const Settings = () => (
  <UnderConstruction 
    title="Settings" 
    description="Customize your productivity experience with personalized settings and preferences."
  />
);

export const Leaderboard = () => (
  <UnderConstruction 
    title="Leaderboard" 
    description="Compare your productivity stats with friends and climb the rankings."
  />
);

export const Spaces = () => (
  <UnderConstruction 
    title="Spaces" 
    description="Organize your work into dedicated spaces for better focus and collaboration."
  />
);

export const GameEngine = () => (
  <UnderConstruction 
    title="Game Engine" 
    description="Turn your productivity into an engaging game with rewards and achievements."
  />
);