
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Plus, Calendar, User } from "lucide-react";
import { useAnnouncements } from "@/hooks/useAnnouncements";

const AnnouncementsSection = () => {
  const { data: announcements = [], isLoading } = useAnnouncements();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Announcements</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Loading announcements...</p>
        </CardContent>
      </Card>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center space-x-2">
          <Bell className="w-5 h-5" />
          <span>Announcements</span>
        </CardTitle>
        <Button size="sm" variant="outline">
          <Plus className="w-4 h-4 mr-1" />
          Add New
        </Button>
      </CardHeader>
      <CardContent>
        {announcements.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No announcements available</p>
        ) : (
          <div className="space-y-4">
            {announcements.slice(0, 3).map((announcement) => (
              <div
                key={announcement.id}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getPriorityColor(announcement.priority)}>
                    {announcement.priority} priority
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {new Date(announcement.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  {announcement.title}
                </h4>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {announcement.content}
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {announcement.type}
                  </Badge>
                  <Button size="sm" variant="ghost">
                    Read More
                  </Button>
                </div>
              </div>
            ))}
            {announcements.length > 3 && (
              <Button variant="outline" className="w-full">
                View All Announcements ({announcements.length})
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnnouncementsSection;
