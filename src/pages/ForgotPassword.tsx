import React from 'react'
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const ForgotPassword: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <ForgotPasswordForm />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ForgotPassword
