import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import styles from './Asset.module.scss';
import http from '../../axios.config'
import { getAuthHeader } from '../../core/auth/auth.service';

export default function Asset({ filename }) {

    const fetchFile = () => {
        http({
            url: `${process.env.REACT_APP_BASE_URL}/${filename}`,
            method: "GET",
            headers: getAuthHeader(),
            responseType: "blob" // important
        }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
                "download",
                `${filename}`
            );
            document.body.appendChild(link);
            link.click();
        });
    }
    return (
        <div className={styles.container}>
            <img className={styles.image} src={`${process.env.REACT_APP_BASE_URL}/${filename}`} alt="asset file" width="320" height="400" />
            <Button className={styles.download} type="primary" icon={<DownloadOutlined />} onClick={fetchFile}>
                Download
            </Button>
        </div>
    )
}
