import { MenuOutlined, MessageOutlined, ProjectOutlined, LogoutOutlined } from '@ant-design/icons';
import { Drawer, Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { ChatProvider } from '../../hooks/chat-context';
import useWindowSize from '../../hooks/useWindowSize';
import Chat from '../../scenes/Chat/Chat';
import Files from '../../scenes/Files/Files';
import Projects from '../../scenes/Projects/Projects';
import styles from './Dashboard.module.scss';

const { Header, Sider, Content } = Layout;

export default function Dashboard() {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [visible, setVisible] = useState(true);
    const { width } = useWindowSize();
    const { path, url } = useRouteMatch();
    const location = useLocation();

    const history = useHistory();



    const onClose = () => {
        setVisible(false);
    };

    const toggle = () => {
        if (width > 1000) {
            setIsCollapsed(!isCollapsed)
        } else {
            setVisible(!visible)
        }
    };

    const logoutHandler = () => {
        localStorage.clear();
        history.push("/login")
    }

    useEffect(() => {
        setIsCollapsed(false)
        setVisible(false)

    }, [width])

    return (
        <Layout className={styles.container}>
            {
                width > 1001 && <Sider trigger={null} collapsible collapsed={isCollapsed}>
                    {!isCollapsed ? <div className={styles.logo}><p>Text/Logo</p></div> : <div className={styles.empty__logo}></div>}
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
                        <Menu.Item key={'/dashboard'} icon={<ProjectOutlined />}>
                            <Link to={url} >projects</Link>
                        </Menu.Item>
                        <Menu.Item key={'/dashboard/chat'} icon={<MessageOutlined />}>
                            <Link to={`${url}/chat`} >chat</Link>
                        </Menu.Item>
                        <Menu.Item key={'/logout'} onClick={logoutHandler} className={styles.logout} icon={<LogoutOutlined />}>
                            logout
                        </Menu.Item>
                    </Menu>
                </Sider>
            }

            {
                width <= 1000 &&
                <Drawer
                    title="Menu"
                    placement="right"
                    closable={true}
                    onClose={onClose}
                    visible={visible}
                    className={styles.drawer}
                >
                    <Menu defaultSelectedKeys={[location.pathname]}>
                        <Menu.Item key={'/dashboard'} icon={<ProjectOutlined />}>
                            <Link to={url} onClick={toggle} >projects</Link>
                        </Menu.Item>
                        <Menu.Item key={'/dashboard/chat'} icon={<MessageOutlined />}>
                            <Link to={`${url}/chat`} onClick={toggle} >chat</Link>
                        </Menu.Item>
                        <Menu.Item key={'/logout'} onClick={logoutHandler} className={styles.logout} icon={<LogoutOutlined />}>
                            logout
                        </Menu.Item>
                    </Menu>
                </Drawer>

            }

            <Layout className="site-layout">

                <Header className={styles.header} >
                    <MenuOutlined onClick={toggle} className={styles.menu__outlined} />
                    {/* <UserOutlined className={styles.avatar} /> */}
                </Header>
                <Content
                    className={styles.content}
                >
                    <Switch>
                        <Route path={path} exact >
                            <Projects />
                        </Route>
                        <ChatProvider>
                            <Route path={`${path}/chat`}  >
                                <Chat />
                            </Route>
                        </ChatProvider>
                        <Route path={`${path}/project/:projectid/files`}  >
                            <Files />
                        </Route>
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    )
}
