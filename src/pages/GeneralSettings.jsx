import { useState } from 'react';
import { motion } from 'framer-motion';
import { RiUserLine, RiMailLine, RiAtLine, RiMapPinLine, RiGlobalLine, RiSaveLine, RiTranslate2 } from 'react-icons/ri';
import { useSettings } from '../contexts/SettingsContext';
import AvatarUploader from '../components/AvatarUploader/AvatarUploader';
import toast from 'react-hot-toast';
import './Settings.css';

const inputVariants = {
    focus: { scale: 1.005, transition: { duration: 0.15 } },
    blur: { scale: 1, transition: { duration: 0.15 } },
};

const GeneralSettings = () => {
    const { profile, updateProfile } = useSettings();
    const [form, setForm] = useState({ ...profile });
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise(r => setTimeout(r, 800));
        updateProfile(form);
        setIsSaving(false);
        toast.success('Profile updated successfully!', {
            icon: '✅',
            style: { fontWeight: 600 },
        });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            className="settings-page"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Page Header */}
            <motion.div className="page-header" variants={itemVariants}>
                <div>
                    <h1 className="page-title">General Settings</h1>
                    <p className="page-desc">Manage your public-facing profile and account preferences.</p>
                </div>
                <motion.button
                    className={`btn btn-primary ${isSaving ? 'loading' : ''}`}
                    onClick={handleSave}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={isSaving}
                >
                    <RiSaveLine />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </motion.button>
            </motion.div>

            {/* Avatar Section */}
            <motion.div className="settings-card" variants={itemVariants}>
                <div className="card-header">
                    <h2 className="card-title">Profile Photo</h2>
                    <p className="card-desc">Click to upload or drag and drop an image</p>
                </div>
                <AvatarUploader />
            </motion.div>

            {/* Profile Information */}
            <motion.div className="settings-card" variants={itemVariants}>
                <div className="card-header">
                    <h2 className="card-title">Profile Information</h2>
                    <p className="card-desc">Update your personal details below</p>
                </div>
                <div className="form-grid">
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <div className="input-wrap">
                            <RiUserLine className="input-icon" />
                            <input
                                className="form-input"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Your full name"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <div className="input-wrap">
                            <RiAtLine className="input-icon" />
                            <input
                                className="form-input"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                placeholder="username"
                            />
                        </div>
                    </div>

                    <div className="form-group full-width">
                        <label className="form-label">Email Address</label>
                        <div className="input-wrap">
                            <RiMailLine className="input-icon" />
                            <input
                                className="form-input"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <div className="form-group full-width">
                        <label className="form-label">Bio</label>
                        <textarea
                            className="form-textarea"
                            name="bio"
                            value={form.bio}
                            onChange={handleChange}
                            placeholder="Tell us a bit about yourself..."
                            rows={3}
                        />
                        <span className="char-count">{form.bio.length}/160</span>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Location</label>
                        <div className="input-wrap">
                            <RiMapPinLine className="input-icon" />
                            <input
                                className="form-input"
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                placeholder="City, Country"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Website</label>
                        <div className="input-wrap">
                            <RiGlobalLine className="input-icon" />
                            <input
                                className="form-input"
                                name="website"
                                value={form.website}
                                onChange={handleChange}
                                placeholder="https://yoursite.com"
                            />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Preferences */}
            <motion.div className="settings-card" variants={itemVariants}>
                <div className="card-header">
                    <h2 className="card-title">Preferences</h2>
                    <p className="card-desc">Localization and regional settings</p>
                </div>
                <div className="form-grid">
                    <div className="form-group">
                        <label className="form-label"><RiTranslate2 style={{ marginRight: 6 }} />Language</label>
                        <select className="form-select" name="language" value={form.language} onChange={handleChange}>
                            <option value="en">English (US)</option>
                            <option value="en-gb">English (UK)</option>
                            <option value="hi">हिन्दी</option>
                            <option value="fr">Français</option>
                            <option value="de">Deutsch</option>
                            <option value="ja">日本語</option>
                            <option value="zh">中文</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Timezone</label>
                        <select className="form-select" name="timezone" value={form.timezone} onChange={handleChange}>
                            <option value="Asia/Kolkata">India Standard Time (IST)</option>
                            <option value="UTC">UTC</option>
                            <option value="America/New_York">Eastern Time (ET)</option>
                            <option value="America/Los_Angeles">Pacific Time (PT)</option>
                            <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                            <option value="Asia/Tokyo">Japan Standard Time (JST)</option>
                        </select>
                    </div>
                </div>
            </motion.div>

            {/* Danger Zone */}
            <motion.div className="settings-card danger-zone" variants={itemVariants}>
                <div className="card-header">
                    <h2 className="card-title danger-title">Danger Zone</h2>
                    <p className="card-desc">Irreversible and destructive actions</p>
                </div>
                <div className="danger-items">
                    <div className="danger-item">
                        <div>
                            <p className="danger-item-title">Export Account Data</p>
                            <p className="danger-item-desc">Download all your data in JSON format</p>
                        </div>
                        <button className="btn btn-ghost btn-sm">Export</button>
                    </div>
                    <div className="danger-item">
                        <div>
                            <p className="danger-item-title" style={{ color: '#ef4444' }}>Delete Account</p>
                            <p className="danger-item-desc">Permanently delete your account and all data</p>
                        </div>
                        <button className="btn btn-danger btn-sm" onClick={() => toast.error('This is a demo — no data was deleted')}>Delete</button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default GeneralSettings;
