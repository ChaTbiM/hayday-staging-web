import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { getStoredUser } from '../../core/auth/auth.service'
import socket from '../../core/socket'
import { useChat } from '../../hooks/chat-context'
import ReceivedMessage from '../ReceivedMessage/ReceivedMessage'
import SentMessage from '../SentMessage/SentMessage'
import styles from './MessageList.module.scss'

export default function MessageList() {

    const { state: { messages }, dispatch } = useChat();
    const [userId] = useState(getStoredUser().id)

    useEffect(() => {
        socket.on("message", (data) => {
            dispatch({ type: "addMessage", payload: data })
        })
    }, [])

    useEffect(() => {

    }, [messages])

    return (
        <>
            <div className={styles.container}>
                {(messages?.length > 0) &&
                    messages.map((message, index) => {
                        if (message.from != userId) {
                            if ((index > 0 && messages[index - 1].from == userId) || (index == 0 && message.from != userId)) {
                                return <ReceivedMessage message={message.content} firstMessage key={`message-${index}`} />
                            }
                            return <ReceivedMessage message={message.content} firstMessage={false} key={`message-${index}`} />
                        } else if (message.from == userId) {
                            return <SentMessage message={message.content} key={`message-${index}`} />
                        }
                    })
                }
            </div>
        </>
    )
}
