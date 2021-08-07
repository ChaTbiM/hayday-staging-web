import React, { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import socket from '../../core/socket';
import { useChat } from '../../hooks/chat-context';
import MessageList from '../MessageList/MessageList';
import SendMessage from '../SendMessage/SendMessage';

export default function MessagesContainer({ roomId }) {
    const queryClient = useQueryClient();
    const { dispatch } = useChat();

    useEffect(() => {
        socket.on("message", (message) => {
            queryClient.setQueryData('messages', oldMessages => {
                return [...oldMessages, message];
            })
        })
        return () => {
            socket.off("message")
        }
    }, [dispatch, queryClient])


    return (
        <>
            <MessageList roomId={roomId} />
            <SendMessage roomId={roomId} />
        </>
    )
}
