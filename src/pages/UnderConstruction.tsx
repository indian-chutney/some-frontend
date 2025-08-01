import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { colors, fonts, spacing } from '../utils/theme';

interface UnderConstructionProps {
  title: string;
  description: string;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  change: string;
  avatar?: string;
}

type TabType = 'group' | 'individual';

const UnderConstruction: React.FC<UnderConstructionProps> = ({ title, description }) => {
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

// Settings Component
export const Settings: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

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
        padding: spacing['2xl'],
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: colors.textPrimary,
            marginBottom: spacing['2xl'],
            fontFamily: fonts.logo,
          }}>
            Settings
          </h1>

          {/* Profile Section */}
          <motion.div
            style={{
              backgroundColor: colors.surface,
              borderRadius: '16px',
              padding: spacing['2xl'],
              marginBottom: spacing.xl,
              border: `1px solid ${colors.surfaceLight}`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: colors.textPrimary,
              marginBottom: spacing.lg,
            }}>
              Profile
            </h2>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing.lg,
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: colors.primary,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: '700',
                color: colors.textPrimary,
              }}>
                JD
              </div>
              
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  color: colors.textPrimary,
                  margin: 0,
                  marginBottom: spacing.xs,
                }}>
                  John Doe
                </h3>
                <p style={{
                  color: colors.textSecondary,
                  margin: 0,
                  fontSize: '0.9rem',
                }}>
                  Career Associate
                </p>
              </div>
              
              <motion.button
                style={{
                  padding: `${spacing.sm} ${spacing.md}`,
                  backgroundColor: 'transparent',
                  border: `1px solid ${colors.surfaceLight}`,
                  borderRadius: '8px',
                  color: colors.textSecondary,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.xs,
                }}
                whileHover={{ backgroundColor: colors.surfaceLight }}
                whileTap={{ scale: 0.98 }}
              >
                ✏️ Edit
              </motion.button>
            </div>
          </motion.div>

          {/* Sound Settings */}
          <motion.div
            style={{
              backgroundColor: colors.surface,
              borderRadius: '16px',
              padding: spacing['2xl'],
              marginBottom: spacing.xl,
              border: `1px solid ${colors.surfaceLight}`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: colors.textPrimary,
              marginBottom: spacing.lg,
            }}>
              Audio
            </h2>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: colors.textPrimary,
                  margin: 0,
                  marginBottom: spacing.xs,
                }}>
                  Sound Effects
                </h3>
                <p style={{
                  color: colors.textSecondary,
                  margin: 0,
                  fontSize: '0.9rem',
                }}>
                  Enable audio feedback for interactions
                </p>
              </div>
              
              <motion.button
                onClick={() => setSoundEnabled(!soundEnabled)}
                style={{
                  width: '50px',
                  height: '30px',
                  backgroundColor: soundEnabled ? colors.primary : colors.surfaceLight,
                  border: 'none',
                  borderRadius: '15px',
                  position: 'relative',
                  cursor: 'pointer',
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  style={{
                    width: '26px',
                    height: '26px',
                    backgroundColor: colors.textPrimary,
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '2px',
                  }}
                  animate={{
                    left: soundEnabled ? '22px' : '2px',
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            </div>
          </motion.div>

          {/* Logout Section */}
          <motion.div
            style={{
              backgroundColor: colors.surface,
              borderRadius: '16px',
              padding: spacing['2xl'],
              border: `1px solid ${colors.error}20`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.button
              style={{
                width: '100%',
                padding: spacing.lg,
                backgroundColor: 'transparent',
                border: `2px solid ${colors.error}`,
                borderRadius: '12px',
                color: colors.error,
                fontSize: '1rem',
                fontWeight: '600',
                fontFamily: fonts.body,
                cursor: 'pointer',
              }}
              whileHover={{ backgroundColor: `${colors.error}10` }}
              whileTap={{ scale: 0.98 }}
            >
              Logout
            </motion.button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

// Leaderboard Component
export const Leaderboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('group');

  const groupLeaderboard: LeaderboardEntry[] = [
    { rank: 1, name: 'Team Alpha', score: 2450, change: '+12' },
    { rank: 2, name: 'Team Beta', score: 2380, change: '+8' },
    { rank: 3, name: 'Team Gamma', score: 2290, change: '-3' },
    { rank: 4, name: 'Team Delta', score: 2150, change: '+5' },
    { rank: 5, name: 'Team Epsilon', score: 2080, change: '+2' },
  ];

  const individualLeaderboard: LeaderboardEntry[] = [
    { rank: 1, name: 'Sarah Chen', score: 1850, change: '+25', avatar: 'SC' },
    { rank: 2, name: 'Mike Johnson', score: 1780, change: '+18', avatar: 'MJ' },
    { rank: 3, name: 'John Doe', score: 1650, change: '+12', avatar: 'JD' },
    { rank: 4, name: 'Emma Wilson', score: 1580, change: '-5', avatar: 'EW' },
    { rank: 5, name: 'Alex Smith', score: 1520, change: '+7', avatar: 'AS' },
  ];

  const currentData = activeTab === 'group' ? groupLeaderboard : individualLeaderboard;

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
        padding: spacing['2xl'],
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: colors.textPrimary,
            marginBottom: spacing['2xl'],
            fontFamily: fonts.logo,
          }}>
            Leaderboard
          </h1>

          {/* Tabs */}
          <div style={{
            display: 'flex',
            marginBottom: spacing.xl,
            borderRadius: '12px',
            backgroundColor: colors.surface,
            padding: '4px',
            border: `1px solid ${colors.surfaceLight}`,
          }}>
            {[
              { id: 'group' as const, label: 'Group Leaderboard' },
              { id: 'individual' as const, label: 'Individual Leaderboard' }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: spacing.md,
                  backgroundColor: activeTab === tab.id ? colors.primary : 'transparent',
                  color: activeTab === tab.id ? colors.textPrimary : colors.textSecondary,
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                whileTap={{ scale: 0.98 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Leaderboard */}
          <motion.div
            style={{
              backgroundColor: colors.surface,
              borderRadius: '16px',
              border: `1px solid ${colors.surfaceLight}`,
              overflow: 'hidden',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {currentData.map((entry, index) => (
              <motion.div
                key={entry.rank}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: spacing.lg,
                  borderBottom: index < currentData.length - 1 ? `1px solid ${colors.surfaceLight}` : 'none',
                  backgroundColor: entry.rank <= 3 ? `${colors.primary}10` : 'transparent',
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ backgroundColor: `${colors.surfaceLight}50` }}
              >
                {/* Rank */}
                <div style={{
                  width: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {entry.rank <= 3 ? (
                    <span style={{ fontSize: '1.5rem' }}>
                      {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
                    </span>
                  ) : (
                    <span style={{
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      color: colors.textSecondary,
                    }}>
                      {entry.rank}
                    </span>
                  )}
                </div>

                {/* Avatar (for individual) */}
                {activeTab === 'individual' && (
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: colors.primary,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    color: colors.textPrimary,
                    marginRight: spacing.md,
                  }}>
                    {entry.avatar}
                  </div>
                )}

                {/* Name */}
                <div style={{ flex: 1, marginLeft: activeTab === 'group' ? spacing.md : 0 }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: colors.textPrimary,
                    margin: 0,
                  }}>
                    {entry.name}
                  </h3>
                </div>

                {/* Score */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.md,
                }}>
                  <span style={{
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    color: colors.textPrimary,
                  }}>
                    {entry.score.toLocaleString()}
                  </span>
                  
                  <span style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: entry.change.startsWith('+') ? colors.success : colors.error,
                    backgroundColor: entry.change.startsWith('+') ? `${colors.success}20` : `${colors.error}20`,
                    padding: `${spacing.xs} ${spacing.sm}`,
                    borderRadius: '6px',
                  }}>
                    {entry.change}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export const Spaces: React.FC = () => (
  <UnderConstruction 
    title="Spaces" 
    description="Organize your work into dedicated spaces for better focus and collaboration."
  />
);

export const GameEngine: React.FC = () => (
  <UnderConstruction 
    title="Game Engine" 
    description="Turn your productivity into an engaging game with rewards and achievements."
  />
);