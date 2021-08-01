import React, { useEffect, useState } from 'react';
import { MenuOutlined, MessageOutlined, ProjectOutlined, UserOutlined } from '@ant-design/icons';
import { Drawer, Layout, Menu } from 'antd';
import { Link, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import Chat from '../../scenes/Chat/Chat';
import styles from './Dashboard.module.scss';
import useWindowSize from '../../hooks/useWindowSize';

const { Header, Sider, Content } = Layout;

export default function Dashboard() {
    const [isCollapsed, setIsCollapsed] = useState(false)

    const [visible, setVisible] = useState(true);

    const { width } = useWindowSize();

    const onClose = () => {
        setVisible(false);
    };

    let { path, url } = useRouteMatch();

    let location = useLocation();

    const toggle = () => {
        if (width > 760) {
            setIsCollapsed(!isCollapsed)
        } else {
            setVisible(!visible)
        }
    };

    useEffect(() => {
        setIsCollapsed(false)
        setVisible(false)

    }, [width])

    return (
        <Layout className={styles.container}>
            {
                width > 761 && <Sider trigger={null} collapsible collapsed={isCollapsed}>
                    {!isCollapsed ? <div className={styles.logo}><p>Text/Logo</p></div> : <div className={styles.empty__logo}></div>}
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
                        <Menu.Item key={'/dashboard'} icon={<ProjectOutlined />}>
                            <Link to={url} >projects</Link>
                        </Menu.Item>
                        <Menu.Item key={'/dashboard/chat'} icon={<MessageOutlined />}>
                            <Link to={`${url}/chat`} >chat</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
            }

            {
                width <= 760 &&
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
                    </Menu>
                </Drawer>

            }

            <Layout className="site-layout">
                <Header className={styles.header} >
                    <MenuOutlined onClick={toggle} className={styles.menu__outlined} />
                    <UserOutlined className={styles.avatar} />
                </Header>
                <Content
                    className={styles.content}
                >
                    <Switch>
                        <Route path={path} exact >
                            <p>yes I can see all projects</p>
                        </Route>
                        <Route path={`${path}/chat`}  >
                            <Chat />
                        </Route>
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    )
}
