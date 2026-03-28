import { motion } from 'framer-motion';
import { RiMailLine, RiBellLine, RiPhoneLine, RiVolumeUpLine, RiNewspaperLine, RiCodeLine } from 'react-icons/ri';
import { useSettings } from '../contexts/SettingsContext';
import ToggleSwitch from '../components/ToggleSwitch/ToggleSwitch';
import toast from 'react-hot-toast';
import './Settings.css';

const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const itemV = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };

const NotifGroup = ({ title, desc, icon: Icon, color, children }) => (
    <motion.div className="settings-card" variants={itemV}>
        <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, fontSize: '1.1rem' }}>
                    <Icon />
                </div>
                <div>
                    <h2 className="card-title">{title}</h2>
                    <p className="card-desc">{desc}</p>
                </div>
            </div>
        </div>
        <div className="toggle-section">{children}</div>
    </motion.div>
);

const NotifRow = ({ label, desc, settingKey, value, onToggle }) => (
    <div className="toggle-row">
        <div className="toggle-row-info">
            <p className="toggle-row-label">{label}</p>
            <p className="toggle-row-desc">{desc}</p>
        </div>
        <ToggleSwitch checked={value} onChange={(v) => { onToggle(settingKey, v); toast.success(`${label} ${v ? 'on' : 'off'}`); }} />
    </div>
);

const NotificationsSettings = () => {
    const { notifications, updateNotifications } = useSettings();

    return (
        <motion.div className="settings-page" variants={containerV} initial="hidden" animate="visible">
            <motion.div className="page-header" variants={itemV}>
                <div>
                    <h1 className="page-title">Notification Preferences</h1>
                    <p className="page-desc">Choose how and when you'd like to be notified.</p>
                </div>
            </motion.div>

            {/* Master switch */}
            <motion.div className="settings-card" variants={itemV} style={{ background: notifications.pushEnabled ? 'rgba(var(--accent-rgb), 0.05)' : 'var(--bg-card)', borderColor: notifications.pushEnabled ? 'rgba(var(--accent-rgb), 0.2)' : 'var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>All Notifications</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 3 }}>Master switch — toggle all notifications at once</p>
                    </div>
                    <ToggleSwitch checked={notifications.pushEnabled} onChange={(v) => {
                        updateNotifications('pushEnabled', v);
                        toast(v ? '🔔 Notifications enabled' : '🔕 All notifications muted');
                    }} />
                </div>
            </motion.div>

            <NotifGroup title="Email Notifications" desc="Messages sent to your email address" icon={RiMailLine} color="#6366f1">
                <NotifRow label="Security Alerts" desc="Login attempts, password changes, 2FA events" settingKey="emailSecurity" value={notifications.emailSecurity} onToggle={updateNotifications} />
                <NotifRow label="Product Updates" desc="New features, releases, and announcements" settingKey="emailUpdates" value={notifications.emailUpdates} onToggle={updateNotifications} />
                <NotifRow label="Marketing Emails" desc="Promotions, tips, and product recommendations" settingKey="emailMarketing" value={notifications.emailMarketing} onToggle={updateNotifications} />
            </NotifGroup>

            <NotifGroup title="Push Notifications" desc="Browser and app push alerts" icon={RiBellLine} color="#8b5cf6">
                <NotifRow label="Mentions" desc="When someone mentions you in a comment" settingKey="pushMentions" value={notifications.pushMentions} onToggle={updateNotifications} disabled={!notifications.pushEnabled} />
                <NotifRow label="Comments & Replies" desc="Replies to your comments and posts" settingKey="pushComments" value={notifications.pushComments} onToggle={updateNotifications} />
                <NotifRow label="Deployment Status" desc="Build success, failure, and deployment events" settingKey="pushDeployments" value={notifications.pushDeployments} onToggle={updateNotifications} />
            </NotifGroup>

            <NotifGroup title="SMS Alerts" desc="Text messages for critical events only" icon={RiPhoneLine} color="#f59e0b">
                <NotifRow label="Enable SMS" desc="Receive critical alerts via text message" settingKey="smsEnabled" value={notifications.smsEnabled} onToggle={updateNotifications} />
                <NotifRow label="Security Alerts" desc="SMS notification for account security events" settingKey="smsAlerts" value={notifications.smsAlerts} onToggle={updateNotifications} disabled={!notifications.smsEnabled} />
            </NotifGroup>

            <NotifGroup title="Digest & Sound" desc="Summary emails and notification sounds" icon={RiNewspaperLine} color="#22c55e">
                <NotifRow label="Weekly Digest" desc="A weekly summary of your account activity" settingKey="weeklyDigest" value={notifications.weeklyDigest} onToggle={updateNotifications} />
                <NotifRow label="Sound Effects" desc="Play a sound when notifications arrive" settingKey="soundEnabled" value={notifications.soundEnabled} onToggle={updateNotifications} />
            </NotifGroup>
        </motion.div>
    );
};

export default NotificationsSettings;
