import React, { useState, useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { requestNotificationPermission, scheduleDailyReminder } from './src/services/notificationService';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import AssessmentScreen from './src/screens/AssessmentScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import NotificationCenterScreen from './src/screens/NotificationCenterScreen';
import TrendsScreen from './src/screens/TrendsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import AdminDashboardScreen from './src/screens/AdminDashboardScreen';
import HelpScreen from './src/screens/HelpScreen';

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
};

export default function App() {
    const [user, setUser] = useState<User | null>(null);
    const [currentScreen, setCurrentScreen] = useState('Login');
    const [resetToken, setResetToken] = useState('');
    const [resetEmail, setResetEmail] = useState('');

    const notificationListener = useRef<Notifications.Subscription | null>(null);
    const responseListener = useRef<Notifications.Subscription | null>(null);

    useEffect(() => {
        requestNotificationPermission().then((granted) => {
            if (granted) {
                scheduleDailyReminder();
            }
        });

        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
            console.log('Notification received:', notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(() => {
            setCurrentScreen('NotificationCenter');
        });

        return () => {
            if (notificationListener.current) notificationListener.current.remove();
            if (responseListener.current) responseListener.current.remove();
        };
    }, []);

    const navigateTo = (screen: string) => {
        setCurrentScreen(screen);
    };

    const handleLogout = () => {
        setUser(null);
        setCurrentScreen('Login');
    };

    // If user is logged out, only show unauthenticated screens
    if (!user) {
        switch (currentScreen) {
            case 'Register':
                return (
                    <SafeAreaProvider>
                        <RegisterScreen
                            onRegister={() => setCurrentScreen('Login')}
                            onNavigateToLogin={() => setCurrentScreen('Login')}
                        />
                    </SafeAreaProvider>
                );
            case 'ForgotPassword':
                return (
                    <SafeAreaProvider>
                        <ForgotPasswordScreen
                            onBack={() => setCurrentScreen('Login')}
                            onTokenReceived={(token, email) => {
                                setResetToken(token);
                                setResetEmail(email);
                                setCurrentScreen('ResetPassword');
                            }}
                        />
                    </SafeAreaProvider>
                );
            case 'ResetPassword':
                return (
                    <SafeAreaProvider>
                        <ResetPasswordScreen
                            email={resetEmail}
                            token={resetToken}
                            onResetComplete={() => setCurrentScreen('Login')}
                            onBack={() => setCurrentScreen('ForgotPassword')}
                        />
                    </SafeAreaProvider>
                );
            case 'Login':
            default:
                return (
                    <SafeAreaProvider>
                        <LoginScreen
                            onLogin={(u: User) => {
                                setUser(u);
                                setCurrentScreen('Dashboard');
                            }}
                            onNavigateToRegister={() => setCurrentScreen('Register')}
                            onNavigateToForgotPassword={() => setCurrentScreen('ForgotPassword')}
                        />
                    </SafeAreaProvider>
                );
        }
    }

    // User is logged in — show protected screens
    // showImage: true = doctor background
    // showImage: false = clean white/gray background
    switch (currentScreen) {
        case 'Assessment':
            return <AssessmentScreen user={user} onComplete={() => setCurrentScreen('Dashboard')} showImage={false} />;
        case 'History':
            return <HistoryScreen userId={user.id} onBack={() => setCurrentScreen('Dashboard')} showImage={false} />;
        case 'NotificationCenter':
            return <NotificationCenterScreen onBack={() => setCurrentScreen('Dashboard')} showImage={false} />;
        case 'Trends':
            return <TrendsScreen userId={user.id} onBack={() => setCurrentScreen('Dashboard')} showImage={false} />;
        case 'Profile':
            return (
                <ProfileScreen
                    user={user}
                    onUpdate={(updated) => setUser(updated)}
                    onBack={() => setCurrentScreen('Dashboard')}
                    showImage={false}
                />
            );
        case 'Help':
            return <HelpScreen onBack={() => setCurrentScreen('Dashboard')} showImage={false} />;
        case 'AdminDashboard':
            // ✅ Admin Dashboard keeps the background image
            return (
                <AdminDashboardScreen
                    user={user}
                    onLogout={handleLogout}
                    onNavigate={navigateTo}
                    showImage={true}
                />
            );
        case 'Dashboard':
        default:
            // ✅ Dashboard keeps the background image
            return (
                <DashboardScreen
                    user={user}
                    onLogout={handleLogout}
                    onNavigate={navigateTo}
                    showImage={true}
                />
            );
    }
}