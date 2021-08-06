import React from 'react';
import { useChat } from '../../hooks/chat-context';
import styles from './Conversation.module.scss';

export default function Conversation({ onClickHandler, project }) {
    const { state: { roomId } } = useChat();

    return (
        <div onClick={() => onClickHandler(project.id)} className={(roomId !== project.id ? styles.container : styles.container + ' ' + styles.active_conversation)}>
            <div className={styles.circle}>
                <span className={styles.name}>HY</span>
            </div>
            <div className={styles.project}>
                <p className={styles.project__title}>Project {project.id}</p>
                <p className={styles.message}>latest message here !</p>
            </div>
        </div>
    )
}
