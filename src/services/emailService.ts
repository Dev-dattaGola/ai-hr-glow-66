
import { toast } from "@/hooks/use-toast";

export interface EmailTemplate {
  subject: string;
  body: string;
  variables: Record<string, string>;
}

export interface WelcomeEmailData {
  employeeName: string;
  employeeEmail: string;
  position: string;
  department: string;
  startDate: string;
  manager?: string;
  companyName?: string;
}

class EmailService {
  private templates: Record<string, EmailTemplate> = {
    welcome: {
      subject: "Welcome to {{companyName}} - {{employeeName}}!",
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Welcome to {{companyName}}!</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Hello {{employeeName}}!</h2>
            
            <p style="color: #666; line-height: 1.6; font-size: 16px;">
              We're thrilled to welcome you to the {{companyName}} team! We're excited to have you join us as 
              <strong>{{position}}</strong> in our <strong>{{department}}</strong> department.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
              <h3 style="color: #333; margin-top: 0;">Your Details:</h3>
              <ul style="color: #666; line-height: 1.8;">
                <li><strong>Position:</strong> {{position}}</li>
                <li><strong>Department:</strong> {{department}}</li>
                <li><strong>Start Date:</strong> {{startDate}}</li>
                {{#if manager}}<li><strong>Manager:</strong> {{manager}}</li>{{/if}}
              </ul>
            </div>
            
            <h3 style="color: #333;">What's Next?</h3>
            <ul style="color: #666; line-height: 1.8;">
              <li>📋 Complete your onboarding checklist</li>
              <li>📄 Upload any missing documents</li>
              <li>👥 Meet your team members</li>
              <li>🎯 Review your role objectives</li>
              <li>🏢 Get familiar with company policies</li>
            </ul>
            
            <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #1976d2; margin-top: 0;">Need Help?</h4>
              <p style="color: #666; margin-bottom: 0;">
                If you have any questions or need assistance, don't hesitate to reach out to:
              </p>
              <ul style="color: #666; margin-bottom: 0;">
                <li>Your manager: {{manager}}</li>
                <li>HR Team: hr@{{companyName}}.com</li>
                <li>IT Support: it-support@{{companyName}}.com</li>
              </ul>
            </div>
            
            <p style="color: #666; line-height: 1.6; font-size: 16px;">
              Once again, welcome to the team! We look forward to working with you and supporting your success.
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #999; font-size: 14px;">
                Best regards,<br>
                <strong>The {{companyName}} Team</strong>
              </p>
            </div>
          </div>
        </div>
      `,
      variables: {
        employeeName: '',
        position: '',
        department: '',
        startDate: '',
        manager: '',
        companyName: 'Your Company'
      }
    }
  };

  async sendWelcomeEmail(data: WelcomeEmailData): Promise<boolean> {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const template = this.templates.welcome;
      const variables = {
        ...template.variables,
        ...data,
        companyName: data.companyName || 'Your Company'
      };

      // Replace template variables
      let emailSubject = template.subject;
      let emailBody = template.body;

      Object.entries(variables).forEach(([key, value]) => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        emailSubject = emailSubject.replace(regex, value || '');
        emailBody = emailBody.replace(regex, value || '');
      });

      // Handle conditional blocks (simplified)
      emailBody = emailBody.replace(/{{#if\s+(\w+)}}(.*?){{\/if}}/gs, (match, condition, content) => {
        return variables[condition] ? content : '';
      });

      console.log('Sending welcome email to:', data.employeeEmail);
      console.log('Subject:', emailSubject);
      console.log('Body preview:', emailBody.substring(0, 200) + '...');

      // In a real implementation, you would call your email service API here
      // Example: await fetch('/api/send-email', { method: 'POST', body: JSON.stringify({ to: data.employeeEmail, subject: emailSubject, html: emailBody }) });

      toast({
        title: "Welcome Email Sent!",
        description: `Welcome email successfully sent to ${data.employeeName} (${data.employeeEmail})`,
      });

      return true;
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      
      toast({
        title: "Email Failed",
        description: "Failed to send welcome email. Please try again.",
        variant: "destructive"
      });

      return false;
    }
  }

  async sendBulkWelcomeEmails(employees: WelcomeEmailData[]): Promise<{ success: number; failed: number }> {
    let success = 0;
    let failed = 0;

    for (const employee of employees) {
      const result = await this.sendWelcomeEmail(employee);
      if (result) {
        success++;
      } else {
        failed++;
      }
      
      // Add delay between emails to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    toast({
      title: "Bulk Email Complete",
      description: `Sent ${success} emails successfully. ${failed > 0 ? `${failed} failed.` : ''}`,
      variant: failed > 0 ? "destructive" : "default"
    });

    return { success, failed };
  }
}

export const emailService = new EmailService();
