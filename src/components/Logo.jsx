import React from 'react';
import { motion } from 'framer-motion';
import { colors, fonts } from '../utils/theme';

const Logo = ({ size = 'medium', showText = true, className = '' }) => {
  const sizes = {
    small: { width: 32, height: 32, fontSize: '1.2rem' },
    medium: { width: 48, height: 48, fontSize: '1.5rem' },
    large: { width: 64, height: 64, fontSize: '2rem' },
  };

  const currentSize = sizes[size];

  return (
    <motion.div 
      className={`flex items-center gap-3 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Placeholder logo - a simple geometric icon */}
      <div 
        style={{
          width: currentSize.width,
          height: currentSize.height,
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div 
          style={{
            width: '60%',
            height: '60%',
            background: colors.textPrimary,
            borderRadius: '4px',
            opacity: 0.9,
          }}
        />
        <div 
          style={{
            position: 'absolute',
            top: '20%',
            right: '20%',
            width: '30%',
            height: '30%',
            background: colors.secondary,
            borderRadius: '50%',
          }}
        />
      </div>
      
      {showText && (
        <motion.span 
          style={{
            fontFamily: fonts.logo,
            fontSize: currentSize.fontSize,
            fontWeight: '700',
            color: colors.textPrimary,
            letterSpacing: '-0.02em',
          }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          ProductivePro
        </motion.span>
      )}
    </motion.div>
  );
};

export default Logo;