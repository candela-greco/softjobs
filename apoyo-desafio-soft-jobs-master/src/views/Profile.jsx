import axios from 'axios'
import Context from '../contexts/Context'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ENDPOINT } from '../config/constans'

const Profile = () => {
  const navigate = useNavigate()
  const { getDeveloper, setDeveloper } = useContext(Context)

  const getDeveloperData = () => {
    const token = window.sessionStorage.getItem('token')
    if (!ENDPOINT.perfil) {
      console.error('ENDPOINT.perfil no está definido')
      return
    }

    axios.get(ENDPOINT.perfil, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        const { data } = response
        if (data) {
          setDeveloper({ ...data })
        } else {
          console.error('Respuesta inesperada:', data)
          setDeveloper(null)
          navigate('/')
        }
      })
      .catch((error) => {
        if (error.response) {
          const { data } = error.response
          console.error(data)
        } else {
          console.error('Error en la solicitud:', error.message)
        }

        window.sessionStorage.removeItem('token')
        setDeveloper(null)
        navigate('/')
      })
  }

  useEffect(getDeveloperData, [])

  return (
    <div className='py-5'>
      <h1>
        Bienvenido <span className='fw-bold'>{getDeveloper?.email}</span>
      </h1>
      <h3>
        {getDeveloper?.rol} en {getDeveloper?.lenguage || 'Idioma no especificado'}
      </h3>
    </div>
  )
}

export default Profile
