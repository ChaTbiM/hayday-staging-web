import { Button, Space } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styles from './ProjectCard.module.scss';

export default function ProjectCard() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const {url} = useRouteMatch();

    const showModal = () => {
        setIsModalVisible(true)
    }

    const closeModal = ()=>{
        setIsModalVisible(false)
    }

    return (
        <>
            <div className={styles.container}>
                <p className={styles.identifier}> Project Identifier : [#98182134] </p>
                <p className={styles.type}> Project Type : Logo </p>
                <p className={styles.client__email}> Client Email : grymetymeent@gmail.com </p>
                <p className={styles.client__phone}> Client Phone : +213549678707 </p>
                <p className={styles.status}>Order Date : 26/07/2021 </p>
                <p className={styles.status}>Status : in progress</p>
                <div>
                    <Space size={8}>
                        <Button size="large" type="primary">Chat</Button>
                        <Button > <Link to={`${url}/project/15/files`}>Files</Link> </Button>
                        <Button onClick={showModal} >Description</Button>
                    </Space>
                </div>
            </div>
            <Modal title="Brief Description" visible={isModalVisible} footer={null} onCancel={closeModal}>
                <p>Brief Description</p>
                <p>Brief Description</p>
                <p>Brief Description</p>
            </Modal>
        </>
    )
}
