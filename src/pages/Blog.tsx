
import { ArrowLeft, Calendar, Clock, User, ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Blog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const featuredPost = {
    title: "The Future of AI in Human Resources: 2024 Trends and Predictions",
    excerpt: "Discover how artificial intelligence is reshaping HR practices and what to expect in the coming year. From automated recruiting to predictive analytics, explore the technologies that are transforming the workplace.",
    author: "Priya Sharma",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "AI & Technology",
    image: "🤖"
  };

  const blogPosts = [
    {
      title: "10 Best Practices for Remote Employee Onboarding",
      excerpt: "Learn how to create an effective onboarding experience for remote employees that builds engagement from day one.",
      author: "Rajesh Kumar",
      date: "2024-01-10",
      readTime: "5 min read",
      category: "Remote Work"
    },
    {
      title: "Understanding Employee Engagement Metrics That Matter",
      excerpt: "Dive deep into the key metrics that actually indicate employee satisfaction and how to track them effectively.",
      author: "Neha Gupta", 
      date: "2024-01-08",
      readTime: "6 min read",
      category: "Analytics"
    },
    {
      title: "Compliance Made Simple: A Guide to HR Regulations",
      excerpt: "Navigate the complex world of HR compliance with our comprehensive guide to essential regulations and best practices.",
      author: "Amit Singh",
      date: "2024-01-05",
      readTime: "7 min read",
      category: "Compliance"
    },
    {
      title: "The ROI of Investing in HR Technology",
      excerpt: "Calculate the real return on investment when implementing modern HR technology solutions in your organization.",
      author: "Priya Sharma",
      date: "2024-01-03",
      readTime: "4 min read",
      category: "ROI"
    },
    {
      title: "Building a Data-Driven Performance Management System",
      excerpt: "Transform your performance reviews with data-driven insights and objective evaluation criteria.",
      author: "Neha Gupta",
      date: "2023-12-28",
      readTime: "6 min read",
      category: "Performance"
    },
    {
      title: "Streamlining Payroll: Common Challenges and Solutions",
      excerpt: "Address the most common payroll challenges and discover practical solutions to streamline your payroll process.",
      author: "Rajesh Kumar",
      date: "2023-12-25",
      readTime: "5 min read",
      category: "Payroll"
    }
  ];

  const categories = [
    "All Posts",
    "AI & Technology", 
    "Remote Work",
    "Analytics",
    "Compliance",
    "Performance",
    "Payroll",
    "ROI"
  ];

  const [selectedCategory, setSelectedCategory] = useState("All Posts");

  const filteredPosts = selectedCategory === "All Posts" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

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
              HR Suite Blog
            </h1>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            HR{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Insights
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Stay ahead of HR trends with expert insights, best practices, and actionable advice 
            to transform your workplace.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg"
            />
          </div>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Article</h2>
          <Card className="overflow-hidden hover:shadow-xl transition-shadow">
            <div className="md:flex">
              <div className="md:w-1/3 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-6xl p-12">
                {featuredPost.image}
              </div>
              <div className="md:w-2/3 p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {featuredPost.category}
                  </Badge>
                  <div className="flex items-center text-gray-500 text-sm space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{featuredPost.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{featuredPost.excerpt}</p>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-gradient-to-r from-blue-600 to-indigo-600" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPosts.map((post, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {post.category}
                  </Badge>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight hover:text-blue-600 transition-colors cursor-pointer">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 text-xs space-x-3">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get the latest HR insights, tips, and best practices delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1"
            />
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Subscribe
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blog;
