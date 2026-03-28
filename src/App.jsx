import { useState, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { SettingsProvider } from './contexts/SettingsContext';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import './App.css';

const GeneralSettings = lazy(() => import('./pages/GeneralSettings'));
const PrivacySettings = lazy(() => import('./pages/PrivacySettings'));
const NotificationsSettings = lazy(() => import('./pages/NotificationsSettings'));
const AppearanceSettings = lazy(() => import('./pages/AppearanceSettings'));
const SecuritySettings = lazy(() => import('./pages/SecuritySettings'));
const IntegrationsSettings = lazy(() => import('./pages/IntegrationsSettings'));

const PAGE_MAP = {
  general: { component: GeneralSettings },
  privacy: { component: PrivacySettings },
  notifications: { component: NotificationsSettings },
  appearance: { component: AppearanceSettings },
  security: { component: SecuritySettings },
  integrations: { component: IntegrationsSettings },
};

const PageLoader = () => (
  <div className="page-loader">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="skeleton-card">
        <div className="skeleton-header" />
        <div className="skeleton-body" />
      </div>
    ))}
  </div>
);

function AppContent() {
  const [activeTab, setActiveTab] = useState('general');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const ActivePage = PAGE_MAP[activeTab]?.component || GeneralSettings;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="app-layout">
      {/* Background orbs */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <Sidebar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
      />

      <div
        className="app-main"
        style={{ marginLeft: sidebarCollapsed ? 72 : 260 }}
      >
        <Navbar
          collapsed={sidebarCollapsed}
          onMobileMenuToggle={() => setMobileSidebarOpen(p => !p)}
        />

        <main className="app-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="page-wrapper"
            >
              <Suspense fallback={<PageLoader />}>
                <ActivePage />
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <Toaster
        position="bottom-right"
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            fontSize: '0.875rem',
            fontWeight: 500,
            boxShadow: 'var(--shadow-lg)',
            backdropFilter: 'blur(20px)',
          },
          success: {
            iconTheme: { primary: '#22c55e', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#fff' },
          },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </ThemeProvider>
  );
}

export default App;
