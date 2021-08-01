import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import http from '../../axios.config';
import { TOKEN_KEY } from '../../core/auth/auth.service';
import styles from "./Login.module.scss";

function Login() {
    const history = useHistory();
    const [unauthorized, setUnauthorized] = useState(false);
    const [serverError, setServerError] = useState(false);


    const onSubmitHandler = (values) => {
        http.post('auth/login', values)
            .then(res => res.data)
            .then((data) => {
                localStorage.setItem('user', JSON.stringify(data.user))
                localStorage.setItem(TOKEN_KEY, JSON.stringify(data[TOKEN_KEY]))
            }).then(() => {
                history.push('/dashboard')
            }).catch(error => {
                if (error.response) {
                    if (error.response.status === 401) {
                        setUnauthorized(true)
                    }
                } else {
                    setServerError(true)
                }
            })
    };


    const openUnauthorizedNotification = () => {
        notification['error']({
            message: 'Unauthorized !',
            description:
                'Wrong Email or Password ! Please Try Again.',
        });
    };

    const openServerErrorNotification = () => {
        notification['error']({
            message: 'Server is down !',
            description:
                `Something went wrong, 
                please try again in a while.`,
        });
    };


    useEffect(() => {
        if (unauthorized) {
            openUnauthorizedNotification();
        }
        return () => {
            setUnauthorized(false)
        }
    }, [unauthorized])

    useEffect(() => {
        if (serverError) {
            openServerErrorNotification();
        }
        return () => {
            setUnauthorized(false)
        }
    }, [serverError])

    return (
        <div className={styles.page}>
            <div className={styles.login__card}>
                <p className={styles.welcome}>Welcome</p>
                <p className={styles.login__cta}>login into your account</p>
                <p className={styles.and}>and</p>
                <p className={styles.track}>track your project status</p>
                <Form
                    name="normal_login"
                    initialValues={{ remember: true }}
                    onFinish={onSubmitHandler}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, type: "email", message: 'not valid email!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email ..." />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password ..."
                        />
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'left' }} >
                        <Button type="primary" htmlType="submit">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login;