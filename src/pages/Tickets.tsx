import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ArrowLeft, Plus, MessageSquare, Clock, CheckCircle, AlertTriangle, XCircle, Paperclip } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const Tickets: React.FC = () => {
  const { user } = useAuth()
  const [tickets, setTickets] = useState([
    {
      id: '1',
      title: 'Login issue on mobile app',
      description: 'Users are unable to log in through the mobile application',
      status: 'open' as const,
      priority: 'high' as const,
      createdAt: '2024-01-20',
      updatedAt: '2024-01-22'
    },
    {
      id: '2',
      title: 'Website loading slowly',
      description: 'The main website is taking too long to load on desktop browsers',
      status: 'in_progress' as const,
      priority: 'medium' as const,
      createdAt: '2024-01-18',
      updatedAt: '2024-01-21'
    },
    {
      id: '3',
      title: 'Feature request: Dark mode',
      description: 'Would like to add a dark mode option to the dashboard',
      status: 'resolved' as const,
      priority: 'low' as const,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    }
  ])

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    priority: 'medium'
  })
  const [showValidationWarning, setShowValidationWarning] = useState(false)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'in_progress':
        return <Clock className="w-4 h-4 text-blue-600" />
      case 'open':
        return <AlertTriangle className="w-4 h-4 text-white" />
      default:
        return <XCircle className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'open':
        return 'text-white border-orange-600'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleCreateTicket = () => {
    if (newTicket.title && newTicket.description) {
      const ticket = {
        id: (tickets.length + 1).toString(),
        ...newTicket,
        status: 'open' as const,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      }
      setTickets([ticket, ...tickets])
      setNewTicket({ title: '', description: '', priority: 'medium' })
      setShowValidationWarning(false)
      setIsCreateDialogOpen(false)
    } else {
      setShowValidationWarning(true)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setNewTicket({ ...newTicket, [field]: value })
    if (showValidationWarning) {
      setShowValidationWarning(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        <Navbar />
        
        <div className="container mx-auto px-6 pt-24 pb-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild className="p-2">
                <Link to="/dashboard">
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Support Tickets</h1>
                <p className="text-gray-600">Manage your support requests and track their progress</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                asChild
                className="border-gray-300 text-black bg-white hover:bg-gray-50"
              >
                <Link to="/dashboard">Back to Dashboard</Link>
              </Button>
            
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-white border-gray-300 text-black hover:bg-primary hover:text-primary-foreground hover:border-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Submit Ticket
                  </Button>
                </DialogTrigger>
              <DialogContent className="bg-white border-gray-200">
                <DialogHeader>
                  <DialogTitle className="text-gray-900">Create New Ticket</DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Submit a new support request and we'll get back to you soon.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {showValidationWarning && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                      <div className="flex items-center">
                        <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                        <p className="text-red-800 text-sm">
                          Please fill in both Title and Description fields to submit the ticket.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <Label htmlFor="title" className="text-gray-700">Title</Label>
                    <Input
                      id="title"
                      value={newTicket.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Brief description of the issue"
                      className="bg-white border-gray-300 text-gray-900"
                    />
                  </div>
                  <div>
                    <Label htmlFor="priority" className="text-gray-700">Priority</Label>
                    <Select value={newTicket.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                      <SelectTrigger className="bg-white border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-gray-700">Description</Label>
                    <Textarea
                      id="description"
                      value={newTicket.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Detailed description of the issue or request"
                      className="bg-white border-gray-300 text-gray-900"
                      rows={4}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateDialogOpen(false)}
                      className="border-gray-300 text-black bg-white hover:bg-white hover:text-black"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCreateTicket}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Submit Ticket
                    </Button>
                  </div>
                </div>
              </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Tickets List */}
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <Card key={ticket.id} className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{ticket.title}</h3>
                        <Badge 
                          className={`${getStatusColor(ticket.status)} border`}
                          style={ticket.status === 'open' ? { backgroundColor: '#e85d04' } : {}}
                        >
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(ticket.status)}
                            <span className="capitalize">{ticket.status.replace('_', ' ')}</span>
                          </div>
                        </Badge>
                        <Badge className={`${getPriorityColor(ticket.priority)} border`}>
                          <span className="capitalize">{ticket.priority}</span>
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{ticket.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>Created: {formatDate(ticket.createdAt)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>Updated: {formatDate(ticket.updatedAt)}</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="border-gray-300 text-black bg-white hover:bg-primary hover:text-primary-foreground hover:border-primary"
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {tickets.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No tickets yet</h3>
              <p className="text-gray-600 mb-6">Submit your first support request</p>
              <Button className="bg-white border-gray-300 text-black hover:bg-primary hover:text-primary-foreground hover:border-primary">
                <Plus className="w-4 h-4 mr-2" />
                Submit Ticket
              </Button>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  )
}

export default Tickets
