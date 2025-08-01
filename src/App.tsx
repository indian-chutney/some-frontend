import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import AvatarSelection from './pages/AvatarSelection';
import Dashboard from './pages/Dashboard';
import { Settings, Leaderboard, Spaces, GameEngine } from './pages/UnderConstruction';
import './App.css';

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
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={
            <PageTransition>
              <Login />
            </PageTransition>
          } />
          <Route path="/welcome" element={
            <PageTransition>
              <Welcome />
            </PageTransition>
          } />
          <Route path="/avatar" element={
            <PageTransition>
              <AvatarSelection />
            </PageTransition>
          } />
          <Route path="/dashboard" element={
            <PageTransition>
              <Dashboard />
            </PageTransition>
          } />
          <Route path="/settings" element={
            <PageTransition>
              <Settings />
            </PageTransition>
          } />
          <Route path="/leaderboard" element={
            <PageTransition>
              <Leaderboard />
            </PageTransition>
          } />
          <Route path="/spaces" element={
            <PageTransition>
              <Spaces />
            </PageTransition>
          } />
          <Route path="/game" element={
            <PageTransition>
              <GameEngine />
            </PageTransition>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
};

export default App;