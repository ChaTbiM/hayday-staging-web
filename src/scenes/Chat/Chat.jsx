import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ConversationList from '../../components/ConversationList/ConversationList';
import MessagesContainer from '../../components/MessagesContainer/MessagesContainer';
import { getStoredUser } from '../../core/auth/auth.service';
import socket from '../../core/socket';
import { useApp } from '../../hooks/app-context';
import { useChat } from '../../hooks/chat-context';
import useProjects from '../../hooks/useProjects';
import useWindowSize from '../../hooks/useWindowSize';
import styles from './Chat.module.scss';
const { Search } = Input;


export default function Chat() {
    const { data: projects, refetch } = useProjects()
    const { state: { roomId, isConversationListVisible }, dispatch } = useChat();
    const { dispatch: dispatchApp } = useApp();
    const [search, setSearch] = useState(null)
    const [filteredProjects, setFilteredProjects] = useState(projects)

    useEffect(() => {
        dispatchApp({ type: "setSelectedKey", payload: "/dashboard/chat" })
    }, [dispatchApp])

    const { width } = useWindowSize();

    const [userId] = useState(getStoredUser().id);

    const showConversationList = () => {
        dispatch({ type: "showConversationList" })
    }

    const onSearch = (val) => {
        setSearch(val);
    }

    useEffect(() => {
        if (projects && search && search.length !== 0) {
            console.log("start 0")

            const tempFilteredProjects = projects.filter((project) => {
                return project.id == search ? true : false;
            })
            setFilteredProjects(tempFilteredProjects)
            if (tempFilteredProjects.length > 0 && roomId !== tempFilteredProjects[0].id) {
                dispatch({ type: "setRoomId", payload: tempFilteredProjects[0].id })
            }
        } else if (projects) {
            setFilteredProjects(projects);
        }

    }, [search, projects, dispatch, roomId])

    useEffect(() => {
        refetch()
        if (projects && !roomId) {
            dispatch({ type: "setRoomId", payload: projects[0].id })
        }
    }, [projects, dispatch, refetch, roomId])

    useEffect(() => {
        if (roomId) {
            socket.auth = { userId, roomId: roomId }
            socket.connect();
        }
        return () => {
            socket.disconnect()
        }
    }, [roomId, userId])

    return (
        <div className={styles.container}>
            {
                (isConversationListVisible || width > 1000) &&
                (<div className={styles.container__left}>
                    <div className={styles.search}>
                        <Search placeholder="Search For Project.." onSearch={onSearch} style={{ width: 200 }} />
                    </div>
                    <div className={styles.conversation__list}>
                        <ConversationList roomId={roomId} projects={filteredProjects} />
                    </div>
                </div>)
            }

            {
                (!isConversationListVisible || width >= 1000) &&
                (<div className={styles.container__right}>
                    <div className={styles.project}>
                        <span className={styles.project__header}>
                            {width < 1000 && <ArrowLeftOutlined onClick={showConversationList} className={styles.project__header__arrow} />}
                            <p className={styles.project__title}>Project {roomId} </p>
                        </span>
                        <div className={styles.project__actions}>
                            <Space size={8} >
                                <Button type="primary">mark as completed</Button>
                                <Button><Link to={`/dashboard/project/${roomId}/files`}>Files</Link> </Button>
                            </Space>
                        </div>

                    </div>
                    <div className={styles.messages__container}>
                        {
                            roomId &&
                            <MessagesContainer roomId={roomId} />
                        }
                        {
                            !(roomId) &&
                            <div style={{ textAlign: 'center', marginTop: "1.875rem" }}>you don't have any project to chat about </div>
                        }
                    </div>
                </div>)
            }
        </div>
    )
}
