import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  CheckCircle,
  ArrowRight,
  Users,
  Code,
  FileText,
  Shield,
  Briefcase,
  Headphones,
  ChevronDown,
} from "lucide-react";
import { fonts } from "./../utils/theme.ts";
import AnimatedBackground from "./../components/ui/AnimatedBackground.tsx";
import Logo from "../components/Logo.tsx";
import { useAuthContext } from "../hooks/hooks.tsx";

interface RoleOption {
  value: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const AuthSuccess: React.FC = () => {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/dashboard", { replace: true });
    return null;
  }

  const [selectedRole, setSelectedRole] = useState<string>("");
  const [step, setStep] = useState<"success" | "role-selection">("success");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const id_token = searchParams.get("id_token");

  const { login } = useAuthContext();

  const roleOptions: RoleOption[] = [
    {
      value: "career-associate",
      label: "Career Associate",
      icon: <Users className="h-4 w-4" />,
      description: "Help candidates navigate their career journey",
    },
    {
      value: "tech-engineer",
      label: "Tech Engineer",
      icon: <Code className="h-4 w-4" />,
      description: "Build and maintain technical solutions",
    },
    {
      value: "resume-team",
      label: "Resume Team Folk",
      icon: <FileText className="h-4 w-4" />,
      description: "Craft compelling resumes and profiles",
    },
    {
      value: "product-manager",
      label: "Product Manager",
      icon: <Briefcase className="h-4 w-4" />,
      description: "Drive product strategy and development",
    },
    {
      value: "data-analyst",
      label: "Data Analyst",
      icon: <Shield className="h-4 w-4" />,
      description: "Analyze trends and provide insights",
    },
    {
      value: "customer-success",
      label: "Customer Success",
      icon: <Headphones className="h-4 w-4" />,
      description: "Ensure client satisfaction and growth",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep("role-selection");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleRoleSubmit = () => {
    if (selectedRole) {
      // Note: localStorage is not available in Claude artifacts
      // localStorage.setItem("userRole", selectedRole);
      login(id_token as string);
      navigate("/dashboard");
    }
  };

  const handleSkip = () => {
    navigate("/dashboard");
  };

  const selectedOption = roleOptions.find((opt) => opt.value === selectedRole);

  return (
    <>
      <AnimatedBackground />
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          fontFamily: fonts.body,
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            width: "100%",
            maxWidth: step === "success" ? "28rem" : "32rem",
            transition: "max-width 0.5s ease",
          }}
        >
          {step === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                backgroundColor: "rgba(17, 24, 39, 0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(75, 85, 99, 0.3)",
                borderRadius: "1rem",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
                padding: "0",
                textAlign: "center",
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.05))",
                  borderBottom: "1px solid rgba(75, 85, 99, 0.2)",
                  padding: "2rem",
                }}
              >
                <Logo />
              </motion.div>

              <div style={{ padding: "0 2rem 3rem" }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                  style={{ marginTop: "2rem", marginBottom: "2rem" }}
                >
                  <CheckCircle
                    style={{
                      height: "5rem",
                      width: "5rem",
                      color: "#10b981",
                      margin: "0 auto",
                      filter: "drop-shadow(0 0 20px rgba(16, 185, 129, 0.3))",
                    }}
                  />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    color: "white",
                    marginBottom: "0.75rem",
                    lineHeight: "1.2",
                  }}
                >
                  Authentication Successful!
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  style={{
                    color: "#9ca3af",
                    fontSize: "1.1rem",
                    marginBottom: "2rem",
                    lineHeight: "1.5",
                  }}
                >
                  Welcome back, Hero! You're now logged in to ApplyWizz.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.75rem",
                    fontSize: "0.95rem",
                    color: "#6b7280",
                  }}
                >
                  <div
                    style={{
                      width: "1rem",
                      height: "1rem",
                      border: "2px solid #3b82f6",
                      borderTop: "2px solid transparent",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  Setting up your workspace...
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <div
              style={{
                backgroundColor: "rgba(17, 24, 39, 0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(75, 85, 99, 0.3)",
                borderRadius: "1rem",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
                padding: "0",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.05))",
                  padding: "2rem",
                  textAlign: "center",
                }}
              >
                <Logo />
              </div>

              <div style={{ padding: "2.5rem" }}>
                <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    style={{
                      fontSize: "2rem",
                      fontWeight: "700",
                      color: "white",
                      marginBottom: "0.75rem",
                      lineHeight: "1.2",
                    }}
                  >
                    What's Your Role?
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    style={{
                      color: "#9ca3af",
                      fontSize: "1.1rem",
                      lineHeight: "1.5",
                    }}
                  >
                    Help us personalize your ApplyWizz experience
                  </motion.p>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem",
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.95rem",
                        fontWeight: "600",
                        color: "#e5e7eb",
                        marginBottom: "0.75rem",
                      }}
                    >
                      Select your role
                    </label>

                    <div style={{ position: "relative" }}>
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        style={{
                          width: "100%",
                          padding: "1rem 1.25rem",
                          backgroundColor: "rgba(31, 41, 55, 0.6)",
                          border: "2px solid rgba(75, 85, 99, 0.4)",
                          borderRadius: "0.75rem",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          fontSize: "1rem",
                          outline: "none",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(31, 41, 55, 0.8)";
                          e.currentTarget.style.borderColor =
                            "rgba(99, 102, 241, 0.5)";
                          e.currentTarget.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(31, 41, 55, 0.6)";
                          e.currentTarget.style.borderColor =
                            "rgba(75, 85, 99, 0.4)";
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                          }}
                        >
                          {selectedOption ? (
                            <>
                              <div style={{ color: "#6366f1" }}>
                                {selectedOption.icon}
                              </div>
                              <span style={{ fontWeight: "500" }}>
                                {selectedOption.label}
                              </span>
                            </>
                          ) : (
                            <span style={{ color: "#9ca3af" }}>
                              Choose your role...
                            </span>
                          )}
                        </div>
                        <ChevronDown
                          style={{
                            height: "1.25rem",
                            width: "1.25rem",
                            color: "#9ca3af",
                            transform: isDropdownOpen
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                          }}
                        />
                      </button>

                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            right: 0,
                            marginTop: "0.5rem",
                            backgroundColor: "rgba(31, 41, 55, 0.95)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(75, 85, 99, 0.4)",
                            borderRadius: "0.75rem",
                            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
                            zIndex: 50,
                            maxHeight: "20rem",
                            overflowY: "auto",
                            padding: "0.5rem",
                          }}
                        >
                          {roleOptions.map((option, index) => (
                            <button
                              key={option.value}
                              onClick={() => {
                                setSelectedRole(option.value);
                                setIsDropdownOpen(false);
                              }}
                              style={{
                                width: "100%",
                                padding: "1rem",
                                textAlign: "left",
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "1rem",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                borderRadius: "0.5rem",
                                marginBottom:
                                  index < roleOptions.length - 1
                                    ? "0.25rem"
                                    : "0",
                                border: "none",
                                backgroundColor: "transparent",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  "rgba(59, 130, 246, 0.1)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  "transparent";
                              }}
                            >
                              <div
                                style={{
                                  marginTop: "0.25rem",
                                  color: "#6366f1",
                                  minWidth: "1rem",
                                }}
                              >
                                {option.icon}
                              </div>
                              <div style={{ flex: 1 }}>
                                <div
                                  style={{
                                    fontWeight: "600",
                                    color: "white",
                                    marginBottom: "0.25rem",
                                    fontSize: "0.95rem",
                                  }}
                                >
                                  {option.label}
                                </div>
                                <div
                                  style={{
                                    fontSize: "0.875rem",
                                    color: "#9ca3af",
                                    lineHeight: "1.4",
                                  }}
                                >
                                  {option.description}
                                </div>
                              </div>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <button
                      onClick={handleRoleSubmit}
                      disabled={!selectedRole}
                      style={{
                        padding: "1rem 1.5rem",
                        backgroundColor: selectedRole ? "#3b82f6" : "#4b5563",
                        color: "white",
                        border: "none",
                        borderRadius: "0.75rem",
                        fontWeight: "600",
                        fontSize: "1rem",
                        cursor: selectedRole ? "pointer" : "not-allowed",
                        transition: "all 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.75rem",
                        opacity: selectedRole ? 1 : 0.6,
                        outline: "none",
                      }}
                      onMouseEnter={(e) => {
                        if (selectedRole) {
                          e.currentTarget.style.backgroundColor = "#2563eb";
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow =
                            "0 10px 25px -5px rgba(59, 130, 246, 0.4)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedRole) {
                          e.currentTarget.style.backgroundColor = "#3b82f6";
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                        }
                      }}
                    >
                      Continue to Dashboard
                      <ArrowRight
                        style={{ height: "1.25rem", width: "1.25rem" }}
                      />
                    </button>

                    <button
                      onClick={handleSkip}
                      style={{
                        padding: "1rem 1.5rem",
                        backgroundColor: "transparent",
                        color: "#d1d5db",
                        border: "2px solid rgba(75, 85, 99, 0.4)",
                        borderRadius: "0.75rem",
                        fontWeight: "500",
                        fontSize: "1rem",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        outline: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(55, 65, 81, 0.3)";
                        e.currentTarget.style.color = "white";
                        e.currentTarget.style.borderColor =
                          "rgba(99, 102, 241, 0.4)";
                        e.currentTarget.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#d1d5db";
                        e.currentTarget.style.borderColor =
                          "rgba(75, 85, 99, 0.4)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      Skip for now
                    </button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    style={{
                      textAlign: "center",
                      paddingTop: "0.5rem",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "#6b7280",
                        lineHeight: "1.4",
                      }}
                    >
                      You can always change this later in settings
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Enhanced background elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ delay: 1, duration: 1.5 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-15rem",
              right: "-10rem",
              height: "30rem",
              width: "30rem",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(99, 102, 241, 0.3), rgba(147, 51, 234, 0.1))",
              filter: "blur(4rem)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-15rem",
              left: "-10rem",
              height: "30rem",
              width: "30rem",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(16, 185, 129, 0.3), rgba(59, 130, 246, 0.1))",
              filter: "blur(4rem)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              height: "40rem",
              width: "40rem",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(168, 85, 247, 0.1), transparent)",
              filter: "blur(6rem)",
            }}
          />
        </motion.div>

        <style>
          {`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </>
  );
};

export default AuthSuccess;
