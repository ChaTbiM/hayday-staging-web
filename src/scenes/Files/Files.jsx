import { Col, Row } from 'antd'
import React from 'react'
import Asset from '../../components/Asset/Asset'
import styles from './Files.module.scss'
export default function Files() {
    return (
        <div className={styles.container}>
            <Row justify="center" gutter={[24, 24]}>
                <Col className="gutter-row" xs={20} md={12} lg={8} >
                    <Asset />
                </Col>
                <Col className="gutter-row" xs={20} md={12} lg={8} >
                    <Asset />
                </Col>
                <Col className="gutter-row" xs={20} md={12} lg={8} >
                    <Asset />
                </Col>
                <Col className="gutter-row" xs={20} md={12} lg={8} >
                    <Asset />
                </Col>
                <Col className="gutter-row" xs={20} md={12} lg={8} >
                    <Asset />
                </Col>
                <Col className="gutter-row" xs={20} md={12} lg={8} >
                    <Asset />
                </Col>
                <Col className="gutter-row" xs={20} md={12} lg={8} >
                    <Asset />
                </Col>
                <Col className="gutter-row" xs={20} md={12} lg={8} >
                    <Asset />
                </Col>
            </Row>
        </div>
    )
}
