import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Upload, Link, FileText, Briefcase } from "lucide-react";
import { colors, fonts, spacing } from "../utils/theme";

const MentorOnboard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    companyEmail: "",
    linkedinUrl: "",
    portfolioUrl: "",
    resume: null as File | null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user needs verification
    const needsVerification = localStorage.getItem("needsVerification");
    if (!needsVerification) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Mock verification submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear verification flag
      localStorage.removeItem("needsVerification");
      
      // Move to success step
      setCurrentStep(2);
      
      // Auto-redirect after 4 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 4000);
    } catch (error) {
      console.error("Verification submission failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, resume: file });
    }
  };

  // Welcome step
  if (currentStep === 0) {
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
        }}
      >
        <motion.div
          style={{
            width: "100%",
            maxWidth: "600px",
            backgroundColor: colors.surface,
            padding: spacing["4xl"],
            borderRadius: "24px",
            border: `1px solid ${colors.surfaceLight}`,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
            textAlign: "center",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: `${colors.secondary}20`,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: `0 auto ${spacing.xl} auto`,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          >
            <CheckCircle size={50} style={{ color: colors.secondary }} />
          </motion.div>

          <motion.h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "800",
              color: colors.textPrimary,
              marginBottom: spacing.lg,
              fontFamily: fonts.logo,
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Welcome to MentorConnect!
          </motion.h1>

          <motion.p
            style={{
              fontSize: "1.1rem",
              color: colors.textSecondary,
              lineHeight: 1.6,
              marginBottom: spacing["2xl"],
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            We're excited to have you join our community of mentors. To ensure the highest quality of mentorship, we need to verify your professional background.
          </motion.p>

          <motion.button
            style={{
              backgroundColor: colors.secondary,
              color: "white",
              border: "none",
              borderRadius: "12px",
              padding: `${spacing.lg} ${spacing["2xl"]}`,
              fontSize: "1.1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            whileHover={{ backgroundColor: colors.primary, scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentStep(1)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Get Verified
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Verification form step
  if (currentStep === 1) {
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
        }}
      >
        <motion.div
          style={{
            width: "100%",
            maxWidth: "600px",
            backgroundColor: colors.surface,
            padding: spacing["3xl"],
            borderRadius: "24px",
            border: `1px solid ${colors.surfaceLight}`,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
          }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: colors.textPrimary,
              marginBottom: spacing.lg,
              fontFamily: fonts.logo,
              textAlign: "center",
            }}
          >
            Verification Details
          </h2>

          <p
            style={{
              color: colors.textSecondary,
              textAlign: "center",
              marginBottom: spacing["2xl"],
              lineHeight: 1.6,
            }}
          >
            Please provide the following information to verify your professional background:
          </p>

          <form onSubmit={handleSubmit}>
            {/* Company Email */}
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
                Company Email
              </label>
              <div style={{ position: "relative" }}>
                <Briefcase
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
                  value={formData.companyEmail}
                  onChange={(e) => setFormData({ ...formData, companyEmail: e.target.value })}
                  placeholder="your.email@company.com"
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
                  }}
                />
              </div>
            </div>

            {/* LinkedIn URL */}
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
                LinkedIn Profile
              </label>
              <div style={{ position: "relative" }}>
                <Link
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
                  type="url"
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                  placeholder="https://linkedin.com/in/yourprofile"
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
                  }}
                />
              </div>
            </div>

            {/* Portfolio URL */}
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
                Portfolio Website (Optional)
              </label>
              <div style={{ position: "relative" }}>
                <Link
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
                  type="url"
                  value={formData.portfolioUrl}
                  onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                  placeholder="https://yourportfolio.com"
                  style={{
                    width: "100%",
                    padding: `${spacing.md} ${spacing.md} ${spacing.md} 3rem`,
                    backgroundColor: colors.background,
                    border: `1px solid ${colors.surfaceLight}`,
                    borderRadius: "12px",
                    color: colors.textPrimary,
                    fontSize: "0.95rem",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            {/* Resume Upload */}
            <div style={{ marginBottom: spacing["2xl"] }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  color: colors.textSecondary,
                  marginBottom: spacing.sm,
                }}
              >
                Resume/CV
              </label>
              <div
                style={{
                  border: `2px dashed ${colors.surfaceLight}`,
                  borderRadius: "12px",
                  padding: spacing.xl,
                  textAlign: "center",
                  backgroundColor: colors.background,
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                />
                <FileText size={24} style={{ color: colors.textMuted, marginBottom: spacing.sm }} />
                <p style={{ color: colors.textMuted, fontSize: "0.9rem" }}>
                  {formData.resume ? formData.resume.name : "Click to upload your resume (PDF, DOC, DOCX)"}
                </p>
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
                  Submitting...
                </div>
              ) : (
                "Submit for Verification"
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Success step
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
      }}
    >
      <motion.div
        style={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: colors.surface,
          padding: spacing["4xl"],
          borderRadius: "24px",
          border: `1px solid ${colors.surfaceLight}`,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
          textAlign: "center",
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: `${colors.secondary}20`,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: `0 auto ${spacing.xl} auto`,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <CheckCircle size={50} style={{ color: colors.secondary }} />
        </motion.div>

        <motion.h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            color: colors.textPrimary,
            marginBottom: spacing.lg,
            fontFamily: fonts.logo,
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Thank You!
        </motion.h1>

        <motion.p
          style={{
            fontSize: "1.1rem",
            color: colors.textSecondary,
            lineHeight: 1.6,
            marginBottom: spacing.lg,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Thanks for joining us! We're glad to have you onboard.
        </motion.p>

        <motion.p
          style={{
            fontSize: "1rem",
            color: colors.textMuted,
            marginBottom: spacing["2xl"],
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          You'll receive an email once you get verified. Redirecting to your dashboard...
        </motion.p>

        <motion.div
          style={{
            width: "200px",
            height: "4px",
            backgroundColor: colors.surfaceLight,
            borderRadius: "2px",
            margin: "0 auto",
            overflow: "hidden",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <motion.div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: colors.secondary,
              borderRadius: "2px",
            }}
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 4, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MentorOnboard;