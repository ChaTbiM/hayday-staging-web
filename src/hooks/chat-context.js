import * as React from 'react'

const ChatContext = React.createContext()

function ChatReducer(state, action) {
  switch (action.type) {
    case 'setRoomId': {
      return { ...state, roomId: action.payload }
    }
    case 'addMessage': {
      const updatedMessages = [...state.messages, action.payload]
      console.log("asdas", updatedMessages)
      return { ...state, messages: updatedMessages }
    }
    case 'setProjects': {
      return { ...state, projects: action.payload }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const testMessages = [
  { content: "message 1", from: 2 },
  { content: "message 2", from: 2 },
  { content: "message 3", from: 2 },
  { content: "message 4", from: 5 },
  { content: "message 5", from: 5 },
  { content: "message 6", from: 5 },
]

const initialState = {
  roomId: null,
  messages: [],
  projects: null
}

function ChatProvider({ children }) {
  const [state, dispatch] = React.useReducer(ChatReducer, initialState)
  const value = { state, dispatch }
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

function useChat() {
  const context = React.useContext(ChatContext)
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}

export { ChatProvider, useChat }

