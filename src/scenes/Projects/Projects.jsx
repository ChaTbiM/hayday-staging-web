import { Col, Row } from 'antd'
import React from 'react'
import ProjectCard from '../../components/ProjectCard/ProjectCard'

export default function Projects() {
    return (
        <>
            <Row gutter={[24, 24]}>
                <Col className="gutter-row" xs={24} md={12} >
                    <ProjectCard />
                </Col>
                <Col className="gutter-row" xs={24} md={12} >
                    <ProjectCard />
                </Col>
                <Col className="gutter-row" xs={24} md={12} >
                    <ProjectCard />
                </Col>
                <Col className="gutter-row" xs={24} md={12} >
                    <ProjectCard />
                </Col>
                <Col className="gutter-row" xs={24} md={12} >
                    <ProjectCard />
                </Col>
                <Col className="gutter-row" xs={24} md={12} >
                    <ProjectCard />
                </Col>
                <Col className="gutter-row" xs={24} md={12} >
                    <ProjectCard />
                </Col>
                <Col className="gutter-row" xs={24} md={12} >
                    <ProjectCard />
                </Col>
            </Row>
        </>
    )
}
