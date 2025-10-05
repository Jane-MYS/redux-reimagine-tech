import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LogOut, User, Building, Mail, Phone, Edit2, Check, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { supabase } from '@/lib/supabase'

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isEditingPhone, setIsEditingPhone] = useState(false)
  const [tempPhoneNumber, setTempPhoneNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [clientName, setClientName] = useState('')

  useEffect(() => {
    fetchUserPhoneNumber()
    fetchClientName()
  }, [user])

  const fetchUserPhoneNumber = async () => {
    if (!user) return
    
    // First, try to get from localStorage (immediate fallback)
    const localPhone = localStorage.getItem(`phone_${user.id}`)
    if (localPhone) {
      setPhoneNumber(localPhone)
    }
    
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('phone_number')
        .eq('user_id', user.id)
        .single()

      if (data && !error && data.phone_number) {
        setPhoneNumber(data.phone_number)
        // Also save to localStorage for consistency
        localStorage.setItem(`phone_${user.id}`, data.phone_number)
      } else if (error) {
        console.log('Database fetch failed, using localStorage:', error.message)
      }
    } catch (error) {
      console.log('Database operation failed, using localStorage:', error)
    }
  }

  const fetchClientName = async () => {
    if (!user) return
    
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('full_name')
        .eq('user_id', user.id)
        .single()

      if (data && !error && data.full_name) {
        setClientName(data.full_name)
      } else {
        // Fallback to user metadata or email
        setClientName(user.user_metadata?.full_name || user.email || 'Client')
      }
    } catch (error) {
      console.log('Error fetching client name:', error)
      // Fallback to user metadata or email
      setClientName(user.user_metadata?.full_name || user.email || 'Client')
    }
  }

  const handleEditPhone = () => {
    setTempPhoneNumber(phoneNumber)
    setIsEditingPhone(true)
  }

  const handleSavePhone = async () => {
    if (!user) return
    
    setIsLoading(true)
    try {
      // For now, let's use localStorage as a fallback until the database is set up
      // This will allow the feature to work immediately
      localStorage.setItem(`phone_${user.id}`, tempPhoneNumber)
      
      // Try to update the database if possible
      try {
        const { error: updateError } = await supabase
          .from('clients')
          .update({ phone_number: tempPhoneNumber })
          .eq('user_id', user.id)

        if (updateError) {
          console.log('Database update failed, using localStorage:', updateError.message)
        }
      } catch (dbError) {
        console.log('Database operation failed, using localStorage:', dbError)
      }

      // Update the UI regardless
      setPhoneNumber(tempPhoneNumber)
      setIsEditingPhone(false)
      
    } catch (error) {
      console.error('Error saving phone number:', error)
      alert('Error saving phone number. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelEdit = () => {
    setTempPhoneNumber('')
    setIsEditingPhone(false)
  }

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">
                {clientName ? `Hi, ${clientName}! Welcome back to your client portal` : 'Welcome back to your client portal'}
              </p>
            </div>
            <Button variant="outline" onClick={handleSignOut} className="border-gray-300 text-black bg-white hover:bg-primary hover:text-primary-foreground hover:border-primary">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>

          {/* User Info */}
          <Card className="mb-8 bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <User className="w-5 h-5 mr-2" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                   <div className="flex items-center space-x-2">
                     <Mail className="w-4 h-4 text-gray-500" />
                     <span className="text-sm text-gray-700">{user?.email}</span>
                   </div>
                   <div className="flex items-center space-x-2">
                     <User className="w-4 h-4 text-gray-500" />
                     <span className="text-sm text-gray-700">Member since {new Date(user?.created_at || '').toLocaleDateString()}</span>
                   </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Phone Number</span>
                    {!isEditingPhone && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleEditPhone}
                        className="text-gray-500 hover:text-gray-700 p-1 h-auto ml-2"
                      >
                        <Edit2 className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                  
                  {isEditingPhone ? (
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-xs text-gray-600">Phone Number</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="phone"
                          type="tel"
                          value={tempPhoneNumber}
                          onChange={(e) => setTempPhoneNumber(e.target.value)}
                          placeholder="Enter your phone number"
                          className="flex-1 bg-white border-gray-300 text-gray-900"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleSavePhone}
                          disabled={isLoading}
                          className="text-green-600 hover:text-green-700 p-1 h-auto"
                        >
                          {isLoading ? (
                            <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Check className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCancelEdit}
                          className="text-red-600 hover:text-red-700 p-1 h-auto"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-700">
                      {phoneNumber || 'No phone number added'}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Projects Card */}
            <Card className="bg-white border-gray-200 shadow-sm flex flex-col h-full">
              <CardHeader>
                <CardTitle className="text-gray-900">Active Projects</CardTitle>
                <CardDescription className="text-gray-600">Your current projects and their status</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-center">
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No active projects</p>
                  <Button 
                    variant="outline" 
                    asChild
                    className="border-gray-300 text-black bg-white hover:bg-primary hover:text-primary-foreground hover:border-primary"
                  >
                    <Link to="/projects">View All Projects</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tickets Card */}
            <Card className="bg-white border-gray-200 shadow-sm flex flex-col h-full">
              <CardHeader>
                <CardTitle className="text-gray-900">Support Tickets</CardTitle>
                <CardDescription className="text-gray-600">Track your support requests</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-center">
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No open tickets</p>
                  <Button 
                    variant="outline" 
                    asChild
                    className="border-gray-300 text-black bg-white hover:bg-primary hover:text-primary-foreground hover:border-primary"
                  >
                    <Link to="/tickets">Submit Ticket</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Invoices Card */}
            <Card className="bg-white border-gray-200 shadow-sm flex flex-col h-full">
              <CardHeader>
                <CardTitle className="text-gray-900">Invoices</CardTitle>
                <CardDescription className="text-gray-600">View and download your invoices</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-center">
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No invoices available</p>
                  <Button 
                    variant="outline" 
                    asChild
                    className="border-gray-300 text-black bg-white hover:bg-primary hover:text-primary-foreground hover:border-primary"
                  >
                    <Link to="/invoices">View All Invoices</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Dashboard
