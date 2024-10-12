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

import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Index() {
    const registerStars = require("../../../assets/images/stars.png");
    const registerLight = require("../../../assets/images/light.png");

    const ref = firestore().collection("users");

    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        setLoading(true);
        try {
            await auth()
                .createUserWithEmailAndPassword(email, password)
                .then((credential) => {
                    ref.add({
                        username: username,
                        email: email,
                        password: password,
                        userUID: credential.user.uid,
                    });
                });
            alert("Register Success!");
        } catch (error) {
            const err = error as FirebaseError;
            alert("Register Failed: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Image style={styles.registerStars} source={registerStars} />
            <Image style={styles.registerLight} source={registerLight} />
            <KeyboardAvoidingView
                style={styles.registerContainer}
                behavior="padding"
            >
                <View style={styles.registerSubcontainer}>
                    <Text style={styles.registerHeading}>Register Account</Text>
                    <Text style={styles.registerParagraph}>
                        Already have an account? &nbsp;
                        <Link
                            style={styles.registerRedirect}
                            href="/auth/login"
                        >
                            Login
                        </Link>
                    </Text>
                </View>
                <View style={styles.registerSubcontainer}>
                    <View style={styles.registerInputContainer}>
                        <FontAwesome
                            name="user-o"
                            size={20}
                            color={PRIMARY_COLOR}
                        />
                        <TextInput
                            style={styles.registerInput}
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                            placeholder="Username"
                        />
                    </View>
                    <View style={styles.registerInputContainer}>
                        <MaterialIcons
                            name="mail-outline"
                            size={20}
                            color={PRIMARY_COLOR}
                        />
                        <TextInput
                            style={styles.registerInput}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            placeholder="Email"
                        />
                    </View>
                    <View style={styles.registerInputContainer}>
                        <MaterialIcons
                            name="lock-outline"
                            size={20}
                            color={PRIMARY_COLOR}
                        />
                        <TextInput
                            style={styles.registerInput}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            placeholder="Password"
                        />
                    </View>
                </View>
                {loading ? (
                    <View style={styles.registerButtonContainer}>
                        <ActivityIndicator size="small" color="#FFFFFF" />
                    </View>
                ) : (
                    <Pressable
                        style={styles.registerButtonContainer}
                        onPress={handleRegister}
                    >
                        <Text style={styles.registerButtonText}>Register</Text>
                    </Pressable>
                )}
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
    registerStars: {
        position: "absolute",
        top: 0,
        right: 0,
    },
    registerLight: {
        position: "absolute",
        top: 0,
        right: 0,
    },
    registerContainer: {
        display: "flex",
        height: "100%",
        justifyContent: "center",
        marginHorizontal: 50,
        gap: 50,
    },
    registerSubcontainer: {
        display: "flex",
        gap: 10,
    },
    registerHeading: {
        textAlign: "center",
        color: "white",
        fontSize: 32,
        fontWeight: "700",
    },
    registerParagraph: {
        textAlign: "center",
        color: "white",
        fontSize: 12,
    },
    registerRedirect: {
        color: "#4D81E7",
        fontWeight: "600",
    },
    registerInputContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 10,
        paddingHorizontal: 10,
        gap: 10,
    },
    registerInput: {
        height: 50,
        width: "100%",
    },
    registerButtonContainer: {
        backgroundColor: "#1D61E7",
        paddingVertical: 12,
        borderRadius: 10,
    },
    registerButtonText: {
        color: "white",
        textAlign: "center",
        fontSize: 14,
    },
});
