import React from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import {
  Target,
  TrendingUp,
  Calendar,
  Trophy,
  Zap,
  LucideIcon,
  AlertCircle,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import { Card, CardContent } from "../components/ui/card";
import { colors, fonts, spacing } from "../utils/theme";
import { useThanosHp, useTasksInfo, useApiError, useUserInfo } from "../hooks/useApi";

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
  const { data: thanosHp, isLoading, error } = useThanosHp();
  const errorMessage = useApiError(error);
  
  // Use default values while loading or if data is not available
  const hp = thanosHp?.hp ?? 85;
  const totalHp = thanosHp?.total_hp ?? 100;
  const hpPercentage = (hp / totalHp) * 100;

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
        <div style={{ display: "flex", alignItems: "center", gap: spacing.xs }}>
          {isLoading && (
            <motion.div
              style={{
                width: "12px",
                height: "12px",
                border: `2px solid ${colors.surfaceLight}`,
                borderTop: `2px solid ${colors.primary}`,
                borderRadius: "50%",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          )}
          {errorMessage && (
            <AlertCircle size={16} style={{ color: colors.error }} />
          )}
          <span
            style={{
              color: colors.textPrimary,
              fontSize: "1rem",
              fontWeight: "700",
            }}
          >
            {hp}/{totalHp}
          </span>
        </div>
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
              hpPercentage > 70
                ? colors.hpFull
                : hpPercentage > 30
                ? colors.hpMedium
                : colors.hpLow,
            borderRadius: "6px",
            boxShadow:
              hpPercentage > 70
                ? `0 0 10px ${colors.hpFull}40`
                : hpPercentage > 30
                ? `0 0 10px ${colors.hpMedium}40`
                : `0 0 10px ${colors.hpLow}40`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${hpPercentage}%` }}
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

      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginTop: spacing.sm,
            padding: spacing.sm,
            backgroundColor: `${colors.error}20`,
            borderRadius: "6px",
            fontSize: "0.85rem",
            color: colors.error,
          }}
        >
          {errorMessage}
        </motion.div>
      )}
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

  // Fetch API data
  const { data: tasksInfo, isLoading: tasksLoading, error: tasksError } = useTasksInfo();
  const { data: userInfo, isLoading: userLoading } = useUserInfo();
  const tasksErrorMessage = useApiError(tasksError);

  // Check if user is career associate for role-based access
  const isCareerAssociate = userInfo?.role === 'career-associate';
  const showProgressCards = isCareerAssociate;

  const progressData: ProgressDataItem[] = [
    {
      icon: Target,
      title: "Today's Tasks",
      value: tasksInfo?.today?.toString() ?? "12",
      subtitle: "+12% from yesterday",
      color: colors.success,
    },
    {
      icon: TrendingUp,
      title: "This Week",
      value: tasksInfo?.week?.toString() ?? "58",
      subtitle: "+2% from last week",
      color: colors.primary,
    },
    {
      icon: Calendar,
      title: "This Month",
      value: tasksInfo?.month?.toString() ?? "98",
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

        {/* Progress Section - Only for Career Associates */}
        {showProgressCards ? (
          <motion.div
            style={{
              y: progressY,
              opacity: progressOpacity,
              padding: window.innerWidth >= 768 ? spacing["2xl"] : spacing.lg,
              backgroundColor: colors.background,
              position: "relative",
              zIndex: 10,
              minHeight: "100vh",
              borderTop: `1px solid ${colors.surfaceLight}20`,
              background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.surface}20 50%, ${colors.background} 100%)`,
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
              <motion.h1
                style={{
                  fontSize: window.innerWidth >= 768 ? "2.5rem" : "2rem",
                  fontWeight: "800",
                  color: colors.textPrimary,
                  margin: 0,
                  marginBottom: spacing.lg,
                  background: `linear-gradient(135deg, ${colors.textPrimary} 0%, ${colors.primaryLight} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Welcome Back, Hero
              </motion.h1>
              <motion.p
                style={{
                  fontSize: window.innerWidth >= 768 ? "1.2rem" : "1rem",
                  color: colors.textSecondary,
                  margin: 0,
                  marginBottom: spacing.lg,
                  lineHeight: 1.6,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Ready to balance productivity and achieve perfectly balanced
                goals?
              </motion.p>
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

              {/* Error message for tasks data */}
              {tasksErrorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginTop: spacing.lg,
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
                  {tasksErrorMessage}
                </motion.div>
              )}

              {/* Loading indicator for tasks data */}
              {tasksLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginTop: spacing.lg,
                    display: "flex",
                    alignItems: "center",
                    gap: spacing.sm,
                    justifyContent: "center",
                    color: colors.textSecondary,
                  }}
                >
                  <motion.div
                    style={{
                      width: "16px",
                      height: "16px",
                      border: `2px solid ${colors.surfaceLight}`,
                      borderTop: `2px solid ${colors.primary}`,
                      borderRadius: "50%",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Loading progress data...
                </motion.div>
              )}
            </motion.div>

            {/* Progress Grid - Responsive and Centered */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    window.innerWidth >= 1024
                      ? "repeat(2, minmax(300px, 400px))"
                      : window.innerWidth >= 640
                      ? "repeat(2, 1fr)"
                      : "1fr",
                  gap: window.innerWidth >= 768 ? spacing.xl : spacing.lg,
                  marginBottom: spacing["3xl"],
                  justifyContent: "center",
                  width: "100%",
                  maxWidth: "900px",
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
            </div>
          </motion.div>
        ) : (
          /* Alternative section for non-career associates */
          <motion.div
            style={{
              y: progressY,
              opacity: progressOpacity,
              padding: window.innerWidth >= 768 ? spacing["2xl"] : spacing.lg,
              backgroundColor: colors.background,
              position: "relative",
              zIndex: 10,
              minHeight: "100vh",
              borderTop: `1px solid ${colors.surfaceLight}20`,
              background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.surface}20 50%, ${colors.background} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.div
              style={{
                textAlign: "center",
                maxWidth: "600px",
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
                  marginBottom: spacing.lg,
                  fontFamily: fonts.logo,
                }}
              >
                Welcome to ApplyWizz
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: colors.textSecondary,
                  margin: 0,
                  lineHeight: 1.6,
                  marginBottom: spacing.lg,
                }}
              >
                Your journey to productivity perfection starts here. Check out the leaderboard to see how you stack up against other heroes!
              </p>
              <motion.div
                style={{
                  padding: spacing.xl,
                  backgroundColor: `${colors.primary}10`,
                  borderRadius: "12px",
                  border: `1px solid ${colors.primary}20`,
                }}
                whileHover={{ backgroundColor: `${colors.primary}15` }}
              >
                <Trophy size={48} style={{ color: colors.primary, margin: "0 auto", marginBottom: spacing.md }} />
                <p style={{ color: colors.textSecondary, fontSize: "0.9rem", margin: 0 }}>
                  Detailed progress tracking is available for Career Associates. Upgrade your role in Settings to unlock advanced analytics!
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
