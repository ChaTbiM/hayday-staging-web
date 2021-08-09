import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import styles from './Asset.module.scss';


export default function Asset({ filename }) {
    return (
        <div className={styles.container}>
            <img className={styles.image} src={`${process.env.REACT_APP_BASE_URL}/${filename}`} alt="asset file" width="320" height="400" />
            <Button className={styles.download} type="primary" icon={<DownloadOutlined />}> 
                <a href={`${process.env.REACT_APP_BASE_URL}/${filename}`} download target="_blank">Download</a></Button>
        </div>
    )
}
