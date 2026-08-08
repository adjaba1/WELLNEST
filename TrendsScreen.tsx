import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { LineChart } from 'react-native-chart-kit';
import { API_URL } from '../config/api';
import Background from '../components/Background';

type Props = {
    userId: number;
    onBack: () => void;
    showImage?: boolean;
};

const screenWidth = Dimensions.get('window').width - 40;

export default function TrendsScreen({ userId, onBack, showImage = false }: Props) {
    const [assessments, setAssessments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchAssessments(); }, []);

    const fetchAssessments = async () => {
        try {
            const response = await axios.get(`${API_URL}/assessments/user/${userId}`);
            setAssessments(response.data);
        } catch (error) { console.error(error); } finally { setLoading(false); }
    };

    if (loading) {
        return (
            <Background showImage={showImage}>
                <View style={styles.center}><ActivityIndicator size="large" color="#2563EB" /></View>
            </Background>
        );
    }

    if (assessments.length === 0) {
        return (
            <Background showImage={showImage}>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>📊 No Data Yet</Text>
                    <Text style={styles.emptySubtext}>Complete an assessment to see your trends.</Text>
                    <TouchableOpacity onPress={onBack} style={styles.emptyBackButton}>
                        <Text style={styles.emptyBackText}>Back to Dashboard</Text>
                    </TouchableOpacity>
                </View>
            </Background>
        );
    }

    const sorted = [...assessments].reverse();
    const labels = sorted.map((_, i) => `#${i + 1}`);
    const scores = sorted.map((item) => item.score);
    const maxScore = sorted[0]?.maxScore || 40;

    const chartData = {
        labels: labels,
        datasets: [{ data: scores, color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`, strokeWidth: 2 }],
    };

    const latestRisk = assessments[0]?.riskLevel || 'Low';
    const averageScore = Math.round(assessments.reduce((sum, item) => sum + item.score, 0) / assessments.length);

    return (
        <Background showImage={showImage}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onBack}><Text style={styles.backText}>← Back</Text></TouchableOpacity>
                    <Text style={styles.title}>Trends</Text><View style={{ width: 50 }} />
                </View>
                <Text style={styles.subtitle}>Your assessment scores over time</Text>

                <LinearGradient colors={['#ffffff', '#f0f4ff']} style={styles.chartCard}>
                    <LineChart
                        data={chartData}
                        width={screenWidth}
                        height={220}
                        chartConfig={{
                            backgroundColor: '#ffffff',
                            backgroundGradientFrom: '#ffffff',
                            backgroundGradientTo: '#ffffff',
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: { borderRadius: 16 },
                            propsForDots: { r: '6', strokeWidth: '2', stroke: '#2563EB' },
                        }}
                        bezier
                        style={styles.chart}
                        formatYLabel={(value) => `${parseInt(value)}/${maxScore}`}
                    />
                </LinearGradient>

                <View style={styles.statsRow}>
                    <LinearGradient colors={['#ffffff', '#f0f4ff']} style={styles.statBox}>
                        <Text style={styles.statNumber}>{assessments.length}</Text>
                        <Text style={styles.statLabel}>Total</Text>
                    </LinearGradient>
                    <LinearGradient colors={['#ffffff', '#f0f4ff']} style={styles.statBox}>
                        <Text style={styles.statNumber}>{averageScore}</Text>
                        <Text style={styles.statLabel}>Average</Text>
                    </LinearGradient>
                    <LinearGradient colors={['#ffffff', '#f0f4ff']} style={styles.statBox}>
                        <Text style={[styles.statNumber, { color: '#E67E22' }]}>{assessments[0]?.score || 0}</Text>
                        <Text style={styles.statLabel}>Latest</Text>
                    </LinearGradient>
                    <LinearGradient colors={['#ffffff', '#f0f4ff']} style={styles.statBox}>
                        <Text style={[styles.statNumber, { color: '#22C55E' }]}>{latestRisk}</Text>
                        <Text style={styles.statLabel}>Risk</Text>
                    </LinearGradient>
                </View>
            </ScrollView>
        </Background>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
    backText: { fontSize: 16, color: '#2563EB', fontWeight: '600' },
    title: { fontSize: 22, fontWeight: 'bold', color: '#111827' },
    subtitle: { fontSize: 14, color: '#6B7280', marginBottom: 20, textAlign: 'center' },
    chartCard: { borderRadius: 16, padding: 12, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3, alignItems: 'center' },
    chart: { borderRadius: 8 },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8, marginBottom: 24 },
    statBox: { flex: 1, padding: 12, borderRadius: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
    statNumber: { fontSize: 20, fontWeight: 'bold', color: '#111827' },
    statLabel: { fontSize: 12, color: '#6B7280', marginTop: 2 },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    emptyTitle: { fontSize: 22, fontWeight: 'bold', color: '#111827', marginBottom: 8 },
    emptySubtext: { fontSize: 16, color: '#6B7280', textAlign: 'center' },
    emptyBackButton: { backgroundColor: '#2563EB', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 10, marginTop: 20 },
    emptyBackText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});