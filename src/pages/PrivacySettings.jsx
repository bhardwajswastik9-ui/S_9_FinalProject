import { motion } from 'framer-motion';
import { RiShieldLine, RiEyeLine, RiWalkLine, RiSearchLine, RiHardDriveLine, RiTimeLine } from 'react-icons/ri';
import { useSettings } from '../contexts/SettingsContext';
import ToggleSwitch from '../components/ToggleSwitch/ToggleSwitch';
import toast from 'react-hot-toast';
import './Settings.css';

const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const itemV = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };

const PrivacyRow = ({ icon: Icon, label, desc, settingKey, value, onToggle, badge }) => (
    <div className="toggle-row">
        <div className="toggle-row-info" style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{
                width: 36, height: 36, borderRadius: 9, background: 'var(--bg-active)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)',
                fontSize: '1rem', flexShrink: 0
            }}>
                <Icon />
            </div>
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <p className="toggle-row-label">{label}</p>
                    {badge && <span className={badge.type === 'warning' ? 'warning-badge' : 'info-badge'}>{badge.text}</span>}
                </div>
                <p className="toggle-row-desc">{desc}</p>
            </div>
        </div>
        <ToggleSwitch checked={value} onChange={(v) => {
            onToggle(settingKey, v);
            toast.success(`${label} ${v ? 'enabled' : 'disabled'}`);
        }} />
    </div>
);

const PrivacySettings = () => {
    const { privacy, updatePrivacy } = useSettings();

    return (
        <motion.div className="settings-page" variants={containerV} initial="hidden" animate="visible">
            <motion.div className="page-header" variants={itemV}>
                <div>
                    <h1 className="page-title">Privacy & Data</h1>
                    <p className="page-desc">Control who can see your information and how your data is used.</p>
                </div>
            </motion.div>

            <motion.div className="settings-card" variants={itemV}>
                <div className="card-header">
                    <h2 className="card-title">Visibility Settings</h2>
                    <p className="card-desc">Control who can see your profile and activity</p>
                </div>
                <div className="toggle-section">
                    <PrivacyRow icon={RiEyeLine} label="Public Profile" desc="Allow anyone to view your profile page" settingKey="profilePublic" value={privacy.profilePublic} onToggle={updatePrivacy} />
                    <PrivacyRow icon={RiShieldLine} label="Show Email Address" desc="Display your email on your public profile" settingKey="showEmail" value={privacy.showEmail} onToggle={updatePrivacy} />
                    <PrivacyRow icon={RiWalkLine} label="Activity Status" desc="Show when you were last active" settingKey="showActivity" value={privacy.showActivity} onToggle={updatePrivacy} badge={{ type: 'info', text: 'Public' }} />
                    <PrivacyRow icon={RiSearchLine} label="Search Engine Indexing" desc="Allow search engines to index your profile" settingKey="searchIndexing" value={privacy.searchIndexing} onToggle={updatePrivacy} />
                </div>
            </motion.div>

            <motion.div className="settings-card" variants={itemV}>
                <div className="card-header">
                    <h2 className="card-title">Data & Tracking</h2>
                    <p className="card-desc">Manage how we collect and use your data</p>
                </div>
                <div className="toggle-section">
                    <PrivacyRow icon={RiHardDriveLine} label="Analytics & Data Collection" desc="Help improve the product by sharing anonymous usage data" settingKey="dataCollection" value={privacy.dataCollection} onToggle={updatePrivacy} badge={{ type: 'warning', text: 'Optional' }} />
                    <PrivacyRow icon={RiTimeLine} label="Cookie Tracking" desc="Allow functional and preference cookies" settingKey="cookieTracking" value={privacy.cookieTracking} onToggle={updatePrivacy} />
                </div>
            </motion.div>

            <motion.div className="settings-card" variants={itemV}>
                <div className="card-header">
                    <h2 className="card-title">Developer Access</h2>
                    <p className="card-desc">Third-party and API access controls</p>
                </div>
                <div className="toggle-section">
                    <PrivacyRow icon={RiShieldLine} label="API Access" desc="Allow third-party apps to access your account via API" settingKey="apiAccess" value={privacy.apiAccess} onToggle={updatePrivacy} badge={{ type: 'warning', text: 'Advanced' }} />
                </div>
                {privacy.apiAccess && (
                    <motion.div
                        className="api-key-box"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        style={{ marginTop: 16 }}
                    >
                        <div className="form-group">
                            <label className="form-label">API Key</label>
                            <div className="input-wrap">
                                <input className="form-input" value="sk_live_••••••••••••••••••••••••" readOnly style={{ paddingLeft: 12, fontFamily: 'monospace', letterSpacing: '0.05em' }} />
                            </div>
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>Keep this secret. Rotate regularly for security.</span>
                        </div>
                    </motion.div>
                )}
            </motion.div>

            <motion.div className="settings-card" variants={itemV} style={{ background: 'rgba(var(--accent-rgb), 0.04)', borderColor: 'rgba(var(--accent-rgb), 0.2)' }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(var(--accent-rgb), 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontSize: '1.2rem', flexShrink: 0 }}>
                        <RiShieldLine />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>GDPR & Privacy Compliance</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            We are fully GDPR compliant. You can request a copy of your data, or request deletion at any time.
                            All data is encrypted at rest using AES-256 and in transit using TLS 1.3.
                        </p>
                        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                            <button className="btn btn-ghost btn-sm" onClick={() => toast('Data export initiated', { icon: '📦' })}>Request Data Export</button>
                            <button className="btn btn-ghost btn-sm">View Privacy Policy</button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default PrivacySettings;
