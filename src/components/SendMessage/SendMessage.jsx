import { RightCircleFilled } from '@ant-design/icons';
import { Input } from 'antd';
import React from 'react';
import styles from './SendMessage.module.scss';



export default function SendMessage() {
    return (
        <div className={styles.container}>
            <Input placeholder="Type a message ..." bordered={false} size="large" className={styles.content} />
            <RightCircleFilled className={styles.send} />
        </div>
    )
}
