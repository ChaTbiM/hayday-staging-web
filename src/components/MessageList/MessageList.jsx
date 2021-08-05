import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { getStoredUser } from '../../core/auth/auth.service'
import socket from '../../core/socket'
import { useChat } from '../../hooks/chat-context'
import ReceivedMessage from '../ReceivedMessage/ReceivedMessage'
import SentMessage from '../SentMessage/SentMessage'
import styles from './MessageList.module.scss'

export default function MessageList() {

    const { state: { messages } } = useChat();
    const [messageRole, setMessageRole] = useState(null);
    const [userId] = useState(getStoredUser().id)
    // useEffect(() => {
    //     socket.on("message", (data) => {
    //         console.log("data", data)
    //     })
    // }, [])

    return (
        <div className={styles.container}>
            {
                messages.map((message, index) => {
                    if (message.to === userId) {
                        if ((index > 0 && messages[index - 1].to !== userId) || (index === 0 && message.to === userId)) {
                            return <ReceivedMessage message={message.content} firstMessage key={`message-${index}`} />
                        }
                        return <ReceivedMessage message={message.content} firstMessage={false} key={`message-${index}`} />
                    } else {
                        return <SentMessage message={message.content} key={`message-${index}`} />
                    }
                })
            }
        </div>
    )
}
