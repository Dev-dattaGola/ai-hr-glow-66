
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "HR Director",
      company: "TechFlow Inc.",
      avatar: "",
      rating: 5,
      content: "HR Suite has completely transformed our HR operations. The AI-powered insights have helped us reduce employee turnover by 40% and streamline our hiring process. The platform is intuitive and the support team is exceptional."
    },
    {
      name: "Michael Chen",
      role: "Chief Operating Officer",
      company: "GlobalCorp",
      avatar: "",
      rating: 5,
      content: "We've been using HR Suite for 2 years now, and it's been a game-changer. The automated payroll and compliance features alone have saved us countless hours. The ROI has been incredible - we saw results within the first month."
    },
    {
      name: "Emily Rodriguez",
      role: "People Operations Manager",
      company: "StartupXYZ",
      avatar: "",
      rating: 5,
      content: "As a growing startup, we needed an HR solution that could scale with us. HR Suite's flexibility and comprehensive feature set have been perfect. The AI chatbot handles 80% of employee queries automatically."
    },
    {
      name: "David Thompson",
      role: "CHRO",
      company: "Enterprise Solutions",
      avatar: "",
      rating: 5,
      content: "The analytics and reporting capabilities are outstanding. We now have real-time visibility into our workforce metrics, and the predictive analytics help us make proactive decisions. Security and compliance features are top-notch."
    },
    {
      name: "Lisa Park",
      role: "HR Business Partner",
      company: "Innovation Labs",
      avatar: "",
      rating: 5,
      content: "Implementation was smooth, and the training was comprehensive. Our team adopted the platform quickly, and we've seen significant improvements in employee satisfaction and operational efficiency. Highly recommended!"
    },
    {
      name: "Robert Kim",
      role: "VP of Human Resources",
      company: "Manufacturing Plus",
      avatar: "",
      rating: 5,
      content: "HR Suite has modernized our entire HR department. The mobile app keeps our field workers connected, and the performance management tools have improved our review process dramatically. Worth every penny."
    }
  ];

  const stats = [
    { value: "98%", label: "Customer Satisfaction" },
    { value: "4.9/5", label: "Average Rating" },
    { value: "10,000+", label: "Happy Customers" },
    { value: "99.9%", label: "System Uptime" }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm mb-6">
            <Star className="w-4 h-4 fill-current" />
            <span>Trusted by Thousands</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our Customers{' '}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Are Saying
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. See how HR Suite has transformed businesses 
            across industries and company sizes.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                {/* Quote icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-blue-600/20" />
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-gray-500">{testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Join Thousands of Satisfied Customers
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Start your free trial today and see why businesses choose HR Suite for their HR needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                Start Free Trial
              </button>
              <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
