import React from 'react'
import Conversation from '../Conversation/Conversation'



export default function ConversationList({ onConversationClicked, projects }) {

    return (
        <>
            {(projects?.length > 0) &&
                <>
                    {projects.map((project) => {
                        return (
                            <Conversation key={`project-${project.id}`} project={project} onClickHandler={onConversationClicked} />
                        )
                    })}
                </>
            }
            {
                // isLoading && <Skeleton paragraph={{ rows: 20 }} />
            }
            {
                projects?.length === 0 && <div style={{ textAlign: 'center', marginTop: "1.875rem" }}>you don't have any project to chat about </div>
            }
        </>
    )
}
