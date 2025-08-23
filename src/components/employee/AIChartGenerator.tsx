
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Brain, Wand2, RefreshCw, Zap } from "lucide-react";

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  status: string;
  avatar: string;
}

interface AIChartGeneratorProps {
  employees: Employee[];
  onGenerate: (config: any) => void;
  onClose: () => void;
}

export const AIChartGenerator = ({ employees, onGenerate, onClose }: AIChartGeneratorProps) => {
  const [config, setConfig] = useState({
    structure: 'balanced',
    departments: 'auto',
    leadership: 'optimize',
    visualization: 'hierarchy',
    teamSize: 'optimal'
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const aiConfig = {
      ...config,
      recommendations: [
        "Engineering team could benefit from a Senior Lead position",
        "Marketing department structure is well-balanced",
        "Consider adding a Deputy Manager in Sales",
        "HR team size is optimal for current organization"
      ],
      optimizations: {
        spanOfControl: "1:6 average (industry standard: 1:7)",
        departmentalBalance: "Well distributed across departments",
        leadershipLevels: "3 levels - optimal for current size"
      }
    };
    
    setIsGenerating(false);
    onGenerate(aiConfig);
  };

  const presetConfigs = [
    {
      name: "Flat Structure",
      description: "Minimal hierarchy, direct reporting",
      config: { structure: 'flat', leadership: 'minimal' }
    },
    {
      name: "Traditional Hierarchy",
      description: "Classic pyramid structure",
      config: { structure: 'hierarchical', leadership: 'traditional' }
    },
    {
      name: "Matrix Organization",
      description: "Cross-functional reporting",
      config: { structure: 'matrix', leadership: 'distributed' }
    },
    {
      name: "Team-Based",
      description: "Autonomous team structure",
      config: { structure: 'team-based', leadership: 'collaborative' }
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl font-bold flex items-center space-x-2">
              <Brain className="w-6 h-6 text-purple-600" />
              <span>AI Organization Chart Generator</span>
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Let AI analyze your team and suggest optimal organizational structure
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Current Analysis */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Current Organization Analysis
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="font-medium text-blue-800">{employees.length}</div>
                <div className="text-blue-600">Total Employees</div>
              </div>
              <div>
                <div className="font-medium text-blue-800">
                  {new Set(employees.map(e => e.department)).size}
                </div>
                <div className="text-blue-600">Departments</div>
              </div>
              <div>
                <div className="font-medium text-blue-800">
                  {employees.filter(e => e.position.toLowerCase().includes('manager')).length}
                </div>
                <div className="text-blue-600">Managers</div>
              </div>
              <div>
                <div className="font-medium text-blue-800">1:4</div>
                <div className="text-blue-600">Avg Ratio</div>
              </div>
            </div>
          </div>

          {/* Quick Presets */}
          <div>
            <h3 className="font-semibold mb-3">Quick Structure Presets</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {presetConfigs.map((preset, index) => (
                <div
                  key={index}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all"
                  onClick={() => setConfig({ ...config, ...preset.config })}
                >
                  <h4 className="font-medium text-sm">{preset.name}</h4>
                  <p className="text-xs text-gray-600 mt-1">{preset.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced Configuration */}
          <div className="space-y-4">
            <h3 className="font-semibold">Advanced AI Configuration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="structure" className="text-sm font-medium">Organization Structure</Label>
                <select
                  id="structure"
                  value={config.structure}
                  onChange={(e) => setConfig({ ...config, structure: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="balanced">Balanced (AI Recommended)</option>
                  <option value="flat">Flat Structure</option>
                  <option value="hierarchical">Traditional Hierarchy</option>
                  <option value="matrix">Matrix Organization</option>
                </select>
              </div>

              <div>
                <Label htmlFor="leadership" className="text-sm font-medium">Leadership Distribution</Label>
                <select
                  id="leadership"
                  value={config.leadership}
                  onChange={(e) => setConfig({ ...config, leadership: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="optimize">AI Optimize</option>
                  <option value="minimal">Minimal Leaders</option>
                  <option value="traditional">Traditional</option>
                  <option value="distributed">Distributed</option>
                </select>
              </div>

              <div>
                <Label htmlFor="visualization" className="text-sm font-medium">Chart Style</Label>
                <select
                  id="visualization"
                  value={config.visualization}
                  onChange={(e) => setConfig({ ...config, visualization: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="hierarchy">Hierarchy Tree</option>
                  <option value="circular">Circular Layout</option>
                  <option value="network">Network Graph</option>
                  <option value="modern">Modern Boxes</option>
                </select>
              </div>

              <div>
                <Label htmlFor="teamSize" className="text-sm font-medium">Team Size Preference</Label>
                <select
                  id="teamSize"
                  value={config.teamSize}
                  onChange={(e) => setConfig({ ...config, teamSize: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="optimal">AI Optimal</option>
                  <option value="small">Small Teams (3-5)</option>
                  <option value="medium">Medium Teams (5-8)</option>
                  <option value="large">Large Teams (8+)</option>
                </select>
              </div>
            </div>
          </div>

          {/* AI Insights Preview */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-900 mb-2 flex items-center">
              <Wand2 className="w-4 h-4 mr-2" />
              AI Insights Preview
            </h3>
            <div className="text-sm text-purple-800 space-y-1">
              <p>• Structure efficiency score: 87% (Good)</p>
              <p>• Recommended span of control: 1:6 average</p>
              <p>• Suggested leadership additions: 2 positions</p>
              <p>• Cross-department collaboration opportunities: 3 found</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Generate AI Chart
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
