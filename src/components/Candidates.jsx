import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Edit, Trash2, Eye, Clipboard, Filter, X, Mail, Phone, Briefcase, Calendar, FileText, Book, Award, MessageSquare } from 'lucide-react';


const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [editingCandidate, setEditingCandidate] = useState(null);
  const [newCandidate, setNewCandidate] = useState({
    jobId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    source: '',
    resume: null,
    status: 'New',
    qualification: '',
    skills: [],
    notes: '',
  });
  const [filters, setFilters] = useState({ status: '', position: '' });

  useEffect(() => {
    try {
      const storedCandidates = localStorage.getItem('candidates');
      const storedJobs = localStorage.getItem('jobs');
      if (storedJobs) {
        setJobs(JSON.parse(storedJobs));
      }
      if (storedCandidates) {
        const parsedCandidates = JSON.parse(storedCandidates);
        const validCandidates = parsedCandidates.filter(
          candidate => candidate.firstName && candidate.lastName
        );
        // Ensure skills is an array for all candidates
        const candidatesWithSkills = validCandidates.map(candidate => ({
          ...candidate,
          skills: Array.isArray(candidate.skills) ? candidate.skills : [],
        }));
        setCandidates(candidatesWithSkills);
      } else {
        const mockCandidates = [
          {
            id: 1,
            jobId: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '(123) 456-7890',
            position: 'Senior Developer',
            source: 'LinkedIn',
            appliedDate: '2023-05-10',
            status: 'Interview',
            resume: 'john_doe_resume.pdf',
            qualification: 'Bachelor of Science in Computer Science',
            skills: ['JavaScript', 'React', 'Node.js'],
            notes: 'Strong technical background',
          },
          {
            id: 2,
            jobId: 2,
            firstName: 'Sarah',
            lastName: 'Johnson',
            email: 'sarah.j@example.com',
            phone: '(234) 567-8901',
            position: 'Marketing Manager',
            source: 'Company Website',
            appliedDate: '2023-05-05',
            status: 'Offer',
            resume: 'sarah_j_resume.pdf',
            qualification: 'MBA',
            skills: ['Marketing', 'SEO', 'Analytics'],
            notes: 'Excellent communication skills',
          },
          {
            id: 3,
            jobId: 3,
            firstName: 'Michael',
            lastName: 'Chen',
            email: 'michael.chen@example.com',
            phone: '(345) 678-9012',
            position: 'Data Analyst',
            source: 'Referral',
            appliedDate: '2023-05-12',
            status: 'New',
            resume: 'michael_chen_resume.pdf',
            qualification: 'Master’s in Data Science',
            skills: ['Python', 'SQL', 'Tableau'],
            notes: 'Needs technical screening',
          },
        ];
        setCandidates(mockCandidates);
        localStorage.setItem('candidates', JSON.stringify(mockCandidates));
      }
    } catch (error) {
      console.error('Error loading candidates from localStorage:', error);
      setCandidates([]);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'skills') {
      setNewCandidate(prev => ({
        ...prev,
        skills: value ? value.split(',').map(s => s.trim()) : [],
      }));
    } else {
      setNewCandidate(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setNewCandidate(prev => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedCandidates;
    if (modalMode === 'add') {
      const newId = candidates.length > 0 ? Math.max(...candidates.map(c => c.id)) + 1 : 1;
      const submittedCandidate = {
        ...newCandidate,
        id: newId,
        jobId: parseInt(newCandidate.jobId),
        appliedDate: new Date().toISOString().split('T')[0],
        resume: newCandidate.resume ? newCandidate.resume.name : 'No resume uploaded',
      };
      updatedCandidates = [...candidates, submittedCandidate];
      // Update job applicants count
      const jobId = parseInt(newCandidate.jobId);
      const storedJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
      const updatedJobs = storedJobs.map(job =>
        job.id === jobId ? { ...job, applicants: (job.applicants || 0) + 1 } : job
      );
      setJobs(updatedJobs);
      localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    } else {
      const updatedCandidate = {
        ...editingCandidate,
        ...newCandidate,
        jobId: parseInt(newCandidate.jobId),
        resume: newCandidate.resume ? newCandidate.resume.name : editingCandidate.resume,
      };
      updatedCandidates = candidates.map(c => (c.id === updatedCandidate.id ? updatedCandidate : c));
    }
    setCandidates(updatedCandidates);
    localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
    setIsAddModalOpen(false);
    resetForm();
  };

  const editCandidate = (candidate) => {
    setModalMode('edit');
    setEditingCandidate(candidate);
    setNewCandidate({
      ...candidate,
      skills: Array.isArray(candidate.skills) ? candidate.skills : [],
      resume: null,
    });
    setIsAddModalOpen(true);
  };

  const deleteCandidate = (id) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      const updatedCandidates = candidates.filter(candidate => candidate.id !== id);
      setCandidates(updatedCandidates);
      localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
    }
  };

  const viewCandidate = (candidate) => {
    setSelectedCandidate(candidate);
    setIsViewModalOpen(true);
  };

  const updateStatus = (id, newStatus) => {
    const updatedCandidates = candidates.map(candidate =>
      candidate.id === id ? { ...candidate, status: newStatus } : candidate
    );
    setCandidates(updatedCandidates);
    localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
    if (selectedCandidate && selectedCandidate.id === id) {
      setSelectedCandidate(prev => ({ ...prev, status: newStatus }));
    }
  };

  const saveNotes = (id, notes) => {
    const updatedCandidates = candidates.map(candidate =>
      candidate.id === id ? { ...candidate, notes } : candidate
    );
    setCandidates(updatedCandidates);
    localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
    setSelectedCandidate(prev => ({ ...prev, notes }));
  };

  const resetForm = () => {
    setNewCandidate({
      jobId: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      position: '',
      source: '',
      resume: null,
      status: 'New',
      qualification: '',
      skills: [],
      notes: '',
    });
    setEditingCandidate(null);
    setModalMode('add');
  };

  const filteredCandidates = candidates.filter(candidate => (
    (filters.status === '' || candidate.status === filters.status) &&
    (filters.position === '' || candidate.position.toLowerCase().includes(filters.position.toLowerCase()))
  ));

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-solid border-violet-600">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center"
        >
          <UserPlus size={18} className="mr-2" />
          Add Candidate
        </motion.button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-md p-6 mb-8 border-2 border-dotted border-violet-600"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-indigo-700 mb-2">Status</label>
            <div className="relative">
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-4 py-3 border border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
              >
                <option value="">All Statuses</option>
                <option value="New">New</option>
                <option value="Screening">Screening</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Hired">Hired</option>
                <option value="Rejected">Rejected</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <Filter size={16} className="text-indigo-500" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-indigo-700 mb-2">Position</label>
            <div className="relative">
              <input
                type="text"
                value={filters.position}
                onChange={(e) => setFilters({ ...filters, position: e.target.value })}
                className="w-full px-4 py-3 border border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Filter by position"
              />
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <Briefcase size={16} className="text-indigo-500" />
              </div>
            </div>
          </div>
          <div className="flex items-end">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setFilters({ status: '', position: '' })}
              className="px-4 py-3 border border-indigo-300 rounded-lg text-sm font-medium text-indigo-700 hover:bg-indigo-50 transition-all w-full flex items-center justify-center"
            >
              <X size={16} className="mr-2" />
              Clear Filters
            </motion.button>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-dotted border-violet-600"
      >
        <table className="min-w-full divide-y divide-indigo-100">
          <thead className="bg-gradient-to-r from-indigo-50 to-blue-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Position</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Source</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Applied Date</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-indigo-100">
            {filteredCandidates.map((candidate, index) => (
              <motion.tr 
                key={candidate.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="hover:bg-indigo-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center text-white font-medium">
                      {candidate.firstName?.charAt(0) || ''}{candidate.lastName?.charAt(0) || ''}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {candidate.firstName || 'Unknown'} {candidate.lastName || 'Candidate'}
                      </div>
                      <div className="text-sm text-indigo-600">{candidate.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{candidate.position}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{candidate.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{candidate.source}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{candidate.appliedDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={candidate.status}
                    onChange={(e) => updateStatus(candidate.id, e.target.value)}
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      candidate.status === 'New' ? 'bg-blue-100 text-blue-800' :
                      candidate.status === 'Screening' ? 'bg-amber-100 text-amber-800' :
                      candidate.status === 'Interview' ? 'bg-violet-100 text-violet-800' :
                      candidate.status === 'Offer' ? 'bg-emerald-100 text-emerald-800' :
                      candidate.status === 'Hired' ? 'bg-green-100 text-green-800' :
                      'bg-rose-100 text-rose-800'
                    }`}
                  >
                    <option value="New">New</option>
                    <option value="Screening">Screening</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Hired">Hired</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <motion.button 
                      whileHover={{ scale: 1.1 }} 
                      onClick={() => viewCandidate(candidate)} 
                      className="text-blue-600 hover:text-blue-900"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.1 }} 
                      onClick={() => editCandidate(candidate)} 
                      className="text-emerald-600 hover:text-emerald-900"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.1 }} 
                      onClick={() => deleteCandidate(candidate.id)} 
                      className="text-rose-600 hover:text-rose-900"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {isAddModalOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <motion.div
                    initial={{ rotate: -10 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {modalMode === 'add' ? 
                      <UserPlus size={24} className="text-indigo-600 mr-3" /> : 
                      <Edit size={24} className="text-indigo-600 mr-3" />
                    }
                  </motion.div>
                  <h3 className="text-xl font-bold text-indigo-700">
                    {modalMode === 'add' ? 'Add New Candidate' : 'Edit Candidate'}
                  </h3>
                </div>
                <motion.button 
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setIsAddModalOpen(false)} 
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </motion.button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-indigo-700 mb-2">Job Posting*</label>
                    <select
                      name="jobId"
                      value={newCandidate.jobId}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                      <option value="">Select Job</option>
                      {jobs.map(job => (
                        <option key={job.id} value={job.id}>
                          {job.title} - {job.department}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-700 mb-2">First Name*</label>
                    <input
                      type="text"
                      name="firstName"
                      value={newCandidate.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-700 mb-2">Last Name*</label>
                    <input
                      type="text"
                      name="lastName"
                      value={newCandidate.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-700 mb-2">Email*</label>
                    <input
                      type="email"
                      name="email"
                      value={newCandidate.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={newCandidate.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-700 mb-2">Position*</label>
                    <input
                      type="text"
                      name="position"
                      value={newCandidate.position}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-700 mb-2">Source</label>
                    <select
                      name="source"
                      value={newCandidate.source}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Select source</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Indeed">Indeed</option>
                      <option value="Company Website">Company Website</option>
                      <option value="Referral">Referral</option>
                      <option value="Job Fair">Job Fair</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-700 mb-2">Status</label>
                    <select
                      name="status"
                      value={newCandidate.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="New">New</option>
                      <option value="Screening">Screening</option>
                      <option value="Interview">Interview</option>
                      <option value="Offer">Offer</option>
                      <option value="Hired">Hired</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-700 mb-2">Qualification</label>
                    <input
                      type="text"
                      name="qualification"
                      value={newCandidate.qualification}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-700 mb-2">Skills (comma-separated)</label>
                    <input
                      type="text"
                      name="skills"
                      value={Array.isArray(newCandidate.skills) ? newCandidate.skills.join(', ') : ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-indigo-700 mb-2">Resume</label>
                    {modalMode === 'edit' && editingCandidate && (
                      <p className="text-sm text-indigo-500 mb-2">Current: {editingCandidate.resume}</p>
                    )}
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="w-full px-4 py-3 border border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-5 py-2.5 border border-indigo-300 rounded-lg text-sm font-medium text-indigo-700 hover:bg-indigo-50 transition-all flex items-center"
                  >
                    <X size={16} className="mr-2" />
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="px-5 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center"
                  >
                    {modalMode === 'add' ? (
                      <>
                        <UserPlus size={16} className="mr-2" />
                        Add Candidate
                      </>
                    ) : (
                      <>
                        <Clipboard size={16} className="mr-2" />
                        Save Changes
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}

{isViewModalOpen && selectedCandidate && (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
  >
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
    >
      <div className="p-3 sm:p-4 md:p-6">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <div className="flex items-center">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Eye size={20} className="text-indigo-600 mr-2 sm:mr-3" />
            </motion.div>
            <h3 className="text-lg sm:text-xl font-bold text-indigo-700">Candidate Details</h3>
          </div>
          <motion.button 
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsViewModalOpen(false)} 
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} className="sm:size-8" />
          </motion.button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Profile Info Section */}
          <div className="md:col-span-1 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 sm:p-6">
            <div className="flex flex-col items-center">
              <motion.div 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white text-xl sm:text-2xl font-bold mb-3 sm:mb-4 shadow-lg"
              >
                {selectedCandidate.firstName?.charAt(0) || ''}{selectedCandidate.lastName?.charAt(0) || ''}
              </motion.div>
              <h4 className="text-lg sm:text-xl font-bold text-indigo-800 text-center">
                {selectedCandidate.firstName || 'Unknown'} {selectedCandidate.lastName || 'Candidate'}
              </h4>
              <p className="text-indigo-600 font-medium text-center">{selectedCandidate.position}</p>
              
              <div className="mt-4 sm:mt-6 w-full">
                <div className="flex items-center mb-3 sm:mb-4 text-sm sm:text-base">
                  <motion.div whileHover={{ rotate: [0, -10, 0] }} transition={{ duration: 0.3 }}>
                    <Mail size={16} className="text-indigo-600 mr-2 sm:mr-3 flex-shrink-0" />
                  </motion.div>
                  <span className="text-gray-700 break-all">{selectedCandidate.email}</span>
                </div>
                <div className="flex items-center mb-3 sm:mb-4 text-sm sm:text-base">
                  <motion.div whileHover={{ rotate: [0, -10, 0] }} transition={{ duration: 0.3 }}>
                    <Phone size={16} className="text-indigo-600 mr-2 sm:mr-3 flex-shrink-0" />
                  </motion.div>
                  <span className="text-gray-700">{selectedCandidate.phone}</span>
                </div>
                <div className="flex items-center mb-3 sm:mb-4 text-sm sm:text-base">
                  <motion.div whileHover={{ rotate: [0, -10, 0] }} transition={{ duration: 0.3 }}>
                    <FileText size={16} className="text-indigo-600 mr-2 sm:mr-3 flex-shrink-0" />
                  </motion.div>
                  <span className="text-gray-700 break-all">{selectedCandidate.resume}</span>
                </div>
                <div className="flex items-center text-sm sm:text-base">
                  <motion.div whileHover={{ rotate: [0, -10, 0] }} transition={{ duration: 0.3 }}>
                    <Calendar size={16} className="text-indigo-600 mr-2 sm:mr-3 flex-shrink-0" />
                  </motion.div>
                  <span className="text-gray-700">Applied: {selectedCandidate.appliedDate}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Details Section */}
          <div className="md:col-span-2">
            <div className="mb-4 sm:mb-6 bg-white p-3 sm:p-4 rounded-lg border border-indigo-100 shadow-sm">
              <h4 className="text-base sm:text-lg font-semibold text-indigo-800 mb-2 sm:mb-3 flex items-center">
                <motion.div whileHover={{ rotate: 10 }} transition={{ duration: 0.2 }}>
                  <Award size={18} className="text-indigo-600 mr-2 flex-shrink-0" />
                </motion.div>
                Candidate Status
              </h4>
              <select
                value={selectedCandidate.status}
                onChange={(e) => updateStatus(selectedCandidate.id, e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg text-sm sm:text-base ${
                  selectedCandidate.status === 'New' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                  selectedCandidate.status === 'Screening' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                  selectedCandidate.status === 'Interview' ? 'bg-violet-100 text-violet-800 border-violet-200' :
                  selectedCandidate.status === 'Offer' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                  selectedCandidate.status === 'Hired' ? 'bg-green-100 text-green-800 border-green-200' :
                  'bg-rose-100 text-rose-800 border-rose-200'
                }`}
              >
                <option value="New">New</option>
                <option value="Screening">Screening</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Hired">Hired</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            
            <div className="mb-4 sm:mb-6 bg-white p-3 sm:p-4 rounded-lg border border-indigo-100 shadow-sm">
              <h4 className="text-base sm:text-lg font-semibold text-indigo-800 mb-2 sm:mb-3 flex items-center">
                <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                  <Briefcase size={18} className="text-indigo-600 mr-2 flex-shrink-0" />
                </motion.div>
                Source
              </h4>
              <p className="text-gray-700 text-sm sm:text-base">{selectedCandidate.source}</p>
            </div>
            
            <div className="mb-4 sm:mb-6 bg-white p-3 sm:p-4 rounded-lg border border-indigo-100 shadow-sm">
              <h4 className="text-base sm:text-lg font-semibold text-indigo-800 mb-2 sm:mb-3 flex items-center">
                <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                  <Book size={18} className="text-indigo-600 mr-2 flex-shrink-0" />
                </motion.div>
                Qualification
              </h4>
              <p className="text-gray-700 text-sm sm:text-base">{selectedCandidate.qualification || 'Not specified'}</p>
            </div>
            
            <div className="mb-4 sm:mb-6 bg-white p-3 sm:p-4 rounded-lg border border-indigo-100 shadow-sm">
              <h4 className="text-base sm:text-lg font-semibold text-indigo-800 mb-2 sm:mb-3 flex items-center">
                <Award size={18} className="text-indigo-600 mr-2 flex-shrink-0" />
                Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(selectedCandidate.skills) && selectedCandidate.skills.length > 0 ? (
                  selectedCandidate.skills.map((skill, index) => (
                    <motion.span 
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="px-2 sm:px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-indigo-800 rounded-full text-xs sm:text-sm font-medium"
                    >
                      {skill}
                    </motion.span>
                  ))
                ) : (
                  <span className="text-gray-700 text-sm sm:text-base">No skills listed</span>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="text-base sm:text-lg font-medium mb-2">Notes</h4>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                rows={3}
                defaultValue={selectedCandidate.notes}
                onBlur={(e) => saveNotes(selectedCandidate.id, e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={() => setIsViewModalOpen(false)}
            className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm sm:text-base"
          >
            Close
          </button>
        </div>
      </div>
    </motion.div>
  </motion.div>
)}
    </div>
  );
};

export default Candidates;