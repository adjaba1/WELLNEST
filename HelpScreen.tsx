import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import Background from '../components/Background';

type Props = {
    onBack: () => void;
    showImage?: boolean;
};

export default function HelpScreen({ onBack, showImage = false }: Props) {
    return (
        <Background showImage={showImage}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onBack} style={styles.backButton}>
                        <Feather name="arrow-left" size={20} color="#2563EB" />
                        <Text style={styles.backText}>Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>About Scoring</Text>
                    <View style={{ width: 50 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <LinearGradient colors={['#ffffff', '#f0f4ff']} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <FontAwesome5 name="brain" size={28} color="#2563EB" />{/* <-- replaced here */}
                            <Text style={styles.cardTitle}>How WELLNEST Scoring Works</Text>
                        </View>
                        <Text style={styles.cardBody}>
                            The WELLNEST assessment helps you understand your current mental wellness
                            by measuring how often you experience certain feelings and thoughts.
                        </Text>
                    </LinearGradient>

                    <LinearGradient colors={['#ffffff', '#f0f4ff']} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Feather name="bar-chart-2" size={28} color="#F59E0B" />
                            <Text style={styles.cardTitle}>Scoring Scale</Text>
                        </View>
                        <Text style={styles.cardBody}>
                            Each of the 10 questions has 5 options. Your score is calculated based on
                            how often you experience each symptom:
                        </Text>
                        <View style={styles.scaleContainer}>
                            <View style={styles.scaleRow}><Text style={styles.scaleLabel}>Never</Text><Text style={styles.scaleValue}>0 points</Text></View>
                            <View style={styles.scaleRow}><Text style={styles.scaleLabel}>Rarely</Text><Text style={styles.scaleValue}>1 point</Text></View>
                            <View style={styles.scaleRow}><Text style={styles.scaleLabel}>Sometimes</Text><Text style={styles.scaleValue}>2 points</Text></View>
                            <View style={styles.scaleRow}><Text style={styles.scaleLabel}>Often</Text><Text style={styles.scaleValue}>3 points</Text></View>
                            <View style={styles.scaleRow}><Text style={styles.scaleLabel}>Always</Text><Text style={styles.scaleValue}>4 points</Text></View>
                        </View>
                        <Text style={styles.cardBody}>
                            Total scores range from <Text style={styles.bold}>0 to 40</Text>.
                            A higher score indicates more frequent mental health concerns.
                        </Text>
                    </LinearGradient>

                    <LinearGradient colors={['#ffffff', '#f0f4ff']} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Feather name="trending-up" size={28} color="#22C55E" />
                            <Text style={styles.cardTitle}>Understanding Your Risk Level</Text>
                        </View>
                        <View style={styles.riskRow}>
                            <View style={[styles.riskDot, { backgroundColor: '#22C55E' }]} />
                            <View style={styles.riskContent}>
                                <Text style={styles.riskTitle}>Low (0–10)</Text>
                                <Text style={styles.riskDescription}>You're doing well. Keep up your healthy habits and continue checking in with yourself.</Text>
                            </View>
                        </View>
                        <View style={styles.riskRow}>
                            <View style={[styles.riskDot, { backgroundColor: '#F59E0B' }]} />
                            <View style={styles.riskContent}>
                                <Text style={styles.riskTitle}>Moderate (11–20)</Text>
                                <Text style={styles.riskDescription}>You might be experiencing some stress. Consider talking to someone you trust or practicing mindfulness.</Text>
                            </View>
                        </View>
                        <View style={styles.riskRow}>
                            <View style={[styles.riskDot, { backgroundColor: '#E67E22' }]} />
                            <View style={styles.riskContent}>
                                <Text style={styles.riskTitle}>High (21–30)</Text>
                                <Text style={styles.riskDescription}>You may be facing significant challenges. It's important to reach out to a mental health professional for support.</Text>
                            </View>
                        </View>
                        <View style={styles.riskRow}>
                            <View style={[styles.riskDot, { backgroundColor: '#EF4444' }]} />
                            <View style={styles.riskContent}>
                                <Text style={styles.riskTitle}>Severe (31–40)</Text>
                                <Text style={styles.riskDescription}>Your results indicate high levels of distress. Please seek professional help immediately.</Text>
                            </View>
                        </View>
                    </LinearGradient>

                    <LinearGradient colors={['#ffffff', '#f0f4ff']} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Feather name="info" size={28} color="#2563EB" />
                            <Text style={styles.cardTitle}>Important Notes</Text>
                        </View>
                        <View style={styles.noteItem}>
                            <Feather name="check-circle" size={16} color="#2563EB" />
                            <Text style={styles.noteText}>This is a <Text style={styles.bold}>wellness screening tool</Text>, not a medical diagnosis.</Text>
                        </View>
                        <View style={styles.noteItem}>
                            <Feather name="lock" size={16} color="#2563EB" />
                            <Text style={styles.noteText}>Your results are <Text style={styles.bold}>private</Text> and only visible to you.</Text>
                        </View>
                        <View style={styles.noteItem}>
                            <Feather name="alert-triangle" size={16} color="#EF4444" />
                            <Text style={styles.noteText}>If you're in crisis, please contact a mental health professional or call a helpline.</Text>
                        </View>
                        <View style={styles.noteItem}>
                            <Feather name="refresh-cw" size={16} color="#2563EB" />
                            <Text style={styles.noteText}>Take this assessment regularly to <Text style={styles.bold}>track your progress</Text> over time.</Text>
                        </View>
                    </LinearGradient>

                    <LinearGradient colors={['#ffffff', '#f0f4ff']} style={[styles.card, styles.lastCard]}>
                        <View style={styles.cardHeader}>
                            <Feather name="phone" size={28} color="#22C55E" />
                            <Text style={styles.cardTitle}>Get Support</Text>
                        </View>
                        <Text style={styles.cardBody}>If you're feeling overwhelmed, please reach out to someone you trust or contact a mental health professional.</Text>
                        <View style={styles.helplineRow}>
                            <Feather name="phone-call" size={18} color="#2563EB" />
                            <Text style={styles.helplineText}>Ghana Mental Health Authority</Text>
                            <Text style={styles.helplineNumber}>+233 302 683 153</Text>
                        </View>
                        <View style={styles.helplineRow}>
                            <Feather name="globe" size={18} color="#2563EB" />
                            <Text style={styles.helplineText}>International Crisis Line</Text>
                            <Text style={styles.helplineNumber}>+1-800-273-TALK (8255)</Text>
                        </View>
                    </LinearGradient>
                </ScrollView>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
    backButton: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    backText: { fontSize: 16, color: '#2563EB', fontWeight: '600' },
    title: { fontSize: 22, fontWeight: 'bold', color: '#111827' },
    card: { padding: 20, borderRadius: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 },
    lastCard: { marginBottom: 40 },
    cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
    cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827' },
    cardBody: { fontSize: 15, color: '#4B5563', lineHeight: 22 },
    bold: { fontWeight: '700', color: '#111827' },
    scaleContainer: { marginVertical: 12, backgroundColor: '#F8FAFC', borderRadius: 10, padding: 12 },
    scaleRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
    scaleLabel: { fontSize: 15, color: '#4B5563' },
    scaleValue: { fontSize: 15, fontWeight: '600', color: '#2563EB' },
    riskRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14 },
    riskDot: { width: 12, height: 12, borderRadius: 6, marginTop: 4, marginRight: 12 },
    riskContent: { flex: 1 },
    riskTitle: { fontSize: 16, fontWeight: 'bold', color: '#111827', marginBottom: 2 },
    riskDescription: { fontSize: 14, color: '#4B5563', lineHeight: 20 },
    noteItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8, gap: 10 },
    noteText: { fontSize: 14, color: '#4B5563', flex: 1, lineHeight: 20 },
    helplineRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10, padding: 12, backgroundColor: '#F8FAFC', borderRadius: 10, gap: 10 },
    helplineText: { fontSize: 14, fontWeight: '600', color: '#111827' },
    helplineNumber: { fontSize: 14, color: '#2563EB', marginTop: 2, marginLeft: 28 },
});