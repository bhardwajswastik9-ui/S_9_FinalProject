import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    RiDashboardLine, RiShieldLine, RiBellLine, RiPaletteLine,
    RiLockLine, RiPlugLine, RiMenuFoldLine, RiMenuUnfoldLine,
    RiSettingsLine, RiArrowRightSLine, RiUser3Line,
    RiLogoutBoxLine, RiKeyboardLine,
} from 'react-icons/ri';
import './Sidebar.css';

const navItems = [
    { id: 'general', label: 'General', icon: RiUser3Line, description: 'Profile & Account' },
    { id: 'privacy', label: 'Privacy', icon: RiShieldLine, description: 'Visibility & Data' },
    { id: 'notifications', label: 'Notifications', icon: RiBellLine, description: 'Alerts & Emails' },
    { id: 'appearance', label: 'Appearance', icon: RiPaletteLine, description: 'Theme & Colors' },
    { id: 'security', label: 'Security', icon: RiLockLine, description: '2FA & Sessions' },
    { id: 'integrations', label: 'Integrations', icon: RiPlugLine, description: 'Connected Apps' },
];

const Sidebar = ({ activeTab, setActiveTab, collapsed, setCollapsed }) => {
    const [hoveredItem, setHoveredItem] = useState(null);

    return (
        <motion.aside
            className={`sidebar ${collapsed ? 'collapsed' : ''}`}
            animate={{ width: collapsed ? 72 : 260 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
            {/* Logo */}
            <div className="sidebar-header">
                <motion.div className="sidebar-logo" animate={{ opacity: 1 }}>
                    <div className="logo-icon">
                        <RiSettingsLine />
                    </div>
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.div
                                className="logo-text"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <span className="logo-title">ConfigHub</span>
                                <span className="logo-subtitle">Settings Panel</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <button className="collapse-btn" onClick={() => setCollapsed(p => !p)} title={collapsed ? 'Expand' : 'Collapse'}>
                    {collapsed ? <RiMenuUnfoldLine /> : <RiMenuFoldLine />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav">
                {!collapsed && <p className="sidebar-section-label">SETTINGS</p>}

                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <motion.button
                            key={item.id}
                            className={`nav-item ${isActive ? 'active' : ''}`}
                            onClick={() => setActiveTab(item.id)}
                            onMouseEnter={() => setHoveredItem(item.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                            whileHover={{ x: collapsed ? 0 : 4 }}
                            whileTap={{ scale: 0.97 }}
                            title={collapsed ? item.label : ''}
                        >
                            {isActive && (
                                <motion.div
                                    className="nav-active-bg"
                                    layoutId="activeNavBg"
                                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                />
                            )}
                            <span className="nav-icon">
                                <Icon />
                            </span>
                            <AnimatePresence>
                                {!collapsed && (
                                    <motion.div
                                        className="nav-text"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <span className="nav-label">{item.label}</span>
                                        <span className="nav-desc">{item.description}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            {!collapsed && isActive && (
                                <motion.span
                                    className="nav-arrow"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <RiArrowRightSLine />
                                </motion.span>
                            )}
                        </motion.button>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="sidebar-footer">
                <AnimatePresence>
                    {!collapsed && (
                        <motion.div
                            className="sidebar-help"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="help-card">
                                <RiKeyboardLine className="help-icon" />
                                <div>
                                    <p className="help-title">Keyboard Shortcuts</p>
                                    <p className="help-desc">Press ? for shortcuts</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <button className="logout-btn" title="Logout">
                    <RiLogoutBoxLine />
                    {!collapsed && <span>Logout</span>}
                </button>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
