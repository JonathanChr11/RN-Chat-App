import { PRIMARY_COLOR } from "@/constants";
import { UserDataProps } from "@/utils";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface CardProps {
    onPress: () => void;
    data: UserDataProps;
}

export default function Card({ onPress, data }: CardProps) {
    const cardImage = require("../assets/images/react-logo.png");

    return (
        <Pressable style={styles.cardContainer} onPress={onPress}>
            <Image style={styles.cardImage} source={cardImage} />
            <View>
                <Text style={styles.cardHeading}>{data.username}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        gap: 20,
        borderBottomWidth: 1,
        borderBottomColor: "gray",
    },
    cardImage: {
        height: 50,
        width: 50,
        backgroundColor: "white",
        borderRadius: 50,
    },
    cardHeading: {
        fontSize: 20,
        fontWeight: "700",
        color: "white",
    },
});
