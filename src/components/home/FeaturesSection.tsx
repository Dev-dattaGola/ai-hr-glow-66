
import { 
  Users, Calendar, TrendingUp, FileText, DollarSign, BookOpen, 
  Shield, MessageSquare, BarChart3, Clock, Award, Settings,
  Brain, Zap, Target, Globe
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const FeaturesSection = () => {
  const features = [
    {
      icon: Users,
      title: "Employee Management",
      description: "Comprehensive employee profiles, onboarding workflows, and organizational charts with AI-powered insights.",
      features: ["Digital Employee Profiles", "Automated Onboarding", "Org Chart Visualization", "Role-Based Access"],
      color: "blue",
      badge: "Core"
    },
    {
      icon: Calendar,
      title: "Attendance & Leave",
      description: "Smart attendance tracking with biometric integration, leave management, and automated approval workflows.",
      features: ["Biometric Integration", "GPS Tracking", "Leave Automation", "Holiday Management"],
      color: "green",
      badge: "Essential"
    },
    {
      icon: DollarSign,
      title: "Payroll Management",
      description: "Automated payroll processing, tax calculations, compliance reporting, and direct deposit integration.",
      features: ["Automated Processing", "Tax Compliance", "Multi-Currency Support", "Direct Deposits"],
      color: "emerald",
      badge: "Premium"
    },
    {
      icon: TrendingUp,
      title: "Performance Management",
      description: "360-degree reviews, goal tracking, performance analytics, and continuous feedback systems.",
      features: ["360° Reviews", "Goal Tracking", "Performance Analytics", "Peer Feedback"],
      color: "purple",
      badge: "Advanced"
    },
    {
      icon: BookOpen,
      title: "Training & Development",
      description: "Learning management system, skill assessments, certification tracking, and career development paths.",
      features: ["LMS Integration", "Skill Assessments", "Certification Tracking", "Career Paths"],
      color: "orange",
      badge: "Growth"
    },
    {
      icon: BarChart3,
      title: "AI Analytics & Reports",
      description: "Advanced analytics, predictive insights, custom dashboards, and automated reporting with AI.",
      features: ["Predictive Analytics", "Custom Dashboards", "Automated Reports", "Data Visualization"],
      color: "indigo",
      badge: "AI-Powered"
    },
    {
      icon: MessageSquare,
      title: "AI Helpdesk Chatbot",
      description: "24/7 AI-powered support, instant query resolution, multi-language support, and smart ticketing.",
      features: ["24/7 AI Support", "Multi-Language", "Smart Ticketing", "Knowledge Base"],
      color: "cyan",
      badge: "AI"
    },
    {
      icon: FileText,
      title: "Document Management",
      description: "Digital document storage, e-signatures, compliance tracking, and automated document generation.",
      features: ["Digital Storage", "E-Signatures", "Version Control", "Auto-Generation"],
      color: "slate",
      badge: "Digital"
    },
    {
      icon: Shield,
      title: "Compliance & Security",
      description: "Regulatory compliance, audit trails, data protection, and enterprise-grade security measures.",
      features: ["GDPR Compliance", "Audit Trails", "Data Encryption", "Access Controls"],
      color: "red",
      badge: "Security"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "text-blue-600 bg-blue-100",
      green: "text-green-600 bg-green-100",
      emerald: "text-emerald-600 bg-emerald-100",
      purple: "text-purple-600 bg-purple-100",
      orange: "text-orange-600 bg-orange-100",
      indigo: "text-indigo-600 bg-indigo-100",
      cyan: "text-cyan-600 bg-cyan-100",
      slate: "text-slate-600 bg-slate-100",
      red: "text-red-600 bg-red-100"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getBadgeColor = (badge: string) => {
    const badgeColors = {
      "Core": "bg-blue-100 text-blue-800",
      "Essential": "bg-green-100 text-green-800",
      "Premium": "bg-emerald-100 text-emerald-800",
      "Advanced": "bg-purple-100 text-purple-800",
      "Growth": "bg-orange-100 text-orange-800",
      "AI-Powered": "bg-indigo-100 text-indigo-800",
      "AI": "bg-cyan-100 text-cyan-800",
      "Digital": "bg-slate-100 text-slate-800",
      "Security": "bg-red-100 text-red-800"
    };
    return badgeColors[badge as keyof typeof badgeColors] || badgeColors.Core;
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm mb-6">
            <Brain className="w-4 h-4" />
            <span>Complete HR Solution</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need for{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Modern HR
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform combines traditional HR management with cutting-edge AI technology 
            to deliver unprecedented efficiency and insights.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="h-full hover:shadow-xl transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${getColorClasses(feature.color)}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant="outline" className={getBadgeColor(feature.badge)}>
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* AI Features Highlight */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powered by Advanced AI
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our artificial intelligence capabilities set us apart from traditional HR systems
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-4 bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
                <Zap className="w-8 h-8 text-yellow-500" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Intelligent Automation</h4>
              <p className="text-gray-600">
                Automate repetitive tasks, approvals, and workflows with smart AI decision-making
              </p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
                <Target className="w-8 h-8 text-green-500" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Predictive Insights</h4>
              <p className="text-gray-600">
                Forecast employee turnover, performance trends, and resource needs with ML models
              </p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
                <Globe className="w-8 h-8 text-blue-500" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Natural Language Processing</h4>
              <p className="text-gray-600">
                Interact with your HR system using natural language queries and commands
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
