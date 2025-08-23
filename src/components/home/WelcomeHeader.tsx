
import { Activity } from 'lucide-react';

interface WelcomeHeaderProps {
  firstName?: string;
}

export const WelcomeHeader = ({ firstName }: WelcomeHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome back, {firstName || 'User'}!
          </h2>
          <p className="text-gray-600 mt-2 flex items-center space-x-2">
            <Activity className="w-4 h-4" />
            <span>Here's your HR dashboard overview for today.</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <p className="text-xs text-gray-400">
            {new Date().toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        </div>
      </div>
    </div>
  );
};
