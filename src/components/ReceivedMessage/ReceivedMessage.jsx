import React from 'react'
import styles from './ReceivedMessage.module.scss'

export default function ReceivedMessage({ firstMessage, message, user }) {
    console.log(user, 'user')
    return (
        <div className={styles.container} style={firstMessage ? { marginTop: "1rem" } : null}>

            {
                user.role !== "admin" &&
                <>
                    <div style={{ visibility: !firstMessage ? "hidden" : null }} className={styles.circle}>
                        <span className={styles.name}>{user.email[0] + user.email[1]}</span>
                    </div>
                    <div className={styles.content__container}>
                        <p className={styles.message + ' ' + (user.role === "employee" ? styles.employee__message : styles.client__message)}>{message}</p>
                    </div>
                </>
            }
            {
                user.role === "admin" &&
                <>
                    <div style={{ visibility: !firstMessage ? "hidden" : null }} className={styles.admin__circle}>
                        <span className={styles.name}>HY</span>
                    </div>
                    <div className={styles.content__container}>
                        <p className={styles.message}>{message}</p>
                    </div>
                </>
            }
        </div>
    )
}

export const MemoizedReceivedMessage = React.memo(ReceivedMessage)
