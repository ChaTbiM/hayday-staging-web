import { RightCircleFilled } from '@ant-design/icons';
import { Input } from 'antd';
import React, { useState } from 'react';
import { getStoredUser } from '../../core/auth/auth.service';
import socket from '../../core/socket';
import { useChat } from '../../hooks/chat-context';
import styles from './SendMessage.module.scss';



export default function SendMessage() {
    const [userId] = useState(getStoredUser().id);
    const { dispatch } = useChat();
    const [messageContent, setMessageContent] = useState("");

    const sendMessage =  () => {
        const message = { content: messageContent, from: Number(userId) }
        socket.emit("message", message)
         dispatch({ type: "addMessage", payload: message })
        setMessageContent("")
    }

    const sendMessageMouseHandler = () => {
        sendMessage()
    }

    const sendMessageKeyHandler = (event) => {
        if (event.charCode == 13) {
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
