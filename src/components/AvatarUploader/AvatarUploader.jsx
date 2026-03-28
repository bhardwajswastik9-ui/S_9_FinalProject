import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiCameraLine, RiDeleteBinLine, RiUploadLine } from 'react-icons/ri';
import { useSettings } from '../../contexts/SettingsContext';
import toast from 'react-hot-toast';
import './AvatarUploader.css';

const AvatarUploader = () => {
    const { profile, updateProfile } = useSettings();
    const fileRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFile = (file) => {
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            toast.error('Please upload an image file');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image must be less than 5MB');
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            updateProfile({ avatar: e.target.result });
            toast.success('Avatar updated successfully!');
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
    };

    const removeAvatar = () => {
        updateProfile({ avatar: null });
        toast.success('Avatar removed');
    };

    return (
        <div className="avatar-section">
            <div className="avatar-preview-wrap">
                <motion.div
                    className={`avatar-dropzone ${isDragging ? 'dragging' : ''}`}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileRef.current?.click()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <div className="avatar-display">
                        {profile.avatar ? (
                            <img src={profile.avatar} alt="Avatar" className="avatar-img" />
                        ) : (
                            <div className="avatar-placeholder">
                                <span className="avatar-initial">{profile.name.charAt(0).toUpperCase()}</span>
                            </div>
                        )}
                        <div className="avatar-overlay">
                            <RiCameraLine />
                            <span>Change</span>
                        </div>
                    </div>
                    <AnimatePresence>
                        {isDragging && (
                            <motion.div
                                className="drag-indicator"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <RiUploadLine />
                                <span>Drop image here</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <div className="avatar-meta">
                    <div className="online-badge">● Online</div>
                    <h3 className="avatar-name">{profile.name}</h3>
                    <p className="avatar-role">Administrator</p>
                </div>
            </div>

            <div className="avatar-actions">
                <button className="btn btn-primary btn-sm" onClick={() => fileRef.current?.click()}>
                    <RiUploadLine /> Upload Photo
                </button>
                {profile.avatar && (
                    <button className="btn btn-ghost btn-sm" onClick={removeAvatar}>
                        <RiDeleteBinLine /> Remove
                    </button>
                )}
                <p className="avatar-hint">JPG, PNG or GIF. Max 5MB.</p>
            </div>

            <input
                ref={fileRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => handleFile(e.target.files[0])}
            />
        </div>
    );
};

export default AvatarUploader;
