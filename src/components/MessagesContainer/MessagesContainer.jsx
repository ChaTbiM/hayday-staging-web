import React, { useEffect } from 'react';
import socket from '../../core/socket';
import { useChat } from '../../hooks/chat-context';
import useMessages from '../../hooks/useMessages';
import MessageList from '../MessageList/MessageList';
import SendMessage from '../SendMessage/SendMessage';

export default function MessagesContainer({ roomId }) {
    const { dispatch } = useChat();
    const { data: messages , refetch } = useMessages(roomId)

    useEffect(() => {
        socket.on("message", (data) => {
            dispatch({ type: "addMessage", payload: data })
        })
        return () => {
            socket.off("message")
        }
    }, [dispatch])

    useEffect(() => {
        refetch();
    }, [roomId,refetch])

    return (
        <>  
            <MessageList messages={messages} />
            <SendMessage roomId={roomId} />
        </>
    )
}
