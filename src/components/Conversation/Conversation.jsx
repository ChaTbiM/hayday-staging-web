import React from 'react'
import styles from './Conversation.module.scss';

export default function Conversation({ onClickHandler }) {
    return (
        <div onClick={onClickHandler} className={`${styles.container} styles.active`}>
            <div className={styles.circle}>
                <span className={styles.name}>HY</span>
            </div>
            <div className={styles.project}>
                <p className={styles.project__title}>Project [#98182134]</p>
                <p className={styles.message}>latest message here !</p>
            </div>
        </div>
    )
}
