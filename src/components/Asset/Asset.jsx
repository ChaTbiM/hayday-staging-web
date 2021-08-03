import { Button } from 'antd'
import React from 'react'
import styles from './Asset.module.scss'
import file from '../../scenes/Login/cover.png'


export default function Asset() {
    return (
        <div className={styles.container}>
            <img className={styles.image} src={file} alt="asset file" width="320" height="400" />
            <Button className={styles.download} type="primary">Download</Button>
        </div>
    )
}
