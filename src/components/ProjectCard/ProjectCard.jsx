import { Button, Space } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { getStoredUser } from '../../core/auth/auth.service';
import { useApp } from '../../hooks/app-context';
import { useChat } from '../../hooks/chat-context';
import styles from './ProjectCard.module.scss';

export default function ProjectCard({ project }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [userRole] = useState(getStoredUser().role);
    const { dispatch } = useChat()
    const { dispatch: dispatchApp } = useApp();
    const { url } = useRouteMatch();
    const history = useHistory();

    const showModal = () => {
        setIsModalVisible(true)
    }

    const closeModal = () => {
        setIsModalVisible(false)
    }

    const onChatClick = () => {
        dispatchApp({ type: "setSelectedKey", payload: "/dashboard/chat/" })
        dispatch({ type: "setRoomId", payload: project.id })
    }

    const onFilesClick = () => {
        history.push(`/dashboard/project/${project.id}/files`)
    }

    return (
        <>
            {project && (
                <>
                    <div className={styles.container}>
                        <p className={styles.identifier}> Project Identifier : {project.id} </p>
                        <p className={styles.type}> Project Type : {project.type}  </p>
                        {!(userRole === "client") &&
                            (<>
                                <p className={styles.client__email}> Client Email : {project?.client?.email || ''} </p>
                                <p className={styles.client__phone}> Client Phone : {project?.client?.phone || ''} </p>
                            </>)
                        }
                        <p className={styles.status}>Order Date : {project.createdAt} </p>
                        <p className={styles.status}>Status : {project.status}</p>
                        <div>
                            <Space size={8}>
                                <Button onClick={onChatClick} size="large" type="primary">
                                    <Link to={`${url}/chat/`}>Chat</Link></Button>
                                <Button onClick={onFilesClick}> Files </Button>
                                <Button onClick={showModal} >Description</Button>
                            </Space>
                        </div>
                    </div>
                    <Modal title="Brief Description" visible={isModalVisible} footer={null} onCancel={closeModal}>
                        <p>{project.description}</p>
                    </Modal>
                </>
            )}

        </>
    )
}
