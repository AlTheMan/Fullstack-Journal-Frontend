interface ChatMessage {
    senderName: string;
    receiverName?: string;
    message: string;
    status: "JOIN" | "MESSAGE";
}

interface UserData {
    username: string;
    receivername: string;
    connected: boolean;
    message: string;
}

type PrivateChats = Map<string, ChatMessage[]>;


//interface PrivateChats {
//    [key: string]: ChatMessage[];
//}
