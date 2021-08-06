import { RightCircleFilled } from '@ant-design/icons';
import { Input } from 'antd';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import http from '../../axios.config';
import { getAuthHeader, getStoredUser } from '../../core/auth/auth.service';
import socket from '../../core/socket';
import { sendMessageMutationOptions } from '../../hooks/sendMessageMutation';
import styles from './SendMessage.module.scss';



export default function SendMessage() {
    const [userId] = useState(getStoredUser().id);
    // const { dispatch } = useChat();
    const [messageContent, setMessageContent] = useState("");
    const sendMessageMutation = useMutation((message) => http.post(
        `/message`, { ...message }
        , { headers: getAuthHeader() }), {
        onMutate: async (message) => {
            console.log('after', message)
        }
    });

    const sendMessage = () => {
        const message = { content: messageContent, from: Number(userId) }
        socket.emit("message", message)
        setMessageContent("")
        // dispatch({ type: "addMessage", payload: message })
        const data = sendMessageMutation.mutate({ projectId: 1, fromId: 5, content: "fromapp" })
    }

    const sendMessageMouseHandler = () => {
        sendMessage()
    }

    const sendMessageKeyHandler = (event) => {
        if (Number(event.charCode) === 13) {
            sendMessage()
        }
    }

    const messageContentHandler = (event) => {
        setMessageContent(event.target.value)
    }
    return (
        <div className={styles.container}>
            <Input value={messageContent} onChange={messageContentHandler} onKeyPress={sendMessageKeyHandler} placeholder="Type a message ..." bordered={false} size="large" className={styles.content} />
            <RightCircleFilled onClick={sendMessageMouseHandler} className={styles.send} />
        </div>
    )
}
