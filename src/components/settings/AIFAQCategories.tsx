import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Brain,
  Plus,
  Edit,
  Trash2,
  Download,
  Upload,
  Wand2,
  MessageSquare,
  BookOpen,
  Users,
  Settings,
  Save,
  Search,
  Filter,
  Star,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FAQCategory {
  id: string;
  name: string;
  description: string;
  questionCount: number;
  isActive: boolean;
  aiGenerated: boolean;
  lastUpdated: string;
  priority: "high" | "medium" | "low";
  questions: FAQQuestion[];
}

interface FAQQuestion {
  id: string;
  question: string;
  answer: string;
  tags: string[];
  confidence: number;
  usage: number;
  isAIGenerated: boolean;
}

const AIFAQCategories = () => {
  const { toast } = useToast();
  
  const [categories, setCategories] = useState<FAQCategory[]>([
    {
      id: "1",
      name: "Leave Management",
      description: "Questions about leave policies, applications, and approvals",
      questionCount: 15,
      isActive: true,
      aiGenerated: false,
      lastUpdated: "2024-08-07",
      priority: "high",
      questions: []
    },
    {
      id: "2", 
      name: "Payroll & Benefits",
      description: "Salary, bonuses, tax deductions, and benefit inquiries",
      questionCount: 12,
      isActive: true,
      aiGenerated: true,
      lastUpdated: "2024-08-06",
      priority: "high",
      questions: []
    },
    {
      id: "3",
      name: "IT Support",
      description: "Technical issues, access problems, and system help",
      questionCount: 8,
      isActive: true,
      aiGenerated: false,
      lastUpdated: "2024-08-05",
      priority: "medium",
      questions: []
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<FAQCategory | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isQuestionDialogOpen, setIsQuestionDialogOpen] = useState(false);
  
  const [newCategory, setNewCategory] = useState<{
    name: string;
    description: string;
    priority: "high" | "medium" | "low";
  }>({
    name: "",
    description: "",
    priority: "medium"
  });

  const [newQuestion, setNewQuestion] = useState({
    question: "",
    answer: "",
    tags: ""
  });

  const handleCreateCategory = () => {
    if (!newCategory.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Category name is required",
        variant: "destructive",
      });
      return;
    }

    const category: FAQCategory = {
      id: Date.now().toString(),
      name: newCategory.name,
      description: newCategory.description,
      questionCount: 0,
      isActive: true,
      aiGenerated: false,
      lastUpdated: new Date().toISOString().split('T')[0],
      priority: newCategory.priority,
      questions: []
    };

    setCategories(prev => [...prev, category]);
    setIsCreateDialogOpen(false);
    setNewCategory({ name: "", description: "", priority: "medium" });

    toast({
      title: "Category Created",
      description: `"${category.name}" has been created successfully.`,
    });
  };

  const handleEditCategory = (category: FAQCategory) => {
    setSelectedCategory(category);
    setNewCategory({
      name: category.name,
      description: category.description,
      priority: category.priority
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateCategory = () => {
    if (!selectedCategory || !newCategory.name.trim()) return;

    setCategories(prev => prev.map(cat => 
      cat.id === selectedCategory.id 
        ? { ...cat, ...newCategory, lastUpdated: new Date().toISOString().split('T')[0] }
        : cat
    ));

    setIsEditDialogOpen(false);
    setSelectedCategory(null);
    setNewCategory({ name: "", description: "", priority: "medium" });

    toast({
      title: "Category Updated",
      description: "Category has been updated successfully.",
    });
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
    toast({
      title: "Category Deleted",
      description: "Category has been removed successfully.",
    });
  };

  const handleToggleCategory = (id: string) => {
    setCategories(prev => prev.map(cat => 
      cat.id === id ? { ...cat, isActive: !cat.isActive } : cat
    ));
  };

  const handleGenerateAIQuestions = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;

    // Simulate AI generation
    toast({
      title: "Generating AI Questions",
      description: `Generating smart questions for "${category.name}"...`,
    });

    setTimeout(() => {
      setCategories(prev => prev.map(cat => 
        cat.id === categoryId 
          ? { 
              ...cat, 
              questionCount: cat.questionCount + 5,
              aiGenerated: true,
              lastUpdated: new Date().toISOString().split('T')[0]
            }
          : cat
      ));

      toast({
        title: "AI Questions Generated",
        description: "5 new questions have been generated and added.",
      });
    }, 2000);
  };

  const handleImportQuestions = () => {
    toast({
      title: "Import Started",
      description: "Please select a CSV or JSON file to import questions.",
    });
  };

  const handleExportQuestions = () => {
    toast({
      title: "Export Started",
      description: "FAQ categories and questions are being exported.",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">AI-Powered FAQ Categories</CardTitle>
                <p className="text-gray-600">Manage intelligent FAQ categories with AI assistance</p>
              </div>
            </div>
            <Badge variant="outline" className="px-3 py-1">
              <TrendingUp className="w-4 h-4 mr-2" />
              AI Enhanced
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Category
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New FAQ Category</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Category Name</Label>
                      <Input
                        value={newCategory.name}
                        onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter category name"
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={newCategory.description}
                        onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe the category"
                      />
                    </div>
                    <div>
                      <Label>Priority</Label>
                      <Select value={newCategory.priority} onValueChange={(value: "high" | "medium" | "low") => setNewCategory(prev => ({ ...prev, priority: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreateCategory}>Create Category</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button variant="outline" onClick={handleImportQuestions}>
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
              <Button variant="outline" onClick={handleExportQuestions}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <div className="grid gap-6">
            {categories.map((category) => (
              <Card key={category.id} className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                        <BookOpen className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-3">
                          <h3 className="text-xl font-semibold">{category.name}</h3>
                          <Badge className={getPriorityColor(category.priority)}>
                            {category.priority}
                          </Badge>
                          {category.aiGenerated && (
                            <Badge variant="outline" className="text-purple-600">
                              <Brain className="w-3 h-3 mr-1" />
                              AI Generated
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 mt-1">{category.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>{category.questionCount} questions</span>
                          <span>Updated: {category.lastUpdated}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            category.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {category.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={category.isActive}
                        onCheckedChange={() => handleToggleCategory(category.id)}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleGenerateAIQuestions(category.id)}
                        className="text-purple-600 hover:bg-purple-50"
                      >
                        <Wand2 className="w-4 h-4 mr-2" />
                        AI Generate
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditCategory(category)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteCategory(category.id)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">Questions: {category.questionCount}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-green-600" />
                          <span className="text-sm">Usage: High</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm">Rating: 4.8</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View Questions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit FAQ Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Category Name</Label>
              <Input
                value={newCategory.name}
                onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={newCategory.description}
                onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div>
              <Label>Priority</Label>
              <Select value={newCategory.priority} onValueChange={(value: "high" | "medium" | "low") => setNewCategory(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateCategory}>Update Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIFAQCategories;
