import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Trash2, UserCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Admin {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

const AdminUsers = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAdmins(data || []);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  const addAdmin = async () => {
    if (!newAdminEmail || !newAdminName) {
      setMessage('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('admins')
        .insert({
          email: newAdminEmail,
          name: newAdminName
        });

      if (error) throw error;

      setMessage('Admin added successfully!');
      setNewAdminEmail('');
      setNewAdminName('');
      fetchAdmins();
    } catch (error) {
      console.error('Error adding admin:', error);
      setMessage('Error adding admin. Email might already exist.');
    } finally {
      setIsLoading(false);
    }
  };

  const removeAdmin = async (adminId: string) => {
    if (!confirm('Are you sure you want to remove this admin?')) return;

    try {
      const { error } = await supabase
        .from('admins')
        .delete()
        .eq('id', adminId);

      if (error) throw error;

      setMessage('Admin removed successfully!');
      fetchAdmins();
    } catch (error) {
      console.error('Error removing admin:', error);
      setMessage('Error removing admin.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-8">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-white/90 mt-2">Manage admin access and user permissions</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add New Admin */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Admin
              </CardTitle>
              <CardDescription>
                Grant admin access to a user by adding their email
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {message && (
                <Alert className={message.includes('Error') ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}>
                  <AlertDescription className={message.includes('Error') ? 'text-red-800' : 'text-green-800'}>
                    {message}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  placeholder="admin@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newAdminName}
                  onChange={(e) => setNewAdminName(e.target.value)}
                  placeholder="Admin User"
                />
              </div>

              <Button 
                onClick={addAdmin} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Adding...' : 'Add Admin'}
              </Button>
            </CardContent>
          </Card>

          {/* Current Admins */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Current Admins
              </CardTitle>
              <CardDescription>
                Manage existing admin users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {admins.map((admin) => (
                  <div key={admin.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{admin.name}</p>
                      <p className="text-sm text-gray-600">{admin.email}</p>
                      <p className="text-xs text-gray-500">
                        Added: {new Date(admin.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeAdmin(admin.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
