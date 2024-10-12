import React, { Key, useEffect, useState } from "react";
import { UserDataProps } from "@/utils";
import { View, StyleSheet } from "react-native";
import Card from "@/components/Card";
import { router } from "expo-router";
import { getFriends } from "@/api";

export default function Index() {
    const [users, setUsers] = useState<UserDataProps[] | undefined>([]);

    useEffect(() => {
        getFriends().then((data) => setUsers(data));
    }, []);

    return (
        <View style={styles.homeContainer}>
            {users?.map((user: UserDataProps, index: Key) => (
                <Card
                    key={index}
                    onPress={() => router.navigate(`/chat/${user.userUID}`)}
                    data={user}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    homeContainer: {
        display: "flex",
    },
});
