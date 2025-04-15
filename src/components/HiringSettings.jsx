import React, { useState, useEffect } from 'react';

const HiringSettings = () => {
  const [settings, setSettings] = useState({
    approvalWorkflow: true,
    defaultInterviewers: [],
    offerApprovers: [],
    emailNotifications: true,
    emailTemplates: {
      interviewInvitation: '',
      offerLetter: '',
      rejection: '',
    },
  });
  const [employees, setEmployees] = useState([]);
  const [activeTab, setActiveTab] = useState('workflow');

  useEffect(() => {
    // Load employees
    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    } else {
      const mockEmployees = [
        { id: 1, name: 'Jane Smith', role: 'Engineering Manager' },
        { id: 2, name: 'Mike Johnson', role: 'Senior Developer' },
        { id: 3, name: 'Alex Brown', role: 'Marketing Director' },
        { id: 4, name: 'Lisa Wong', role: 'Data Science Lead' },
        { id: 5, name: 'David Kim', role: 'HR Manager' },
      ];
      setEmployees(mockEmployees);
      localStorage.setItem('employees', JSON.stringify(mockEmployees));
    }

    // Load settings
    const storedSettings = localStorage.getItem('hiringSettings');
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    } else {
      const mockSettings = {
        approvalWorkflow: true,
        defaultInterviewers: [1, 5],
        offerApprovers: [3, 5],
        emailNotifications: true,
        emailTemplates: {
          interviewInvitation: 'Dear [Candidate],\n\nWe are pleased to invite you for an interview for the [Position] position.\n\nDate: [Date]\nTime: [Time]\nLocation: [Location]\n\nBest regards,\n[Your Name]',
          offerLetter: 'Dear [Candidate],\n\nWe are delighted to offer you the position of [Position] at [Company].\n\nSalary: [Salary]\nStart Date: [Start Date]\n\nPlease let us know your decision by [Response Deadline].\n\nBest regards,\n[Your Name]',
          rejection: 'Dear [Candidate],\n\nThank you for your interest in the [Position] position at [Company].\n\nAfter careful consideration, we have decided to move forward with other candidates whose qualifications more closely match our needs.\n\nWe appreciate the time you invested in the application process.\n\nBest regards,\n[Your Name]',
        },
      };
      setSettings(mockSettings);
      localStorage.setItem('hiringSettings', JSON.stringify(mockSettings));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTemplateChange = (template, value) => {
    setSettings(prev => ({
      ...prev,
      emailTemplates: { ...prev.emailTemplates, [template]: value },
    }));
  };

  const handleInterviewerChange = (e) => {
    const options = e.target.options;
    const selectedInterviewers = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedInterviewers.push(parseInt(options[i].value));
      }
    }
    setSettings(prev => ({ ...prev, defaultInterviewers: selectedInterviewers }));
  };

  const handleApproverChange = (e) => {
    const options = e.target.options;
    const selectedApprovers = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedApprovers.push(parseInt(options[i].value));
      }
    }
    setSettings(prev => ({ ...prev, offerApprovers: selectedApprovers }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('hiringSettings', JSON.stringify(settings));
    
    // Show success notification
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const [showNotification, setShowNotification] = useState(false);

  const TabButton = ({ name, label, icon }) => (
    <button
      type="button"
      onClick={() => setActiveTab(name)}
      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
        activeTab === name
          ? 'bg-indigo-100 text-indigo-800'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </button>
  );

  return (
    <div className="max-w-8xl mx-auto p-6 bg-violet-50 border-solid border-2 border-violet-800">
      {/* Header */}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Tab Navigation */}
        <div className="md:w-64 flex flex-row md:flex-col gap-2 mb-6 md:mb-0">
          <TabButton 
            name="workflow" 
            label="Approval Workflow" 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            } 
          />
          <TabButton 
            name="emails" 
            label="Email Templates" 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            } 
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Approval Workflow Tab */}
            {activeTab === 'workflow' && (
              <div className="bg-white rounded-xl shadow-sm border border-indigo-600 p-6 transition-all duration-200">
                <h3 className="text-lg font-semibold text-indigo-800 mb-4">Approval Workflow</h3>
                
                <div className="flex items-center mb-6 p-3 bg-indigo-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="approvalWorkflow"
                    name="approvalWorkflow"
                    checked={settings.approvalWorkflow}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="approvalWorkflow" className="ml-2 block text-sm text-gray-700">
                    Enable approval workflow for job offers
                  </label>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-indigo-700 mb-2">Default Interviewers</label>
                  <div className="relative">
                    <select
                      multiple
                      size="4"
                      value={settings.defaultInterviewers}
                      onChange={handleInterviewerChange}
                      className="w-full px-4 py-3 border border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {employees.map(employee => (
                        <option key={employee.id} value={employee.id} className="py-1">
                          {employee.name} - {employee.role}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="mt-2 text-xs text-indigo-600">Hold Ctrl/Cmd to select multiple interviewers</p>
                </div>

                <div className="mb-2">
                  <label className="block text-sm font-medium text-indigo-700 mb-2">Offer Approvers</label>
                  <div className="relative">
                    <select
                      multiple
                      size="4"
                      value={settings.offerApprovers}
                      onChange={handleApproverChange}
                      className="w-full px-4 py-3 border border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {employees.map(employee => (
                        <option key={employee.id} value={employee.id} className="py-1">
                          {employee.name} - {employee.role}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="mt-2 text-xs text-indigo-600">Hold Ctrl/Cmd to select multiple approvers</p>
                </div>
              </div>
            )}

            {/* Email Templates Tab */}
            {activeTab === 'emails' && (
              <div className="bg-white rounded-xl shadow-sm border border-indigo-600 p-6 transition-all duration-200">
                <h3 className="text-lg font-semibold text-indigo-800 mb-4">Email Settings</h3>
                
                <div className="flex items-center mb-6 p-3 bg-indigo-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    name="emailNotifications"
                    checked={settings.emailNotifications}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-700">
                    Enable email notifications
                  </label>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-indigo-700">Interview Invitation Template</label>
                    <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                      Variables: [Candidate], [Position], [Date], [Time], [Location]
                    </span>
                  </div>
                  <textarea
                    value={settings.emailTemplates.interviewInvitation}
                    onChange={(e) => handleTemplateChange('interviewInvitation', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-indigo-700">Offer Letter Template</label>
                    <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                      Variables: [Candidate], [Position], [Company], [Salary], [Start Date]
                    </span>
                  </div>
                  <textarea
                    value={settings.emailTemplates.offerLetter}
                    onChange={(e) => handleTemplateChange('offerLetter', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="mb-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-indigo-700">Rejection Template</label>
                    <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                      Variables: [Candidate], [Position], [Company]
                    </span>
                  </div>
                  <textarea
                    value={settings.emailTemplates.rejection}
                    onChange={(e) => handleTemplateChange('rejection', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-all duration-200 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Notification */}
      {showNotification && (
        <div className="fixed bottom-6 right-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md flex items-center transition-all duration-500 animate-fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Settings saved successfully!
        </div>
      )}
    </div>
  );
};

export default HiringSettings;

