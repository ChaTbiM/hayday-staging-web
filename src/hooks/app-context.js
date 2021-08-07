import * as React from 'react';

const AppContext = React.createContext()

function AppReducer(state, action) {
    switch (action.type) {
        case 'setSelectedKey': {
            console.log("action ",action.payload)
            return { ...state, selectedKey: action.payload }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

const initialState = {
    selectedKey: "/dashboard",
}
function AppProvider({ children }) {
    const [state, dispatch] = React.useReducer(AppReducer, initialState)
    const value = { state, dispatch }
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

function useApp() {
    const context = React.useContext(AppContext)
    if (context === undefined) {
        throw new Error('useApp must be used within a AppProvider')
    }
    return context
}

export { AppProvider, useApp };

