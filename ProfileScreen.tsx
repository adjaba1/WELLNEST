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

type Props = {
    user: any;
    onUpdate: (updatedUser: any) => void;
    onBack: () => void;
    showImage?: boolean;
};

export default function ProfileScreen({ user, onUpdate, onBack, showImage = false }: Props) {
    const [name, setName] = useState(user.name);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        if (!name.trim()) { Alert.alert('Error', 'Name is required'); return; }
        setLoading(true);
        try {
            const response = await axios.put(`${API_URL}/users/${user.id}`, { name: name.trim(), email: user.email, role: user.role });
            onUpdate(response.data);
            Alert.alert('Success', 'Profile updated successfully');
            onBack();
        } catch (error) { Alert.alert('Error', 'Failed to update profile'); } finally { setLoading(false); }
    };

    return (
        <Background showImage={showImage}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onBack}><Text style={styles.backText}>← Back</Text></TouchableOpacity>
                    <Text style={styles.title}>Profile</Text><View style={{ width: 50 }} />
                </View>

                <LinearGradient colors={['#ffffff', '#f0f4ff']} style={styles.card}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Your name" />

                    <Text style={styles.label}>Email</Text>
                    <TextInput style={[styles.input, styles.disabledInput]} value={user.email} editable={false} />

                    <Text style={styles.label}>Role</Text>
                    <TextInput style={[styles.input, styles.disabledInput]} value={user.role || 'User'} editable={false} />

                    <LinearGradient colors={['#2563EB', '#38BDF8']} style={styles.saveButton}>
                        <TouchableOpacity style={styles.saveButtonInner} onPress={handleUpdate} disabled={loading}>
                            {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.saveButtonText}>Save Changes</Text>}
                        </TouchableOpacity>
                    </LinearGradient>
                </LinearGradient>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
   import { colors } from './theme/colors'; // adjust path as needed

const styles = StyleSheet.create({
 container: { flex: 1, padding: 20 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
    backText: { fontSize: 16, color: '#2563EB', fontWeight: '600' },
    title: { fontSize: 22, fontWeight: 'bold', color: '#111827' },
    card: { padding: 20, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 },
    label: { fontSize: 14, color: '#6B7280', marginBottom: 4 },
    input: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10, padding: 12, fontSize: 16, marginBottom: 16, backgroundColor: '#fff' },
    disabledInput: { backgroundColor: '#f3f4f6', color: '#6b7280' },
    saveButton: { borderRadius: 10, overflow: 'hidden', marginTop: 8 },
    saveButtonInner: { padding: 14, alignItems: 'center' },
    saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
});
