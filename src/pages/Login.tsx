import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fonts, spacing } from "../utils/theme";
import AnimatedBackground from "./../components/ui/AnimatedBackground.tsx";
import Logo from "../components/Logo.tsx";
import { useAuthContext } from "../hooks/hooks.tsx";
import axios from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState("");
  
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoggingIn) return;

    setIsLoggingIn(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token } = response.data;
      login(token);
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(
        err.response?.data?.message || 
        err.response?.data?.error || 
        "Login failed. Please check your credentials."
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <AnimatedBackground />
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: spacing.lg,
          fontFamily: fonts.body,
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          style={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "rgba(22, 27, 34, 0.95)",
            backdropFilter: "blur(20px)",
            padding: spacing["3xl"],
            borderRadius: "24px",
            border: "1px solid rgba(48, 54, 61, 0.8)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
            position: "relative",
          }}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Custom Logo with props */}
          <Logo size="large" showText={true} />

          {/* Title */}
          <motion.div
            style={{ textAlign: "center", marginBottom: spacing["2xl"] }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1
              style={{
                fontSize: "1.8rem",
                fontWeight: "700",
                color: "#f0f6fc",
                margin: 0,
                marginBottom: spacing.sm,
                fontFamily: fonts.logo,
              }}
            >
              Welcome Back
            </h1>
            <p
              style={{
                color: "#8b949e",
                fontSize: "0.95rem",
                margin: 0,
              }}
            >
              Sign in to continue your journey
            </p>
          </motion.div>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  borderRadius: "8px",
                  padding: spacing.md,
                  marginBottom: spacing.lg,
                  color: "#fca5a5",
                  fontSize: "0.9rem",
                  textAlign: "center",
                }}
              >
                {error}
              </motion.div>
            )}

            <motion.div
              style={{ marginBottom: spacing.lg }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  color: "#f0f6fc",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  marginBottom: spacing.sm,
                }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoggingIn}
                style={{
                  width: "100%",
                  padding: spacing.md,
                  backgroundColor: "rgba(48, 54, 61, 0.6)",
                  border: "1px solid rgba(48, 54, 61, 0.8)",
                  borderRadius: "8px",
                  color: "#f0f6fc",
                  fontSize: "1rem",
                  fontFamily: fonts.body,
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#58a6ff";
                  e.target.style.backgroundColor = "rgba(48, 54, 61, 0.8)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(48, 54, 61, 0.8)";
                  e.target.style.backgroundColor = "rgba(48, 54, 61, 0.6)";
                }}
              />
            </motion.div>

            <motion.div
              style={{ marginBottom: spacing.xl }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <label
                htmlFor="password"
                style={{
                  display: "block",
                  color: "#f0f6fc",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  marginBottom: spacing.sm,
                }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoggingIn}
                style={{
                  width: "100%",
                  padding: spacing.md,
                  backgroundColor: "rgba(48, 54, 61, 0.6)",
                  border: "1px solid rgba(48, 54, 61, 0.8)",
                  borderRadius: "8px",
                  color: "#f0f6fc",
                  fontSize: "1rem",
                  fontFamily: fonts.body,
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#58a6ff";
                  e.target.style.backgroundColor = "rgba(48, 54, 61, 0.8)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(48, 54, 61, 0.8)";
                  e.target.style.backgroundColor = "rgba(48, 54, 61, 0.6)";
                }}
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={isLoggingIn || !email || !password}
              style={{
                width: "100%",
                padding: spacing.lg,
                backgroundColor: isLoggingIn || !email || !password ? "#4b5563" : "#2F2F95",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                fontSize: "1rem",
                fontWeight: "600",
                fontFamily: fonts.body,
                cursor: isLoggingIn || !email || !password ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                marginBottom: spacing.xl,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: spacing.md,
                opacity: isLoggingIn || !email || !password ? 0.7 : 1,
                position: "relative",
                overflow: "hidden",
              }}
              whileHover={
                !isLoggingIn && email && password
                  ? {
                      backgroundColor: "#23237A",
                      scale: 1.02,
                    }
                  : {}
              }
              whileTap={!isLoggingIn && email && password ? { scale: 0.98 } : {}}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {isLoggingIn ? (
                <motion.div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: spacing.sm,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    style={{
                      width: "20px",
                      height: "20px",
                      border: "2px solid #fff",
                      borderTop: "2px solid transparent",
                      borderRadius: "50%",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Signing in...
                </motion.div>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form>

          <motion.div
            style={{
              textAlign: "center",
              marginTop: spacing.xl,
              color: "#6e7681",
              fontSize: "0.85rem",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span
              style={{
                color: "#58a6ff",
                cursor: "pointer",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecoration = "underline";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = "none";
              }}
            >
              Need help signing in?
            </span>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
