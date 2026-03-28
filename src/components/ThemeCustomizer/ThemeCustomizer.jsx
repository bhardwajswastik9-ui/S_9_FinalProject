import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { motion, AnimatePresence } from 'framer-motion';
import { RiCheckLine, RiDropLine } from 'react-icons/ri';
import { useTheme } from '../../contexts/ThemeContext';
import './ThemeCustomizer.css';

const presets = [
    { name: 'Indigo', color: '#6366f1' },
    { name: 'Violet', color: '#8b5cf6' },
    { name: 'Rose', color: '#f43f5e' },
    { name: 'Cyan', color: '#06b6d4' },
    { name: 'Emerald', color: '#10b981' },
    { name: 'Orange', color: '#f97316' },
    { name: 'Amber', color: '#f59e0b' },
    { name: 'Pink', color: '#ec4899' },
];

const ThemeCustomizer = () => {
    const { accentColor, setAccentColor } = useTheme();
    const [showPicker, setShowPicker] = useState(false);

    return (
        <div className="theme-customizer">
            <div className="preset-colors">
                {presets.map(preset => (
                    <motion.button
                        key={preset.name}
                        className={`color-preset ${accentColor === preset.color ? 'active' : ''}`}
                        style={{ '--preset-color': preset.color }}
                        onClick={() => setAccentColor(preset.color)}
                        title={preset.name}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <span className="preset-swatch" style={{ background: preset.color }} />
                        {accentColor === preset.color && (
                            <motion.span
                                className="preset-check"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                            >
                                <RiCheckLine />
                            </motion.span>
                        )}
                    </motion.button>
                ))}

                {/* Custom color button */}
                <motion.button
                    className={`color-preset custom-color-btn ${!presets.some(p => p.color === accentColor) ? 'active' : ''}`}
                    onClick={() => setShowPicker(p => !p)}
                    title="Custom color"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <RiDropLine style={{ color: accentColor }} />
                </motion.button>
            </div>

            <AnimatePresence>
                {showPicker && (
                    <motion.div
                        className="color-picker-wrap"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        <HexColorPicker color={accentColor} onChange={setAccentColor} />
                        <div className="hex-display">
                            <span className="hex-label">HEX</span>
                            <input
                                className="hex-input"
                                value={accentColor}
                                onChange={e => {
                                    const val = e.target.value;
                                    if (/^#[0-9a-fA-F]{0,6}$/.test(val)) setAccentColor(val);
                                }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="accent-preview">
                <span>Preview:</span>
                <div className="accent-chips">
                    <div className="chip" style={{ background: accentColor, color: '#fff' }}>Button</div>
                    <div className="chip-outline" style={{ borderColor: accentColor, color: accentColor }}>Outline</div>
                    <div className="chip-dot" style={{ background: accentColor }} />
                </div>
            </div>
        </div>
    );
};

export default ThemeCustomizer;
