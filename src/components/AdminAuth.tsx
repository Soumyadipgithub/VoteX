
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useWeb3 } from '@/context/Web3Context';
import { toast } from 'sonner';
import { Lock, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ADMIN_CREDENTIALS = {
  username: 'Admin',
  password: '12345'
};

const AdminAuth: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setIsAdmin } = useWeb3();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAdmin(true);
      toast.success('Admin authentication successful!');
      navigate('/admin');
    } else {
      toast.error('Invalid credentials. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="glass-card shadow-card animate-fade-in">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Admin Authentication</CardTitle>
          <CardDescription className="text-center">
            Enter your admin credentials to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-10"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleSubmit}
            className="w-full h-10 rounded-md shadow-button hover:shadow-button-hover button-transition"
            disabled={loading}
            variant="connect"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Authenticating...
              </span>
            ) : (
              <span className="flex items-center">
                <LogIn className="mr-2 h-4 w-4" />
                LOGIN AS ADMIN
              </span>
            )}
          </Button>
        </CardFooter>
      </Card>
      <div className="mt-4 text-center text-sm text-gray-500">
        <p className="flex items-center justify-center">
          <Lock className="h-3 w-3 mr-1" />
          Default credentials: Admin / 12345
        </p>
      </div>
    </div>
  );
};

export default AdminAuth;
