import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Construction, User, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Sidebar from '../components/Sidebar';
import { Card } from '../components/ui/card';
import { colors, fonts, spacing } from '../utils/theme';
import { useUserInfo, useUserGraph, useApiError, useLeaderboard } from '../hooks/useApi';
import { useAuthContext } from '../hooks/hooks';

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

type TabType = 'team' | 'individual';

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
        marginLeft: window.innerWidth >= 1024 ? '280px' : '0',
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
  const [selectedTimeRange, setSelectedTimeRange] = useState<'week' | '30days' | 'all_time'>('30days');
  const { logout } = useAuthContext();
  
  // Fetch user info and graph data
  const { data: userInfo, isLoading: userLoading, error: userError } = useUserInfo();
  const { data: graphData, isLoading: graphLoading, error: graphError } = useUserGraph(selectedTimeRange);
  
  const userErrorMessage = useApiError(userError);
  const graphErrorMessage = useApiError(graphError);

  // Check if user is career associate for role-based access
  const isCareerAssociate = userInfo?.role === 'career-associate';

  const handleTimeRangeChange = (range: 'week' | '30days' | 'all_time') => {
    setSelectedTimeRange(range);
  };

  const handleLogout = () => {
    logout();
  };

  const timeRangeOptions = [
    { value: 'week' as const, label: 'Last Week' },
    { value: '30days' as const, label: 'Last 30 Days' },
    { value: 'all_time' as const, label: 'All Time' },
  ];

  // Get display name and email
  const displayName = userInfo?.username || 'User';
  const displayEmail = `${displayName.toLowerCase().replace(/\s+/g, '.')}@applywizz.com`;
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'JD';

  // Get role display info
  const getRoleInfo = (role?: string) => {
    switch (role) {
      case 'career-associate':
        return {
          label: 'Career Associate',
          emoji: '🎯',
          description: 'Help candidates navigate their career journey',
          skills: ['Goal Tracking', 'Time Management', 'Analytics']
        };
      case 'tech-engineer':
        return {
          label: 'Tech Engineer',
          emoji: '⚡',
          description: 'Build and maintain technical solutions',
          skills: ['Development', 'Problem Solving', 'Innovation']
        };
      case 'resume-team':
        return {
          label: 'Resume Team Folk',
          emoji: '📝',
          description: 'Craft compelling resumes and profiles',
          skills: ['Writing', 'Design', 'Optimization']
        };
      case 'product-manager':
        return {
          label: 'Product Manager',
          emoji: '📊',
          description: 'Drive product strategy and development',
          skills: ['Strategy', 'Leadership', 'Analysis']
        };
      case 'data-analyst':
        return {
          label: 'Data Analyst',
          emoji: '📈',
          description: 'Analyze trends and provide insights',
          skills: ['Analytics', 'Insights', 'Reporting']
        };
      case 'customer-success':
        return {
          label: 'Customer Success',
          emoji: '🤝',
          description: 'Ensure client satisfaction and growth',
          skills: ['Communication', 'Support', 'Growth']
        };
      default:
        return {
          label: 'Team Member',
          emoji: '👤',
          description: 'Contributing to the team success',
          skills: ['Collaboration', 'Communication', 'Growth']
        };
    }
  };

  const roleInfo = getRoleInfo(userInfo?.role);

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
        marginLeft: window.innerWidth >= 1024 ? '280px' : '0',
        padding: spacing['2xl'],
        display: 'flex',
        justifyContent: 'center',
      }}>
        <motion.div
          style={{
            width: '100%',
            maxWidth: '900px',
          }}
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
            textAlign: 'center',
          }}>
            Settings
          </h1>

          {/* Central Profile Card */}
          <Card style={{ 
            padding: spacing['3xl'],
            textAlign: 'center',
            marginBottom: spacing.xl,
          }}>
            {/* Centered Avatar */}
            <motion.div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: spacing.xl,
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div style={{
                width: '120px',
                height: '120px',
                backgroundColor: colors.primary,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
                fontWeight: '700',
                color: colors.textPrimary,
                position: 'relative',
                boxShadow: `0 8px 32px ${colors.primary}40`,
              }}>
                {initials}
                {/* Status indicator */}
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '8px',
                  width: '24px',
                  height: '24px',
                  backgroundColor: colors.success,
                  borderRadius: '50%',
                  border: `3px solid ${colors.surface}`,
                }} />
              </div>
            </motion.div>

            {/* User Info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: colors.textPrimary,
                margin: 0,
                marginBottom: spacing.xs,
              }}>
                {userLoading ? 'Loading...' : displayName}
              </h2>
              <p style={{
                color: colors.textSecondary,
                margin: 0,
                fontSize: '1rem',
                marginBottom: spacing['2xl'],
              }}>
                {displayEmail}
              </p>

              {/* Error display for user info */}
              {userErrorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginBottom: spacing.lg,
                    padding: spacing.md,
                    backgroundColor: `${colors.error}20`,
                    borderRadius: "8px",
                    fontSize: "0.9rem",
                    color: colors.error,
                    display: "flex",
                    alignItems: "center",
                    gap: spacing.sm,
                    justifyContent: "center",
                  }}
                >
                  <AlertCircle size={16} />
                  {userErrorMessage}
                </motion.div>
              )}
            </motion.div>
          </Card>

          {/* Your Selected Role Section - Enhanced */}
          <Card style={{ 
            padding: spacing['2xl'], 
            marginBottom: spacing.xl,
            background: `linear-gradient(135deg, ${colors.primary}10 0%, ${colors.secondary}05 100%)`,
            border: `1px solid ${colors.primary}20`,
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: spacing.lg,
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: colors.textPrimary,
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: spacing.sm,
              }}>
                <motion.div
                  style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: colors.primary,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  <User size={18} style={{ color: colors.textPrimary }} />
                </motion.div>
                Your Selected Role
              </h3>
              
              <motion.button
                style={{
                  padding: `${spacing.sm} ${spacing.md}`,
                  backgroundColor: 'transparent',
                  border: `1px solid ${colors.primary}`,
                  borderRadius: '6px',
                  color: colors.primary,
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: fonts.body,
                }}
                whileHover={{ 
                  backgroundColor: colors.primary,
                  color: colors.textPrimary,
                }}
                whileTap={{ scale: 0.95 }}
              >
                Change Role
              </motion.button>
            </div>
            
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing.lg,
                padding: spacing.lg,
                backgroundColor: `${colors.surface}80`,
                borderRadius: '12px',
                border: `1px solid ${colors.surfaceLight}`,
              }}
              whileHover={{ backgroundColor: `${colors.surface}90` }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: colors.secondary,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: '700',
                color: colors.textPrimary,
                boxShadow: `0 4px 12px ${colors.secondary}40`,
              }}>
                {roleInfo.emoji}
              </div>
              
              <div style={{ flex: 1 }}>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: colors.textPrimary,
                  margin: 0,
                  marginBottom: spacing.xs,
                }}>
                  {roleInfo.label}
                </h4>
                <p style={{
                  fontSize: '0.9rem',
                  color: colors.textSecondary,
                  margin: 0,
                  marginBottom: spacing.xs,
                }}>
                  {roleInfo.description}
                </p>
                <div style={{
                  display: 'flex',
                  gap: spacing.xs,
                  flexWrap: 'wrap',
                }}>
                  {roleInfo.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        padding: `${spacing.xs} ${spacing.sm}`,
                        backgroundColor: `${colors.primary}20`,
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: colors.primary,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </Card>

          {/* Progress Graph - Only for Career Associates */}
          {isCareerAssociate ? (
            <Card style={{ 
              padding: spacing['2xl'], 
              marginBottom: spacing.xl,
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: spacing.xl,
                flexWrap: 'wrap',
                gap: spacing.md,
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: colors.textPrimary,
                  margin: 0,
                }}>
                  Progress Overview
                </h3>
                
                {/* Time Range Selector */}
                <div style={{
                  display: 'flex',
                  gap: spacing.sm,
                  flexWrap: 'wrap',
                }}>
                  {timeRangeOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      onClick={() => handleTimeRangeChange(option.value)}
                      disabled={graphLoading}
                      style={{
                        padding: `${spacing.sm} ${spacing.md}`,
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: selectedTimeRange === option.value ? colors.primary : colors.surfaceLight,
                        color: selectedTimeRange === option.value ? colors.textPrimary : colors.textSecondary,
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: graphLoading ? 'not-allowed' : 'pointer',
                        opacity: graphLoading ? 0.6 : 1,
                        transition: 'all 0.2s ease',
                      }}
                      whileHover={!graphLoading ? {
                        backgroundColor: selectedTimeRange === option.value ? colors.primaryDark : colors.surface,
                      } : {}}
                      whileTap={!graphLoading ? { scale: 0.95 } : {}}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Error message for graph data */}
              {graphErrorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginBottom: spacing.lg,
                    padding: spacing.md,
                    backgroundColor: `${colors.error}20`,
                    borderRadius: "8px",
                    fontSize: "0.9rem",
                    color: colors.error,
                    display: "flex",
                    alignItems: "center",
                    gap: spacing.sm,
                  }}
                >
                  <AlertCircle size={16} />
                  {graphErrorMessage}
                </motion.div>
              )}

              {/* Chart Container */}
              <motion.div
                style={{
                  height: '400px',
                  width: '100%',
                  position: 'relative',
                  opacity: graphLoading ? 0.5 : 1,
                  transition: 'opacity 0.3s ease',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: graphLoading ? 0.5 : 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {graphLoading && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                  }}>
                    <motion.div
                      style={{
                        width: '32px',
                        height: '32px',
                        border: `3px solid ${colors.surfaceLight}`,
                        borderTop: `3px solid ${colors.primary}`,
                        borderRadius: '50%',
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                )}
                
                {graphData?.data && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={graphData.data}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 20,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke={colors.surfaceLight} />
                      <XAxis 
                        dataKey="date" 
                        stroke={colors.textSecondary}
                        fontSize={12}
                      />
                      <YAxis 
                        stroke={colors.textSecondary}
                        fontSize={12}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: colors.surface,
                          border: `1px solid ${colors.surfaceLight}`,
                          borderRadius: '8px',
                          color: colors.textPrimary,
                          fontSize: '0.875rem',
                        }}
                        labelStyle={{ color: colors.textSecondary }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="tasks" 
                        stroke={colors.primary}
                        strokeWidth={3}
                        dot={{ fill: colors.primary, strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, fill: colors.primaryLight }}
                        name="Tasks Completed"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="productivity" 
                        stroke={colors.secondary}
                        strokeWidth={2}
                        dot={{ fill: colors.secondary, strokeWidth: 2, r: 3 }}
                        activeDot={{ r: 5, fill: colors.secondaryLight }}
                        name="Productivity %"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="focus" 
                        stroke={colors.success}
                        strokeWidth={2}
                        dot={{ fill: colors.success, strokeWidth: 2, r: 3 }}
                        activeDot={{ r: 5, fill: '#34d399' }}
                        name="Focus Hours"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </motion.div>

              {/* Chart Legend */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: spacing.xl,
                marginTop: spacing.lg,
                flexWrap: 'wrap',
              }}>
                {[
                  { color: colors.primary, label: 'Tasks Completed' },
                  { color: colors.secondary, label: 'Productivity %' },
                  { color: colors.success, label: 'Focus Hours' },
                ].map((item) => (
                  <div key={item.label} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing.sm,
                  }}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      backgroundColor: item.color,
                      borderRadius: '50%',
                    }} />
                    <span style={{
                      fontSize: '0.875rem',
                      color: colors.textSecondary,
                    }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          ) : (
            /* Alternative message for non-career associates */
            <Card style={{
              padding: spacing['2xl'],
              marginBottom: spacing.xl,
              textAlign: 'center',
              border: `1px solid ${colors.primary}20`,
              backgroundColor: `${colors.primary}05`,
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: colors.textPrimary,
                margin: 0,
                marginBottom: spacing.md,
              }}>
                Progress Analytics
              </h3>
              <p style={{
                color: colors.textSecondary,
                margin: 0,
                fontSize: '1rem',
                lineHeight: 1.6,
              }}>
                Detailed progress tracking and analytics are available for Career Associates. 
                Your current role provides access to Thanos HP tracking and leaderboard features.
              </p>
            </Card>
          )}

          {/* Logout Section */}
          <Card style={{
            padding: spacing['2xl'],
            border: `1px solid ${colors.error}20`,
            backgroundColor: `${colors.error}05`,
          }}>
            <motion.button
              onClick={handleLogout}
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
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

