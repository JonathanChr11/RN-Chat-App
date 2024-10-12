import { Stack } from "expo-router";
import { SECONDARY_COLOR } from "@/constants";

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: SECONDARY_COLOR },
            }}
        >
            <Stack.Screen name="login/index" />
            <Stack.Screen name="register/index" />
        </Stack>
    );
}
