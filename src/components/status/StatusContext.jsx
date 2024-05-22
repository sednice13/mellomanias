import React, { createContext, useState, useContext } from 'react'

const StatusContext = createContext()

export const useStatus = () => useContext(StatusContext)

export const StatusProvider = ({ children }) => {
    const [status, setStatus] = useState(null)
    const [message, setMessage] = useState('')

    const updateStatus = (code, msg) => {
        setStatus(code)
        setMessage(msg)
    }

    return (
        <StatusContext.Provider value={{ status, message, updateStatus }}>
            {children}
        </StatusContext.Provider>
    )
}
