import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { LoginForm } from '@/components/auth/LoginForm'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/dashboard'

  const handleSuccess = () => {
    navigate(from, { replace: true })
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <LoginForm onSuccess={handleSuccess} />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Login
