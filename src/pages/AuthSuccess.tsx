import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
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

// Import your design tokens (adjust path as needed)
import { spacing, fonts } from "./../utils/theme.ts"; // Adjust import path
import AnimatedBackground from "./../components/ui/AnimatedBackground.tsx"; // Adjust import path

interface RoleOption {
  value: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

// Custom Card Component
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div
    className={`bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-2xl ${className}`}
  >
    {children}
  </div>
);

const CardHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <div className={`p-6 pb-4 ${className}`}>{children}</div>
);

const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

// Custom Button Component
const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "outline";
  className?: string;
}> = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
}) => {
  const baseStyles =
    "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variantStyles = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105 active:scale-95",
    outline:
      "border border-gray-600 hover:bg-gray-800 text-gray-300 hover:text-white",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Custom Select Component
const Select: React.FC<{
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options: RoleOption[];
}> = ({ value, onChange, placeholder, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative">
      <button
        className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-left flex items-center justify-between hover:bg-gray-800/70 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {selectedOption ? (
            <>
              {selectedOption.icon}
              <span className="text-white">{selectedOption.label}</span>
            </>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full mt-1 w-full bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
        >
          {options.map((option) => (
            <button
              key={option.value}
              className="w-full p-3 text-left hover:bg-gray-700 transition-colors flex items-start gap-3 border-b border-gray-700 last:border-b-0"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              <div className="mt-0.5">{option.icon}</div>
              <div>
                <div className="font-medium text-white">{option.label}</div>
                <div className="text-sm text-gray-400">
                  {option.description}
                </div>
              </div>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

// Custom Label Component
const Label: React.FC<{ children: React.ReactNode; htmlFor?: string }> = ({
  children,
  htmlFor,
}) => (
  <label
    htmlFor={htmlFor}
    className="block text-sm font-medium text-gray-300 mb-2"
  >
    {children}
  </label>
);

const AuthSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [step, setStep] = useState<"success" | "role-selection">("success");

  const roleOptions: RoleOption[] = [
    {
      value: "career-associate",
      label: "Career Associate",
      icon: <Users className="h-4 w-4 text-blue-400" />,
      description: "Help candidates navigate their career journey",
    },
    {
      value: "tech-engineer",
      label: "Tech Engineer",
      icon: <Code className="h-4 w-4 text-green-400" />,
      description: "Build and maintain technical solutions",
    },
    {
      value: "resume-team",
      label: "Resume Team Folk",
      icon: <FileText className="h-4 w-4 text-purple-400" />,
      description: "Craft compelling resumes and profiles",
    },
    {
      value: "product-manager",
      label: "Product Manager",
      icon: <Briefcase className="h-4 w-4 text-orange-400" />,
      description: "Drive product strategy and development",
    },
    {
      value: "data-analyst",
      label: "Data Analyst",
      icon: <Shield className="h-4 w-4 text-cyan-400" />,
      description: "Analyze trends and provide insights",
    },
    {
      value: "customer-success",
      label: "Customer Success",
      icon: <Headphones className="h-4 w-4 text-pink-400" />,
      description: "Ensure client satisfaction and growth",
    },
  ];

  useEffect(() => {
    // Move to role selection after success animation
    const timer = setTimeout(() => {
      setStep("role-selection");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleRoleSubmit = () => {
    if (selectedRole) {
      // Save role to localStorage or send to backend
      localStorage.setItem("userRole", selectedRole);
      localStorage.setItem("userRoleSetAt", new Date().toISOString());
      navigate("/homepage");
    }
  };

  const handleSkip = () => {
    navigate("/homepage");
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
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {step === "success" ? (
            // Success Step
            <Card>
              <CardHeader className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mx-auto mb-4"
                >
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-2xl font-bold text-white"
                >
                  Authentication Successful!
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-gray-400 mt-2"
                >
                  Welcome back, Hero! You're now logged in to ApplyWizz.
                </motion.p>
              </CardHeader>

              <CardContent>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="text-center text-sm text-gray-500"
                >
                  Setting up your workspace...
                </motion.div>
              </CardContent>
            </Card>
          ) : (
            // Role Selection Step
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader className="text-center">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-2xl font-bold text-white"
                  >
                    What's Your Role?
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-gray-400 mt-2"
                  >
                    Help us personalize your ApplyWizz experience
                  </motion.p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <Label htmlFor="role-select">Select your role</Label>
                    <Select
                      value={selectedRole}
                      onChange={setSelectedRole}
                      placeholder="Choose your role..."
                      options={roleOptions}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <Button
                      onClick={handleRoleSubmit}
                      disabled={!selectedRole}
                      variant="primary"
                      className="flex-1"
                    >
                      Continue to Dashboard
                      <ArrowRight className="h-4 w-4" />
                    </Button>

                    <Button onClick={handleSkip} variant="outline">
                      Skip for now
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="text-center"
                  >
                    <p className="text-xs text-gray-500">
                      You can always change this later in settings
                    </p>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>

        {/* Background decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 1, duration: 1 }}
          className="fixed inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -top-40 -right-32 h-80 w-80 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-gradient-to-tr from-green-500/20 to-blue-500/20 blur-3xl" />
        </motion.div>
      </div>
    </>
  );
};

export default AuthSuccess;
