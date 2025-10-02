import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SignupForm } from '@/components/auth/SignupForm'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const Signup: React.FC = () => {
  const navigate = useNavigate()

  const handleSuccess = () => {
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <SignupForm onSuccess={handleSuccess} />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Signup
