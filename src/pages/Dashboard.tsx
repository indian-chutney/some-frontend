import React from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import {
  Target,
  TrendingUp,
  Calendar,
  Trophy,
  Zap,
  LucideIcon,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import { Card, CardContent } from "../components/ui/card";
import { colors, fonts, spacing } from "../utils/theme";

interface ThanosCharacterProps {
  scrollY: MotionValue<number>;
}

interface ProgressCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  subtitle: string;
  color: string;
  delay?: number;
}

interface ProgressDataItem {
  icon: LucideIcon;
  title: string;
  value: string;
  subtitle: string;
  color: string;
}

const ThanosCharacter: React.FC<ThanosCharacterProps> = ({ scrollY }) => {
  const scale = useTransform(scrollY, [0, 300], [1, 0.6]);
  const y = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  return (
    <motion.div
      style={{
        scale,
        y,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: spacing.xl,
      }}
    >
      {/* Thanos Character Placeholder */}
      <motion.div
        style={{
          width: "200px",
          height: "280px",
          background: `linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #3b82f6 100%)`,
          borderRadius: "50% 50% 45% 45%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 20px 60px ${colors.primary}40`,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: "spring", bounce: 0.3 }}
        whileHover={{ scale: 1.05 }}
      >
        {/* Face */}
        <div
          style={{
            position: "absolute",
            top: "30%",
            width: "120px",
            height: "80px",
            backgroundColor: colors.surface,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Eyes */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <motion.div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: colors.secondary,
                borderRadius: "50%",
                boxShadow: `0 0 10px ${colors.secondary}`,
              }}
              animate={{
                boxShadow: [
                  `0 0 10px ${colors.secondary}`,
                  `0 0 20px ${colors.secondary}`,
                  `0 0 10px ${colors.secondary}`,
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: colors.secondary,
                borderRadius: "50%",
                boxShadow: `0 0 10px ${colors.secondary}`,
              }}
              animate={{
                boxShadow: [
                  `0 0 10px ${colors.secondary}`,
                  `0 0 20px ${colors.secondary}`,
                  `0 0 10px ${colors.secondary}`,
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
            />
          </div>
        </div>

        {/* Gauntlet/Power indicator */}
        <motion.div
          style={{
            position: "absolute",
            bottom: "20%",
            right: "10%",
            width: "40px",
            height: "40px",
            background: `linear-gradient(45deg, ${colors.secondary}, ${colors.warning})`,
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 20px ${colors.secondary}40`,
          }}
          animate={{
            boxShadow: [
              `0 0 20px ${colors.secondary}40`,
              `0 0 30px ${colors.secondary}60`,
              `0 0 20px ${colors.secondary}40`,
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Zap size={20} style={{ color: colors.textPrimary }} />
        </motion.div>
      </motion.div>

      {/* Name and Title */}
      <motion.div
        style={{ textAlign: "center" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            fontWeight: "700",
            color: colors.textPrimary,
            margin: 0,
            marginBottom: spacing.xs,
            fontFamily: fonts.logo,
          }}
        >
          Thanos
        </h2>
        <p
          style={{
            color: colors.textSecondary,
            fontSize: "1rem",
            margin: 0,
          }}
        >
          The Balancer
        </p>
      </motion.div>
    </motion.div>
  );
};

const HPBar: React.FC = () => {
  const hp = 85;

  return (
    <motion.div
      style={{
        marginTop: spacing.xl,
        textAlign: "center",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: spacing.sm,
        }}
      >
        <span
          style={{
            color: colors.textSecondary,
            fontSize: "0.9rem",
            fontWeight: "600",
          }}
        >
          Power Level
        </span>
        <span
          style={{
            color: colors.textPrimary,
            fontSize: "1rem",
            fontWeight: "700",
          }}
        >
          {hp}/100
        </span>
      </div>

      <div
        style={{
          width: "100%",
          height: "12px",
          backgroundColor: colors.hpBackground,
          borderRadius: "6px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            backgroundColor:
              hp > 70
                ? colors.hpFull
                : hp > 30
                ? colors.hpMedium
                : colors.hpLow,
            borderRadius: "6px",
            boxShadow:
              hp > 70
                ? `0 0 10px ${colors.hpFull}40`
                : hp > 30
                ? `0 0 10px ${colors.hpMedium}40`
                : `0 0 10px ${colors.hpLow}40`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${hp}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Shimmer effect */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          }}
          animate={{ left: ["−100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        />
      </div>
    </motion.div>
  );
};

const ProgressCard: React.FC<ProgressCardProps> = ({
  icon: Icon,
  title,
  value,
  subtitle,
  color,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <Card hover style={{ padding: spacing.lg }}>
        <CardContent>
          {/* Apple Watch Style Ring */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: spacing.lg,
              marginBottom: spacing.md,
            }}
          >
            <div
              style={{
                position: "relative",
                width: "80px",
                height: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Background ring */}
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  border: `6px solid ${color}20`,
                }}
              />

              {/* Progress ring */}
              <motion.div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  border: `6px solid transparent`,
                  borderTopColor: color,
                  borderRightColor: color,
                  borderBottomColor: color,
                  transform: "rotate(-90deg)",
                }}
                initial={{ clipPath: "inset(0 50% 0 0)" }}
                animate={{ clipPath: "inset(0 15% 0 0)" }}
                transition={{
                  duration: 1.5,
                  delay: delay + 0.3,
                  ease: "easeOut",
                }}
              />

              {/* Icon in center */}
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: `${color}20`,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 2,
                }}
              >
                <Icon size={24} style={{ color }} />
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: "2.2rem",
                  fontWeight: "800",
                  color: colors.textPrimary,
                  marginBottom: spacing.xs,
                  fontFamily: fonts.logo,
                  lineHeight: 1,
                }}
              >
                {value}
              </div>

              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: colors.textSecondary,
                  margin: 0,
                  marginBottom: spacing.xs,
                }}
              >
                {title}
              </h3>

              <p
                style={{
                  fontSize: "0.85rem",
                  color: colors.textMuted,
                  margin: 0,
                }}
              >
                {subtitle}
              </p>
            </div>
          </div>

          {/* Sparkle effect */}
          <motion.div
            style={{
              position: "absolute",
              top: "10%",
              right: "10%",
              width: "6px",
              height: "6px",
              backgroundColor: color,
              borderRadius: "50%",
              boxShadow: `0 0 10px ${color}`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay,
            }}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Dashboard: React.FC = () => {
  const { scrollY } = useScroll();
  const progressY = useTransform(scrollY, [200, 500], [100, 0]);
  const progressOpacity = useTransform(scrollY, [150, 300], [0, 1]);

  const progressData: ProgressDataItem[] = [
    {
      icon: Target,
      title: "Today's Tasks",
      value: "12",
      subtitle: "+12% from yesterday",
      color: colors.success,
    },
    {
      icon: TrendingUp,
      title: "This Week",
      value: "58",
      subtitle: "+2% from last week",
      color: colors.primary,
    },
    {
      icon: Calendar,
      title: "This Month",
      value: "98",
      subtitle: "+5% from last month",
      color: colors.secondary,
    },
    {
      icon: Trophy,
      title: "All Time",
      value: "389",
      subtitle: "Better than 45% (above average)",
      color: colors.primary,
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: colors.background,
        fontFamily: fonts.body,
        display: "flex",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          marginLeft: window.innerWidth >= 1024 ? "280px" : "0",
          position: "relative",
        }}
      >
        {/* Hero Section - Full Height */}
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: window.innerWidth >= 768 ? spacing["2xl"] : spacing.lg,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background gradient */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: `radial-gradient(ellipse at center, ${colors.primary}10 0%, transparent 70%)`,
              zIndex: 1,
            }}
          />

          <ThanosCharacter scrollY={scrollY} />
          <HPBar />

          {/* Welcome Message */}
          <motion.div
            style={{
              textAlign: "center",
              marginTop: spacing["3xl"],
              zIndex: 10,
              padding: `0 ${spacing.md}`,
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <h1
              style={{
                fontSize: window.innerWidth >= 768 ? "2.5rem" : "2rem",
                fontWeight: "800",
                color: colors.textPrimary,
                margin: 0,
                marginBottom: spacing.md,
                background: `linear-gradient(135deg, ${colors.textPrimary} 0%, ${colors.primaryLight} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Welcome Back, Hero
            </h1>
            <p
              style={{
                fontSize: window.innerWidth >= 768 ? "1.2rem" : "1rem",
                color: colors.textSecondary,
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              Ready to balance productivity and achieve perfectly balanced
              goals?
            </p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            style={{
              position: "absolute",
              bottom: spacing["2xl"],
              left: "50%",
              transform: "translateX(-50%)",
            }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div
              style={{
                width: "2px",
                height: "40px",
                backgroundColor: colors.primary,
                borderRadius: "1px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <motion.div
                style={{
                  position: "absolute",
                  top: "-20px",
                  left: 0,
                  width: "100%",
                  height: "20px",
                  backgroundColor: colors.primaryLight,
                  borderRadius: "1px",
                }}
                animate={{ top: ["−20px", "40px"] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Progress Section - Separate scrollable area */}
        <motion.div
          style={{
            y: progressY,
            opacity: progressOpacity,
            padding: window.innerWidth >= 768 ? spacing["2xl"] : spacing.lg,
            backgroundColor: colors.background,
            position: "relative",
            zIndex: 10,
            minHeight: "100vh",
          }}
        >
          <motion.div
            style={{
              textAlign: "center",
              marginBottom: spacing["3xl"],
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              style={{
                fontSize: window.innerWidth >= 768 ? "2rem" : "1.5rem",
                fontWeight: "700",
                color: colors.textPrimary,
                margin: 0,
                marginBottom: spacing.md,
                fontFamily: fonts.logo,
              }}
            >
              Today's Progress
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: colors.textSecondary,
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              Track your journey towards perfect balance
            </p>
          </motion.div>

          {/* Progress Grid - Responsive */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                window.innerWidth >= 1024
                  ? "repeat(3, 1fr)"
                  : window.innerWidth >= 640
                  ? "repeat(2, 1fr)"
                  : "1fr",
              gap: window.innerWidth >= 768 ? spacing.xl : spacing.lg,
              marginBottom: spacing["3xl"],
            }}
          >
            {progressData.map((item, index) => (
              <ProgressCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                value={item.value}
                subtitle={item.subtitle}
                color={item.color}
                delay={index * 0.1}
              />
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;

