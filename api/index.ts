import { MessageProps, UserDataProps } from "@/utils";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export const getFriends = async () => {
    try {
        if (auth().currentUser?.uid) {
            const querySnapshot = await firestore()
                .collection("users")
                .where("userUID", "!=", auth().currentUser?.uid)
                .get();

            let data: UserDataProps[] = [];
            querySnapshot.forEach((user) => {
                const userData = user.data();

                if (
                    userData.username &&
                    userData.email &&
                    userData.password &&
                    userData.userUID
                ) {
                    data.push({
                        username: userData.username,
                        email: userData.email,
                        password: userData.password,
                        userUID: userData.userUID,
                    });
                }
            });

            return data;
        } else {
            return;
        }
    } catch (error) {
        console.error("Error fetching friends: ", error);
    }
};

export const getSelectedUser = async (uid: string | string[]) => {
    try {
        const querySnapshot = await firestore()
            .collection("users")
            .where("userUID", "==", uid)
            .get();

        let data: UserDataProps[] = [];
        querySnapshot.forEach((user) => {
            const userData = user.data();

            if (
                userData.username &&
                userData.email &&
                userData.password &&
                userData.userUID
            ) {
                data.push({
                    username: userData.username,
                    email: userData.email,
                    password: userData.password,
                    userUID: userData.userUID,
                });
            }
        });

        return data;
    } catch (error) {
        console.error("Error fetching selected user: ", error);
    }
};

export const getChat = async (chatId: string | undefined) => {
    try {
        const querySnapshot = await firestore()
            .collection("chatrooms")
            .doc(chatId)
            .collection("messages")
            .get();

        let data: MessageProps[] = [];
        querySnapshot.forEach((message) => {
            const messageData = message.data();

            if (
                messageData._id &&
                messageData.text &&
                messageData.createdAt &&
                messageData.user &&
                messageData.sentTo
            ) {
                data.push({
                    _id: messageData._id,
                    text: messageData.text,
                    createdAt: messageData.createdAt.toDate(),
                    user: messageData.user,
                    sentTo: messageData.sentTo,
                });
            }
        });

        return data;
    } catch (error) {
        console.error("Error posting chat: ", error);
    }
};

export const postChat = async (
    chatId: string | undefined,
    message: MessageProps
) => {
    try {
        const messagesRef = firestore()
            .collection("chatrooms")
            .doc(chatId)
            .collection("messages");

        await messagesRef.add(message);
    } catch (error) {
        console.error("Error posting chat: ", error);
    }
};
