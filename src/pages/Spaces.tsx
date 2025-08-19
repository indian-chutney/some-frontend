import React from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { Card } from "../components/ui/card";
import { colors, fonts, spacing } from "../utils/theme";

const Spaces: React.FC = () => {
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
          padding: spacing["2xl"],
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: colors.textPrimary,
              marginBottom: spacing["2xl"],
              fontFamily: fonts.logo,
            }}
          >
            Spaces
          </h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: spacing.xl,
              maxWidth: "800px",
            }}
          >
            {/* User-created Room Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card hover style={{ padding: spacing.xl }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: spacing.lg,
                  }}
                >
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: colors.primary,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        color: colors.textPrimary,
                      }}
                    >
                      MW
                    </span>
                    {/* Online indicator */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "8px",
                        right: "8px",
                        width: "16px",
                        height: "16px",
                        backgroundColor: colors.success,
                        borderRadius: "50%",
                        border: `2px solid ${colors.surface}`,
                      }}
                    />
                  </div>

                  <div>
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "600",
                        color: colors.textPrimary,
                        margin: 0,
                        marginBottom: spacing.sm,
                      }}
                    >
                      My Workspace
                    </h3>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: colors.textSecondary,
                        margin: 0,
                        marginBottom: spacing.xs,
                      }}
                    >
                      Personal productivity space
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: spacing.xs,
                        fontSize: "0.85rem",
                        color: colors.textMuted,
                      }}
                    >
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
              <Card
                hover
                style={{
                  padding: spacing.xl,
                  border: `2px dashed ${colors.surfaceLight}`,
                  backgroundColor: "transparent",
                }}
              >
                <motion.div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: spacing.lg,
                    cursor: "pointer",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: colors.surfaceLight,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
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
                        ease: "easeInOut",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "2rem",
                          fontWeight: "300",
                          color: colors.textSecondary,
                        }}
                      >
                        +
                      </span>
                    </motion.div>
                  </motion.div>

                  <div>
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "600",
                        color: colors.textPrimary,
                        margin: 0,
                        marginBottom: spacing.sm,
                      }}
                    >
                      Create a Room
                    </h3>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: colors.textSecondary,
                        margin: 0,
                      }}
                    >
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

export default Spaces;