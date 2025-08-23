
import { Bell, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: string;
  priority: string;
  created_at: string;
}

interface AnnouncementsSectionProps {
  announcements: Announcement[];
}

export const AnnouncementsSection = ({ announcements }: AnnouncementsSectionProps) => {
  const handleViewAll = () => {
    console.log('Viewing all announcements...');
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Recent Announcements</span>
            </CardTitle>
            <CardDescription>Latest company updates and notifications</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleViewAll}>
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {announcements.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No announcements available</p>
            </div>
          ) : (
            announcements.map((announcement) => (
              <div 
                key={announcement.id} 
                className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{announcement.title}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        announcement.priority === 'high' ? 'border-red-200 text-red-700 bg-red-50' :
                        announcement.priority === 'medium' ? 'border-orange-200 text-orange-700 bg-orange-50' :
                        'border-gray-200 text-gray-700 bg-gray-50'
                      }`}
                    >
                      {announcement.type}
                    </Badge>
                    {announcement.priority === 'high' && (
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{announcement.content}</p>
                <p className="text-xs text-gray-400">
                  {new Date(announcement.created_at).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
