import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import { API_URL } from '../config/api';
import Background from '../components/Background';
import { colors } from '../theme';

type Props = {
    user: any;
    onLogout: () => void;
    onNavigate: (screen: string) => void;
    showImage?: boolean;
};

export default function DashboardScreen({ user, onLogout, onNavigate, showImage = true }: Props) {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await axios.get(`${API_URL}/assessments/dashboard/${user.id}`);
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const getRiskColor = (risk: string) => {
        switch (risk) {
            case 'Low': return '#22C55E';
            case 'Moderate': return '#F59E0B';
            case 'High': return '#E67E22';
            case 'Severe': return '#EF4444';
            default: return '#6B7280';
        }
    };

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', style: 'destructive', onPress: onLogout },
        ]);
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning 🌅';
        if (hour < 17) return 'Good Afternoon ☀️';
        if (hour < 21) return 'Good Evening 🌆';
        return 'Good Night 🌙';
    };

    const riskLevel = stats?.latestRiskLevel || 'Low';
    const riskColor = getRiskColor(riskLevel);
    const isAdmin = user.role?.toLowerCase() === 'admin';
    const greeting = getGreeting();

    return (
        <Background showImage={showImage}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>{greeting}</Text>
                        <Text style={styles.userName}>{user.name}</Text>
                    </View>
                    <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                        <Feather name="log-out" size={18} color="#FFFFFF" />
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.statsCard}>
                    <View style={styles.statsHeader}>
                        <Text style={styles.statsLabel}>Mental Health Score</Text>
                        <View style={[styles.riskBadge, { backgroundColor: riskColor + '20' }]}>
                            <Text style={[styles.riskText, { color: riskColor }]}>{riskLevel}</Text>
                        </View>
                    </View>
                    <Text style={styles.statsScore}>{loading ? '...' : stats?.averageScore || 0}</Text>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${Math.min((stats?.averageScore || 0) * 2.5, 100)}%`, backgroundColor: riskColor }]} />
                    </View>
                    <Text style={styles.statsSubtext}>Your current risk level</Text>
                </View>

                <View style={styles.quickStatsRow}>
                    <View style={styles.quickStat}>
                        <Text style={styles.quickStatNumber}>{loading ? '...' : stats?.totalAssessments || 0}</Text>
                        <Text style={styles.quickStatLabel}>Assessments</Text>
                    </View>
                    <View style={styles.quickStat}>
                        <Text style={styles.quickStatNumber}>{loading ? '...' : stats?.averageScore || 0}</Text>
                        <Text style={styles.quickStatLabel}>Avg Score</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <View style={styles.actionsGrid}>
                    <TouchableOpacity style={styles.actionCard} onPress={() => onNavigate('Assessment')}>
                        <LinearGradient colors={['#2563EB', '#38BDF8']} style={styles.actionGradient}>
                            <Feather name="clipboard" size={28} color="#FFFFFF" />
                            <Text style={styles.actionLabel}>Assessment</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionCard} onPress={() => onNavigate('History')}>
                        <LinearGradient colors={['#22C55E', '#16A34A']} style={styles.actionGradient}>
                            <Feather name="bar-chart-2" size={28} color="#FFFFFF" />
                            <Text style={styles.actionLabel}>History</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionCard} onPress={() => onNavigate('Trends')}>
                        <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.actionGradient}>
                            <Feather name="trending-up" size={28} color="#FFFFFF" />
                            <Text style={styles.actionLabel}>Trends</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionCard} onPress={() => onNavigate('Profile')}>
                        <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.actionGradient}>
                            <Feather name="user" size={28} color="#FFFFFF" />
                            <Text style={styles.actionLabel}>Profile</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    {isAdmin && (
                        <TouchableOpacity style={styles.actionCard} onPress={() => onNavigate('AdminDashboard')}>
                            <LinearGradient colors={['#EC4899', '#BE185D']} style={styles.actionGradient}>
                                <Feather name="shield" size={28} color="#FFFFFF" />
                                <Text style={styles.actionLabel}>Admin Panel</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity style={styles.actionCard} onPress={() => onNavigate('NotificationCenter')}>
                        <LinearGradient colors={['#6366F1', '#4F46E5']} style={styles.actionGradient}>
                            <Feather name="bell" size={28} color="#FFFFFF" />
                            <Text style={styles.actionLabel}>Notifications</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionCard} onPress={() => onNavigate('Help')}>
                        <LinearGradient colors={['#14B8A6', '#0D9488']} style={styles.actionGradient}>
                            <Feather name="help-circle" size={28} color="#FFFFFF" />
                            <Text style={styles.actionLabel}>Help</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style={styles.quoteCard}>
                    <Text style={styles.quoteText}>
                        "Every day is a new beginning. Take a deep breath and start again."
                    </Text>
                </View>
            </ScrollView>
        </Background>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    greeting: { fontSize: 16, color: '#6B7280' },
    userName: { fontSize: 28, fontWeight: 'bold', color: '#111827' },
    logoutButton: { backgroundColor: '#EF4444', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 6 },
    logoutText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 },
    statsCard: { backgroundColor: 'rgba(255,255,255,0.85)', padding: 20, borderRadius: 16, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
    statsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    statsLabel: { fontSize: 16, color: '#6B7280' },
    riskBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
    riskText: { fontSize: 14, fontWeight: '600' },
    statsScore: { fontSize: 48, fontWeight: 'bold', color: '#111827', marginBottom: 12 },
    progressBar: { height: 6, backgroundColor: '#E5E7EB', borderRadius: 3, overflow: 'hidden', marginBottom: 8 },
    progressFill: { height: '100%', borderRadius: 3 },
    statsSubtext: { fontSize: 13, color: '#6B7280' },
    quickStatsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
    quickStat: { flex: 1, backgroundColor: 'rgba(255,255,255,0.85)', padding: 16, borderRadius: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
    quickStatNumber: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
    quickStatLabel: { fontSize: 13, color: '#6B7280', marginTop: 4 },
    sectionTitle: { fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 12 },
    actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
    actionCard: { width: '48%', borderRadius: 12, overflow: 'hidden', elevation: 2 },
    actionGradient: { padding: 16, alignItems: 'center', justifyContent: 'center', gap: 4 },
    actionLabel: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
    quoteCard: { backgroundColor: 'rgba(255,255,255,0.85)', padding: 16, borderRadius: 12, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
    quoteText: { fontSize: 16, color: '#111827', fontStyle: 'italic', textAlign: 'center' },
});