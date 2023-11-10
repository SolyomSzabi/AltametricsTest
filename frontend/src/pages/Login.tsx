import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import LayoutComponent from '../components/LayoutComponent'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginFailed, setLoginFailed] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        const token = data.access_token
        localStorage.setItem('token', token)
        navigate('/')
      } else {
        setLoginFailed(true)
        console.error('Request failed with status:', response.status)
      }
    } catch (error) {
      console.error('Network error:', error)
    }
  }

  return (
    <LayoutComponent>
      <div className='container'>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type='submit' className='button'>
            Login
          </button>
        </form>
        {loginFailed && (
          <p className='failure'>
            Login failed. Please check your credentials.
          </p>
        )}
        {
          <p>
            Don't have an account?
            <Link className='button' to='/register'>
              Register
            </Link>
          </p>
        }
      </div>
    </LayoutComponent>
  )
}

export default Login
