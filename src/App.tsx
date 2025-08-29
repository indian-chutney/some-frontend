import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import ClientAuth from "./pages/ClientAuth";
import MentorAuth from "./pages/MentorAuth";
import MentorOnboard from "./pages/MentorOnboard";
import AdminAuth from "./pages/AdminAuth";
import AvatarSelection from "./pages/AvatarSelection";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Leaderboard from "./pages/Leaderboard";
import Spaces from "./pages/Spaces";
import Marketplace from "./pages/Marketplace";
import "./App.css";
import { AuthContextProvider } from "./contexts/contexts";
import { useAuthContext } from "./hooks/hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getUserType } from "./utils/roleUtils";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

const App: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContextProvider>
          <PageRoutes />
        </AuthContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const PageRoutes = () => {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();
  const userType = getUserType();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <PageTransition>
              <LandingPage />
            </PageTransition>
          }
        />
        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />
        <Route
          path="/client/auth"
          element={
            <PageTransition>
              <ClientAuth />
            </PageTransition>
          }
        />
        <Route
          path="/mentor/auth"
          element={
            <PageTransition>
              <MentorAuth />
            </PageTransition>
          }
        />
        <Route
          path="/mentor/onboard"
          element={
            <PageTransition>
              <MentorOnboard />
            </PageTransition>
          }
        />
        <Route
          path="/admin/v1"
          element={
            <PageTransition>
              <AdminAuth />
            </PageTransition>
          }
        />

        {/* Protected routes */}
        {isAuthenticated ? (
          <>
            {/* Common authenticated routes */}
            <Route
              path="/dashboard"
              element={
                <PageTransition>
                  <Dashboard />
                </PageTransition>
              }
            />
            <Route
              path="/settings"
              element={
                <PageTransition>
                  <Settings />
                </PageTransition>
              }
            />
            
            {/* Client specific routes */}
            {userType === "client" && (
              <>
                <Route
                  path="/mentors"
                  element={
                    <PageTransition>
                      <Marketplace />
                    </PageTransition>
                  }
                />
                <Route
                  path="/bookings"
                  element={
                    <PageTransition>
                      <Spaces />
                    </PageTransition>
                  }
                />
              </>
            )}

            {/* Mentor specific routes */}
            {userType === "mentor" && (
              <>
                <Route
                  path="/bookings"
                  element={
                    <PageTransition>
                      <Spaces />
                    </PageTransition>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PageTransition>
                      <AvatarSelection />
                    </PageTransition>
                  }
                />
              </>
            )}

            {/* Admin specific routes */}
            {userType === "admin" && (
              <>
                <Route
                  path="/admin/dashboard"
                  element={
                    <PageTransition>
                      <Dashboard />
                    </PageTransition>
                  }
                />
                <Route
                  path="/admin/monitor"
                  element={
                    <PageTransition>
                      <Leaderboard />
                    </PageTransition>
                  }
                />
                <Route
                  path="/admin/settings"
                  element={
                    <PageTransition>
                      <Settings />
                    </PageTransition>
                  }
                />
              </>
            )}

            {/* Legacy routes for backward compatibility */}
            <Route
              path="/avatar"
              element={
                <PageTransition>
                  <AvatarSelection />
                </PageTransition>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <PageTransition>
                  <Leaderboard />
                </PageTransition>
              }
            />
            <Route
              path="/spaces"
              element={
                <PageTransition>
                  <Spaces />
                </PageTransition>
              }
            />
            <Route
              path="/marketplace"
              element={
                <PageTransition>
                  <Marketplace />
                </PageTransition>
              }
            />

            {/* Default redirect based on user type */}
            <Route
              path="/home"
              element={
                <Navigate 
                  to={
                    userType === "admin" 
                      ? "/admin/dashboard" 
                      : "/dashboard"
                  } 
                />
              }
            />
          </>
        ) : (
          <>
            {/* Redirect unauthenticated users to landing page */}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </AnimatePresence>
  );
};

export default App;
