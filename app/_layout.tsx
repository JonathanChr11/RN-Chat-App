import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import {
    ActivityIndicator,
    Button,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SECONDARY_COLOR } from "@/constants";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuProvider,
} from "react-native-popup-menu";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function RootLayout() {
    const router = useRouter();
    const segments = useSegments();

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

    const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
        setUser(user);
        if (initializing) {
            setInitializing(false);
        }
    };

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    useEffect(() => {
        if (initializing) {
            return;
        }

        const inAuthGroup =
            segments.length > 0 && segments[0]?.toString() === "auth";

        if (user && inAuthGroup) {
            router.replace("/");
        } else if (!user && !inAuthGroup) {
            router.replace("/auth/login");
        }
    }, [user, initializing]);

    if (initializing) {
        return (
            <View style={styles.rootContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <MenuProvider>
            <Stack
                screenOptions={{
                    contentStyle: { backgroundColor: SECONDARY_COLOR },
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{
                        title: "Chats",
                        headerStyle: {
                            backgroundColor: SECONDARY_COLOR,
                        },
                        headerTitleStyle: {
                            fontSize: 32,
                            color: "white",
                        },
                        headerRight: () => (
                            <Menu>
                                <MenuTrigger>
                                    <Entypo
                                        name="dots-three-horizontal"
                                        size={24}
                                        color="white"
                                    />
                                </MenuTrigger>
                                <MenuOptions>
                                    <MenuOption
                                        onSelect={() => auth().signOut()}
                                    >
                                        <View style={styles.rootMenuContainer}>
                                            <MaterialIcons
                                                name="logout"
                                                size={24}
                                                color="black"
                                            />
                                            <Text style={styles.rootMenu}>
                                                Logout
                                            </Text>
                                        </View>
                                    </MenuOption>
                                </MenuOptions>
                            </Menu>
                        ),
                    }}
                />
                <Stack.Screen name="auth" options={{ headerShown: false }} />
                <Stack.Screen
                    name="chat/[uid]"
                    options={{ headerShown: false }}
                />
            </Stack>
        </MenuProvider>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    rootMenuContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    rootMenu: {
        padding: 10,
    },
});
