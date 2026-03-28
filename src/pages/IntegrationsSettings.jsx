import { motion, AnimatePresence } from 'framer-motion';
import {
    RiGithubFill, RiGoogleFill, RiSlackFill, RiPlugLine,
    RiCheckLine, RiLink, RiLinkUnlink, RiExternalLinkLine,
} from 'react-icons/ri';
import { SiFigma } from 'react-icons/si';
import { useSettings } from '../contexts/SettingsContext';
import toast from 'react-hot-toast';
import './Settings.css';
import './IntegrationsSettings.css';

const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const itemV = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };

const ICONS = {
    github: { icon: RiGithubFill, color: '#333', bg: '#24292e' },
    google: { icon: RiGoogleFill, color: '#EA4335', bg: '#fff' },
    slack: { icon: RiSlackFill, color: '#4A154B', bg: '#4A154B' },
    notion: { icon: RiPlugLine, color: '#000', bg: '#000' },
    figma: { icon: SiFigma, color: '#fff', bg: '#F24E1E' },
    vercel: { icon: RiPlugLine, color: '#000', bg: '#000' },
};

const IntegrationCard = ({ integration, onToggle }) => {
    const iconData = ICONS[integration.id] || { icon: RiPlugLine, color: '#6366f1', bg: '#6366f1' };
    const Icon = iconData.icon;

    return (
        <motion.div
            className={`integration-card ${integration.connected ? 'connected' : ''}`}
            variants={itemV}
            whileHover={{ y: -2 }}
            layout
        >
            <div className="integration-icon" style={{ background: `${iconData.bg}15`, border: `1px solid ${iconData.bg}30` }}>
                <Icon style={{ color: iconData.color !== '#fff' ? iconData.bg : iconData.color, fontSize: '1.4rem' }} />
            </div>
            <div className="integration-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <p className="integration-name">{integration.name}</p>
                    {integration.connected && <span className="info-badge"><RiCheckLine /> Connected</span>}
                </div>
                {integration.connected && integration.username && (
                    <p className="integration-username">@{integration.username}</p>
                )}
                {!integration.connected && (
                    <p className="integration-desc">Connect your {integration.name} account</p>
                )}
            </div>
            <div className="integration-actions">
                {integration.connected && (
                    <button className="action-link" title="Open in new tab">
                        <RiExternalLinkLine />
                    </button>
                )}
                <motion.button
                    className={`btn btn-sm ${integration.connected ? 'btn-ghost disconnect-btn' : 'btn-primary'}`}
                    onClick={() => {
                        onToggle(integration.id);
                        if (integration.connected) {
                            toast.error(`${integration.name} disconnected`);
                        } else {
                            toast.success(`${integration.name} connected successfully!`);
                        }
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                >
                    {integration.connected ? <><RiLinkUnlink /> Disconnect</> : <><RiLink /> Connect</>}
                </motion.button>
            </div>
        </motion.div>
    );
};

const IntegrationsSettings = () => {
    const { integrations, toggleIntegration } = useSettings();
    const connectedCount = integrations.filter(i => i.connected).length;

    return (
        <motion.div className="settings-page" variants={containerV} initial="hidden" animate="visible">
            <motion.div className="page-header" variants={itemV}>
                <div>
                    <h1 className="page-title">Integrations</h1>
                    <p className="page-desc">Connect your favorite tools and services.</p>
                </div>
                <div className="info-badge" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                    {connectedCount} / {integrations.length} Connected
                </div>
            </motion.div>

            {/* Stats bar */}
            <motion.div className="settings-card" variants={itemV} style={{ padding: '16px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                        <div>
                            <p style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent)' }}>{connectedCount}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Active Integrations</p>
                        </div>
                        <div>
                            <p style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>{integrations.length - connectedCount}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Available to Connect</p>
                        </div>
                    </div>
                    <div style={{ width: 200 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Connected</span>
                            <span style={{ fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 600 }}>{Math.round((connectedCount / integrations.length) * 100)}%</span>
                        </div>
                        <div style={{ height: 6, borderRadius: 3, background: 'var(--border)' }}>
                            <motion.div
                                style={{ height: '100%', borderRadius: 3, background: 'var(--accent)' }}
                                animate={{ width: `${(connectedCount / integrations.length) * 100}%` }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                            />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Integration cards */}
            <motion.div className="settings-card" variants={itemV}>
                <div className="card-header">
                    <h2 className="card-title">Connected Apps</h2>
                    <p className="card-desc">Manage all your third-party integrations here</p>
                </div>
                <div className="integrations-grid">
                    {integrations.map(integration => (
                        <IntegrationCard key={integration.id} integration={integration} onToggle={toggleIntegration} />
                    ))}
                </div>
            </motion.div>

            {/* Webhooks */}
            <motion.div className="settings-card" variants={itemV}>
                <div className="card-header">
                    <h2 className="card-title">Webhooks</h2>
                    <p className="card-desc">Receive real-time updates via HTTP callbacks</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                    <div>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>No webhooks configured</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>Add endpoints to receive event-driven updates</p>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => toast('Webhook configuration coming soon!')}>
                        <RiPlugLine /> Add Webhook
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default IntegrationsSettings;
