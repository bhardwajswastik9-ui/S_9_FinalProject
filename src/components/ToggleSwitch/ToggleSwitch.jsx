import { motion } from 'framer-motion';
import './ToggleSwitch.css';

const ToggleSwitch = ({ checked, onChange, label, description, disabled = false, size = 'md' }) => {
    return (
        <div className={`toggle-wrap ${disabled ? 'disabled' : ''}`}>
            <div className="toggle-info">
                {label && <span className="toggle-label">{label}</span>}
                {description && <span className="toggle-desc">{description}</span>}
            </div>
            <button
                className={`toggle-switch ${size} ${checked ? 'on' : 'off'}`}
                onClick={() => !disabled && onChange(!checked)}
                role="switch"
                aria-checked={checked}
                disabled={disabled}
            >
                <motion.div
                    className="toggle-thumb"
                    animate={{ x: checked ? (size === 'sm' ? 14 : 22) : 2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
            </button>
        </div>
    );
};

export default ToggleSwitch;
