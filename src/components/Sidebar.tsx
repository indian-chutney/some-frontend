import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  User, 
  Settings, 
  Trophy, 
  Grid3X3,
  ShoppingCart,
  Menu,
  X,
  LucideIcon,
  Users,
  Calendar,
  Monitor,
  UserCheck,
  Shield
} from 'lucide-react';
import Logo from './Logo';
import { colors, fonts, spacing } from '../utils/theme';
import { getUserType, isClient, isMentor, isAdmin } from '../utils/roleUtils';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userType = getUserType();

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  // Role-based navigation items
  const getNavigationItems = (): NavigationItem[] => {
    const baseItems = [
      { id: 'home', label: 'Dashboard', icon: Home, path: '/dashboard' },
    ];

    if (isClient()) {
      return [
        ...baseItems,
        { id: 'mentors', label: 'Find Mentors', icon: Users, path: '/mentors' },
        { id: 'bookings', label: 'My Bookings', icon: Calendar, path: '/bookings' },
        { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
      ];
    }

    if (isMentor()) {
      return [
        ...baseItems,
        { id: 'bookings', label: 'My Sessions', icon: Calendar, path: '/bookings' },
        { id: 'profile', label: 'Profile', icon: UserCheck, path: '/profile' },
        { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
      ];
    }

    if (isAdmin()) {
      return [
        { id: 'home', label: 'Dashboard', icon: Home, path: '/admin/dashboard' },
        { id: 'monitor', label: 'Monitor', icon: Monitor, path: '/admin/monitor' },
        { id: 'settings', label: 'Settings', icon: Settings, path: '/admin/settings' },
      ];
    }

    // Fallback to legacy navigation for backward compatibility
    return [
      ...baseItems,
      { id: 'avatar', label: 'Avatar', icon: User, path: '/avatar' },
      { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, path: '/leaderboard' },
      { id: 'spaces', label: 'Spaces', icon: Grid3X3, path: '/spaces' },
      { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart, path: '/marketplace' },
      { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
    ];
  };

  const navigationItems = getNavigationItems();

  const handleNavigate = (path: string, disabled?: boolean): void => {
    if (!disabled) {
      navigate(path);
      if (isMobile) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  // Mobile menu toggle button
  const MobileMenuButton = () => (
    <motion.button
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      style={{
        position: 'fixed',
        top: spacing.lg,
        left: spacing.lg,
        zIndex: 1001,
        width: '48px',
        height: '48px',
        backgroundColor: colors.surface,
        border: `1px solid ${colors.surfaceLight}`,
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      }}
      whileHover={{ backgroundColor: colors.surfaceLight }}
      whileTap={{ scale: 0.95 }}
    >
      {isMobileMenuOpen ? (
        <X size={20} style={{ color: colors.textPrimary }} />
      ) : (
        <Menu size={20} style={{ color: colors.textPrimary }} />
      )}
    </motion.button>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && <MobileMenuButton />}

      {/* Sidebar */}
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
          transform: isMobile && !isMobileMenuOpen ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'transform 0.3s ease',
        }}
        initial={{ x: isMobile ? -280 : 0 }}
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
              </motion.button>
            );
          })}
        </nav>

        {/* XP & Coins Display */}
        <div style={{
          padding: spacing.lg,
          backgroundColor: colors.surfaceLight,
          borderRadius: '12px',
          marginBottom: spacing.lg,
          border: `1px solid ${colors.primary}20`,
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: spacing.sm,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
              <div style={{
                width: '8px',
                height: '8px',
                backgroundColor: colors.primary,
                borderRadius: '50%',
                boxShadow: `0 0 8px ${colors.primary}`,
              }} />
              <span style={{
                color: colors.textPrimary,
                fontSize: '0.9rem',
                fontWeight: '600',
                fontFamily: fonts.body,
              }}>
                XP
              </span>
            </div>
            <span style={{
              color: colors.primary,
              fontSize: '1.1rem',
              fontWeight: '700',
              fontFamily: fonts.body,
            }}>
              {Math.floor(Math.random() * 5000) + 2500}
            </span>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
              <div style={{
                width: '8px',
                height: '8px',
                backgroundColor: colors.secondary,
                borderRadius: '50%',
                boxShadow: `0 0 8px ${colors.secondary}`,
              }} />
              <span style={{
                color: colors.textPrimary,
                fontSize: '0.9rem',
                fontWeight: '600',
                fontFamily: fonts.body,
              }}>
                Coins
              </span>
            </div>
            <span style={{
              color: colors.secondary,
              fontSize: '1.1rem',
              fontWeight: '700',
              fontFamily: fonts.body,
            }}>
              {Math.floor(Math.random() * 1500) + 750}
            </span>
          </div>
        </div>

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

      {/* Mobile Menu Overlay */}
      {isMobile && isMobileMenuOpen && (
        <motion.div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;