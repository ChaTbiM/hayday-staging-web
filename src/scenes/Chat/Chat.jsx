import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, Menu, message, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import http from '../../axios.config';
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


export const INPROGRESS = "in progress";
export const COMPLETED = "completed";

export default function Chat() {
    const [user] = useState(getStoredUser())
    const [userId] = useState(getStoredUser().id);

    const { data: projects, refetch } = useProjects()
    const { state: { roomId, isConversationListVisible }, dispatch } = useChat();
    const { dispatch: dispatchApp } = useApp();
    const [search, setSearch] = useState(null)
    const [filteredProjects, setFilteredProjects] = useState(projects)
    const [currentSelectedProject, setCurrentSelectedProject] = useState();
    const history = useHistory();

    useEffect(() => {
        dispatchApp({ type: "setSelectedKey", payload: "/dashboard/chat" })
    }, [dispatchApp])

    const { width } = useWindowSize();




    const showConversationList = () => {
        dispatch({ type: "showConversationList" })
    }

    const onSearch = (val) => {
        setSearch(val);
    }

    const updateProjectStatusHandler = () => {
        if (currentSelectedProject) {
            const project = currentSelectedProject;
            const projectId = project.id;
            project.status = COMPLETED;
            http.patch(`/project/${projectId}`).then((res) => res.data)
                .then((data) => {
                    if (data) {
                        setCurrentSelectedProject(data)
                        message.success('the project has been updated !');
                    }
                })
        }
    }

    const onFilesClick = () => {
        history.push(`/dashboard/project/${roomId}/files`)
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

        if (projects && roomId) {
            setCurrentSelectedProject(projects.find((project) => project.id === roomId))
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

    const dropdownMenu = (
        <Menu >
            {user.role === "employee" && currentSelectedProject?.status === INPROGRESS &&
                <Menu.Item key="1" >
                    <Button type="primary" onClick={updateProjectStatusHandler}>mark as completed</Button>
                </Menu.Item>
            }
            <Menu.Item key="2" >
                <Button onClick={onFilesClick}> Files </Button>
            </Menu.Item>
        </Menu>
    );

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
                            {
                                width >= 1000 &&
                                <Space size={8} >
                                    {
                                        user.role === "employee" && currentSelectedProject?.status === INPROGRESS &&
                                        <Button type="primary" onClick={updateProjectStatusHandler}>mark as completed</Button>
                                    }
                                    <Button><Link to={`/dashboard/project/${roomId}/files`}>Files</Link> </Button>
                                </Space>
                            }
                            {
                                width < 1000 &&
                                    <Dropdown trigger={['click']} overlay={dropdownMenu}>
                                        <a>Options</a>
                                    </Dropdown>
                            }

                        </div>

                    </div>
                    <div className={styles.messages__container}>
                        {
                            roomId &&
                            <MessagesContainer roomId={roomId} />
                        }
                        {
                            !(roomId) &&
                            <div style={{ textAlign: 'center', marginTop: "1.375rem" }}>you don't have any project to chat about </div>
                        }
                    </div>
                </div>)
            }
        </div>
    )
}
