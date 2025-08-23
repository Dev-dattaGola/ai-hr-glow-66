
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  FileText, 
  Trash2, 
  Download, 
  AlertCircle,
  CheckCircle,
  X
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  status: 'uploaded' | 'pending' | 'error';
  file?: File;
}

interface DocumentUploadProps {
  employeeId?: number;
  existingDocuments?: Document[];
  onDocumentsChange?: (documents: Document[]) => void;
}

export const DocumentUpload = ({ 
  employeeId, 
  existingDocuments = [], 
  onDocumentsChange 
}: DocumentUploadProps) => {
  const [documents, setDocuments] = useState<Document[]>(existingDocuments);
  const [uploadingFiles, setUploadingFiles] = useState<string[]>([]);

  const documentTypes = [
    'Resume/CV',
    'ID Copy',
    'Tax Forms',
    'Bank Details',
    'Emergency Contact',
    'Profile Photo',
    'Passport',
    'Visa/Work Permit',
    'Educational Certificates',
    'Medical Certificate',
    'Background Check',
    'Contract Agreement',
    'Other'
  ];

  const handleFileUpload = async (files: FileList | null, docType: string) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please select a file smaller than 10MB",
        variant: "destructive"
      });
      return;
    }

    const documentId = Date.now().toString();
    const newDocument: Document = {
      id: documentId,
      name: file.name,
      type: docType,
      size: file.size,
      uploadDate: new Date().toISOString(),
      status: 'pending',
      file
    };

    const updatedDocuments = [...documents, newDocument];
    setDocuments(updatedDocuments);
    setUploadingFiles(prev => [...prev, documentId]);

    try {
      // Simulate file upload - replace with actual upload logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update document status to uploaded
      const finalDocuments = updatedDocuments.map(doc => 
        doc.id === documentId ? { ...doc, status: 'uploaded' as const } : doc
      );
      
      setDocuments(finalDocuments);
      onDocumentsChange?.(finalDocuments);
      
      toast({
        title: "Document uploaded",
        description: `${file.name} has been uploaded successfully`
      });
    } catch (error) {
      // Update document status to error
      const errorDocuments = updatedDocuments.map(doc => 
        doc.id === documentId ? { ...doc, status: 'error' as const } : doc
      );
      
      setDocuments(errorDocuments);
      onDocumentsChange?.(errorDocuments);
      
      toast({
        title: "Upload failed",
        description: "Failed to upload document. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploadingFiles(prev => prev.filter(id => id !== documentId));
    }
  };

  const handleDeleteDocument = (documentId: string) => {
    const updatedDocuments = documents.filter(doc => doc.id !== documentId);
    setDocuments(updatedDocuments);
    onDocumentsChange?.(updatedDocuments);
    
    toast({
      title: "Document deleted",
      description: "Document has been removed successfully"
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'uploaded':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>;
    }
  };

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'uploaded':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
        <CardTitle className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-purple-600" />
          <span>Document Upload</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Upload Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {documentTypes.map((docType) => (
            <div key={docType} className="border border-dashed border-gray-300 rounded-lg p-4 hover:border-purple-400 transition-colors">
              <div className="text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  {docType}
                </Label>
                <Input
                  type="file"
                  onChange={(e) => handleFileUpload(e.target.files, docType)}
                  className="text-xs"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Documents List */}
        {documents.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 mb-3">Uploaded Documents</h4>
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
              >
                <div className="flex items-center space-x-3">
                  {getStatusIcon(doc.status)}
                  <div>
                    <p className="font-medium text-gray-900">{doc.name}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{doc.type}</span>
                      <span>•</span>
                      <span>{formatFileSize(doc.size)}</span>
                      <span>•</span>
                      <span>{new Date(doc.uploadDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(doc.status)}>
                    {doc.status}
                  </Badge>
                  {doc.status === 'uploaded' && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteDocument(doc.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upload Instructions */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h5 className="font-medium text-blue-900 mb-2">Upload Guidelines</h5>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Maximum file size: 10MB</li>
            <li>• Supported formats: PDF, DOC, DOCX, JPG, JPEG, PNG, TXT</li>
            <li>• Ensure all documents are clear and readable</li>
            <li>• Personal information will be handled securely</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
