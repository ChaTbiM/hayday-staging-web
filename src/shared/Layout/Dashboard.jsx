import { MenuOutlined, MessageOutlined, ProjectOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import styles from './Dashboard.module.css';

const { Header, Sider, Content } = Layout;

export default function Dashboard() {
    const [isCollapsed, setIsCollapsed] = useState(false)

    let { path, url } = useRouteMatch();

    const toggle = () => {
        setIsCollapsed(!isCollapsed)
    };

    return (
        <Layout className={styles.container}>
            <Sider trigger={null} collapsible collapsed={isCollapsed}>
                {!isCollapsed ? <div className={styles.logo}><p>Text/Logo</p></div> : <div className={styles.empty__logo}></div>}
                {/*
                    keep active menu item after refresh
                defaultSelectedKeys={[this.props.location.pathname]}  */}
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<ProjectOutlined />}>
                        <Link to={url} exact>projects</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<MessageOutlined />}>
                        <Link to={`${url}/chat`} exact>chat</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
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
                            <p>from chat</p>
                        </Route>
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    )
}
