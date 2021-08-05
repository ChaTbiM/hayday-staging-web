import React from 'react'
import styles from './SentMessage.module.scss'

export default function SentMessage({ message }) {

    return (
        <div className={styles.container}>
            <p className={styles.message}>{message}</p>
        </div>
    )
}

export const MemoizedSentMessage = React.memo(SentMessage);