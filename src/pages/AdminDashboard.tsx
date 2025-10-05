import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, MessageSquare, FileText, Settings, BarChart3 } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your business operations</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6">
          <nav className="flex space-x-8 py-4">
            <Link 
              to="/admin/dashboard" 
              className="text-primary border-b-2 border-primary pb-2 font-medium"
            >
              Dashboard
            </Link>
            <Link 
              to="/admin/tickets" 
              className="bg-white border-gray-300 text-black hover:bg-primary hover:text-primary-foreground hover:border-primary px-4 py-2 rounded-md transition-colors font-medium"
            >
              Support Tickets
            </Link>
            <Link 
              to="/admin/invoices" 
              className="bg-white border-gray-300 text-black hover:bg-primary hover:text-primary-foreground hover:border-primary px-4 py-2 rounded-md transition-colors font-medium"
            >
              Invoice Management
            </Link>
            <Link 
              to="/admin/users" 
              className="bg-white border-gray-300 text-black hover:bg-primary hover:text-primary-foreground hover:border-primary px-4 py-2 rounded-md transition-colors font-medium"
            >
              User Management
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Support Tickets Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <MessageSquare className="h-8 w-8 text-primary" />
                <span className="text-sm text-gray-500">Support</span>
              </div>
              <CardTitle>Support Tickets</CardTitle>
              <CardDescription>
                Manage and respond to client support requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full mt-4 bg-white border-gray-300 text-black hover:bg-primary hover:text-primary-foreground hover:border-primary">
                <Link to="/admin/tickets">Manage Tickets</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Invoice Management Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <FileText className="h-8 w-8 text-primary" />
                <span className="text-sm text-gray-500">Billing</span>
              </div>
              <CardTitle>Invoice Management</CardTitle>
              <CardDescription>
                Upload and manage client invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full mt-4 bg-white border-gray-300 text-black hover:bg-primary hover:text-primary-foreground hover:border-primary">
                <Link to="/admin/invoices">Manage Invoices</Link>
              </Button>
            </CardContent>
          </Card>

          {/* User Management Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Users className="h-8 w-8 text-primary" />
                <span className="text-sm text-gray-500">Users</span>
              </div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage clients and admin access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full mt-4 bg-white border-gray-300 text-black hover:bg-primary hover:text-primary-foreground hover:border-primary">
                <Link to="/admin/users">Manage Users</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Task Updates Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <BarChart3 className="h-8 w-8 text-primary" />
                <span className="text-sm text-gray-500">Projects</span>
              </div>
              <CardTitle>Task Updates</CardTitle>
              <CardDescription>
                Update project progress and tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full mt-4">
                <Link to="/admin/projects">Update Tasks</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
