import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    // Check if we have the required tokens
    const accessToken = searchParams.get('access_token')
    const refreshToken = searchParams.get('refresh_token')
    const type = searchParams.get('type')
    
    console.log('Page loaded with URL params:', {
      accessToken: accessToken ? `${accessToken.substring(0, 20)}...` : 'null',
      refreshToken: refreshToken ? `${refreshToken.substring(0, 20)}...` : 'null',
      type,
      fullURL: window.location.href,
      hash: window.location.hash,
      search: window.location.search
    })
    
    if (!accessToken || !refreshToken) {
      setError('Invalid or missing reset token. Please request a new password reset.')
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      setIsLoading(false)
      return
    }

    try {
      const accessToken = searchParams.get('access_token')
      const refreshToken = searchParams.get('refresh_token')
      const type = searchParams.get('type')

      console.log('Reset tokens:', { 
        accessToken: accessToken ? `${accessToken.substring(0, 20)}...` : 'null',
        refreshToken: refreshToken ? `${refreshToken.substring(0, 20)}...` : 'null',
        type,
        allParams: Object.fromEntries(searchParams.entries())
      })

      if (!accessToken || !refreshToken) {
        console.error('Missing tokens:', { accessToken: !!accessToken, refreshToken: !!refreshToken })
        throw new Error('Invalid reset token - missing access_token or refresh_token')
      }

      if (type !== 'recovery') {
        throw new Error('Invalid reset link type')
      }

      // Set the session first
      const { data: { session }, error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      })

      console.log('Session result:', { session: !!session, error: sessionError })

      if (sessionError) {
        throw new Error(`Invalid reset token: ${sessionError.message}`)
      }

      if (!session || !session.user) {
        throw new Error('No valid session found')
      }

      // Update the password
      const { data, error: updateError } = await supabase.auth.updateUser({
        password: password
      })

      console.log('Update result:', { data, error: updateError })

      if (updateError) {
        throw new Error(`Failed to update password: ${updateError.message}`)
      }

      setSuccess(true)
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login')
      }, 3000)

    } catch (error: any) {
      console.error('Password reset error:', error)
      setError(error.message || 'Failed to reset password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12 px-4 sm:px-6 lg:px-8">
          <Card className="w-full max-w-md mx-auto bg-white border-gray-200 shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Password Updated Successfully</h3>
                  <p className="text-gray-600">
                    Your password has been reset. You will be redirected to the login page shortly.
                  </p>
                </div>
                <Button 
                  onClick={() => navigate('/login')} 
                  className="bg-white border-gray-300 text-black hover:bg-primary hover:text-primary-foreground hover:border-primary"
                >
                  Go to Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md mx-auto bg-white border-gray-200 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">Reset Password</CardTitle>
            <CardDescription className="text-gray-600">
              Enter your new password below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                    className="pl-10 pr-10 bg-white border-gray-300 text-gray-900"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    className="pl-10 pr-10 bg-white border-gray-300 text-gray-900"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-white border-gray-300 text-black hover:bg-primary hover:text-primary-foreground hover:border-primary" 
                disabled={isLoading}
              >
                {isLoading ? 'Updating Password...' : 'Update Password'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}

export default ResetPassword
