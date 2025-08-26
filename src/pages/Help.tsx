
import { ArrowLeft, Search, Book, Video, MessageCircle, FileText, Users, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Help = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      icon: Users,
      title: "Getting Started",
      description: "Learn the basics of HR Suite",
      articles: [
        "Setting up your account",
        "Inviting team members", 
        "Basic navigation guide",
        "First-time setup checklist"
      ]
    },
    {
      icon: Book,
      title: "Employee Management",
      description: "Manage your workforce effectively",
      articles: [
        "Adding new employees",
        "Employee profiles and information",
        "Organizational charts",
        "Bulk import employees"
      ]
    },
    {
      icon: FileText,
      title: "Attendance & Leave",
      description: "Track time and manage leave requests",
      articles: [
        "Setting up attendance policies",
        "Leave request workflow",
        "Time tracking features",
        "Attendance reports"
      ]
    },
    {
      icon: Wrench,
      title: "Advanced Features",
      description: "Make the most of HR Suite's capabilities",
      articles: [
        "AI analytics and insights",
        "Custom workflows",
        "Integration setup",
        "API documentation"
      ]
    }
  ];

  const popularArticles = [
    "How to set up your first employee",
    "Understanding attendance policies", 
    "Setting up leave types and policies",
    "Generating payroll reports",
    "Using AI insights for better decisions",
    "Troubleshooting login issues"
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" onClick={() => navigate('/')} className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              HR Suite Help Center
            </h1>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            How can we{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              help you?
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Find answers to your questions, learn how to use HR Suite effectively, and get the most 
            out of our platform with our comprehensive help resources.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for articles, guides, and tutorials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500"
              />
              <Button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-600"
              >
                Search
              </Button>
            </div>
          </form>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="p-3 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Video className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle>Video Tutorials</CardTitle>
              <CardDescription>Step-by-step video guides</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="p-3 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle>Live Chat Support</CardTitle>
              <CardDescription>Get instant help from our team</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="p-3 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Book className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle>Documentation</CardTitle>
              <CardDescription>Complete platform documentation</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Help Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{category.title}</CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.articles.map((article, idx) => (
                        <li key={idx}>
                          <a href="#" className="text-blue-600 hover:underline text-sm">
                            {article}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Popular Articles */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Popular Articles</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {popularArticles.map((article, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <FileText className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                    {article}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still need help?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to help you get the most 
            out of HR Suite.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/contact')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
            <Button size="lg" variant="outline">
              <Video className="w-4 h-4 mr-2" />
              Schedule a Demo
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Help;
