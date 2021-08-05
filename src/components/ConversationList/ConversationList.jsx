import { Skeleton } from 'antd'
import React, { useEffect } from 'react'
import { useChat } from '../../hooks/chat-context'
import useProjects from '../../hooks/useProjects'
import Conversation from '../Conversation/Conversation'

export default function ConversationList({ onConversationClicked }) {
    const { data: projects, isLoading } = useProjects()
    const { dispatch } = useChat();

    useEffect(() => {
        if (projects) {
            dispatch({ type: "setRoomId", payload: projects[0].id })
        }
    }, [dispatch,projects])
    return (
        <>
            {!!(projects?.length) &&
                <>
                    {projects.map((project) => {
                        return (
                            <Conversation key={`project-${project.id}`} project={project} onClickHandler={onConversationClicked} />
                        )
                    })}
                </>
            }
            {
                isLoading && <Skeleton paragraph={{ rows: 20 }} />
            }
            {
                projects?.length === 0 && <div style={{ textAlign: 'center', marginTop: "1.875rem" }}>you don't have any project to chat about </div>
            }
        </>
    )
}
