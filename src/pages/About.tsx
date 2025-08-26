import { ArrowLeft, Users, Target, Award, Globe, Heart, Lightbulb, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Heart,
      title: "People First",
      description: "We believe that great technology should serve people, not the other way around. Every feature we build puts human needs at the center."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We're constantly pushing the boundaries of what's possible in HR technology, leveraging AI to solve real-world problems."
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Your data is precious. We maintain the highest standards of security and privacy to protect your organization's information."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "We're building solutions that work for organizations of all sizes, from startups to enterprises, across the globe."
    }
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "CEO & Founder",
      description: "15+ years in HR technology with a vision to revolutionize workplace management through AI."
    },
    {
      name: "Priya Sharma",
      role: "CTO",
      description: "Former Google engineer passionate about building scalable, secure, and intelligent HR solutions."
    },
    {
      name: "Amit Singh",
      role: "Head of Product",
      description: "Product strategist with deep understanding of HR workflows and user experience design."
    },
    {
      name: "Neha Gupta",
      role: "Head of AI",
      description: "PhD in Machine Learning, leading our AI initiatives to make HR processes smarter and more efficient."
    }
  ];

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
              HR Suite
            </h1>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              HR Suite
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We're on a mission to transform how organizations manage their most valuable asset - their people. 
            Through cutting-edge AI technology and intuitive design, we're making HR management more efficient, 
            insightful, and human.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8">
            <CardHeader>
              <div className="p-3 bg-blue-100 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                To empower organizations worldwide with intelligent HR solutions that streamline processes, 
                enhance employee experiences, and drive business success through data-driven insights and 
                automated workflows.
              </p>
            </CardContent>
          </Card>

          <Card className="p-8">
            <CardHeader>
              <div className="p-3 bg-indigo-100 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-indigo-600" />
              </div>
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                To be the global leader in AI-powered HR technology, creating a future where every workplace 
                is more productive, inclusive, and fulfilling for both employers and employees through 
                innovative technology solutions.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Company Stats */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Companies Trust Us</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">500K+</div>
              <div className="text-gray-600">Employees Managed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime SLA</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Countries Served</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Transform Your HR?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of companies already using HR Suite to streamline their HR processes 
            and make data-driven decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/auth')} 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              Start Free Trial
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/contact')}
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
