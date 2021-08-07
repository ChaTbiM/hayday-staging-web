import { RightCircleFilled } from '@ant-design/icons';
import { Input } from 'antd';
import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { getStoredUser } from '../../core/auth/auth.service';
import socket from '../../core/socket';
import styles from './SendMessage.module.scss';


export default function SendMessage({ roomId }) {
    const queryClient = useQueryClient();
    const [messageContent, setMessageContent] = useState("");

    const sendMessage = () => {
        const user = getStoredUser();
        const userId = Number(user.id);

        const message = { projectId: roomId, fromId: Number(userId), content: messageContent, from: user }
        socket.emit("message", message)
        setMessageContent("")

        queryClient.setQueryData('messages', oldMessages => {
            return [...oldMessages, message];
        })
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
