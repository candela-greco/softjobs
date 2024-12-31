import { createContext, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { ENDPOINT } from '../src/config/constans.js'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null)

  const loginWithEmailAndPassword = async (email, password) => {
    const response = await fetch(ENDPOINT.login, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()
    setToken(data.token || null)

    return data
  }

  const registerWithEmailAndPassword = async (email, password) => {
    const response = await fetch(ENDPOINT.register, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await response.json()
    return data
  }

  const logout = () => {
    setToken(null)
  }

  const value = useMemo(() => ({
    loginWithEmailAndPassword,
    registerWithEmailAndPassword,
    token,
    logout
  }), [token])

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default UserProvider
