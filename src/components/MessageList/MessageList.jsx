import React from 'react'
import ReceivedMessage from '../ReceivedMessage/ReceivedMessage'
import SentMessage from '../SentMessage/SentMessage'
import styles from './MessageList.module.scss'

export default function MessageList() {
    return (
        <div className={styles.container}>
            <ReceivedMessage />
            <SentMessage />
        </div>
    )
}
