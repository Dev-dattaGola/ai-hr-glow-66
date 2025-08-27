
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/EnhancedAuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  Eye, EyeOff, Building2, Users, TrendingUp, Shield, 
  Mail, Phone, Fingerprint, KeyRound, Sun, Moon, 
  Globe, Chrome, Linkedin, Smartphone, User
} from 'lucide-react';

const ModernAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authMethod, setAuthMethod] = useState<'email' | 'employeeId' | 'otp' | 'biometric'>('email');
  const { 
    signIn, signUp, signInWithOAuth, signInWithOTP, resetPassword, masterLogin,
    theme, setTheme, language, setLanguage, rememberMe, setRememberMe
  } = useAuth();
  const navigate = useNavigate();

  const [signInData, setSignInData] = useState({
    email: '',
    employeeId: '',
    password: '',
    phone: '',
  });

  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    department: '',
    employeeId: '',
  });

  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  useEffect(() => {
    // Apply theme
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleMasterLogin = () => {
    masterLogin();
    toast.success('Master Access Granted! Redirecting to dashboard...');
    setTimeout(() => navigate('/dashboard'), 1000);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (authMethod === 'otp') {
        const { error } = await signInWithOTP(signInData.phone);
        if (!error) {
          toast.success('OTP sent! Check your phone for verification code.');
        }
      } else {
        const credentials = authMethod === 'email' 
          ? { email: signInData.email, password: signInData.password }
          : { employeeId: signInData.employeeId, password: signInData.password };
          
        const { error } = await signIn(credentials);
        if (!error) {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (signUpData.password !== signUpData.confirmPassword) {
      toast.error('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (signUpData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await signUp(signUpData);
      if (!error) {
        toast.success('Account created successfully! Check your email for verification.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await resetPassword(forgotPasswordEmail);
      if (!error) {
        setShowForgotPassword(false);
        setForgotPasswordEmail('');
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'microsoft' | 'linkedin_oidc') => {
    setIsLoading(true);
    try {
      await signInWithOAuth(provider);
    } catch (error) {
      toast.error(`Failed to sign in with ${provider}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            <p className="text-muted-foreground">Enter your email to receive a reset link</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="forgot-email">Email Address</Label>
                <Input
                  id="forgot-email"
                  type="email"
                  placeholder="Enter your email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowForgotPassword(false)}
                >
                  Back to Login
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              HR Suite
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Advanced Human Resources Management System with role-based access control and enterprise security.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-center space-x-4 p-4 bg-white/50 dark:bg-white/10 rounded-lg border border-blue-100 dark:border-blue-800">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Role-Based Access</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Master, Admin, HR, and Employee portals</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-white/50 dark:bg-white/10 rounded-lg border border-indigo-100 dark:border-indigo-800">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Enterprise Security</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">MFA, SSO, and biometric authentication</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-white/50 dark:bg-white/10 rounded-lg border border-purple-100 dark:border-purple-800">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Building2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Complete HRMS</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Payroll, attendance, leave, and analytics</p>
              </div>
            </div>
          </div>

          {/* Role Hierarchy Visualization */}
          <div className="bg-white/50 dark:bg-white/10 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Access Hierarchy</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge variant="destructive">Master</Badge>
                <span className="text-sm text-gray-600 dark:text-gray-400">Full system control & role management</span>
              </div>
              <div className="flex items-center gap-3 ml-4">
                <Badge variant="secondary">Admin</Badge>
                <span className="text-sm text-gray-600 dark:text-gray-400">Payroll, approvals, department settings</span>
              </div>
              <div className="flex items-center gap-3 ml-8">
                <Badge variant="outline">HR</Badge>
                <span className="text-sm text-gray-600 dark:text-gray-400">Employee management & reports</span>
              </div>
              <div className="flex items-center gap-3 ml-12">
                <Badge variant="default">Employee</Badge>
                <span className="text-sm text-gray-600 dark:text-gray-400">Self-service portal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <Card className="w-full max-w-md mx-auto shadow-2xl border-0">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                >
                  {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </Button>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-20">
                    <Globe className="w-4 h-4" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">EN</SelectItem>
                    <SelectItem value="es">ES</SelectItem>
                    <SelectItem value="fr">FR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <p className="text-muted-foreground text-center">
              Sign in to access your HR dashboard
            </p>
          </CardHeader>
          <CardContent>
            {/* Master Login Button */}
            <div className="mb-6">
              <Button
                onClick={handleMasterLogin}
                className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white"
                size="lg"
              >
                <Shield className="w-4 h-4 mr-2" />
                Master Login - System Administrator
              </Button>
              <p className="text-xs text-gray-500 text-center mt-2">
                Full system access with role management capabilities
              </p>
            </div>

            {/* Demo Account Buttons */}
            <div className="mb-6 space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSignInData({ ...signInData, email: 'admin@hrsuite.com', password: 'admin123' });
                    setAuthMethod('email');
                  }}
                  className="text-xs"
                >
                  Admin Demo
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSignInData({ ...signInData, email: 'hr@hrsuite.com', password: 'hr123' });
                    setAuthMethod('email');
                  }}
                  className="text-xs"
                >
                  HR Demo
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSignInData({ ...signInData, email: 'employee@hrsuite.com', password: 'emp123' });
                    setAuthMethod('email');
                  }}
                  className="text-xs"
                >
                  Employee
                </Button>
              </div>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Authentication Methods</span>
              </div>
            </div>

            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Create Account</TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-4">
                {/* Authentication Method Selector */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  <Button
                    type="button"
                    variant={authMethod === 'email' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setAuthMethod('email')}
                    className="flex flex-col items-center gap-1 h-auto py-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="text-xs">Email</span>
                  </Button>
                  <Button
                    type="button"
                    variant={authMethod === 'employeeId' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setAuthMethod('employeeId')}
                    className="flex flex-col items-center gap-1 h-auto py-2"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-xs">ID</span>
                  </Button>
                  <Button
                    type="button"
                    variant={authMethod === 'otp' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setAuthMethod('otp')}
                    className="flex flex-col items-center gap-1 h-auto py-2"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span className="text-xs">OTP</span>
                  </Button>
                  <Button
                    type="button"
                    variant={authMethod === 'biometric' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setAuthMethod('biometric')}
                    className="flex flex-col items-center gap-1 h-auto py-2"
                    disabled
                  >
                    <Fingerprint className="w-4 h-4" />
                    <span className="text-xs">Bio</span>
                  </Button>
                </div>

                <form onSubmit={handleSignIn} className="space-y-4">
                  {authMethod === 'email' && (
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email Address</Label>
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="Enter your email"
                        value={signInData.email}
                        onChange={(e) => setSignInData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  )}

                  {authMethod === 'employeeId' && (
                    <div className="space-y-2">
                      <Label htmlFor="signin-employee-id">Employee ID</Label>
                      <Input
                        id="signin-employee-id"
                        type="text"
                        placeholder="Enter your employee ID"
                        value={signInData.employeeId}
                        onChange={(e) => setSignInData(prev => ({ ...prev, employeeId: e.target.value }))}
                        required
                      />
                    </div>
                  )}

                  {authMethod === 'otp' && (
                    <div className="space-y-2">
                      <Label htmlFor="signin-phone">Phone Number</Label>
                      <Input
                        id="signin-phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={signInData.phone}
                        onChange={(e) => setSignInData(prev => ({ ...prev, phone: e.target.value }))}
                        required
                      />
                    </div>
                  )}

                  {(authMethod === 'email' || authMethod === 'employeeId') && (
                    <div className="space-y-2">
                      <Label htmlFor="signin-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="signin-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={signInData.password}
                          onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="remember-me"
                        checked={rememberMe}
                        onCheckedChange={setRememberMe}
                      />
                      <Label htmlFor="remember-me" className="text-sm">Remember me</Label>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </Button>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>

                {/* SSO Options */}
                <div className="space-y-3">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Single Sign-On</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleOAuthSignIn('google')}
                      disabled={isLoading}
                      className="flex items-center gap-2"
                    >
                      <Chrome className="w-4 h-4" />
                      Google
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleOAuthSignIn('microsoft')}
                      disabled={isLoading}
                      className="flex items-center gap-2"
                    >
                      <Building2 className="w-4 h-4" />
                      Microsoft
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleOAuthSignIn('linkedin_oidc')}
                      disabled={isLoading}
                      className="flex items-center gap-2"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-firstname">First Name</Label>
                      <Input
                        id="signup-firstname"
                        placeholder="First name"
                        value={signUpData.firstName}
                        onChange={(e) => setSignUpData(prev => ({ ...prev, firstName: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-lastname">Last Name</Label>
                      <Input
                        id="signup-lastname"
                        placeholder="Last name"
                        value={signUpData.lastName}
                        onChange={(e) => setSignUpData(prev => ({ ...prev, lastName: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email Address</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-employee-id">Employee ID</Label>
                      <Input
                        id="signup-employee-id"
                        placeholder="Employee ID"
                        value={signUpData.employeeId}
                        onChange={(e) => setSignUpData(prev => ({ ...prev, employeeId: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-department">Department</Label>
                      <Input
                        id="signup-department"
                        placeholder="Department"
                        value={signUpData.department}
                        onChange={(e) => setSignUpData(prev => ({ ...prev, department: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={signUpData.password}
                        onChange={(e) => setSignUpData(prev => ({ ...prev, password: e.target.value }))}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                    <Input
                      id="signup-confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={signUpData.confirmPassword}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModernAuth;
