import React, { useState } from "react";
import { FirebaseError } from "firebase/app";
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { Link } from "expo-router";
import { PRIMARY_COLOR } from "@/constants";

import auth from "@react-native-firebase/auth";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Index() {
    const loginStars = require("../../../assets/images/stars.png");
    const loginLight = require("../../../assets/images/light.png");

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        setLoading(true);
        try {
            await auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            const err = error as FirebaseError;
            alert("Login Failed: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Image style={styles.loginStars} source={loginStars} />
            <Image style={styles.loginLight} source={loginLight} />
            <KeyboardAvoidingView
                style={styles.loginContainer}
                behavior="padding"
            >
                <View style={styles.loginSubcontainer}>
                    <Text style={styles.loginHeading}>
                        Login to your Account
                    </Text>
                    <Text style={styles.loginParagraph}>
                        Don't have an account? &nbsp;
                        <Link
                            style={styles.loginRedirect}
                            href="/auth/register"
                        >
                            Register
                        </Link>
                    </Text>
                </View>
                <View style={styles.loginSubcontainer}>
                    <View style={styles.loginInputContainer}>
                        <MaterialIcons
                            name="mail-outline"
                            size={20}
                            color={PRIMARY_COLOR}
                        />
                        <TextInput
                            style={styles.loginInput}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            placeholder="Email"
                        />
                    </View>
                    <View style={styles.loginInputContainer}>
                        <MaterialIcons
                            name="lock-outline"
                            size={20}
                            color={PRIMARY_COLOR}
                        />
                        <TextInput
                            style={styles.loginInput}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            placeholder="Password"
                        />
                    </View>
                </View>
                {loading ? (
                    <View style={styles.loginButtonContainer}>
                        <ActivityIndicator size="small" />
                    </View>
                ) : (
                    <Pressable
                        style={styles.loginButtonContainer}
                        onPress={handleLogin}
                    >
                        <Text style={styles.loginButtonText}>Login</Text>
                    </Pressable>
                )}
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
    loginStars: {
        position: "absolute",
        top: 0,
        right: 0,
    },
    loginLight: {
        position: "absolute",
        top: 0,
        right: 0,
    },
    loginContainer: {
        display: "flex",
        height: "100%",
        justifyContent: "center",
        marginHorizontal: 50,
        gap: 50,
    },
    loginSubcontainer: {
        display: "flex",
        gap: 10,
    },
    loginHeading: {
        textAlign: "center",
        color: "white",
        fontSize: 32,
        fontWeight: "700",
    },
    loginParagraph: {
        textAlign: "center",
        color: "white",
        fontSize: 12,
    },
    loginRedirect: {
        color: "#4D81E7",
        fontWeight: "600",
    },
    loginInputContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 10,
        paddingHorizontal: 10,
        gap: 10,
    },
    loginInput: {
        height: 50,
        width: "100%",
    },
    loginButtonContainer: {
        backgroundColor: "#1D61E7",
        paddingVertical: 12,
        borderRadius: 10,
    },
    loginButtonText: {
        color: "white",
        textAlign: "center",
        fontSize: 14,
    },
});
