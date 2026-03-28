import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    RiSearchLine, RiBellLine, RiSunLine, RiMoonLine,
    RiArrowDownSLine, RiUser3Line, RiSettings4Line,
    RiLogoutBoxLine, RiCheckLine, RiAlarmLine,
    RiMenuLine, RiShieldCheckLine,
} from 'react-icons/ri';
import { useTheme } from '../../contexts/ThemeContext';
import { useSettings } from '../../contexts/SettingsContext';
import './Navbar.css';

const notifications = [
    { id: 1, icon: RiShieldCheckLine, title: 'Security Alert', desc: 'New login from MacBook Pro', time: '2m ago', unread: true, color: '#ef4444' },
    { id: 2, icon: RiBellLine, title: 'Update Available', desc: 'Version 3.1.0 is ready to install', time: '1h ago', unread: true, color: '#6366f1' },
    { id: 3, icon: RiCheckLine, title: 'Profile Updated', desc: 'Your changes were saved', time: '3h ago', unread: false, color: '#22c55e' },
    { id: 4, icon: RiAlarmLine, title: 'Reminder', desc: 'Complete your 2FA setup', time: '1d ago', unread: false, color: '#f59e0b' },
];

const Navbar = ({ collapsed, onMobileMenuToggle }) => {
    const { isDark, toggleTheme } = useTheme();
    const { profile } = useSettings();
    const [showNotifs, setShowNotifs] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const [searchVal, setSearchVal] = useState('');
    const notifRef = useRef(null);
    const profileRef = useRef(null);

    const unreadCount = notifications.filter(n => n.unread).length;

    useEffect(() => {
        const handler = (e) => {
            if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifs(false);
            if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <header className="navbar" style={{ left: collapsed ? 72 : 260 }}>
            <div className="navbar-left">
                <button className="mobile-menu-btn" onClick={onMobileMenuToggle}>
                    <RiMenuLine />
                </button>
                <div className={`search-box ${searchFocused ? 'focused' : ''}`}>
                    <RiSearchLine className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search settings..."
                        value={searchVal}
                        onChange={e => setSearchVal(e.target.value)}
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                    />
                    {searchFocused && (
                        <kbd className="search-kbd">⌘K</kbd>
                    )}
                </div>
            </div>

            <div className="navbar-right">
                {/* Theme Toggle */}
                <motion.button
                    className="nav-icon-btn"
                    onClick={toggleTheme}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={isDark ? 'Light mode' : 'Dark mode'}
                >
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={isDark ? 'moon' : 'sun'}
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {isDark ? <RiSunLine /> : <RiMoonLine />}
                        </motion.span>
                    </AnimatePresence>
                </motion.button>

                {/* Notifications */}
                <div className="nav-dropdown-wrap" ref={notifRef}>
                    <motion.button
                        className="nav-icon-btn"
                        onClick={() => { setShowNotifs(p => !p); setShowProfile(false); }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <RiBellLine />
                        {unreadCount > 0 && (
                            <span className="notif-badge">{unreadCount}</span>
                        )}
                    </motion.button>

                    <AnimatePresence>
                        {showNotifs && (
                            <motion.div
                                className="dropdown notif-dropdown"
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="dropdown-header">
                                    <span>Notifications</span>
                                    <button className="mark-all-btn">Mark all read</button>
                                </div>
                                {notifications.map(n => {
                                    const Icon = n.icon;
                                    return (
                                        <div className={`notif-item ${n.unread ? 'unread' : ''}`} key={n.id}>
                                            <div className="notif-icon-wrap" style={{ background: `${n.color}20`, color: n.color }}>
                                                <Icon />
                                            </div>
                                            <div className="notif-content">
                                                <p className="notif-title">{n.title}</p>
                                                <p className="notif-desc">{n.desc}</p>
                                                <span className="notif-time">{n.time}</span>
                                            </div>
                                            {n.unread && <span className="notif-dot" />}
                                        </div>
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Profile Dropdown */}
                <div className="nav-dropdown-wrap" ref={profileRef}>
                    <motion.button
                        className="profile-trigger"
                        onClick={() => { setShowProfile(p => !p); setShowNotifs(false); }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="profile-avatar-sm">
                            {profile.avatar
                                ? <img src={profile.avatar} alt="avatar" />
                                : profile.name.charAt(0).toUpperCase()
                            }
                        </div>
                        <div className="profile-info">
                            <span className="profile-name">{profile.name}</span>
                            <span className="profile-role">Administrator</span>
                        </div>
                        <motion.span
                            animate={{ rotate: showProfile ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <RiArrowDownSLine />
                        </motion.span>
                    </motion.button>

                    <AnimatePresence>
                        {showProfile && (
                            <motion.div
                                className="dropdown profile-dropdown"
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="profile-dropdown-header">
                                    <div className="profile-avatar-lg">
                                        {profile.avatar
                                            ? <img src={profile.avatar} alt="avatar" />
                                            : profile.name.charAt(0).toUpperCase()
                                        }
                                    </div>
                                    <div>
                                        <p className="pd-name">{profile.name}</p>
                                        <p className="pd-email">{profile.email}</p>
                                    </div>
                                </div>
                                <div className="dropdown-divider" />
                                <button className="dropdown-item"><RiUser3Line /> View Profile</button>
                                <button className="dropdown-item"><RiSettings4Line /> Preferences</button>
                                <div className="dropdown-divider" />
                                <button className="dropdown-item danger"><RiLogoutBoxLine /> Sign Out</button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
