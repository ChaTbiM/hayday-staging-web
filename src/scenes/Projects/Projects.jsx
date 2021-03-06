import { Col, Row, Skeleton } from 'antd'
import React, { useEffect } from 'react'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import { useApp } from '../../hooks/app-context'
import { useChat } from '../../hooks/chat-context'
import useProjects from '../../hooks/useProjects'
import styles from './Projects.module.scss'

export default function Projects() {
    const { data: projects, isLoading } = useProjects()
    const { dispatch: dispatchApp } = useApp();
    const { dispatch: dispatchChat } = useChat();

    useEffect(() => {
        dispatchApp({ type: "setSelectedKey", payload: "/dashboard" })
        dispatchChat({ type: "hideConversationList" })
    }, [dispatchApp, dispatchChat])

    return (
        <div className={styles.container}>
            {projects?.length > 0 &&
                <Row gutter={[24, 24]}>
                    {projects.map((project) => {
                        return (
                            <Col key={`project-${project.id}`} className="gutter-row" xs={24} md={12} >
                                <ProjectCard project={project} />
                            </Col>
                        )
                    })}
                </Row>
            }
            {
                isLoading && <Skeleton paragraph={{ rows: 10 }} />
            }
            {
                projects?.length === 0 && <p>there is no project</p>
            }
        </div>
    )
}
