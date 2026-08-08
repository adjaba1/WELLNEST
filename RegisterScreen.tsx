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
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import { AUTH_URL } from '../config/api';
import Background from '../components/Background';

type Props = {
    onRegister: (user: any) => void;
    onNavigateToLogin: () => void;
};

export default function RegisterScreen({ onRegister, onNavigateToLogin }: Props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!username || !email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${AUTH_URL}/register`, {
                username,
                email,
                password,
                role: 'user',
            });
            Alert.alert('Success', 'Account created successfully!');
            onRegister(response.data);
        } catch (error: any) {
            Alert.alert('Registration Failed', error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Background>
            <View style={styles.container}>
                <LinearGradient
                    colors={['#ffffff', '#f0f4ff']}
                    style={styles.card}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View style={styles.logoContainer}>
                        <Feather name="heart" size={40} color="#2563EB" />
                        <Text style={styles.logo}>WELLNEST</Text>
                    </View>
                    <Text style={styles.subtitle}>Create Your Account</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <LinearGradient colors={['#2563EB', '#38BDF8']} style={styles.button}>
                        <TouchableOpacity
                            style={styles.buttonInner}
                            onPress={handleRegister}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>Create Account</Text>
                            )}
                        </TouchableOpacity>
                    </LinearGradient>

                    <Text style={styles.link} onPress={onNavigateToLogin}>
                        Already have an account? <Text style={styles.linkBold}>Login</Text>
                    </Text>
                </LinearGradient>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    card: { padding: 28, borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 6 },
    logoContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
    logo: { fontSize: 34, fontWeight: '800', color: '#2563EB', marginLeft: 10 },
    subtitle: { textAlign: 'center', color: '#6B7280', fontSize: 16, marginBottom: 30 },
    input: { borderWidth: 1, borderColor: '#E5E7EB', padding: 14, marginBottom: 15, borderRadius: 12, fontSize: 16, backgroundColor: '#fff' },
    button: { borderRadius: 12, overflow: 'hidden', marginTop: 10 },
    buttonInner: { padding: 16, alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    link: { textAlign: 'center', marginTop: 20, color: '#6B7280', fontSize: 15 },
    linkBold: { color: '#2563EB', fontWeight: '600' },
});