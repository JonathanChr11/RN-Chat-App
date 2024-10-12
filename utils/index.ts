import { IMessage } from "react-native-gifted-chat";

export interface UserDataProps {
    username: string;
    email: string;
    password: string;
    userUID: string;
}

export interface MessageProps extends IMessage {
    sentTo: string | string[];
}
