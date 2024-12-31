import './App.css'
import Context from './contexts/Context'
import useDeveloper from './hooks/useDeveloper'
import { Routes, Route } from 'react-router-dom'

import Navigation from './components/Navigation'
import Home from './views/Home'
import Registro from './views/Register'
import Login from './views/Login'
import Perfil from './views/Profile'

const App = () => {
  const globalState = useDeveloper()

  return (
    <Context.Provider value={globalState}>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/registrarse' element={<Registro />} />
        <Route path='/login' element={<Login />} />
        <Route path='/perfil' element={<Perfil />} />
      </Routes>
    </Context.Provider>
  )
}

export default App
