import * as React from 'react';

const ChatContext = React.createContext()

function ChatReducer(state, action) {
  switch (action.type) {
    case 'setRoomId': {
      return { ...state, roomId: action.payload }
    }
    case 'addMessage': {
      console.log("what")
      return { ...state, messages: [...state.messages, action.payload] }
    }
    case 'setProjects': {
      return { ...state, projects: action.payload }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const initialState = {
  roomId: null,
  messages: [],
  projects: []
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

export { ChatProvider, useChat };

