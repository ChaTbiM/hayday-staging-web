import React from 'react'
import styles from './ReceivedMessage.module.scss'

export default function ReceivedMessage() {

    return (
        <div className={styles.container}>
            <div className={styles.circle}>
                <span className={styles.name}>HY</span>
            </div>
            <div className={styles.content__container}>
                <p className={styles.message}>message</p>
                <p className={styles.message}>message</p>
                <p className={styles.message}>message</p>
            </div>
        </div>
    )
}
