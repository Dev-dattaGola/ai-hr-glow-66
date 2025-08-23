
import { Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const AIInsightsBanner = () => {
  const handleViewAnalysis = () => {
    // Navigate to analytics or show detailed insights
    console.log('Viewing full AI analysis...');
  };

  return (
    <Card className="mb-8 bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 border-indigo-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-indigo-600" />
            <CardTitle className="text-indigo-900">AI Insights Dashboard</CardTitle>
          </div>
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700" onClick={handleViewAnalysis}>
            View Full Analysis
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">87%</div>
            <div className="text-sm text-gray-600">Employee Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">15</div>
            <div className="text-sm text-gray-600">Automation Suggestions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">$12K</div>
            <div className="text-sm text-gray-600">Potential Monthly Savings</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
