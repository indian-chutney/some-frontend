import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Check, ArrowRight, Shuffle } from 'lucide-react';
import { colors, fonts, spacing } from '../utils/theme';

type AvatarPattern = 'dots' | 'stripes' | 'waves' | 'gradient' | 'solid';

interface Avatar {
  id: number;
  color: string;
  pattern: AvatarPattern;
  accent: string;
}

interface AvatarIconProps {
  avatar: Avatar;
  isSelected: boolean;
  onClick: () => void;
}

const avatarData: Avatar[] = [
  { id: 1, color: colors.primary, pattern: 'dots', accent: colors.secondary },
  { id: 2, color: colors.secondary, pattern: 'stripes', accent: colors.primary },
  { id: 3, color: colors.success, pattern: 'gradient', accent: colors.warning },
  { id: 4, color: colors.warning, pattern: 'solid', accent: colors.success },
  { id: 5, color: '#8b5cf6', pattern: 'waves', accent: colors.primary },
  { id: 6, color: '#ec4899', pattern: 'dots', accent: colors.secondary },
  { id: 7, color: '#06b6d4', pattern: 'gradient', accent: colors.warning },
  { id: 8, color: '#84cc16', pattern: 'stripes', accent: colors.primary },
  { id: 9, color: '#f97316', pattern: 'waves', accent: colors.success },
];

const AvatarIcon: React.FC<AvatarIconProps> = ({ avatar, isSelected, onClick }) => {
  const getPatternStyle = (): React.CSSProperties => {
    switch (avatar.pattern) {
      case 'dots':
        return {
          backgroundImage: `radial-gradient(circle at 25% 25%, ${avatar.accent}40 2px, transparent 2px), radial-gradient(circle at 75% 75%, ${avatar.accent}40 2px, transparent 2px)`,
          backgroundSize: '20px 20px',
        };
      case 'stripes':
        return {
          backgroundImage: `linear-gradient(45deg, ${avatar.accent}20 25%, transparent 25%, transparent 75%, ${avatar.accent}20 75%)`,
          backgroundSize: '16px 16px',
        };
      case 'waves':
        return {
          backgroundImage: `repeating-linear-gradient(45deg, ${avatar.accent}20, ${avatar.accent}20 4px, transparent 4px, transparent 12px)`,
        };
      case 'gradient':
        return {
          background: `linear-gradient(135deg, ${avatar.color} 0%, ${avatar.accent} 100%)`,
        };
      default:
        return {};
    }
  };

  return (
    <motion.div
      onClick={onClick}
      style={{
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        backgroundColor: avatar.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        border: isSelected ? `3px solid ${colors.primary}` : `3px solid transparent`,
        transition: 'all 0.3s ease',
        ...getPatternStyle(),
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: avatar.id * 0.1 }}
    >
      <User 
        size={40} 
        style={{ 
          color: colors.textPrimary, 
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
          zIndex: 2,
        }}
      />
      
      {isSelected && (
        <motion.div
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '24px',
            height: '24px',
            backgroundColor: colors.primary,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
        >
          <Check size={14} style={{ color: colors.textPrimary }} />
        </motion.div>
      )}
    </motion.div>
  );
};

const AvatarSelection: React.FC = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [isRandomizing, setIsRandomizing] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleContinue = (): void => {
    if (selectedAvatar) {
      // Store selected avatar in localStorage for later use
      localStorage.setItem('selectedAvatar', JSON.stringify(selectedAvatar));
      navigate('/dashboard');
    }
  };

  const handleRandomize = (): void => {
    setIsRandomizing(true);
    
    // Animate through random selections
    let count = 0;
    const interval = setInterval(() => {
      const randomAvatar = avatarData[Math.floor(Math.random() * avatarData.length)];
      setSelectedAvatar(randomAvatar);
      count++;
      
      if (count >= 8) {
        clearInterval(interval);
        setIsRandomizing(false);
      }
    }, 150);
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
          maxWidth: '800px',
          textAlign: 'center',
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <motion.div
          style={{ marginBottom: spacing['3xl'] }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: colors.textPrimary,
            margin: 0,
            marginBottom: spacing.md,
            background: `linear-gradient(135deg, ${colors.textPrimary} 0%, ${colors.primaryLight} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Choose Your Avatar
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: colors.textSecondary,
            margin: 0,
            lineHeight: 1.6,
          }}>
            Pick an avatar that represents you, or let us surprise you!
          </p>
        </motion.div>

        {/* Randomize Button */}
        <motion.div
          style={{ marginBottom: spacing['2xl'] }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            onClick={handleRandomize}
            disabled={isRandomizing}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing.sm,
              margin: '0 auto',
              padding: `${spacing.md} ${spacing.xl}`,
              backgroundColor: colors.surfaceLight,
              color: colors.textSecondary,
              border: `1px solid ${colors.surfaceLight}`,
              borderRadius: '12px',
              fontSize: '0.9rem',
              fontWeight: '500',
              fontFamily: fonts.body,
              cursor: isRandomizing ? 'not-allowed' : 'pointer',
              opacity: isRandomizing ? 0.7 : 1,
            }}
            whileHover={!isRandomizing ? { backgroundColor: colors.surface, borderColor: colors.primary } : {}}
            whileTap={!isRandomizing ? { scale: 0.95 } : {}}
          >
            <motion.div
              animate={isRandomizing ? { rotate: 360 } : {}}
              transition={isRandomizing ? { duration: 0.5, repeat: Infinity, ease: 'linear' } : {}}
            >
              <Shuffle size={16} />
            </motion.div>
            {isRandomizing ? 'Randomizing...' : 'Surprise Me!'}
          </motion.button>
        </motion.div>

        {/* Avatar Grid */}
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: spacing.xl,
            marginBottom: spacing['3xl'],
            justifyItems: 'center',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {avatarData.map((avatar) => (
            <AvatarIcon
              key={avatar.id}
              avatar={avatar}
              isSelected={selectedAvatar?.id === avatar.id}
              onClick={() => setSelectedAvatar(avatar)}
            />
          ))}
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.button
            onClick={handleContinue}
            disabled={!selectedAvatar}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing.md,
              margin: '0 auto',
              padding: `${spacing.lg} ${spacing['2xl']}`,
              backgroundColor: selectedAvatar ? colors.primary : colors.surfaceLight,
              color: selectedAvatar ? colors.textPrimary : colors.textMuted,
              border: 'none',
              borderRadius: '16px',
              fontSize: '1.1rem',
              fontWeight: '600',
              fontFamily: fonts.body,
              cursor: selectedAvatar ? 'pointer' : 'not-allowed',
              opacity: selectedAvatar ? 1 : 0.5,
              transition: 'all 0.3s ease',
            }}
            whileHover={selectedAvatar ? { 
              backgroundColor: colors.primaryDark,
              scale: 1.05,
            } : {}}
            whileTap={selectedAvatar ? { scale: 0.95 } : {}}
          >
            <span>Continue to Dashboard</span>
            {selectedAvatar && (
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
            )}
          </motion.button>
        </motion.div>

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
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[0, 1, 2].map((step) => (
            <motion.div
              key={step}
              style={{
                width: step === 1 ? '32px' : '8px',
                height: '8px',
                backgroundColor: step <= 1 ? colors.primary : colors.surfaceLight,
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
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          Step 2 of 3 - Avatar Selection
        </motion.p>
      </motion.div>
    </div>
  );
};

export default AvatarSelection;