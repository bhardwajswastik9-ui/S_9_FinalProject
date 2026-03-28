import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    RiSunLine, RiMoonLine, RiComputerLine, RiPaletteLine,
    RiLayoutLine, RiFontSize, RiContrastLine, RiEyeLine,
} from 'react-icons/ri';
import { useTheme } from '../contexts/ThemeContext';
import ThemeCustomizer from '../components/ThemeCustomizer/ThemeCustomizer';
import ToggleSwitch from '../components/ToggleSwitch/ToggleSwitch';
import toast from 'react-hot-toast';
import './Settings.css';

const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const itemV = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };

const ThemeCard = ({ icon: Icon, label, desc, value, currentTheme, onClick }) => {
    const isActive = currentTheme === value;
    return (
        <motion.button
            className={`theme-card ${isActive ? 'active' : ''}`}
            onClick={onClick}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
        >
            <div className="theme-card-preview">
                <Icon />
            </div>
            <p className="theme-card-label">{label}</p>
            <p className="theme-card-desc">{desc}</p>
            {isActive && (
                <motion.div
                    className="theme-card-active"
                    layoutId="activeTheme"
                    transition={{ duration: 0.3 }}
                />
            )}
        </motion.button>
    );
};

const AppearanceSettings = () => {
    const { isDark, toggleTheme } = useTheme();
    const [fontSize, setFontSize] = useState('md');
    const [density, setDensity] = useState('comfortable');
    const [reducedMotion, setReducedMotion] = useState(false);
    const [highContrast, setHighContrast] = useState(false);

    return (
        <motion.div className="settings-page" variants={containerV} initial="hidden" animate="visible">
            <motion.div className="page-header" variants={itemV}>
                <div>
                    <h1 className="page-title">Appearance</h1>
                    <p className="page-desc">Customize how the interface looks and feels.</p>
                </div>
            </motion.div>

            {/* Theme Mode */}
            <motion.div className="settings-card" variants={itemV}>
                <div className="card-header">
                    <h2 className="card-title">Color Mode</h2>
                    <p className="card-desc">Choose between light and dark interface</p>
                </div>
                <div className="theme-cards-row">
                    <ThemeCard icon={RiSunLine} label="Light" desc="Bright & clean" value="light" currentTheme={isDark ? 'dark' : 'light'} onClick={() => { if (isDark) { toggleTheme(); toast('☀️ Light mode activated'); } }} />
                    <ThemeCard icon={RiMoonLine} label="Dark" desc="Easy on the eyes" value="dark" currentTheme={isDark ? 'dark' : 'light'} onClick={() => { if (!isDark) { toggleTheme(); toast('🌙 Dark mode activated'); } }} />
                    <ThemeCard icon={RiComputerLine} label="System" desc="Follows OS setting" value="system" currentTheme="system" onClick={() => toast('System sync — coming soon!')} />
                </div>
            </motion.div>

            {/* Accent Color */}
            <motion.div className="settings-card" variants={itemV}>
                <div className="card-header">
                    <h2 className="card-title">Accent Color</h2>
                    <p className="card-desc">Choose your primary brand color</p>
                </div>
                <ThemeCustomizer />
            </motion.div>

            {/* Font Size */}
            <motion.div className="settings-card" variants={itemV}>
                <div className="card-header">
                    <h2 className="card-title">Typography</h2>
                    <p className="card-desc">Adjust text size and reading comfort</p>
                </div>
                <div className="toggle-section">
                    <div className="toggle-row">
                        <div className="toggle-row-info">
                            <p className="toggle-row-label">Font Size</p>
                            <p className="toggle-row-desc">Base text size for the interface</p>
                        </div>
                        <div className="segmented-control">
                            {['sm', 'md', 'lg'].map(s => (
                                <button
                                    key={s}
                                    className={`seg-btn ${fontSize === s ? 'active' : ''}`}
                                    onClick={() => { setFontSize(s); toast(`Font size: ${s.toUpperCase()}`); }}
                                >
                                    {s === 'sm' ? 'Small' : s === 'md' ? 'Medium' : 'Large'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="toggle-row">
                        <div className="toggle-row-info">
                            <p className="toggle-row-label">UI Density</p>
                            <p className="toggle-row-desc">Control spacing between elements</p>
                        </div>
                        <div className="segmented-control">
                            {['compact', 'comfortable', 'spacious'].map(d => (
                                <button
                                    key={d}
                                    className={`seg-btn ${density === d ? 'active' : ''}`}
                                    onClick={() => { setDensity(d); toast(`Density: ${d}`); }}
                                >
                                    {d.charAt(0).toUpperCase() + d.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Accessibility */}
            <motion.div className="settings-card" variants={itemV}>
                <div className="card-header">
                    <h2 className="card-title">Accessibility</h2>
                    <p className="card-desc">Options to improve readability and usability</p>
                </div>
                <div className="toggle-section">
                    <div className="toggle-row">
                        <div className="toggle-row-info">
                            <p className="toggle-row-label">Reduce Motion</p>
                            <p className="toggle-row-desc">Minimize animations for motion sensitivity</p>
                        </div>
                        <ToggleSwitch checked={reducedMotion} onChange={(v) => { setReducedMotion(v); toast(v ? 'Motion reduced' : 'Motion restored'); }} />
                    </div>
                    <div className="toggle-row">
                        <div className="toggle-row-info">
                            <p className="toggle-row-label">High Contrast</p>
                            <p className="toggle-row-desc">Increase contrast for better visibility</p>
                        </div>
                        <ToggleSwitch checked={highContrast} onChange={(v) => { setHighContrast(v); toast(v ? 'High contrast enabled' : 'High contrast off'); }} />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AppearanceSettings;
