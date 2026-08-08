import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { API_URL } from '../config/api';
import Background from '../components/Background';
import { colors } from '../theme';

type Props = {
    onBack: () => void;
    onTokenReceived: (token: string, email: string) => void;
};

export default function ForgotPasswordScreen({ onBack, onTokenReceived }: Props) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!email.trim()) { Alert.alert('Error', 'Please enter your email'); return; }
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/password/forgot`, { email });
            Alert.alert('✅ Token Sent', `Your reset token: ${response.data.token}`);
            onTokenReceived(response.data.token, email);
        } catch (error: any) {
            Alert.alert('Error', error.response?.data?.message || 'Something went wrong');
        } finally { setLoading(false); }
    };

    return (
        <Background>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onBack}><Text style={styles.backText}>← Back</Text></TouchableOpacity>
                    <Text style={styles.title}>Forgot Password</Text><View style={{ width: 50 }} />
                </View>

                <LinearGradient colors={['#ffffff', '#f0f4ff']} style={styles.card}>
                    <Text style={styles.instruction}>Enter your email address and we'll send you a reset token.</Text>

                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="you@example.com"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />

                    <LinearGradient colors={['#2563EB', '#38BDF8']} style={styles.sendButton}>
                        <TouchableOpacity style={styles.sendButtonInner} onPress={handleSend} disabled={loading}>
                            {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.sendButtonText}>Send Reset Token</Text>}
                        </TouchableOpacity>
                    </LinearGradient>
                </LinearGradient>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
    backText: { fontSize: 16, color: '#2563EB', fontWeight: '600' },
    title: { fontSize: 22, fontWeight: 'bold', color: '#111827' },
    card: { padding: 20, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 },
    instruction: { fontSize: 16, color: '#6B7280', marginBottom: 20, textAlign: 'center' },
    label: { fontSize: 14, color: '#6B7280', marginBottom: 4 },
    input: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10, padding: 12, fontSize: 16, marginBottom: 16, backgroundColor: '#fff' },
    sendButton: { borderRadius: 10, overflow: 'hidden' },
    sendButtonInner: { padding: 14, alignItems: 'center' },
    sendButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});