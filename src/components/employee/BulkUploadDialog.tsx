
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileSpreadsheet, Download, CheckCircle, AlertTriangle, X } from "lucide-react";

interface BulkUploadDialogProps {
  open: boolean;
  onClose: () => void;
}

export const BulkUploadDialog = ({ open, onClose }: BulkUploadDialogProps) => {
  const [uploadStep, setUploadStep] = useState(1); // 1: Choose method, 2: Upload, 3: Preview
  const [uploadMethod, setUploadMethod] = useState<'excel' | 'sheets' | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleFileUpload = (files: File[]) => {
    console.log("Files uploaded:", files);
    setUploadStep(3);
  };

  const handleDownloadTemplate = () => {
    console.log("Downloading template for:", uploadMethod);
    // Implementation for downloading template
  };

  const sampleData = [
    { name: "John Doe", email: "john@company.com", department: "Engineering", position: "Developer", status: "Valid" },
    { name: "Jane Smith", email: "jane@company.com", department: "Marketing", position: "Manager", status: "Valid" },
    { name: "Bob Wilson", email: "invalid-email", department: "Sales", position: "Rep", status: "Error" },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Upload className="w-6 h-6 text-blue-600" />
            <span>Bulk Employee Upload</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Step 1: Choose Upload Method */}
          {uploadStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-gray-600 mb-6">Choose your preferred method to upload employee data</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    uploadMethod === 'excel' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setUploadMethod('excel')}
                >
                  <CardContent className="p-6 text-center">
                    <FileSpreadsheet className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Excel Upload</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Upload employee data using Excel (.xlsx) or CSV files
                    </p>
                    <div className="space-y-2 text-xs text-gray-500">
                      <p>✓ Supports .xlsx, .xls, .csv</p>
                      <p>✓ Bulk validation</p>
                      <p>✓ Error reporting</p>
                    </div>
                  </CardContent>
                </Card>

                <Card 
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    uploadMethod === 'sheets' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setUploadMethod('sheets')}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <FileSpreadsheet className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Google Sheets</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Import directly from Google Sheets with real-time sync
                    </p>
                    <div className="space-y-2 text-xs text-gray-500">
                      <p>✓ Real-time collaboration</p>
                      <p>✓ Auto-sync updates</p>
                      <p>✓ Share access control</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center space-x-4">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  onClick={() => setUploadStep(2)}
                  disabled={!uploadMethod}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Upload File */}
          {uploadStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {uploadMethod === 'excel' ? 'Upload Excel/CSV File' : 'Connect Google Sheets'}
                </h3>
                <Button variant="outline" onClick={() => setUploadStep(1)}>
                  ← Back
                </Button>
              </div>

              {uploadMethod === 'excel' && (
                <>
                  {/* File Upload Area */}
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragOver 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Drag and drop your file here
                    </h4>
                    <p className="text-gray-600 mb-4">or click to browse</p>
                    <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                      Choose File
                    </Button>
                    <input
                      id="file-upload"
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      className="hidden"
                      onChange={(e) => e.target.files && handleFileUpload(Array.from(e.target.files))}
                    />
                  </div>

                  {/* Template Download */}
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-blue-900">Need a template?</h4>
                          <p className="text-sm text-blue-700">Download our Excel template with required columns</p>
                        </div>
                        <Button 
                          variant="outline" 
                          onClick={handleDownloadTemplate}
                          className="border-blue-300 hover:bg-blue-100"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {uploadMethod === 'sheets' && (
                <Card className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <FileSpreadsheet className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Connect Your Google Sheets</h4>
                  <p className="text-gray-600 mb-6">
                    Authorize access to import employee data directly from Google Sheets
                  </p>
                  <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
                    Connect Google Sheets
                  </Button>
                </Card>
              )}
            </div>
          )}

          {/* Step 3: Preview Data */}
          {uploadStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Preview & Validate Data</h3>
                <Button variant="outline" onClick={() => setUploadStep(2)}>
                  ← Back
                </Button>
              </div>

              {/* Validation Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4 text-center">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-900">2</div>
                    <div className="text-sm text-green-700">Valid Records</div>
                  </CardContent>
                </Card>
                <Card className="bg-red-50 border-red-200">
                  <CardContent className="p-4 text-center">
                    <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-red-900">1</div>
                    <div className="text-sm text-red-700">Errors Found</div>
                  </CardContent>
                </Card>
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4 text-center">
                    <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-900">3</div>
                    <div className="text-sm text-blue-700">Total Records</div>
                  </CardContent>
                </Card>
              </div>

              {/* Data Preview Table */}
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-4">Data Preview</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th className="text-left p-2">Status</th>
                          <th className="text-left p-2">Name</th>
                          <th className="text-left p-2">Email</th>
                          <th className="text-left p-2">Department</th>
                          <th className="text-left p-2">Position</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sampleData.map((row, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="p-2">
                              {row.status === 'Valid' ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : (
                                <AlertTriangle className="w-4 h-4 text-red-600" />
                              )}
                            </td>
                            <td className="p-2 font-medium">{row.name}</td>
                            <td className="p-2">{row.email}</td>
                            <td className="p-2">{row.department}</td>
                            <td className="p-2">{row.position}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                  Import Valid Records (2)
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
