
import { ArrowLeft, MapPin, Clock, Users, Briefcase, Heart, Zap, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const Careers = () => {
  const navigate = useNavigate();

  const jobs = [
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Noida, India",
      type: "Full-time",
      experience: "3-5 years",
      description: "Join our engineering team to build beautiful, responsive user interfaces using React and TypeScript."
    },
    {
      title: "AI/ML Engineer",
      department: "AI Research",
      location: "Remote",
      type: "Full-time", 
      experience: "2-4 years",
      description: "Help us build the next generation of AI-powered HR solutions using machine learning and natural language processing."
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Noida, India",
      type: "Full-time",
      experience: "4-6 years",
      description: "Lead product strategy and roadmap for our core HR management platform, working closely with engineering and design."
    },
    {
      title: "HR Business Partner",
      department: "People Operations",
      location: "Hybrid",
      type: "Full-time",
      experience: "5-8 years",
      description: "Partner with leadership to develop HR strategies that support business objectives and employee growth."
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "3-5 years",
      description: "Build and maintain scalable infrastructure to support our growing platform and ensure high availability."
    },
    {
      title: "Sales Development Representative",
      department: "Sales",
      location: "Noida, India",
      type: "Full-time",
      experience: "1-3 years",
      description: "Generate qualified leads and build relationships with potential customers in the HR technology space."
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive medical, dental, and vision insurance plus wellness programs"
    },
    {
      icon: Zap,
      title: "Learning & Growth",
      description: "Annual learning budget, conference attendance, and mentorship programs"
    },
    {
      icon: Users,
      title: "Work-Life Balance",
      description: "Flexible working hours, remote options, and unlimited PTO policy"
    },
    {
      icon: Award,
      title: "Equity & Rewards",
      description: "Competitive salary, equity participation, and performance bonuses"
    }
  ];

  const values = [
    {
      title: "Innovation First",
      description: "We're always pushing boundaries and exploring new ways to solve HR challenges."
    },
    {
      title: "People Matter",
      description: "Every decision we make considers the human impact and employee experience."
    },
    {
      title: "Transparency",
      description: "We believe in open communication, honest feedback, and shared success."
    },
    {
      title: "Excellence",
      description: "We set high standards for ourselves and continuously strive to exceed them."
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
              HR Suite Careers
            </h1>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Join Our{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Mission
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Help us transform how organizations manage their people. Join a team of passionate 
            individuals building the future of HR technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              View Open Positions
            </Button>
            <Button size="lg" variant="outline">
              Learn About Our Culture
            </Button>
          </div>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
            <div className="text-gray-600">Team Members</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-indigo-600 mb-2">25+</div>
            <div className="text-gray-600">Countries</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 mb-2">4.8</div>
            <div className="text-gray-600">Glassdoor Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
            <div className="text-gray-600">Employee Satisfaction</div>
          </div>
        </div>

        {/* Why Work With Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Work With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="text-center p-6">
                  <CardHeader>
                    <div className="p-3 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="p-6">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Open Positions</h2>
          <div className="space-y-6">
            {jobs.map((job, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                      <CardDescription className="mb-4">{job.description}</CardDescription>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Briefcase className="w-4 h-4" />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{job.experience}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <Button className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Application Process */}
        <div className="bg-white rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Hiring Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Application</h3>
              <p className="text-gray-600 text-sm">Submit your application and we'll review it within 2-3 business days.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">Phone Screen</h3>
              <p className="text-gray-600 text-sm">A brief conversation with our recruiting team to learn more about you.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Technical Interview</h3>
              <p className="text-gray-600 text-sm">Meet with the team to discuss your skills and experience in depth.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">4</span>
              </div>
              <h3 className="font-semibold mb-2">Final Interview</h3>
              <p className="text-gray-600 text-sm">Cultural fit and leadership interviews to ensure mutual alignment.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Join Us?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Don't see a role that fits? We're always looking for talented individuals. 
            Send us your resume and let us know how you'd like to contribute.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              Send General Application
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/contact')}>
              Contact HR Team
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Careers;
