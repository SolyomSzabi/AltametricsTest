import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'
import LayoutComponent from '../components/LayoutComponent'

const Register: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [registrationFailed, setRegistrationFailed] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })

      if (response.ok) {
        setRegistrationSuccess(true)
        setRegistrationFailed(false)
      } else {
        setRegistrationFailed(true)
        setRegistrationSuccess(false)
        console.error('Registration failed with status:', response.status)
      }
    } catch (error) {
      console.error('Network error:', error)
      setRegistrationFailed(true)
      setRegistrationSuccess(false)
    }
  }

  return (
    <LayoutComponent>
      <div className='container'>
        <h2>Register</h2>
        {registrationSuccess ? (
          <div>
            <p className='success'>
              Registration successful! You can now log in.
            </p>
          </div>
        ) : (
          <div>
            {registrationFailed && (
              <p className='failure'>Registration failed. Please try again.</p>
            )}
            <form onSubmit={handleRegister}>
              <input
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
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
              <button className='button' type='submit'>
                Register
              </button>
            </form>
          </div>
        )}
        <p>
          Already have an account?
          <Link className='button' to='/login'>
            Login
          </Link>
        </p>
      </div>
    </LayoutComponent>
  )
}

export default Register
