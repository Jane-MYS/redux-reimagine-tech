import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Mail, Lock, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useAuth } from '@/contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormData = z.infer<typeof loginSchema>

interface LoginFormProps {
  onSuccess?: () => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isAdminLogin, setIsAdminLogin] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      if (isAdminLogin) {
        // Admin login logic
        const { data: adminData, error: adminError } = await supabase
          .from('admins')
          .select('id, email')
          .eq('email', data.email)
          .single()

        if (adminError || !adminData) {
          setError('Access denied. Admin privileges required.')
          setIsLoading(false)
          return
        }

        const { error: signInError } = await signIn(data.email, data.password)
        
        if (signInError) {
          setError('Invalid email or password.')
        } else {
          navigate('/admin/dashboard')
        }
      } else {
        // Client login logic
        const { error } = await signIn(data.email, data.password)

        if (error) {
          setError(error.message)
        } else {
          onSuccess?.()
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('An error occurred during login. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="bg-white border-gray-200 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            {isAdminLogin ? 'Admin Login' : 'Welcome Back'}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {isAdminLogin ? 'Access the admin dashboard' : 'Sign in to your account'}
          </CardDescription>
        </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10 bg-white border-gray-300 text-gray-900"
                {...register('email')}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="pl-10 pr-10 bg-white border-gray-300 text-gray-900"
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-white border-gray-300 text-black hover:bg-primary hover:text-primary-foreground hover:border-primary" 
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="text-center text-sm space-y-2">
          {!isAdminLogin ? (
            <>
              <div>
                <span className="text-gray-600">Don't have an account? </span>
                <Link to="/signup" className="text-blue-600 hover:underline">
                  Sign up
                </Link>
              </div>
              <div>
                <Link to="/forgot-password" className="text-blue-600 hover:underline">
                  Forgot your password?
                </Link>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <button
                  onClick={() => setIsAdminLogin(true)}
                  className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  <Shield className="w-4 h-4" />
                  Admin Login
                </button>
              </div>
            </>
          ) : (
            <div className="pt-2 border-t border-gray-200">
              <button
                onClick={() => setIsAdminLogin(false)}
                className="text-sm text-gray-600 hover:text-primary transition-colors"
              >
                ← Back to Client Login
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
    </div>
  )
}
