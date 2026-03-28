import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    RiLockLine, RiShieldCheckLine, RiSmartphoneLine, RiComputerLine,
    RiKeyLine, RiAlertLine, RiCheckLine, RiDeleteBinLine,
} from 'react-icons/ri';
import { useSettings } from '../contexts/SettingsContext';
import Modal from '../components/Modal/Modal';
import toast from 'react-hot-toast';
import './Settings.css';
import './SecuritySettings.css';

const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const itemV = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };

const SecuritySettings = () => {
    const { sessions } = useSettings();
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [show2FAModal, setShow2FAModal] = useState(false);
    const [twoFAEnabled, setTwoFAEnabled] = useState(false);
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

    const handlePasswordChange = () => {
        if (!passwords.current || !passwords.new || !passwords.confirm) {
            toast.error('Please fill in all fields');
            return;
        }
        if (passwords.new !== passwords.confirm) {
            toast.error('New passwords do not match');
            return;
        }
        if (passwords.new.length < 8) {
            toast.error('Password must be at least 8 characters');
            return;
        }
        toast.success('Password changed successfully!');
        setShowPasswordModal(false);
        setPasswords({ current: '', new: '', confirm: '' });
    };

    const passwordStrength = (pwd) => {
        if (!pwd) return { score: 0, label: '', color: '' };
        let score = 0;
        if (pwd.length >= 8) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[^a-zA-Z0-9]/.test(pwd)) score++;
        const labels = ['', 'Weak', 'Fair', 'Strong', 'Very Strong'];
        const colors = ['', '#ef4444', '#f59e0b', '#22c55e', '#6366f1'];
        return { score, label: labels[score], color: colors[score] };
    };

    const strength = passwordStrength(passwords.new);

    return (
        <motion.div className="settings-page" variants={containerV} initial="hidden" animate="visible">
            <motion.div className="page-header" variants={itemV}>
                <div>
                    <h1 className="page-title">Security</h1>
                    <p className="page-desc">Protect your account with strong authentication and session management.</p>
                </div>
            </motion.div>

            {/* Security Score */}
            <motion.div className="settings-card security-score-card" variants={itemV}>
                <div className="security-score-ring">
                    <svg viewBox="0 0 120 120" className="ring-svg">
                        <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border)" strokeWidth="8" />
                        <circle cx="60" cy="60" r="50" fill="none" stroke={twoFAEnabled ? '#22c55e' : '#f59e0b'}
                            strokeWidth="8" strokeLinecap="round"
                            strokeDasharray={`${twoFAEnabled ? 251 : 160} 314`}
                            transform="rotate(-90 60 60)"
                            style={{ transition: 'stroke-dasharray 0.8s ease' }}
                        />
                    </svg>
                    <div className="ring-label">
                        <span className="ring-score">{twoFAEnabled ? '85' : '60'}%</span>
                        <span className="ring-text">Secure</span>
                    </div>
                </div>
                <div className="security-score-info">
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Account Security Score</h3>
                    <div className="security-checklist">
                        <div className="check-item done"><RiCheckLine /><span>Strong password set</span></div>
                        <div className={`check-item ${twoFAEnabled ? 'done' : 'pending'}`}>{twoFAEnabled ? <RiCheckLine /> : <RiAlertLine />}<span>Two-factor authentication</span></div>
                        <div className="check-item done"><RiCheckLine /><span>Email verified</span></div>
                        <div className="check-item pending"><RiAlertLine /><span>Recovery codes saved</span></div>
                    </div>
                </div>
            </motion.div>

            {/* Password */}
            <motion.div className="settings-card" variants={itemV}>
                <div className="card-header">
                    <h2 className="card-title">Password</h2>
                    <p className="card-desc">Keep your account secure with a strong password</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                    <div>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Last changed: <strong>3 months ago</strong></p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>Use at least 12 characters with mixed case, numbers, and symbols</p>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => setShowPasswordModal(true)}>
                        <RiKeyLine /> Change Password
                    </button>
                </div>
            </motion.div>

            {/* 2FA */}
            <motion.div className="settings-card" variants={itemV}>
                <div className="card-header">
                    <h2 className="card-title">Two-Factor Authentication</h2>
                    <p className="card-desc">Add an extra layer of security to your account</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 10, background: twoFAEnabled ? 'rgba(34, 197, 94, 0.15)' : 'var(--bg-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: twoFAEnabled ? '#22c55e' : 'var(--text-muted)', fontSize: '1.3rem' }}>
                            <RiSmartphoneLine />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                Authenticator App
                                {twoFAEnabled && <span className="info-badge" style={{ marginLeft: 8 }}>Active</span>}
                            </p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>Google Authenticator or similar TOTP app</p>
                        </div>
                    </div>
                    <button
                        className={`btn ${twoFAEnabled ? 'btn-ghost' : 'btn-primary'} btn-sm`}
                        onClick={() => {
                            if (twoFAEnabled) {
                                setTwoFAEnabled(false);
                                toast.error('2FA has been disabled');
                            } else {
                                setShow2FAModal(true);
                            }
                        }}
                    >
                        {twoFAEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                    </button>
                </div>
            </motion.div>

            {/* Sessions */}
            <motion.div className="settings-card" variants={itemV}>
                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <h2 className="card-title">Active Sessions</h2>
                        <p className="card-desc">Devices where your account is currently logged in</p>
                    </div>
                    <button className="btn btn-ghost btn-sm" onClick={() => toast.success('All other sessions terminated')}>
                        <RiDeleteBinLine /> End All Others
                    </button>
                </div>
                <div className="sessions-list">
                    {sessions.map((session) => (
                        <motion.div key={session.id} className="session-item" layout>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--bg-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: session.current ? 'var(--accent)' : 'var(--text-muted)', fontSize: '1.2rem' }}>
                                    <RiComputerLine />
                                </div>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>{session.device}</p>
                                        {session.current && <span className="info-badge">Current</span>}
                                    </div>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 1 }}>{session.browser} · {session.location}</p>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 1 }}>Last active: {session.lastActive}</p>
                                </div>
                            </div>
                            {!session.current && (
                                <button className="btn btn-ghost btn-sm" style={{ color: '#ef4444', borderColor: 'rgba(239,68,68,0.2)' }} onClick={() => toast.success(`Session on ${session.device} terminated`)}>
                                    Revoke
                                </button>
                            )}
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Change Password Modal */}
            <Modal
                isOpen={showPasswordModal}
                onClose={() => setShowPasswordModal(false)}
                title="Change Password"
                footer={
                    <>
                        <button className="btn btn-ghost" onClick={() => setShowPasswordModal(false)}>Cancel</button>
                        <button className="btn btn-primary" onClick={handlePasswordChange}>Update Password</button>
                    </>
                }
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div className="form-group">
                        <label className="form-label">Current Password</label>
                        <input className="form-input" type="password" style={{ paddingLeft: 12 }} placeholder="••••••••" value={passwords.current} onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">New Password</label>
                        <input className="form-input" type="password" style={{ paddingLeft: 12 }} placeholder="••••••••" value={passwords.new} onChange={e => setPasswords(p => ({ ...p, new: e.target.value }))} />
                        {passwords.new && (
                            <div style={{ marginTop: 6 }}>
                                <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= strength.score ? strength.color : 'var(--border)', transition: 'background 0.3s ease' }} />
                                    ))}
                                </div>
                                <span style={{ fontSize: '0.72rem', color: strength.color, fontWeight: 600 }}>{strength.label}</span>
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="form-label">Confirm New Password</label>
                        <input className="form-input" type="password" style={{ paddingLeft: 12 }} placeholder="••••••••" value={passwords.confirm} onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))} />
                    </div>
                </div>
            </Modal>

            {/* 2FA Modal */}
            <Modal
                isOpen={show2FAModal}
                onClose={() => setShow2FAModal(false)}
                title="Enable Two-Factor Authentication"
                footer={
                    <>
                        <button className="btn btn-ghost" onClick={() => setShow2FAModal(false)}>Cancel</button>
                        <button className="btn btn-primary" onClick={() => { setTwoFAEnabled(true); setShow2FAModal(false); toast.success('2FA enabled! Your account is now more secure.'); }}>
                            <RiShieldCheckLine /> Enable 2FA
                        </button>
                    </>
                }
            >
                <div style={{ textAlign: 'center' }}>
                    <div style={{ background: '#fff', padding: 16, borderRadius: 12, display: 'inline-block', marginBottom: 16 }}>
                        <div style={{ width: 140, height: 140, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '4rem' }}>
                            📱
                        </div>
                    </div>
                    <p style={{ marginBottom: 8 }}>Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Or enter this code manually: <strong style={{ color: 'var(--accent)', fontFamily: 'monospace' }}>JBSW Y3DP EHPK 3PXP</strong></p>
                </div>
            </Modal>
        </motion.div>
    );
};

export default SecuritySettings;
