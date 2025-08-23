
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const ManualEntryDialog = () => {
  const [formData, setFormData] = useState({
    employeeId: "",
    date: "",
    punchInTime: "",
    punchOutTime: "",
    reason: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.employeeId || !formData.date || !formData.punchInTime) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Process manual entry
    toast({
      title: "Manual Entry Submitted",
      description: "The attendance record has been submitted for approval.",
    });

    // Reset form
    setFormData({
      employeeId: "",
      date: "",
      punchInTime: "",
      punchOutTime: "",
      reason: "",
      notes: ""
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Calendar className="w-4 h-4 mr-2" />
          Manual Entry
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Clock className="w-6 h-6 text-blue-600" />
            <span>Manual Attendance Entry</span>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="employeeId">Employee ID *</Label>
            <Input
              id="employeeId"
              value={formData.employeeId}
              onChange={(e) => setFormData(prev => ({ ...prev, employeeId: e.target.value }))}
              placeholder="Enter employee ID"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date *</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="punchInTime">Punch In Time *</Label>
              <Input
                id="punchInTime"
                type="time"
                value={formData.punchInTime}
                onChange={(e) => setFormData(prev => ({ ...prev, punchInTime: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="punchOutTime">Punch Out Time</Label>
              <Input
                id="punchOutTime"
                type="time"
                value={formData.punchOutTime}
                onChange={(e) => setFormData(prev => ({ ...prev, punchOutTime: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Select value={formData.reason} onValueChange={(value) => setFormData(prev => ({ ...prev, reason: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select reason for manual entry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="forgot-to-punch">Forgot to punch</SelectItem>
                <SelectItem value="system-issue">System issue</SelectItem>
                <SelectItem value="meeting-outside">Meeting outside office</SelectItem>
                <SelectItem value="network-problem">Network problem</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Any additional information..."
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full">
            Submit Manual Entry
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
