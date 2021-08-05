import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ConversationList from '../../components/ConversationList/ConversationList';
import MessageList from '../../components/MessageList/MessageList';
import SendMessage from '../../components/SendMessage/SendMessage';
import { useChat } from '../../hooks/chat-context';
import useWindowSize from '../../hooks/useWindowSize';
import styles from './Chat.module.scss';

const { Search } = Input;

export default function Chat() {
    const { state } = useChat();

    const { width } = useWindowSize();

    const [isVisible, setIsVisible] = useState(true)

    const showConversationList = () => {
        setIsVisible(true);
    }

    const hideConversationList = () => {
        setIsVisible(false);
    }

    const onSearch = (val) => {
        console.log(val)
    }

    useEffect(() => {
        console.log("roomId", state.roomId)
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
                        <ConversationList onConversationClicked={hideConversationList} />
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
