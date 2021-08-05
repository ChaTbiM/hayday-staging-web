import React, { useEffect } from 'react';
import socket from '../../core/socket';
import { useChat } from '../../hooks/chat-context';
import MessageList from '../MessageList/MessageList';
import SendMessage from '../SendMessage/SendMessage';

export default function MessagesContainer() {
    const { state: { messages }, dispatch } = useChat();
    useEffect(() => {
        socket.on("message", (data) => {
            dispatch({ type: "addMessage", payload: data })
        })
        return () => {
            socket.off("message")
        }
    }, [dispatch])

    return (
        <>
            <MessageList messages={messages} />
            <SendMessage />
        </>
    )
}
