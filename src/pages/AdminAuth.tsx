import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Shield, ArrowLeft } from "lucide-react";
import { colors, fonts, spacing } from "../utils/theme";
import { useAuthContext } from "../hooks/hooks";

const AdminAuth: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      // Mock authentication - replace with actual API call
      // For admin, we could have stricter validation
      if (email === "admin@mentorconnect.com" && password === "admin123") {
        const mockToken = `mock-admin-token-${Date.now()}`;
        login(mockToken, "admin");
        setSuccessMsg("Admin access granted!");
        setTimeout(() => navigate("/admin/dashboard"), 1000);
      } else {
        setErrorMsg("Invalid admin credentials. Access denied.");
      }
    } catch (error) {
      setErrorMsg("Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: colors.background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: spacing.lg,
        fontFamily: fonts.body,
        position: "relative",
      }}
    >
      {/* Back button */}
      <motion.button
        style={{
          position: "absolute",
          top: spacing.xl,
          left: spacing.xl,
          display: "flex",
          alignItems: "center",
          gap: spacing.sm,
          backgroundColor: "transparent",
          border: `1px solid ${colors.surfaceLight}`,
          borderRadius: "12px",
          padding: `${spacing.sm} ${spacing.md}`,
          color: colors.textSecondary,
          cursor: "pointer",
          zIndex: 20,
        }}
        whileHover={{ backgroundColor: colors.surface }}
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={16} />
        Back to Home
      </motion.button>

      <motion.div
        style={{
          width: "100%",
          maxWidth: "450px",
          backgroundColor: colors.surface,
          padding: spacing["3xl"],
          borderRadius: "24px",
          border: `2px solid ${colors.textPrimary}20`,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
        }}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Security warning banner */}
        <motion.div
          style={{
            backgroundColor: `${colors.textPrimary}10`,
            border: `1px solid ${colors.textPrimary}30`,
            borderRadius: "12px",
            padding: spacing.md,
            marginBottom: spacing.xl,
            textAlign: "center",
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Shield size={20} style={{ color: colors.textPrimary, marginBottom: spacing.sm }} />
          <p
            style={{
              color: colors.textPrimary,
              fontSize: "0.85rem",
              fontWeight: "600",
              margin: 0,
            }}
          >
            SECURE ADMIN ACCESS
          </p>
        </motion.div>

        {/* Logo placeholder */}
        <motion.div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: spacing.xl,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: `${colors.textPrimary}20`,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `2px solid ${colors.textPrimary}30`,
            }}
          >
            <Shield size={40} style={{ color: colors.textPrimary }} />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          style={{ textAlign: "center", marginBottom: spacing["2xl"] }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1
            style={{
              fontSize: "1.8rem",
              fontWeight: "700",
              color: colors.textPrimary,
              margin: 0,
              marginBottom: spacing.sm,
              fontFamily: fonts.logo,
            }}
          >
            Admin Portal
          </h1>
          <p
            style={{
              color: colors.textSecondary,
              fontSize: "0.95rem",
              margin: 0,
            }}
          >
            Secure access to administrative functions
          </p>
        </motion.div>

        {/* Status messages */}
        {errorMsg && (
          <div
            role="alert"
            aria-live="assertive"
            style={{
              marginBottom: spacing.lg,
              padding: spacing.md,
              borderRadius: "12px",
              border: "1px solid #ef444430",
              backgroundColor: "#ef444410",
              color: "#ef4444",
              fontSize: "0.9rem",
            }}
          >
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div
            role="status"
            aria-live="polite"
            style={{
              marginBottom: spacing.lg,
              padding: spacing.md,
              borderRadius: "12px",
              border: "1px solid #10b98130",
              backgroundColor: "#10b98110",
              color: "#10b981",
              fontSize: "0.9rem",
            }}
          >
            {successMsg}
          </div>
        )}

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Email Field */}
          <div style={{ marginBottom: spacing.lg }}>
            <label
              style={{
                display: "block",
                fontSize: "0.9rem",
                fontWeight: "600",
                color: colors.textSecondary,
                marginBottom: spacing.sm,
              }}
            >
              Admin Email
            </label>
            <div style={{ position: "relative" }}>
              <Mail
                size={20}
                style={{
                  position: "absolute",
                  left: spacing.md,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: colors.textMuted,
                }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email"
                required
                style={{
                  width: "100%",
                  padding: `${spacing.md} ${spacing.md} ${spacing.md} 3rem`,
                  backgroundColor: colors.background,
                  border: `1px solid ${colors.surfaceLight}`,
                  borderRadius: "12px",
                  color: colors.textPrimary,
                  fontSize: "0.95rem",
                  outline: "none",
                  transition: "all 0.2s ease",
                }}
              />
            </div>
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: spacing.xl }}>
            <label
              style={{
                display: "block",
                fontSize: "0.9rem",
                fontWeight: "600",
                color: colors.textSecondary,
                marginBottom: spacing.sm,
              }}
            >
              Admin Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock
                size={20}
                style={{
                  position: "absolute",
                  left: spacing.md,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: colors.textMuted,
                }}
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                style={{
                  width: "100%",
                  padding: `${spacing.md} 3rem ${spacing.md} 3rem`,
                  backgroundColor: colors.background,
                  border: `1px solid ${colors.surfaceLight}`,
                  borderRadius: "12px",
                  color: colors.textPrimary,
                  fontSize: "0.95rem",
                  outline: "none",
                  transition: "all 0.2s ease",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: spacing.md,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: colors.textMuted,
                  cursor: "pointer",
                  padding: "4px",
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: spacing.lg,
              backgroundColor: colors.textPrimary,
              color: colors.background,
              border: "none",
              borderRadius: "12px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
              transition: "all 0.2s ease",
            }}
            whileHover={!isLoading ? { backgroundColor: "#f5f5f5" } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
          >
            {isLoading ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: spacing.sm }}>
                <motion.div
                  style={{
                    width: "16px",
                    height: "16px",
                    border: `2px solid ${colors.background}`,
                    borderTop: "2px solid transparent",
                    borderRadius: "50%",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Authenticating...
              </div>
            ) : (
              "Access Admin Portal"
            )}
          </motion.button>
        </motion.form>

        {/* Security notice */}
        <motion.div
          style={{
            textAlign: "center",
            marginTop: spacing.xl,
            color: colors.textMuted,
            fontSize: "0.8rem",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p style={{ margin: 0 }}>
            🔒 This is a secure area. All access attempts are logged.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminAuth;