import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import { API_URL } from '../config/api';
import Background from '../components/Background';

type Props = {
    user: any;
    onComplete: () => void;
    showImage?: boolean;
};

const questions = [
    { id: 1, text: 'How often do you feel nervous or anxious?', category: 'Anxiety' },
    { id: 2, text: 'How often do you feel down or depressed?', category: 'Mood' },
    { id: 3, text: 'How often do you have trouble sleeping?', category: 'Sleep' },
    { id: 4, text: 'How often do you feel stressed?', category: 'Stress' },
    { id: 5, text: 'How often do you experience physical tension?', category: 'Physical' },
    { id: 6, text: 'How often do you have difficulty concentrating?', category: 'Cognitive' },
    { id: 7, text: 'How often do you feel irritable?', category: 'Mood' },
    { id: 8, text: 'How often do you have racing thoughts?', category: 'Cognitive' },
    { id: 9, text: 'How often do you feel overwhelmed?', category: 'Stress' },
    { id: 10, text: 'How often do you experience physical tension?', category: 'Physical' },
];

const options = ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'];
const optionValues = [0, 1, 2, 3, 4];

export default function AssessmentScreen({ user, onComplete, showImage = false }: Props) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: number }>({});
    const [submitting, setSubmitting] = useState(false);

    const handleAnswer = (value: number) => {
        setAnswers({ ...answers, [currentQuestion]: value });
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handleSubmit = async () => {
        // Check all answered
        if (Object.keys(answers).length < questions.length) {
            Alert.alert('Incomplete', 'Please answer all questions.');
            return;
        }

        setSubmitting(true);
        try {
            // Calculate score
            let totalScore = 0;
            for (let i = 0; i < questions.length; i++) {
                totalScore += answers[i] || 0;
            }
            // Determine risk level
            let riskLevel = 'Low';
            if (totalScore <= 10) riskLevel = 'Low';
            else if (totalScore <= 20) riskLevel = 'Moderate';
            else if (totalScore <= 30) riskLevel = 'High';
            else riskLevel = 'Severe';

            const payload = {
                userId: user.id,
                score: totalScore,
                maxScore: 40,
                riskLevel: riskLevel,
                answers: JSON.stringify(answers),   // ✅ FIX: convert to JSON string
            };

            await axios.post(`${API_URL}/assessments`, payload);
            Alert.alert('Success', 'Assessment submitted successfully!');
            onComplete();
        } catch (error) {
            console.error('Submit error:', error);
            Alert.alert('Error', 'Failed to submit assessment.');
        } finally {
            setSubmitting(false);
        }
    };

    const goBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const progress = (Object.keys(answers).length / questions.length) * 100;

    return (
        <Background showImage={showImage}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Mental Health Assessment</Text>
                    <Text style={styles.progressText}>
                        {Object.keys(answers).length} of {questions.length} answered
                    </Text>
                </View>

                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${progress}%` }]} />
                </View>

                <ScrollView style={styles.questionContainer}>
                    <View style={styles.questionCard}>
                        <Text style={styles.category}>{questions[currentQuestion].category}</Text>
                        <Text style={styles.questionNumber}>Question {currentQuestion + 1} of {questions.length}</Text>
                        <Text style={styles.questionText}>{questions[currentQuestion].text}</Text>

                        <View style={styles.optionsContainer}>
                            {options.map((label, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.optionButton,
                                        answers[currentQuestion] === optionValues[index] && styles.optionSelected,
                                    ]}
                                    onPress={() => handleAnswer(optionValues[index])}
                                >
                                    <Text style={[
                                        styles.optionText,
                                        answers[currentQuestion] === optionValues[index] && styles.optionTextSelected,
                                    ]}>
                                        {label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[styles.backButton, currentQuestion === 0 && styles.disabled]}
                        onPress={goBack}
                        disabled={currentQuestion === 0}
                    >
                        <Feather name="arrow-left" size={20} color={currentQuestion === 0 ? '#CBD5E1' : '#2563EB'} />
                        <Text style={[styles.backText, currentQuestion === 0 && styles.disabledText]}>Back</Text>
                    </TouchableOpacity>

                    {currentQuestion === questions.length - 1 ? (
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={handleSubmit}
                            disabled={submitting}
                        >
                            <Text style={styles.submitText}>{submitting ? 'Submitting...' : 'Submit'}</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={styles.nextButton}
                            onPress={() => {
                                if (answers[currentQuestion] !== undefined) {
                                    setCurrentQuestion(currentQuestion + 1);
                                } else {
                                    Alert.alert('Please select an option');
                                }
                            }}
                        >
                            <Text style={styles.nextText}>Next</Text>
                            <Feather name="arrow-right" size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    header: { marginBottom: 16 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
    progressText: { fontSize: 14, color: '#6B7280', marginTop: 4 },
    progressBar: { height: 6, backgroundColor: '#E5E7EB', borderRadius: 3, overflow: 'hidden', marginBottom: 20 },
    progressFill: { height: '100%', backgroundColor: '#2563EB', borderRadius: 3 },
    questionContainer: { flex: 1 },
    questionCard: { backgroundColor: 'rgba(255,255,255,0.9)', padding: 20, borderRadius: 16, marginBottom: 20 },
    category: { fontSize: 14, fontWeight: '600', color: '#2563EB', textTransform: 'uppercase', marginBottom: 4 },
    questionNumber: { fontSize: 13, color: '#6B7280', marginBottom: 12 },
    questionText: { fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 20 },
    optionsContainer: { gap: 10 },
    optionButton: { padding: 14, borderRadius: 10, borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#FFFFFF' },
    optionSelected: { borderColor: '#2563EB', backgroundColor: '#EFF6FF' },
    optionText: { fontSize: 16, color: '#111827' },
    optionTextSelected: { color: '#2563EB', fontWeight: '600' },
    footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
    backButton: { flexDirection: 'row', alignItems: 'center', gap: 4, padding: 8 },
    backText: { fontSize: 16, color: '#2563EB', fontWeight: '500' },
    disabled: { opacity: 0.4 },
    disabledText: { color: '#CBD5E1' },
    nextButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2563EB', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, gap: 6 },
    nextText: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
    submitButton: { backgroundColor: '#22C55E', paddingVertical: 10, paddingHorizontal: 24, borderRadius: 10 },
    submitText: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
});