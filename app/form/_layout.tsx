import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="addBox" options={{ headerShown: false }} />
            <Stack.Screen name="addTransaction" options={{ headerShown: false }} />
        </Stack>
    );
}
