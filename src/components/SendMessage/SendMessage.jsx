import { RightCircleFilled } from '@ant-design/icons';
import { Input } from 'antd';
import React from 'react';
import socket from '../../core/socket';
import styles from './SendMessage.module.scss';



export default function SendMessage() {
    const sendMessageHandler = () => {
        console.log("message is sent")
        socket.emit("message", { content: "message is sent" })
    }
    return (
        <div className={styles.container}>
            <Input placeholder="Type a message ..." bordered={false} size="large" className={styles.content} />
            <RightCircleFilled onClick={sendMessageHandler} className={styles.send} />
        </div>
    )
}
