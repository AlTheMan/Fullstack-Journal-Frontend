// YourComponent.tsx
import React, { useState, useEffect } from 'react';
import SseApi from '../../api/MessagesEventSource';
import { messageApiAddress } from '../../api/RequestAddresses';

const MessageComponent: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const sseApi = new SseApi(messageApiAddress()+'/stream/');

  useEffect(() => {
    sseApi.connect(
      (newMessage) => {
        setMessages(prevMessages => [...prevMessages, newMessage]);
      },
      (error) => {
        console.error('SSE connection error:', error);
      }
    );

    return () => {
      sseApi.disconnect();
    };
  }, []);

  return (
    <div>
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </div>
  );
};

export default MessageComponent;
