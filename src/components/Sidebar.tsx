import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  User, 
  Settings, 
  Trophy, 
  Gamepad2, 
  Grid3X3,
  Construction,
  LucideIcon
} from 'lucide-react';
import Logo from './Logo';
import { colors, fonts, spacing } from '../utils/theme';

interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
  disabled?: boolean;
}

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems: NavigationItem[] = [
    { id: 'home', label: 'Thanos', icon: Home, path: '/dashboard' },
    { id: 'avatar', label: 'Avatar', icon: User, path: '/avatar' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
    { id: 'leaderboard', label: 'LeaderBoard', icon: Trophy, path: '/leaderboard' },
    { id: 'spaces', label: 'Spaces', icon: Grid3X3, path: '/spaces' },
    { id: 'game', label: 'Game Engine', icon: Gamepad2, path: '/game' },
  ];

  const handleNavigate = (path: string, disabled?: boolean): void => {
    if (!disabled) {
      navigate(path);
    }
  };

  return (
    <motion.div
      className="sidebar"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '280px',
        height: '100vh',
        backgroundColor: colors.surface,
        borderRight: `1px solid ${colors.surfaceLight}`,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        padding: spacing.lg,
      }}
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Logo Section */}
      <div style={{ marginBottom: spacing['2xl'] }}>
        <Logo size="medium" />
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          const isDisabled = item.disabled;

          return (
            <motion.button
              key={item.id}
              onClick={() => handleNavigate(item.path, isDisabled)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing.md,
                padding: `${spacing.md} ${spacing.lg}`,
                borderRadius: '12px',
                border: 'none',
                backgroundColor: isActive ? colors.primary : 'transparent',
                color: isDisabled ? colors.textMuted : (isActive ? colors.textPrimary : colors.textSecondary),
                fontSize: '0.95rem',
                fontFamily: fonts.body,
                fontWeight: isActive ? '600' : '400',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left',
                width: '100%',
                opacity: isDisabled ? 0.5 : 1,
              }}
              whileHover={!isDisabled ? { 
                backgroundColor: isActive ? colors.primaryDark : colors.surfaceLight,
                x: 4,
              } : {}}
              whileTap={!isDisabled ? { scale: 0.98 } : {}}
            >
              <Icon size={20} />
              <span>{item.label}</span>
              {item.id === 'game' && (
                <Construction size={16} style={{ marginLeft: 'auto', opacity: 0.6 }} />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ 
        paddingTop: spacing.lg, 
        borderTop: `1px solid ${colors.surfaceLight}`,
        color: colors.textMuted,
        fontSize: '0.8rem',
        fontFamily: fonts.body,
      }}>
        <p>© 2024 ApplyWizz</p>
        <p style={{ opacity: 0.7 }}>v1.0.0</p>
      </div>
    </motion.div>
  );
};

export default Sidebar;