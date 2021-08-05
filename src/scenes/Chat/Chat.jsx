import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ConversationList from '../../components/ConversationList/ConversationList';
import MessageList from '../../components/MessageList/MessageList';
import SendMessage from '../../components/SendMessage/SendMessage';
import { getStoredUser } from '../../core/auth/auth.service';
import socket from '../../core/socket';
import { useChat } from '../../hooks/chat-context';
import useProjects from '../../hooks/useProjects';
import useWindowSize from '../../hooks/useWindowSize';
import styles from './Chat.module.scss';




const { Search } = Input;

export default function Chat() {
    const { data: projects } = useProjects()
    const { state, dispatch } = useChat();

    const { width } = useWindowSize();

    const [isVisible, setIsVisible] = useState(true)
    const [userId] = useState(getStoredUser().id);

    const showConversationList = () => {
        setIsVisible(true);
    }

    const hideConversationList = () => {
        setIsVisible(false);
    }

    const onConversationClicked = (roomId) => {
        hideConversationList();
        dispatch({ type: "setRoomId", payload: roomId })
    }

    const onSearch = (val) => {
        console.log(val)
    }

    useEffect(() => {
        if (projects) {
            dispatch({ type: "setProjects", payload: projects })
            dispatch({ type: "setRoomId", payload: projects[0].id })
        }
    }, [projects])

    useEffect(() => {
        socket.disconnect();
        if (state.roomId) {
            socket.auth = { userId, roomId: state.roomId }
            socket.connect();
        }
    }, [state.roomId])
    
    return (
        <div className={styles.container}>
            {
                (isVisible || width > 1000) &&
                (<div className={styles.container__left}>
                    <div className={styles.search}>
                        <Search placeholder="Search For Project.." onSearch={onSearch} style={{ width: 200 }} />
                    </div>
                    <div className={styles.conversation__list}>
                        <ConversationList onConversationClicked={onConversationClicked} />
                    </div>
                </div>)
            }

            {
                (!isVisible || width >= 1000) &&
                (<div className={styles.container__right}>
                    <div className={styles.project}>
                        <span className={styles.project__header}>
                            {width < 1000 && <ArrowLeftOutlined onClick={showConversationList} className={styles.project__header__arrow} />}
                            <p className={styles.project__title}>Project [#98182134]</p>
                        </span>
                        <div className={styles.project__actions}>
                            <Space size={8} >
                                <Button type="primary">mark as completed</Button>
                                <Button><Link to={`/dashboard/project/15/files`}>Files</Link> </Button>
                            </Space>
                        </div>

                    </div>
                    <div className={styles.messages__container}>
                        {
                            state.roomId &&
                            <>
                                <MessageList />
                                <SendMessage />
                            </>
                        }
                        {
                            !(state.roomId) &&
                            <div style={{ textAlign: 'center', marginTop: "1.875rem" }}>you don't have any project to chat about </div>
                        }
                    </div>
                </div>)
            }
        </div>
    )
}
