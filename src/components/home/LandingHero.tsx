
import { Button } from '@/components/ui/button';
import { Shield, LogIn, Star, Users, TrendingUp, Award, Sparkles, ArrowRight } from 'lucide-react';

interface LandingHeroProps {
  onLogin: () => void;
  onAccessPortal: () => void;
}

export const LandingHero = ({ onLogin, onAccessPortal }: LandingHeroProps) => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Trust indicators */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 mb-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-blue-500" />
              <span>10,000+ Companies</span>
            </div>
            <div className="flex items-center space-x-1">
              <Award className="w-4 h-4 text-purple-500" />
              <span>ISO 27001 Certified</span>
            </div>
          </div>
        </div>

        {/* Main hero content */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Now with Advanced AI Analytics</span>
            <ArrowRight className="w-4 h-4" />
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Your{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              HR Management
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Experience the future of human resources with our AI-powered platform. 
            Streamline processes, enhance productivity, and make data-driven decisions 
            with the most comprehensive HR suite available.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={onAccessPortal} 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-4 text-lg"
            >
              <Shield className="w-5 h-5 mr-2" />
              Start Free Trial
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={onLogin}
              className="border-2 border-blue-200 hover:bg-blue-50 px-8 py-4 text-lg"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Sign In
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">50%</div>
              <div className="text-sm text-gray-600">Time Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">ROI</div>
              <div className="text-sm text-gray-600">300%+ Return</div>
            </div>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Users className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Smart Employee Management</h3>
            <p className="text-gray-600 leading-relaxed">
              AI-powered employee profiles, automated attendance tracking, performance monitoring, 
              and predictive analytics for workforce optimization.
            </p>
          </div>

          <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="p-4 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <TrendingUp className="w-10 h-10 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">AI-Driven Analytics</h3>
            <p className="text-gray-600 leading-relaxed">
              Advanced machine learning algorithms provide intelligent insights, predictive analytics, 
              automated reporting, and data-driven recommendations.
            </p>
          </div>

          <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Shield className="w-10 h-10 text-purple-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Enterprise Security</h3>
            <p className="text-gray-600 leading-relaxed">
              Bank-grade security with end-to-end encryption, compliance management, 
              audit trails, and SOC 2 Type II certification.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
