
import { toast } from "@/hooks/use-toast";

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  status: string;
  joinDate: string;
  phone?: string;
  address?: string;
  salary?: string;
  manager?: string;
  missingDocs?: string[];
}

export interface ProfileAnalysis {
  employeeId: number;
  overallScore: number;
  completeness: number;
  riskLevel: 'low' | 'medium' | 'high';
  insights: {
    strengths: string[];
    improvements: string[];
    recommendations: string[];
    riskFactors: string[];
  };
  categories: {
    personalInfo: { score: number; status: string; issues: string[] };
    workInfo: { score: number; status: string; issues: string[] };
    documentation: { score: number; status: string; issues: string[] };
    compliance: { score: number; status: string; issues: string[] };
  };
  generatedAt: string;
}

class AIAnalysisService {
  async analyzeEmployeeProfile(employee: Employee): Promise<ProfileAnalysis> {
    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Calculate profile completeness
      const personalInfoScore = this.calculatePersonalInfoScore(employee);
      const workInfoScore = this.calculateWorkInfoScore(employee);
      const documentationScore = this.calculateDocumentationScore(employee);
      const complianceScore = this.calculateComplianceScore(employee);

      const overallScore = Math.round(
        (personalInfoScore.score + workInfoScore.score + documentationScore.score + complianceScore.score) / 4
      );

      const completeness = this.calculateCompleteness(employee);
      const riskLevel = this.determineRiskLevel(overallScore, employee);
      const insights = this.generateInsights(employee, overallScore);

      const analysis: ProfileAnalysis = {
        employeeId: employee.id,
        overallScore,
        completeness,
        riskLevel,
        insights,
        categories: {
          personalInfo: personalInfoScore,
          workInfo: workInfoScore,
          documentation: documentationScore,
          compliance: complianceScore
        },
        generatedAt: new Date().toISOString()
      };

      toast({
        title: "AI Analysis Complete",
        description: `Profile analysis generated for ${employee.name}`,
      });

      return analysis;
    } catch (error) {
      console.error('AI Analysis failed:', error);
      
      toast({
        title: "Analysis Failed",
        description: "Failed to generate AI analysis. Please try again.",
        variant: "destructive"
      });

      throw error;
    }
  }

  async analyzeMulitpleProfiles(employees: Employee[]): Promise<ProfileAnalysis[]> {
    const analyses: ProfileAnalysis[] = [];
    
    for (const employee of employees) {
      try {
        const analysis = await this.analyzeEmployeeProfile(employee);
        analyses.push(analysis);
        
        // Add delay between analyses
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`Failed to analyze ${employee.name}:`, error);
      }
    }

    toast({
      title: "Bulk Analysis Complete",
      description: `Generated ${analyses.length} profile analyses`,
    });

    return analyses;
  }

  private calculatePersonalInfoScore(employee: Employee) {
    let score = 0;
    const issues: string[] = [];

    if (employee.name) score += 25;
    else issues.push('Missing name');

    if (employee.email) score += 25;
    else issues.push('Missing email');

    if (employee.phone) score += 25;
    else issues.push('Missing phone number');

    if (employee.address) score += 25;
    else issues.push('Missing address');

    return {
      score,
      status: score >= 75 ? 'excellent' : score >= 50 ? 'good' : score >= 25 ? 'fair' : 'poor',
      issues
    };
  }

  private calculateWorkInfoScore(employee: Employee) {
    let score = 0;
    const issues: string[] = [];

    if (employee.position) score += 25;
    else issues.push('Missing position');

    if (employee.department) score += 25;
    else issues.push('Missing department');

    if (employee.manager) score += 25;
    else issues.push('Missing manager assignment');

    if (employee.salary) score += 25;
    else issues.push('Missing salary information');

    return {
      score,
      status: score >= 75 ? 'excellent' : score >= 50 ? 'good' : score >= 25 ? 'fair' : 'poor',
      issues
    };
  }

  private calculateDocumentationScore(employee: Employee) {
    const missingDocs = employee.missingDocs || [];
    const score = Math.max(0, 100 - (missingDocs.length * 20));
    
    return {
      score,
      status: score >= 80 ? 'excellent' : score >= 60 ? 'good' : score >= 40 ? 'fair' : 'poor',
      issues: missingDocs.map(doc => `Missing: ${doc}`)
    };
  }

  private calculateComplianceScore(employee: Employee) {
    let score = 100;
    const issues: string[] = [];

    // Check for compliance issues
    if (employee.status === 'Inactive') {
      score -= 30;
      issues.push('Employee marked as inactive');
    }

    if (!employee.joinDate) {
      score -= 20;
      issues.push('Missing join date');
    }

    const missingDocs = employee.missingDocs || [];
    if (missingDocs.includes('Tax Forms')) {
      score -= 25;
      issues.push('Missing tax forms - compliance risk');
    }

    if (missingDocs.includes('ID Copy')) {
      score -= 25;
      issues.push('Missing ID verification');
    }

    return {
      score: Math.max(0, score),
      status: score >= 80 ? 'excellent' : score >= 60 ? 'good' : score >= 40 ? 'fair' : 'poor',
      issues
    };
  }

  private calculateCompleteness(employee: Employee): number {
    const fields = [
      employee.name,
      employee.email,
      employee.department,
      employee.position,
      employee.joinDate,
      employee.phone,
      employee.address,
      employee.salary,
      employee.manager
    ];

    const filledFields = fields.filter(field => field && field.trim() !== '').length;
    return Math.round((filledFields / fields.length) * 100);
  }

  private determineRiskLevel(overallScore: number, employee: Employee): 'low' | 'medium' | 'high' {
    const missingDocs = employee.missingDocs || [];
    
    if (overallScore < 50 || missingDocs.length > 3 || employee.status === 'Inactive') {
      return 'high';
    } else if (overallScore < 75 || missingDocs.length > 1) {
      return 'medium';
    } else {
      return 'low';
    }
  }

  private generateInsights(employee: Employee, overallScore: number) {
    const strengths: string[] = [];
    const improvements: string[] = [];
    const recommendations: string[] = [];
    const riskFactors: string[] = [];

    // Generate strengths
    if (employee.name && employee.email && employee.position) {
      strengths.push('Complete basic information');
    }
    if (employee.salary) {
      strengths.push('Salary information documented');
    }
    if (employee.manager) {
      strengths.push('Clear reporting structure');
    }
    if (employee.status === 'Active') {
      strengths.push('Active employee status');
    }

    // Generate improvements
    if (!employee.phone) {
      improvements.push('Add phone number for better communication');
    }
    if (!employee.address) {
      improvements.push('Complete address information');
    }
    if (!employee.manager) {
      improvements.push('Assign a direct manager');
    }

    // Generate recommendations
    const missingDocs = employee.missingDocs || [];
    if (missingDocs.length > 0) {
      recommendations.push(`Upload missing documents: ${missingDocs.join(', ')}`);
    }
    if (overallScore < 75) {
      recommendations.push('Complete profile information to improve score');
    }
    recommendations.push('Schedule regular profile reviews');

    // Generate risk factors
    if (missingDocs.includes('Tax Forms')) {
      riskFactors.push('Missing tax forms - compliance risk');
    }
    if (missingDocs.includes('ID Copy')) {
      riskFactors.push('Missing identity verification');
    }
    if (employee.status === 'Inactive') {
      riskFactors.push('Inactive status requires attention');
    }
    if (!employee.manager) {
      riskFactors.push('No assigned manager - reporting gap');
    }

    return { strengths, improvements, recommendations, riskFactors };
  }
}

export const aiAnalysisService = new AIAnalysisService();
