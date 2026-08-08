import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import Background from '../components/Background';

type Props = {
    onBack: () => void;
    showImage?: boolean;
};

type NotificationItem = {
    id: string;
    title: string;
    body: string;
    date: string;
};

export default function NotificationCenterScreen({ onBack, showImage = false }: Props) {
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);

    useEffect(() => {
        Notifications.getPresentedNotificationsAsync().then((presented) => {
            const items = presented.map((n) => ({
                id: n.request.identifier,
                title: n.request.content.title || 'WELLNEST',
                body: n.request.content.body || '',
                date: new Date(n.date).toLocaleString(),
            }));
            setNotifications(items);
        });
    }, []);

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        return isNaN(d.getTime()) ? 'Just now' : d.toLocaleString();
    };

    return (
        <Background showImage={showImage}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onBack} style={styles.backButton}>
                        <Feather name="arrow-left" size={20} color="#2563EB" />
                        <Text style={styles.backText}>Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Notifications</Text>
                    <View style={{ width: 50 }} />
                </View>

                {notifications.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Feather name="bell-off" size={48} color="#6B7280" />
                        <Text style={styles.emptyTitle}>No Notifications</Text>
                        <Text style={styles.emptySubtext}>You'll see your daily reminders here.</Text>
                    </View>
                ) : (
                    <FlatList
                        data={notifications}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <LinearGradient colors={['#ffffff', '#f8fafc']} style={styles.card}>
                                <View style={styles.cardHeader}>
                                    <Feather name="bell" size={18} color="#2563EB" />
                                    <Text style={styles.cardTitle}>{item.title}</Text>
                                </View>
                                <Text style={styles.cardBody}>{item.body}</Text>
                                <Text style={styles.cardDate}>{formatDate(item.date)}</Text>
                            </LinearGradient>
                        )}
                    />
                )}
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    backText: {
        fontSize: 16,
        color: '#2563EB',
        fontWeight: '600',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111827',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111827',
        marginTop: 12,
    },
    emptySubtext: {
        fontSize: 16,
        color: '#6B7280',
        marginTop: 8,
        textAlign: 'center',
    },
    card: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111827',
    },
    cardBody: {
        fontSize: 14,
        color: '#4B5563',
        marginTop: 2,
    },
    cardDate: {
        fontSize: 12,
        color: '#9CA3AF',
        marginTop: 6,
    },
});