
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, X, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DocumentUploadProps {
  onDocumentsChange: (documents: File[]) => void;
  initialDocuments?: string[];
}

interface UploadedDocument {
  file: File;
  name: string;
  size: string;
  type: string;
}

export const EmployeeDocumentUpload = ({ onDocumentsChange, initialDocuments = [] }: DocumentUploadProps) => {
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFiles = (files: FileList) => {
    const newDocuments: UploadedDocument[] = [];
    
    Array.from(files).forEach(file => {
      // Only allow common document types
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png',
        'image/jpg'
      ];
      
      if (allowedTypes.includes(file.type)) {
        newDocuments.push({
          file,
          name: file.name,
          size: formatFileSize(file.size),
          type: file.type
        });
      }
    });

    const updatedDocuments = [...documents, ...newDocuments];
    setDocuments(updatedDocuments);
    onDocumentsChange(updatedDocuments.map(doc => doc.file));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeDocument = (index: number) => {
    const updatedDocuments = documents.filter((_, i) => i !== index);
    setDocuments(updatedDocuments);
    onDocumentsChange(updatedDocuments.map(doc => doc.file));
  };

  const getFileTypeIcon = (type: string) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('word')) return '📝';
    if (type.includes('image')) return '🖼️';
    return '📎';
  };

  return (
    <Card className="border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-blue-800">
          <FileText className="w-5 h-5" />
          <span>Upload Documents</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-2">
            Drag and drop documents here, or click to browse
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB each)
          </p>
          <Input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileInput}
            className="hidden"
            id="document-upload"
          />
          <Label htmlFor="document-upload">
            <Button variant="outline" className="cursor-pointer" asChild>
              <span>
                <Plus className="w-4 h-4 mr-2" />
                Choose Files
              </span>
            </Button>
          </Label>
        </div>

        {/* Document List */}
        {documents.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Uploaded Documents ({documents.length})
            </Label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {documents.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <span className="text-2xl">{getFileTypeIcon(doc.type)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {doc.name}
                      </p>
                      <p className="text-xs text-gray-500">{doc.size}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {doc.type.split('/')[1]?.toUpperCase()}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDocument(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Document Types Helper */}
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800 mb-2 font-medium">
            Recommended Documents:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs text-blue-700">
            <div>• Resume/CV</div>
            <div>• ID Copy</div>
            <div>• Educational Certificates</div>
            <div>• Previous Employment Letters</div>
            <div>• Background Check</div>
            <div>• Medical Records</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
