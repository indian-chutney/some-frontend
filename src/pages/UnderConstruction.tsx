import React from "react";
import { motion } from "framer-motion";
import { Construction } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { colors, fonts, spacing } from "../utils/theme";

interface UnderConstructionProps {
  title: string;
  description: string;
}

const UnderConstruction: React.FC<UnderConstructionProps> = ({
  title,
  description,
}) => {
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: spacing.xl,
        }}
      >
        <motion.div
          style={{
            textAlign: "center",
            maxWidth: "600px",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            style={{
              width: "120px",
              height: "120px",
              margin: `0 auto ${spacing["2xl"]} auto`,
              backgroundColor: colors.surface,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `2px solid ${colors.surfaceLight}`,
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Construction size={48} style={{ color: colors.secondary }} />
          </motion.div>

          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: colors.textPrimary,
              marginBottom: spacing.lg,
              fontFamily: fonts.logo,
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: "1.1rem",
              color: colors.textSecondary,
              lineHeight: 1.6,
              marginBottom: spacing.xl,
            }}
          >
            {description}
          </p>

          <motion.div
            style={{
              marginTop: spacing["2xl"],
              display: "flex",
              justifyContent: "center",
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
                  width: "8px",
                  height: "8px",
                  backgroundColor: colors.secondary,
                  borderRadius: "50%",
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

export default UnderConstruction;