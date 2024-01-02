interface ChatMessage {
    senderId: number;
    receiverId: number;
    message: string;
    status: "JOIN" | "MESSAGE";
}

interface UserData {
    myId: number;
    connected: boolean;
    message: string;
}

type PrivateChats = Map<string, ChatMessage[]>;


//interface PrivateChats {
//    [key: string]: ChatMessage[];
//}
