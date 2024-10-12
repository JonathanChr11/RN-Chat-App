import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, Text } from "react-native";
import { SECONDARY_COLOR } from "@/constants";
import { UserDataProps } from "@/utils";
import { getSelectedUser } from "@/api";
import Entypo from "@expo/vector-icons/Entypo";

export default function ChatLayout() {
    const { uid } = useLocalSearchParams();

    const [users, setUsers] = useState<UserDataProps[] | undefined>([]);

    useEffect(() => {
        getSelectedUser(uid).then((data) => setUsers(data));
    }, []);

    return (
        <Stack
            screenOptions={{
                contentStyle: { backgroundColor: SECONDARY_COLOR },
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    title: users?.[0]?.username,
                    headerStyle: {
                        backgroundColor: SECONDARY_COLOR,
                    },
                    headerTitleStyle: {
                        fontSize: 24,
                        color: "white",
                    },
                    headerLeft: () => (
                        <Pressable
                            style={styles.chatHeaderContainer}
                            onPress={() => router.back()}
                        >
                            <Entypo
                                name="chevron-left"
                                size={40}
                                color="white"
                            />
                        </Pressable>
                    ),
                }}
            />
        </Stack>
    );
}

const styles = StyleSheet.create({
    chatHeaderContainer: {
        marginRight: 20,
    },
});
