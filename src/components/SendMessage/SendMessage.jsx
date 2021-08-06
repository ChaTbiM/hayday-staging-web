import { RightCircleFilled } from '@ant-design/icons';
import { Input } from 'antd';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { getStoredUser } from '../../core/auth/auth.service';
import socket from '../../core/socket';
import { sendMessageMutationOptions, sendMessageRequest } from '../../hooks/sendMessageMutation';
import styles from './SendMessage.module.scss';


export default function SendMessage({ roomId }) {
    const [userId] = useState(getStoredUser().id);
    const [messageContent, setMessageContent] = useState("");
    const sendMessageMutation = useMutation((message) => sendMessageRequest(message), sendMessageMutationOptions);

    const sendMessage = () => {
        const message = { content: messageContent, from: Number(userId) }
        socket.emit("message", message)
        setMessageContent("")
        sendMessageMutation.mutate({ projectId: roomId, fromId: userId, content: messageContent })
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
