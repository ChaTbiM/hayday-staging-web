import { RightCircleFilled } from '@ant-design/icons';
import { Input } from 'antd';
import React, { useState } from 'react';
import { getStoredUser } from '../../core/auth/auth.service';
import socket from '../../core/socket';
import styles from './SendMessage.module.scss';



export default function SendMessage() {
    const [userId] = useState(getStoredUser().id);

    const sendMessageHandler = () => {
        socket.emit("message", { content: "message is sent", from: userId })
    }
    return (
        <div className={styles.container}>
            <Input placeholder="Type a message ..." bordered={false} size="large" className={styles.content} />
            <RightCircleFilled onClick={sendMessageHandler} className={styles.send} />
        </div>
    )
}
