import * as Notifications from 'expo-notifications';

// Configure how notifications appear when app is in foreground
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

// Request permission
export async function requestNotificationPermission(): Promise<boolean> {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
        console.log('Notification permission not granted.');
        return false;
    }
    return true;
}

// Send a test notification immediately
export async function sendTestNotification(): Promise<void> {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: '🧠 WELLNEST Reminder',
            body: 'Take a moment for your mental health assessment today.',
            sound: true,
        },
        trigger: null,
    });
}

// Schedule a daily reminder (at 9 AM)
export async function scheduleDailyReminder(): Promise<void> {
    // Cancel any existing reminders first
    await Notifications.cancelAllScheduledNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
        content: {
            title: '🧠 WELLNEST',
            body: "Don't forget to check in with yourself. Take your daily assessment!",
            sound: true,
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
            hour: 9,
            minute: 0,
            repeats: true,
        },
    });
}