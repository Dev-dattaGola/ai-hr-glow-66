
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  QrCode, 
  Camera, 
  Fingerprint, 
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PunchRecord {
  id: string;
  type: 'in' | 'out';
  method: string;
  time: string;
  location: string;
  status: 'success' | 'warning' | 'error';
}

export const PunchInOut = () => {
  const [currentStatus, setCurrentStatus] = useState<'out' | 'in'>('out');
  const [isProcessing, setIsProcessing] = useState(false);
  const [recentPunches, setRecentPunches] = useState<PunchRecord[]>([]);

  const handlePunch = async (method: string) => {
    setIsProcessing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newPunch: PunchRecord = {
      id: Date.now().toString(),
      type: currentStatus === 'out' ? 'in' : 'out',
      method,
      time: new Date().toLocaleTimeString(),
      location: method === 'Geo-fencing' ? 'Office - Floor 3' : 'Main Entrance',
      status: 'success'
    };
    
    setRecentPunches(prev => [newPunch, ...prev.slice(0, 4)]);
    setCurrentStatus(currentStatus === 'out' ? 'in' : 'out');
    setIsProcessing(false);
    
    toast({
      title: `Punch ${newPunch.type.toUpperCase()} Successful`,
      description: `${method} at ${newPunch.time}`,
    });
  };

  const PunchButton = ({ method, icon: Icon, description }: { method: string; icon: any; description: string }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="h-24 flex flex-col items-center space-y-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
          disabled={isProcessing}
        >
          <Icon className="w-8 h-8 text-blue-600" />
          <span className="text-sm font-medium">{method}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Icon className="w-6 h-6 text-blue-600" />
            <span>Punch {currentStatus === 'out' ? 'IN' : 'OUT'} - {method}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <Icon className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <p className="text-gray-700 mb-4">{description}</p>
            <div className="text-sm text-gray-500 mb-4">
              Current Time: {new Date().toLocaleTimeString()}
            </div>
            {isProcessing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span>Processing...</span>
              </div>
            ) : (
              <Button 
                onClick={() => handlePunch(method)}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Confirm Punch {currentStatus === 'out' ? 'IN' : 'OUT'}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-blue-900">Current Status</span>
            <Badge className={currentStatus === 'in' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
              {currentStatus === 'in' ? 'PUNCHED IN' : 'PUNCHED OUT'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className={`w-4 h-4 rounded-full ${currentStatus === 'in' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
            <span className="text-lg font-semibold">
              {currentStatus === 'in' ? 'You are currently at work' : 'Ready to punch in'}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Punch Options */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-900">Multiple Punch Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <PunchButton 
              method="QR Scan" 
              icon={QrCode} 
              description="Scan the QR code at your workstation to punch in/out"
            />
            <PunchButton 
              method="Face Recognition" 
              icon={Camera} 
              description="Use facial recognition for contactless punch in/out"
            />
            <PunchButton 
              method="Biometric" 
              icon={Fingerprint} 
              description="Place your finger on the scanner for secure authentication"
            />
            <PunchButton 
              method="Geo-fencing" 
              icon={MapPin} 
              description="Automatic punch based on your location within office premises"
            />
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      {recentPunches.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Recent Punch Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPunches.map((punch) => (
                <div key={punch.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {punch.status === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-orange-500" />
                    )}
                    <div>
                      <p className="font-semibold">{punch.method}</p>
                      <p className="text-sm text-gray-600">{punch.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{punch.time}</p>
                    <Badge className={
                      punch.type === 'in' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }>
                      Punch {punch.type.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
