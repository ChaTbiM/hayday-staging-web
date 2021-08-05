import * as React from 'react'

const ChatContext = React.createContext()

function countReducer(state, action) {
  switch (action.type) {
    case 'setRoomId': {
      return { ...state, roomId: action.payload }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const initialState = {
  roomId: null
}

function ChatProvider({ children }) {
  const [state, dispatch] = React.useReducer(countReducer, initialState)
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