// Leaderboard Component
export const Leaderboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('individual');
  const [activeProgressPeriod, setActiveProgressPeriod] = useState<'today' | 'week' | 'this_month' | 'all_time'>('today');

  // Fetch leaderboard data from API
  const { data: leaderboardData, isLoading, error } = useLeaderboard(activeProgressPeriod, activeTab);
  const { data: userInfo } = useUserInfo();
  const errorMessage = useApiError(error);

  // Use API data or fallback to mock data
  const currentData = leaderboardData?.entries || [];

  // Personal progress data for the current user - this could be extracted from leaderboard data
  const generatePersonalProgress = (period: 'today' | 'week' | 'this_month' | 'all_time') => {
    const baseData = {
      rank: 23, // User's current rank - could come from API
      totalParticipants: currentData.length || (activeTab === 'individual' ? 156 : 45),
      name: userInfo?.username || 'You',
    };

    switch (period) {
      case 'today':
        return {
          ...baseData,
          score: 145,
          change: '+12',
          completedTasks: 8,
          totalTasks: 12,
          focusHours: 4.5,
          productivityScore: 87,
        };
      case 'week':
        return {
          ...baseData,
          score: 892,
          change: '+67',
          completedTasks: 42,
          totalTasks: 58,
          focusHours: 28.5,
          productivityScore: 84,
        };
      case 'this_month':
        return {
          ...baseData,
          score: 3247,
          change: '+234',
          completedTasks: 156,
          totalTasks: 201,
          focusHours: 98.2,
          productivityScore: 89,
        };
      case 'all_time':
        return {
          ...baseData,
          score: 15483,
          change: '+1247',
          completedTasks: 742,
          totalTasks: 963,
          focusHours: 423.7,
          productivityScore: 91,
        };
      default:
        return baseData;
    }
  };

  const personalProgress = generatePersonalProgress(activeProgressPeriod);

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
        marginLeft: window.innerWidth >= 1024 ? '280px' : '0',
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

          {/* Time Period Selector - At Leaderboard Level */}
          <Card style={{
            marginBottom: spacing.xl,
            padding: spacing.md,
            backgroundColor: colors.surface,
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: spacing.md,
            }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: colors.textPrimary,
                margin: 0,
              }}>
                Time Period
              </h2>
              
              <div style={{
                display: 'flex',
                gap: spacing.xs,
                flexWrap: 'wrap',
              }}>
                {[
                  { id: 'today' as const, label: 'Today' },
                  { id: 'week' as const, label: 'This Week' },
                  { id: 'this_month' as const, label: 'This Month' },
                  { id: 'all_time' as const, label: 'All Time' }
                ].map((period) => (
                  <motion.button
                    key={period.id}
                    onClick={() => setActiveProgressPeriod(period.id)}
                    disabled={isLoading}
                    style={{
                      padding: `${spacing.sm} ${spacing.md}`,
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: activeProgressPeriod === period.id ? colors.primary : colors.surfaceLight,
                      color: activeProgressPeriod === period.id ? colors.textPrimary : colors.textSecondary,
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      opacity: isLoading ? 0.6 : 1,
                      transition: 'all 0.2s ease',
                    }}
                    whileHover={!isLoading ? {
                      backgroundColor: activeProgressPeriod === period.id ? colors.primaryDark : colors.surface,
                    } : {}}
                    whileTap={!isLoading ? { scale: 0.95 } : {}}
                  >
                    {period.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </Card>

          {/* Error message */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                marginBottom: spacing.xl,
                padding: spacing.md,
                backgroundColor: `${colors.error}20`,
                borderRadius: "8px",
                fontSize: "0.9rem",
                color: colors.error,
                display: "flex",
                alignItems: "center",
                gap: spacing.sm,
              }}
            >
              <AlertCircle size={16} />
              {errorMessage}
            </motion.div>
          )}

          {/* Loading indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                marginBottom: spacing.xl,
                display: "flex",
                alignItems: "center",
                gap: spacing.sm,
                justifyContent: "center",
                color: colors.textSecondary,
                padding: spacing.lg,
              }}
            >
              <motion.div
                style={{
                  width: "20px",
                  height: "20px",
                  border: `2px solid ${colors.surfaceLight}`,
                  borderTop: `2px solid ${colors.primary}`,
                  borderRadius: "50%",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              Loading leaderboard data...
            </motion.div>
          )}

          {/* Personal Progress Section */}
          <Card style={{
            marginBottom: spacing.xl,
            background: `linear-gradient(135deg, ${colors.primary}10 0%, ${colors.secondary}05 100%)`,
            border: `1px solid ${colors.primary}20`,
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: spacing.lg,
              flexWrap: 'wrap',
              gap: spacing.md,
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: colors.textPrimary,
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: spacing.sm,
              }}>
                <motion.div
                  style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: colors.primary,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    color: colors.textPrimary,
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  {userInfo?.username?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'YO'}
                </motion.div>
                My Progress
              </h2>
            </div>

            {/* Progress Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: spacing.lg,
              marginBottom: spacing.lg,
            }}>
              {/* Rank Card */}
              <motion.div
                style={{
                  padding: spacing.lg,
                  backgroundColor: `${colors.surface}80`,
                  borderRadius: '12px',
                  border: `1px solid ${colors.surfaceLight}`,
                  textAlign: 'center',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ backgroundColor: `${colors.surface}90` }}
              >
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: colors.primary,
                  marginBottom: spacing.sm,
                }}>
                  #{personalProgress.rank}
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: colors.textSecondary,
                  marginBottom: spacing.xs,
                }}>
                  Current Rank
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: colors.textMuted,
                }}>
                  of {personalProgress.totalParticipants} {activeTab === 'team' ? 'teams' : 'players'}
                </div>
              </motion.div>

              {/* Score Card */}
              <motion.div
                style={{
                  padding: spacing.lg,
                  backgroundColor: `${colors.surface}80`,
                  borderRadius: '12px',
                  border: `1px solid ${colors.surfaceLight}`,
                  textAlign: 'center',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                whileHover={{ backgroundColor: `${colors.surface}90` }}
              >
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: colors.secondary,
                  marginBottom: spacing.sm,
                }}>
                  {personalProgress.score?.toLocaleString()}
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: colors.textSecondary,
                  marginBottom: spacing.xs,
                }}>
                  Total Score
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  color: personalProgress.change?.startsWith('+') ? colors.success : colors.error,
                  backgroundColor: personalProgress.change?.startsWith('+') ? `${colors.success}20` : `${colors.error}20`,
                  padding: `${spacing.xs} ${spacing.sm}`,
                  borderRadius: '4px',
                  display: 'inline-block',
                }}>
                  {personalProgress.change}
                </div>
              </motion.div>

              {/* Tasks Card */}
              <motion.div
                style={{
                  padding: spacing.lg,
                  backgroundColor: `${colors.surface}80`,
                  borderRadius: '12px',
                  border: `1px solid ${colors.surfaceLight}`,
                  textAlign: 'center',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                whileHover={{ backgroundColor: `${colors.surface}90` }}
              >
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: colors.success,
                  marginBottom: spacing.sm,
                }}>
                  {personalProgress.completedTasks}/{personalProgress.totalTasks}
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: colors.textSecondary,
                  marginBottom: spacing.xs,
                }}>
                  Tasks Completed
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: colors.textMuted,
                }}>
                  {Math.round((personalProgress.completedTasks / personalProgress.totalTasks) * 100)}% completion
                </div>
              </motion.div>

              {/* Focus Hours Card */}
              <motion.div
                style={{
                  padding: spacing.lg,
                  backgroundColor: `${colors.surface}80`,
                  borderRadius: '12px',
                  border: `1px solid ${colors.surfaceLight}`,
                  textAlign: 'center',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                whileHover={{ backgroundColor: `${colors.surface}90` }}
              >
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: colors.primary,
                  marginBottom: spacing.sm,
                }}>
                  {personalProgress.focusHours}h
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: colors.textSecondary,
                  marginBottom: spacing.xs,
                }}>
                  Focus Time
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: colors.textMuted,
                }}>
                  Productivity: {personalProgress.productivityScore}%
                </div>
              </motion.div>
            </div>
          </Card>

          {/* Tabs */}
          <Card style={{
            display: 'flex',
            marginBottom: spacing.xl,
            padding: '4px',
            backgroundColor: colors.surface,
          }}>
            {[
              { id: 'team' as const, label: `Teams` },
              { id: 'individual' as const, label: `Individuals` }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: spacing.md,
                  backgroundColor: activeTab === tab.id ? colors.primary : 'transparent',
                  color: activeTab === tab.id ? colors.textPrimary : colors.textSecondary,
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.6 : 1,
                  transition: 'all 0.2s ease',
                }}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
              >
                {tab.label}
              </motion.button>
            ))}
          </Card>

          {/* Leaderboard */}
          <Card style={{
            padding: 0,
            overflow: 'hidden',
            maxHeight: '600px',
          }}>
            <div style={{
              overflowY: 'auto',
              maxHeight: '600px',
            }}>
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
                  transition={{ duration: 0.4, delay: Math.min(index * 0.05, 1) }}
                  whileHover={{ backgroundColor: `${colors.surfaceLight}50` }}
                >
                  {/* Rank */}
                  <div style={{
                    width: '50px',
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
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: colors.textSecondary,
                      }}>
                        #{entry.rank}
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
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      color: colors.textPrimary,
                      marginRight: spacing.md,
                    }}>
                      {entry.avatar || entry.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                    </div>
                  )}

                  {/* Name */}
                  <div style={{ 
                    flex: 1, 
                    marginLeft: activeTab === 'team' ? spacing.md : 0 
                  }}>
                    <h3 style={{
                      fontSize: '1rem',
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
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      color: colors.textPrimary,
                    }}>
                      {entry.score.toLocaleString()}
                    </span>
                    
                    <span style={{
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      color: entry.change.startsWith('+') ? colors.success : colors.error,
                      backgroundColor: entry.change.startsWith('+') ? `${colors.success}20` : `${colors.error}20`,
                      padding: `${spacing.xs} ${spacing.sm}`,
                      borderRadius: '6px',
                      minWidth: '50px',
                      textAlign: 'center',
                    }}>
                      {entry.change}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export const Spaces: React.FC = () => {
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
        marginLeft: window.innerWidth >= 1024 ? '280px' : '0',
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
            Spaces
          </h1>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: spacing.xl,
            maxWidth: '800px',
          }}>
            {/* User-created Room Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card hover style={{ padding: spacing.xl }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
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
                    position: 'relative',
                  }}>
                    <span style={{
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: colors.textPrimary,
                    }}>
                      MW
                    </span>
                    {/* Online indicator */}
                    <div style={{
                      position: 'absolute',
                      bottom: '8px',
                      right: '8px',
                      width: '16px',
                      height: '16px',
                      backgroundColor: colors.success,
                      borderRadius: '50%',
                      border: `2px solid ${colors.surface}`,
                    }} />
                  </div>

                  <div>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      color: colors.textPrimary,
                      margin: 0,
                      marginBottom: spacing.sm,
                    }}>
                      My Workspace
                    </h3>
                    <p style={{
                      fontSize: '0.9rem',
                      color: colors.textSecondary,
                      margin: 0,
                      marginBottom: spacing.xs,
                    }}>
                      Personal productivity space
                    </p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: spacing.xs,
                      fontSize: '0.85rem',
                      color: colors.textMuted,
                    }}>
                      <User size={14} />
                      <span>5 members</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Create Room Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card hover style={{ 
                padding: spacing.xl,
                border: `2px dashed ${colors.surfaceLight}`,
                backgroundColor: 'transparent',
              }}>
                <motion.div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: spacing.lg,
                    cursor: 'pointer',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    style={{
                      width: '80px',
                      height: '80px',
                      backgroundColor: colors.surfaceLight,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    whileHover={{
                      backgroundColor: colors.primary,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 180, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <span style={{
                        fontSize: '2rem',
                        fontWeight: '300',
                        color: colors.textSecondary,
                      }}>
                        +
                      </span>
                    </motion.div>
                  </motion.div>

                  <div>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      color: colors.textPrimary,
                      margin: 0,
                      marginBottom: spacing.sm,
                    }}>
                      Create a Room
                    </h3>
                    <p style={{
                      fontSize: '0.9rem',
                      color: colors.textSecondary,
                      margin: 0,
                    }}>
                      Start a new collaborative space
                    </p>
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};