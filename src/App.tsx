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
import Welcome from "./pages/Welcome";
import AvatarSelection from "./pages/AvatarSelection";
import Dashboard from "./pages/Dashboard";
import { Settings, Leaderboard, Spaces } from "./pages/UnderConstruction";
import "./App.css";
import { AuthContextProvider } from "./contexts/contexts";
import { useAuthContext } from "./hooks/hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthSuccess from "./pages/AuthSuccess";

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
          <AnimatePresence mode="wait">
            <PageRoutes />
          </AnimatePresence>
        </AuthContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const PageRoutes = () => {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/auth/success" element={<AuthSuccess />} />
      {isAuthenticated ? (
        <>
          <Route
            path="/welcome"
            element={
              <PageTransition>
                <Welcome />
              </PageTransition>
            }
          />
          <Route
            path="/avatar"
            element={
              <PageTransition>
                <AvatarSelection />
              </PageTransition>
            }
          />
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
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </>
      ) : (
        <>
          <Route
            path="/"
            element={
              <PageTransition>
                <Login />
              </PageTransition>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};

export default App;
