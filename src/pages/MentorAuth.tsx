import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, UserCheck, ArrowLeft } from "lucide-react";
import { colors, fonts, spacing } from "../utils/theme";
import { useAuthContext } from "../hooks/hooks";

const MentorAuth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
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
      if (isSignUp) {
        // Mock signup process - redirect to onboarding
        const mockToken = `mock-mentor-token-${Date.now()}`;
        login(mockToken, "mentor");
        localStorage.setItem("needsVerification", "true");
        setSuccessMsg("Account created! Redirecting to verification...");
        setTimeout(() => navigate("/mentor/onboard"), 1000);
      } else {
        // Mock login process
        const mockToken = `mock-mentor-token-${Date.now()}`;
        login(mockToken, "mentor");
        setSuccessMsg("Signed in successfully!");
        setTimeout(() => navigate("/dashboard"), 1000);
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
          border: `1px solid ${colors.surfaceLight}`,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
        }}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
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
              backgroundColor: `${colors.secondary}20`,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <UserCheck size={40} style={{ color: colors.secondary }} />
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
            {isSignUp ? "Join as Mentor" : "Mentor Portal"}
          </h1>
          <p
            style={{
              color: colors.textSecondary,
              fontSize: "0.95rem",
              margin: 0,
            }}
          >
            {isSignUp
              ? "Share your expertise and help others grow"
              : "Welcome back to your mentoring dashboard"}
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
              border: `1px solid ${colors.primary}30`,
              backgroundColor: `${colors.primary}10`,
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
              border: `1px solid ${colors.secondary}30`,
              backgroundColor: `${colors.secondary}10`,
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
          {/* Name field (signup only) */}
          {isSignUp && (
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
                Full Name
              </label>
              <div style={{ position: "relative" }}>
                <UserCheck
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
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required={isSignUp}
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
          )}

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
              Email
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
                placeholder="Enter your email"
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
              Password
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
                placeholder="Enter your password"
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
              backgroundColor: colors.secondary,
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
              transition: "all 0.2s ease",
            }}
            whileHover={!isLoading ? { backgroundColor: colors.primary } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
          >
            {isLoading ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: spacing.sm }}>
                <motion.div
                  style={{
                    width: "16px",
                    height: "16px",
                    border: "2px solid white",
                    borderTop: "2px solid transparent",
                    borderRadius: "50%",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                {isSignUp ? "Creating Account..." : "Signing In..."}
              </div>
            ) : (
              isSignUp ? "Create Account" : "Sign In"
            )}
          </motion.button>
        </motion.form>

        {/* Toggle between sign up and sign in */}
        <motion.div
          style={{
            textAlign: "center",
            marginTop: spacing.xl,
            color: colors.textMuted,
            fontSize: "0.9rem",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {isSignUp ? "Already have an account?" : "New to mentoring?"}{" "}
          <span
            style={{ color: colors.secondary, cursor: "pointer", fontWeight: "600" }}
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
          >
            {isSignUp ? "Sign In" : "Join as Mentor"}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MentorAuth;