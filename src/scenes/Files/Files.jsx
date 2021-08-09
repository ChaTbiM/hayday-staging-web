import { Col, Row } from 'antd'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Asset from '../../components/Asset/Asset'
import useFiles from '../../hooks/useFiles'
import styles from './Files.module.scss'
export default function Files() {

    const { projectId } = useParams()
    const { data: files } = useFiles(projectId);

    useEffect(() => {
        console.log("files", files)
    }, [files])

    return (
        <div className={styles.container}>
            {
                files?.length > 0 &&
                <Row justify="center" gutter={[24, 24]}>
                    {
                        files.map((file) => {
                            return (
                                <Col key={`file-${file.id}`} className="gutter-row" xs={20} md={12} lg={8} >
                                    <Asset filename={file.filename} />
                                </Col>
                            )
                        })
                    }
                </Row>
            }

        </div>
    )
}
