import { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [profile, setProfile] = useState({
        name: 'Swastik Bhardwaj',
        email: 'swastik@example.com',
        username: 'swastikbhardwaj',
        bio: 'Senior Frontend Engineer | Building beautiful UIs',
        location: 'New Delhi, India',
        website: 'https://swastik.dev',
        avatar: null,
        language: 'en',
        timezone: 'Asia/Kolkata',
    });

    const [privacy, setPrivacy] = useState({
        profilePublic: true,
        showEmail: false,
        showActivity: true,
        twoFactorEnabled: false,
        dataCollection: false,
        cookieTracking: true,
        searchIndexing: true,
        apiAccess: false,
    });

    const [notifications, setNotifications] = useState({
        emailMarketing: false,
        emailSecurity: true,
        emailUpdates: true,
        pushEnabled: true,
        pushMentions: true,
        pushComments: false,
        pushDeployments: true,
        smsEnabled: false,
        smsAlerts: false,
        weeklyDigest: true,
        soundEnabled: true,
    });

    const [sessions] = useState([
        { id: 1, device: 'MacBook Pro', browser: 'Chrome 121', location: 'New Delhi, IN', lastActive: '2 minutes ago', current: true },
        { id: 2, device: 'iPhone 15 Pro', browser: 'Safari 17', location: 'Mumbai, IN', lastActive: '3 hours ago', current: false },
        { id: 3, device: 'Windows PC', browser: 'Firefox 123', location: 'Bangalore, IN', lastActive: '2 days ago', current: false },
    ]);

    const [integrations, setIntegrations] = useState([
        { id: 'github', name: 'GitHub', icon: 'github', connected: true, username: 'swastikbhardwaj', color: '#333' },
        { id: 'google', name: 'Google', icon: 'google', connected: true, username: 'swastik@gmail.com', color: '#EA4335' },
        { id: 'slack', name: 'Slack', icon: 'slack', connected: false, username: null, color: '#4A154B' },
        { id: 'notion', name: 'Notion', icon: 'notion', connected: false, username: null, color: '#000' },
        { id: 'figma', name: 'Figma', icon: 'figma', connected: true, username: 'swastik_design', color: '#F24E1E' },
        { id: 'vercel', name: 'Vercel', icon: 'vercel', connected: false, username: null, color: '#000' },
    ]);

    const updatePrivacy = (key, value) => setPrivacy(prev => ({ ...prev, [key]: value }));
    const updateNotifications = (key, value) => setNotifications(prev => ({ ...prev, [key]: value }));
    const updateProfile = (updates) => setProfile(prev => ({ ...prev, ...updates }));
    const toggleIntegration = (id) => setIntegrations(prev =>
        prev.map(i => i.id === id ? { ...i, connected: !i.connected } : i)
    );

    return (
        <SettingsContext.Provider value={{
            profile, updateProfile,
            privacy, updatePrivacy,
            notifications, updateNotifications,
            sessions,
            integrations, toggleIntegration,
        }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);
