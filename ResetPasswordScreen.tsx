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
    email: string;
    token: string;
    onResetComplete: () => void;
    onBack: () => void;
};

export default function ResetPasswordScreen({ email, token, onResetComplete, onBack }: Props) {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleReset = async () => {
        if (!newPassword || !confirmPassword) { Alert.alert('Error', 'Please fill in all fields'); return; }
        if (newPassword !== confirmPassword) { Alert.alert('Error', 'Passwords do not match'); return; }
        if (newPassword.length < 6) { Alert.alert('Error', 'Password must be at least 6 characters'); return; }
        setLoading(true);
        try {
            await axios.post(`${API_URL}/password/reset`, { token, newPassword });
            Alert.alert('✅ Success', 'Password reset successfully!');
            onResetComplete();
        } catch (error: any) {
            Alert.alert('Error', error.response?.data?.message || 'Reset failed');
        } finally { setLoading(false); }
    };

    return (
        <Background>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onBack}><Text style={styles.backText}>← Back</Text></TouchableOpacity>
                    <Text style={styles.title}>Reset Password</Text><View style={{ width: 50 }} />
                </View>

                <LinearGradient colors={['#ffffff', '#f0f4ff']} style={styles.card}>
                    <Text style={styles.emailText}>Resetting for: {email}</Text>

                    <Text style={styles.label}>Token</Text>
                    <TextInput style={[styles.input, styles.disabledInput]} value={token} editable={false} />

                    <Text style={styles.label}>New Password</Text>
                    <TextInput style={styles.input} placeholder="Enter new password" value={newPassword} onChangeText={setNewPassword} secureTextEntry />

                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput style={styles.input} placeholder="Confirm new password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

                    <LinearGradient colors={['#22C55E', '#16A34A']} style={styles.resetButton}>
                        <TouchableOpacity style={styles.resetButtonInner} onPress={handleReset} disabled={loading}>
                            {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.resetButtonText}>Reset Password</Text>}
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
    emailText: { fontSize: 16, color: '#111827', marginBottom: 16, textAlign: 'center', fontWeight: '600' },
    label: { fontSize: 14, color: '#6B7280', marginBottom: 4 },
    input: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10, padding: 12, fontSize: 16, marginBottom: 16, backgroundColor: '#fff' },
    disabledInput: { backgroundColor: '#f3f4f6', color: '#6b7280' },
    resetButton: { borderRadius: 10, overflow: 'hidden' },
    resetButtonInner: { padding: 14, alignItems: 'center' },
    resetButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});