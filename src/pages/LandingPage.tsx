import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Users, UserCheck, Shield, ArrowRight } from "lucide-react";
import { colors, fonts, spacing } from "../utils/theme";
import type { UserType } from "../contexts/contexts";

// Floating elements background
const FloatingElements = () => {
  const elements = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 40 + 20,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 2,
  }));

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      {elements.map((element) => (
        <motion.div
          key={element.id}
          style={{
            position: "absolute",
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
            borderRadius: "50%",
            opacity: 0.3,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: element.delay,
          }}
        />
      ))}
    </div>
  );
};

interface UserTypeCardProps {
  type: UserType;
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  delay: number;
}

const UserTypeCard: React.FC<UserTypeCardProps> = ({
  title,
  description,
  icon,
  onClick,
  delay,
}) => {
  return (
    <motion.div
      style={{
        backgroundColor: colors.surface,
        border: `1px solid ${colors.surfaceLight}`,
        borderRadius: "20px",
        padding: spacing["2xl"],
        textAlign: "center",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        minHeight: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        transition: "all 0.3s ease",
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        scale: 1.05,
        borderColor: colors.primary,
        boxShadow: `0 10px 30px ${colors.primary}20`,
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <motion.div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: spacing.xl,
        }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        {icon}
      </motion.div>

      <h3
        style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          color: colors.textPrimary,
          marginBottom: spacing.md,
          fontFamily: fonts.logo,
        }}
      >
        {title}
      </h3>

      <p
        style={{
          color: colors.textSecondary,
          fontSize: "1rem",
          lineHeight: 1.6,
          marginBottom: spacing.lg,
        }}
      >
        {description}
      </p>

      <motion.div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: spacing.sm,
          color: colors.primary,
          fontWeight: "600",
        }}
        whileHover={{ x: 5 }}
        transition={{ duration: 0.2 }}
      >
        Get Started
        <ArrowRight size={16} />
      </motion.div>
    </motion.div>
  );
};

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleUserTypeSelect = (userType: UserType) => {
    switch (userType) {
      case "client":
        navigate("/client/auth");
        break;
      case "mentor":
        navigate("/mentor/auth");
        break;
      case "admin":
        navigate("/admin/v1");
        break;
    }
  };

  const userTypes = [
    {
      type: "client" as UserType,
      title: "For Job Seekers",
      description: "Find experienced mentors to guide your career journey. Book sessions and get personalized advice.",
      icon: (
        <div
          style={{
            width: "80px",
            height: "80px",
            backgroundColor: `${colors.primary}20`,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Users size={40} style={{ color: colors.primary }} />
        </div>
      ),
    },
    {
      type: "mentor" as UserType,
      title: "For Mentors",
      description: "Share your expertise and help others grow. Monetize your knowledge through mentoring sessions.",
      icon: (
        <div
          style={{
            width: "80px",
            height: "80px",
            backgroundColor: `${colors.secondary}20`,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <UserCheck size={40} style={{ color: colors.secondary }} />
        </div>
      ),
    },
    {
      type: "admin" as UserType,
      title: "Administration",
      description: "Manage the platform, monitor user activity, and oversee all mentoring relationships.",
      icon: (
        <div
          style={{
            width: "80px",
            height: "80px",
            backgroundColor: `${colors.textPrimary}20`,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Shield size={40} style={{ color: colors.textPrimary }} />
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: colors.background,
        fontFamily: fonts.body,
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Floating elements background */}
      <FloatingElements />

      {/* Main content */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: spacing.xl,
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Hero section */}
        <motion.div
          style={{
            textAlign: "center",
            marginBottom: spacing["4xl"],
            maxWidth: "800px",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            style={{
              display: "inline-block",
              padding: `${spacing.sm} ${spacing.lg}`,
              backgroundColor: `${colors.primary}20`,
              borderRadius: "50px",
              marginBottom: spacing.xl,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          >
            <span
              style={{
                color: colors.primary,
                fontSize: "0.9rem",
                fontWeight: "600",
              }}
            >
              Welcome to MentorConnect
            </span>
          </motion.div>

          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: "800",
              color: colors.textPrimary,
              marginBottom: spacing.lg,
              fontFamily: fonts.logo,
              lineHeight: 1.1,
            }}
          >
            Connect. Learn.{" "}
            <span style={{ color: colors.primary }}>Grow.</span>
          </h1>

          <p
            style={{
              fontSize: "1.2rem",
              color: colors.textSecondary,
              lineHeight: 1.6,
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            The premier platform for meaningful mentorship connections. Whether you're seeking guidance or sharing expertise, start your journey here.
          </p>
        </motion.div>

        {/* User type selection cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: spacing["2xl"],
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          {userTypes.map((userType, index) => (
            <UserTypeCard
              key={userType.type}
              type={userType.type}
              title={userType.title}
              description={userType.description}
              icon={userType.icon}
              onClick={() => handleUserTypeSelect(userType.type)}
              delay={0.4 + index * 0.1}
            />
          ))}
        </div>

        {/* Footer */}
        <motion.div
          style={{
            marginTop: spacing["4xl"],
            textAlign: "center",
            color: colors.textMuted,
            fontSize: "0.9rem",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <p>
            Already have an account?{" "}
            <span
              style={{
                color: colors.primary,
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => navigate("/login")}
            >
              Sign in here
            </span>
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default LandingPage;