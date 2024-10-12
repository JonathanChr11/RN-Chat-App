import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { useLocalSearchParams } from "expo-router";
import { getChat, postChat } from "@/api";
import { MessageProps } from "@/utils";
import auth from "@react-native-firebase/auth";

export default function index() {
    const { uid } = useLocalSearchParams();

    const currentUser = auth().currentUser?.uid;
    const safeCurrentUser = currentUser ?? "guest";
    const chatId =
        uid > safeCurrentUser
            ? `${uid + "-" + safeCurrentUser}`
            : `${safeCurrentUser + "-" + uid}`;

    const [messages, setMessages] = useState<IMessage[] | undefined>([]);

    useEffect(() => {
        getChat(chatId).then((data) => setMessages(data));
    }, []);

    const onSend = useCallback((messagesArray: IMessage[]) => {
        const message = messagesArray[0];

        const myMessage: MessageProps = {
            _id: message._id,
            text: message.text,
            createdAt: message.createdAt,
            user: message.user,
            sentTo: uid,
        };

        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, [myMessage])
        );

        postChat(chatId, myMessage);
    }, []);

    return (
        <GiftedChat
            messages={messages}
            onSend={(text) => onSend(text)}
            user={{
                _id: safeCurrentUser,
            }}
        />
    );
}
