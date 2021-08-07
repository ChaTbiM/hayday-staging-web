import React, { useState } from 'react'
import { getStoredUser } from '../../core/auth/auth.service'
import { MemoizedReceivedMessage } from '../ReceivedMessage/ReceivedMessage'
import { MemoizedSentMessage } from '../SentMessage/SentMessage'
import styles from './MessageList.module.scss'

export default function MessageList({ messages }) {
    const [userId] = useState(getStoredUser().id)

    return (
        <>
            <div className={styles.container}>
                {(messages?.length > 0) &&
                    messages.map((message, index) => {
                        if (message.from.id !== userId) {
                            if (
                                (index > 0 && messages[index - 1].from.id === userId) ||
                                (index === 0 && message.from.id !== userId) ||
                                (index > 0 && messages[index - 1].from.id !== message.from.id)
                            ) {
                                return <MemoizedReceivedMessage user={message.from} message={message.content} firstMessage key={`message-${index}`} />
                            }
                            return <MemoizedReceivedMessage user={message.from} message={message.content} firstMessage={false} key={`message-${index}`} />
                        } else if (message.from.id === userId) {
                            return <MemoizedSentMessage message={message.content} key={`message-${index}`} />
                        }
                        return null
                    })
                }
            </div>
        </>
    )
}
