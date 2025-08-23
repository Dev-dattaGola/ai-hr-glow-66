
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Download, Search, Filter } from "lucide-react";

interface AttendanceLog {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  punchIn: string;
  punchOut: string;
  totalHours: string;
  status: 'Present' | 'Late' | 'Absent' | 'Half Day';
  location: string;
  method: string;
}

export const AttendanceLogsDialog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState("");

  // Mock data
  const logs: AttendanceLog[] = [
    {
      id: "1",
      employeeId: "EMP001",
      employeeName: "John Smith",
      date: "2024-08-04",
      punchIn: "09:00 AM",
      punchOut: "06:00 PM",
      totalHours: "8.5h",
      status: "Present",
      location: "Office - Floor 2",
      method: "Face Recognition"
    },
    {
      id: "2",
      employeeId: "EMP002",
      employeeName: "Sarah Johnson",
      date: "2024-08-04",
      punchIn: "09:15 AM",
      punchOut: "06:15 PM",
      totalHours: "8.5h",
      status: "Late",
      location: "Office - Floor 3",
      method: "QR Scan"
    },
    {
      id: "3",
      employeeId: "EMP003",
      employeeName: "Mike Chen",
      date: "2024-08-04",
      punchIn: "-",
      punchOut: "-",
      totalHours: "0h",
      status: "Absent",
      location: "-",
      method: "-"
    }
  ];

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    const matchesDate = !dateFilter || log.date === dateFilter;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const exportLogs = () => {
    // Simulate export functionality
    const csvContent = [
      ["Employee ID", "Employee Name", "Date", "Punch In", "Punch Out", "Total Hours", "Status", "Location", "Method"],
      ...filteredLogs.map(log => [
        log.employeeId, log.employeeName, log.date, log.punchIn, log.punchOut, 
        log.totalHours, log.status, log.location, log.method
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "attendance_logs.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'Present': 'bg-green-100 text-green-800',
      'Late': 'bg-orange-100 text-orange-800',
      'Absent': 'bg-red-100 text-red-800',
      'Half Day': 'bg-blue-100 text-blue-800'
    };
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <TrendingUp className="w-4 h-4 mr-2" />
          View Logs
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <span>Attendance Logs</span>
            </span>
            <Button onClick={exportLogs} size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search employee..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-48"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Present">Present</SelectItem>
              <SelectItem value="Late">Late</SelectItem>
              <SelectItem value="Absent">Absent</SelectItem>
              <SelectItem value="Half Day">Half Day</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-40"
          />
        </div>

        {/* Logs Table */}
        <div className="overflow-auto max-h-96">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Punch In</TableHead>
                <TableHead>Punch Out</TableHead>
                <TableHead>Total Hours</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div>
                      <div className="font-semibold">{log.employeeName}</div>
                      <div className="text-sm text-gray-600">{log.employeeId}</div>
                    </div>
                  </TableCell>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>{log.punchIn}</TableCell>
                  <TableCell>{log.punchOut}</TableCell>
                  <TableCell className="font-semibold">{log.totalHours}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(log.status)}>
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.method}</TableCell>
                  <TableCell>{log.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No attendance logs found matching your criteria.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
