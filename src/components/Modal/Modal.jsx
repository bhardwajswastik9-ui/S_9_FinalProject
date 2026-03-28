import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiCloseLine } from 'react-icons/ri';
import './Modal.css';

const Modal = ({ isOpen, onClose, title, children, footer, size = 'md', danger = false }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        if (isOpen) window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="modal-overlay-wrap">
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className={`modal modal-${size} ${danger ? 'modal-danger' : ''}`}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="modal-header">
                            <h2 className="modal-title">{title}</h2>
                            <button className="modal-close" onClick={onClose}>
                                <RiCloseLine />
                            </button>
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                        {footer && (
                            <div className="modal-footer">
                                {footer}
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
