
import { Users, CheckCircle, Calendar, TrendingUp, LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatItem {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export const StatsGrid = () => {
  const stats: StatItem[] = [
    { 
      title: "Total Employees", 
      value: "247", 
      change: "+12", 
      changeType: "increase",
      icon: Users, 
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    { 
      title: "Present Today", 
      value: "231", 
      change: "94%", 
      changeType: "neutral",
      icon: CheckCircle, 
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    { 
      title: "Pending Leaves", 
      value: "8", 
      change: "-3", 
      changeType: "decrease",
      icon: Calendar, 
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    { 
      title: "New Joiners", 
      value: "15", 
      change: "+5", 
      changeType: "increase",
      icon: TrendingUp, 
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-green-600' : 
                      stat.changeType === 'decrease' ? 'text-red-600' : 'text-blue-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">from last month</span>
                  </div>
                </div>
                <div className={`p-4 rounded-full ${stat.bgColor}`}>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
