import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ThemeDrawer } from './components/common/ThemeDrawer';
import { NotificationDrawer } from './components/common/NotificationDrawer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { BookingPage } from './pages/BookingPage';
import { RideTrackingPage } from './pages/RideTrackingPage';
import { DriverDashboardPage } from './pages/DriverDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { RideHistoryPage } from './pages/RideHistoryPage';
import { ProfilePage } from './pages/ProfilePage';
import { SafetyCenterPage } from './pages/SafetyCenterPage';
import { OffersPage } from './pages/OffersPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        className="flex-1"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/ride/:id" element={<RideTrackingPage />} />
          <Route path="/driver" element={<DriverDashboardPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/history" element={<RideHistoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/safety" element={<SafetyCenterPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
};

export const App: React.FC = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <MotionConfig reducedMotion="user">
            <div className="min-h-screen flex flex-col bg-theme-bg text-theme-text font-sans antialiased transition-colors">
              {/* Global Navbar */}
              <Navbar
                onOpenNotifications={() => setIsNotificationOpen(true)}
                unreadCount={unreadCount}
              />

              <AnimatedRoutes />

              {/* Global Footer */}
              <Footer />

              {/* Settings & Theme Drawer */}
              <ThemeDrawer />

              {/* Notifications Drawer */}
              <NotificationDrawer
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
                onNotificationsChanged={() => setUnreadCount(0)}
              />
            </div>
          </MotionConfig>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
