import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, Shield, Gem, Crown } from 'lucide-react';
import { colors, fonts, spacing } from '../utils/theme';

interface Badge {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number }>;
  color: string;
  description: string;
  isActive: boolean;
  daysLeft?: number;
}

// Mock logic to simulate streak badges
const getActiveStreakBadges = (): Badge[] => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  
  // Simple mock logic based on current date to simulate different streak states
  const mockStreakDay = (currentDay % 22) + 1; // Cycles through 1-22 days
  
  const badges: Badge[] = [
    {
      id: 'sharp-shooter',
      name: 'Sharp Shooter',
      icon: Target,
      color: colors.primary,
      description: '1 day streak',
      isActive: mockStreakDay >= 1,
      daysLeft: mockStreakDay >= 1 && mockStreakDay < 2 ? 1 : undefined,
    },
    {
      id: 'green-stone',
      name: 'Green Stone',
      icon: Gem,
      color: '#10b981',
      description: '5 day streak',
      isActive: mockStreakDay >= 5,
      daysLeft: mockStreakDay >= 5 && mockStreakDay < 12 ? 12 - mockStreakDay : undefined,
    },
    {
      id: 'red-stone',
      name: 'Red Stone',
      icon: Zap,
      color: '#ef4444',
      description: '10 day streak',
      isActive: mockStreakDay >= 10,
      daysLeft: mockStreakDay >= 10 && mockStreakDay < 17 ? 17 - mockStreakDay : undefined,
    },
    {
      id: 'purple-stone',
      name: 'Purple Stone',
      icon: Shield,
      color: '#8b5cf6',
      description: '15 day streak',
      isActive: mockStreakDay >= 15,
      daysLeft: mockStreakDay >= 15 && mockStreakDay < 22 ? 22 - mockStreakDay : undefined,
    },
    {
      id: 'gauntlet-warrior',
      name: 'Gauntlet Warrior',
      icon: Crown,
      color: '#f59e0b',
      description: '21 day streak',
      isActive: mockStreakDay >= 21,
      daysLeft: mockStreakDay >= 21 ? 30 - currentDay : undefined, // Until next month
    },
  ];
  
  return badges.filter(badge => badge.isActive);
};

const StreakBadges: React.FC = () => {
  const activeBadges = getActiveStreakBadges();
  
  if (activeBadges.length === 0) {
    return null;
  }

  return (
    <motion.div
      style={{
        marginBottom: spacing.xl,
        textAlign: 'center',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <h2
        style={{
          fontSize: '1.4rem',
          fontWeight: '700',
          color: colors.textPrimary,
          marginBottom: spacing.lg,
          fontFamily: fonts.body,
        }}
      >
        Active Streak Badges
      </h2>
      
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: spacing.lg,
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        {activeBadges.map((badge, index) => {
          const Icon = badge.icon;
          
          return (
            <motion.div
              key={badge.id}
              style={{
                backgroundColor: colors.surface,
                border: `2px solid ${badge.color}`,
                borderRadius: '16px',
                padding: spacing.lg,
                minWidth: '140px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Glow effect */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `radial-gradient(circle at center, ${badge.color}15 0%, transparent 70%)`,
                  zIndex: 1,
                }}
              />
              
              {/* Badge content */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <motion.div
                  style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: badge.color,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    marginBottom: spacing.sm,
                    boxShadow: `0 0 20px ${badge.color}40`,
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 20px ${badge.color}40`,
                      `0 0 30px ${badge.color}60`,
                      `0 0 20px ${badge.color}40`,
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <Icon size={24} color={colors.textPrimary} />
                </motion.div>
                
                <h3
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: colors.textPrimary,
                    margin: 0,
                    marginBottom: spacing.xs,
                    fontFamily: fonts.body,
                  }}
                >
                  {badge.name}
                </h3>
                
                <p
                  style={{
                    fontSize: '0.75rem',
                    color: colors.textSecondary,
                    margin: 0,
                    marginBottom: spacing.xs,
                    fontFamily: fonts.body,
                  }}
                >
                  {badge.description}
                </p>
                
                {badge.daysLeft && (
                  <div
                    style={{
                      fontSize: '0.7rem',
                      color: badge.color,
                      fontWeight: '600',
                      fontFamily: fonts.body,
                    }}
                  >
                    {badge.daysLeft} days left
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default StreakBadges;