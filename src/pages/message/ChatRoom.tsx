import React, { useEffect, useState } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';

var stompClient: any = null;

const ChatRoom: React.FC = () => {
    const myId: number = Number(localStorage.getItem("id")) || -1; //ifall att numret är null så sätts värdet till "-1"
    const privilege: string = localStorage.getItem("privilege") || "";

    const [privateChats, setPrivateChats] = useState<PrivateChats>(new Map());
    const [publicChats, setPublicChats] = useState<ChatMessage[]>([]);
    const [tab, setTab] = useState<string>("CHATROOM");
    const [userData, setUserData] = useState<UserData>({
        username: '',
        receivername: '',
        connected: false,
        message: ''
    });

    useEffect(() => {
      console.log(userData);
    }, [userData]);

    useEffect(()=>{
        connect()
    },[]);

    const connect =()=>{
        let Sock = new SockJS('http://localhost:8084/ws');
        stompClient = over(Sock);
        stompClient.connect({},onConnected, onError);
    }

    const onConnected = () => {
        setUserData({...userData,"connected": true});
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
        userJoin();
    }

    const userJoin=()=>{
          var chatMessage = {
            senderName: userData.username,
            status:"JOIN"
          };
          stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const onMessageReceived = (payload: any)=>{
        var payloadData = JSON.parse(payload.body);
        switch(payloadData.status){
            case "JOIN":
                if(!privateChats.get(payloadData.senderName)){
                    privateChats.set(payloadData.senderName,[]);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    }
    
    const onPrivateMessage = (payload: any) => {
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        const chatMessages = privateChats.get(payloadData.senderName);
        if (chatMessages) {
            // If the chat history for the sender exists, push the new message
            chatMessages.push(payloadData);
            setPrivateChats(new Map(privateChats));
        } else {
            // If there's no chat history for the sender, create a new one
            privateChats.set(payloadData.senderName, [payloadData]);
            setPrivateChats(new Map(privateChats));
        }
    };

    const onError = (err:Error) => {
        console.log(err);
        
    }

    const handleMessage =(event: React.ChangeEvent<HTMLInputElement>)=>{
        const {value}=event.target;
        setUserData({...userData,"message": value});
    }
    const sendValue=()=>{
            if (stompClient) {
              var chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status:"MESSAGE"
              };
              console.log(chatMessage);
              stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
              setUserData({...userData,"message": ""});
            }
    }

    const sendPrivateValue=()=>{
        if (stompClient) {
            const chatMessage: ChatMessage = {
                senderName: userData.username,
                receiverName: tab,
                message: userData.message,
                status: "MESSAGE" // Explicitly setting it as a literal type
            };
    
          
          if (userData.username !== tab) {
            const chatMessages = privateChats.get(tab);
            if (chatMessages) {
                // If the chat history for the tab exists, push the new message
                chatMessages.push(chatMessage);
                setPrivateChats(new Map(privateChats));
            } else {
                // If there's no chat history for the tab, create a new one
                privateChats.set(tab, [chatMessage]);
                setPrivateChats(new Map(privateChats));
            }
        }
          stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
          setUserData({...userData,"message": ""});
        }
    }

    const handleUsername=(event : React.ChangeEvent<HTMLInputElement>)=>{
        const {value}=event.target;
        setUserData({...userData,"username": value});
    }

    const registerUser=()=>{
        connect();
    }
    return (
    <div className="container">
        {userData.connected?
        <div className="chat-box">
            <div className="member-list">
                <ul>
                    <li onClick={()=>{setTab("CHATROOM")}} className={`member ${tab==="CHATROOM" && "active"}`}>Chatroom</li>
                    {[...privateChats.keys()].map((name,index)=>(
                        <li onClick={()=>{setTab(name)}} className={`member ${tab===name && "active"}`} key={index}>{name}</li>
                    ))}
                </ul>
            </div>
            {tab==="CHATROOM" && <div className="chat-content">
                <ul className="chat-messages">
                    {publicChats.map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="message-data">{chat.message}</div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                    <button type="button" className="send-button" onClick={sendValue}>send</button>
                </div>
            </div>}
            {tab !== "CHATROOM" && <div className="chat-content">
                <ul className="chat-messages">
                    {privateChats.get(tab)?.map((chat, index) => (
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="message-data">{chat.message}</div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                    <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
                </div>
            </div>}
        </div>
        :
        <div className="connecting">
            <p> connecting </p>
        </div>}
    </div>
    )
}

export default ChatRoom