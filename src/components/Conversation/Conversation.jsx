import React from 'react';
import { useChat } from '../../hooks/chat-context';
import useWindowSize from '../../hooks/useWindowSize';

import styles from './Conversation.module.scss';

export default function Conversation({ project, roomId }) {
    const { dispatch } = useChat();
    const { width } = useWindowSize()

    const clickHandler = () => {
        dispatch({ type: "hideConversationList" })
        dispatch({ type: "setRoomId", payload: project.id })
    }

    return (
        <div onClick={clickHandler} className={(roomId === project.id && width > 1000  ? styles.container + ' ' + styles.active_conversation : styles.container)}>
            <div className={styles.circle}>
                <span className={styles.name}>HY</span>
            </div>
            <div className={styles.project}>
                <p className={styles.project__title}>Project {project.id}</p>
                {/* <p className={styles.message}>latest message here !</p> */}
            </div>
        </div>
    )
}
