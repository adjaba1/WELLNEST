import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
    children: React.ReactNode;
    showImage?: boolean; // ✅ New prop to toggle background image
};

export default function Background({ children, showImage = true }: Props) {
    if (!showImage) {
        // ✅ Professional clean background (no image)
        return (
            <SafeAreaView style={styles.cleanBackground}>
                {children}
            </SafeAreaView>
        );
    }

    return (
        <ImageBackground
            source={require('../../assets/images/pexels-cottonbro-7583382.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.safeArea}>
                {children}
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    safeArea: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.25)',
        padding: 16,
    },
    cleanBackground: {
        flex: 1,
        backgroundColor: '#F4F7FB',
        padding: 16,
    },
});