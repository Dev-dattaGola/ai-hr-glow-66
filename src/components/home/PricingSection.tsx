
import { Check, Star, Zap, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PricingSectionProps {
  onGetStarted: () => void;
}

export const PricingSection = ({ onGetStarted }: PricingSectionProps) => {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for small teams getting started",
      price: "$9",
      period: "per employee/month",
      icon: Star,
      badge: null,
      features: [
        "Employee Management",
        "Basic Attendance Tracking",
        "Leave Management",
        "Basic Reports",
        "Email Support",
        "Up to 50 employees"
      ],
      limitations: [
        "Limited integrations",
        "Basic analytics"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Professional",
      description: "Most popular for growing companies",
      price: "$19",
      period: "per employee/month",
      icon: Zap,
      badge: "Most Popular",
      features: [
        "Everything in Starter",
        "Advanced Analytics",
        "Payroll Management",
        "Performance Management",
        "AI Insights",
        "API Access",
        "Priority Support",
        "Up to 500 employees"
      ],
      limitations: [],
      buttonText: "Start Free Trial",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      name: "Enterprise",
      description: "Advanced features for large organizations",
      price: "Custom",
      period: "contact for pricing",
      icon: Crown,
      badge: "Advanced",
      features: [
        "Everything in Professional",
        "Custom Integrations",
        "Advanced AI Features",
        "Dedicated Account Manager",
        "Custom Training",
        "SLA Guarantee",
        "24/7 Phone Support",
        "Unlimited employees"
      ],
      limitations: [],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      popular: false
    }
  ];

  const features = [
    "30-day free trial",
    "No setup fees",
    "Cancel anytime",
    "Data migration included",
    "Training & onboarding",
    "99.9% uptime SLA"
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm mb-6">
            <Crown className="w-4 h-4" />
            <span>Simple, Transparent Pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose the Perfect{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Plan for You
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            All plans include our core HR features. Upgrade anytime as your business grows.
          </p>

          {/* Key Features */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                <Check className="w-3 h-3" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <Card 
                key={index} 
                className={`relative h-full ${
                  plan.popular 
                    ? 'ring-2 ring-blue-500 shadow-2xl scale-105' 
                    : 'hover:shadow-xl transition-all duration-300'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className={`p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-100 to-indigo-100' 
                      : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-8 h-8 ${
                      plan.popular ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      {plan.price !== "Custom" && (
                        <span className="text-gray-500 ml-1">/month</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{plan.period}</p>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <Button 
                    className={`w-full mb-6 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                        : ''
                    }`}
                    variant={plan.buttonVariant}
                    size="lg"
                    onClick={onGetStarted}
                  >
                    {plan.buttonText}
                  </Button>

                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                    
                    {plan.limitations.map((limitation, idx) => (
                      <div key={idx} className="flex items-start space-x-3 opacity-60">
                        <div className="w-5 h-5 mt-0.5 flex-shrink-0 flex items-center justify-center">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        </div>
                        <span className="text-gray-500 text-sm">{limitation}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Can I change plans anytime?</h4>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Is there a setup fee?</h4>
              <p className="text-gray-600">No, there are no setup fees or hidden costs. You only pay for what you use.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">What about data migration?</h4>
              <p className="text-gray-600">We provide free data migration from your existing system as part of our onboarding process.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Do you offer discounts for nonprofits?</h4>
              <p className="text-gray-600">Yes, we offer special pricing for nonprofits and educational institutions. Contact us for details.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
