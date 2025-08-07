import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fonts, spacing } from "../utils/theme";
import AnimatedBackground from "./../components/ui/AnimatedBackground.tsx";
import Logo from "../components/Logo.tsx";

// ---------------
// CONFIGURATION
// ---------------
const MS_CLIENT_ID = "3ff100ef-fb6d-4809-a512-de5c525b0506";
const MS_TENANT_ID = "dd60b066-1b78-4515-84fb-a565c251cb5a";
const MS_REDIRECT_URI =
  "https://applywizz-game-backend.vercel.app/api/v1/auth/redirect";

const Login: React.FC = () => {
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);

  const handleLogin = () => {
    if (buttonClicked || isLoggingIn) return;

    setButtonClicked(true);
    setIsLoggingIn(true);

    const authUrl =
      `https://login.microsoftonline.com/${MS_TENANT_ID}/oauth2/v2.0/authorize?` +
      new URLSearchParams({
        client_id: MS_CLIENT_ID,
        response_type: "code",
        redirect_uri: MS_REDIRECT_URI,
        response_mode: "query",
        scope: "openid profile email",
        state: `login-${Date.now()}`,
      }).toString();

    setTimeout(() => {
      window.location.href = authUrl;
    }, 500);
  };

  useEffect(() => {
    if (isLoggingIn) {
      console.log("Login process initiated...");
    }
  }, [isLoggingIn]);

  useEffect(() => {
    return () => {
      if (buttonClicked) {
        setButtonClicked(false);
        setIsLoggingIn(false);
      }
    };
  }, []);

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

          {/* Microsoft Login Button */}
          <motion.button
            onClick={handleLogin}
            disabled={buttonClicked || isLoggingIn}
            style={{
              width: "100%",
              padding: spacing.lg,
              backgroundColor: isLoggingIn ? "#1a1a2e" : "#2F2F95",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              fontSize: "1rem",
              fontWeight: "600",
              fontFamily: fonts.body,
              cursor: buttonClicked || isLoggingIn ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              marginBottom: spacing.xl,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: spacing.md,
              opacity: buttonClicked || isLoggingIn ? 0.7 : 1,
              position: "relative",
              overflow: "hidden",
            }}
            whileHover={
              !buttonClicked && !isLoggingIn
                ? {
                    backgroundColor: "#23237A",
                    scale: 1.02,
                  }
                : {}
            }
            whileTap={!buttonClicked && !isLoggingIn ? { scale: 0.98 } : {}}
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
                Redirecting to Microsoft...
              </motion.div>
            ) : (
              <>
                <svg height="20" viewBox="0 0 24 24" width="20">
                  <rect fill="#F25022" height="10" width="10" x="1" y="1" />
                  <rect fill="#7FBA00" height="10" width="10" x="13" y="1" />
                  <rect fill="#00A4EF" height="10" width="10" x="1" y="13" />
                  <rect fill="#FFB900" height="10" width="10" x="13" y="13" />
                </svg>
                Sign in with Microsoft
              </>
            )}
          </motion.button>

          <motion.div
            style={{
              textAlign: "center",
              marginTop: spacing.xl,
              color: "#6e7681",
              fontSize: "0.85rem",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
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
