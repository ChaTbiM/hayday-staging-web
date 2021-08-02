import { Button, Input, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import useWindowSize from '../../hooks/useWindowSize';
import styles from './Chat.module.scss';
const { Search } = Input;

export default function Chat() {

    const { url } = useRouteMatch();
    const { width } = useWindowSize();

    const [isVisible, setIsVisible] = useState(false)
    const onSearch = (val) => {
        console.log(val)
    }

    return (
        <div className={styles.container}>

            {
                (isVisible || width > 1000) &&
                (<div className={styles.container__left}>
                    <div className={styles.search}>
                        <Search placeholder="Search For Project.." onSearch={onSearch} style={{ width: 200 }} />
                    </div>
                    <div className={styles.conversation__list}>
                        <p>conversation__list</p>
                    </div>
                </div>)
            }

            {
                (!isVisible || width > 1000) &&
                (<div className={styles.container__right}>
                    <div className={styles.project}>
                        <p className={styles.project__title}>Project [#98182134]</p>
                        <div className={styles.project__actions}>
                            <Space size={8} >
                                <Button type="primary">mark as completed</Button>
                                <Button><Link to={`${url}/project/15/files`}>Files</Link> </Button>
                            </Space>
                        </div>

                    </div>
                    <div className={styles.messages__container}>
                        {/* messages */}
                        <div>messages</div>
                        <div>
                            <div>messages box</div>
                            <div>messages box</div>
                            <div>messages box</div>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
}
