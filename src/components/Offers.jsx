
import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Edit, Eye, Plus, X } from 'lucide-react';
const Offers = () => {
  // State declarations
  const [offers, setOffers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOffer, setNewOffer] = useState({
    candidateId: '',
    position: '',
    salary: '',
    bonus: '',
    benefits: '',
    startDate: '',
    status: 'Pending',
  });
  const [candidates, setCandidates] = useState([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [editingOffer, setEditingOffer] = useState(null);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const storedCandidates = localStorage.getItem('candidates');
      if (storedCandidates) setCandidates(JSON.parse(storedCandidates));

      const storedOffers = localStorage.getItem('offers');
      if (storedOffers) {
        setOffers(JSON.parse(storedOffers));
      } else {
        const mockOffers = [
          {
            id: 1,
            candidateId: 2,
            candidateName: 'Sarah Johnson',
            position: 'Marketing Manager',
            salary: '$85,000',
            bonus: '$5,000',
            benefits: 'Health insurance, 401k matching',
            startDate: '2023-06-15',
            status: 'Accepted',
            sentDate: '2023-05-10',
          },
          {
            id: 2,
            candidateId: 1,
            candidateName: 'John Doe',
            position: 'Senior Developer',
            salary: '$110,000',
            bonus: '$10,000',
            benefits: 'Health insurance, stock options',
            startDate: '2023-06-01',
            status: 'Pending',
            sentDate: '2023-05-12',
          },
        ];
        setOffers(mockOffers);
        localStorage.setItem('offers', JSON.stringify(mockOffers));
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setOffers([]);
    }
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOffer((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission for create/edit
  const handleSubmit = (e) => {
    e.preventDefault();
    const candidate = candidates.find((c) => c.id === parseInt(newOffer.candidateId));
    if (!candidate) {
      alert('Invalid candidate selected');
      return;
    }
    const candidateName = `${candidate.firstName} ${candidate.lastName}`;

    if (editingOffer) {
      // Edit existing offer
      const updatedOffer = {
        ...editingOffer,
        candidateId: parseInt(newOffer.candidateId),
        candidateName,
        position: newOffer.position,
        salary: newOffer.salary,
        bonus: newOffer.bonus,
        benefits: newOffer.benefits,
        startDate: newOffer.startDate,
        status: newOffer.status,
      };
      const updatedOffers = offers.map((o) => (o.id === editingOffer.id ? updatedOffer : o));
      setOffers(updatedOffers);
      localStorage.setItem('offers', JSON.stringify(updatedOffers));
    } else {
      // Create new offer
      const newId = offers.length > 0 ? Math.max(...offers.map((o) => o.id)) + 1 : 1;
      const submittedOffer = {
        id: newId,
        candidateId: parseInt(newOffer.candidateId),
        candidateName,
        position: newOffer.position,
        salary: newOffer.salary,
        bonus: newOffer.bonus,
        benefits: newOffer.benefits,
        startDate: newOffer.startDate,
        status: newOffer.status,
        sentDate: new Date().toISOString().split('T')[0],
      };
      const updatedOffers = [...offers, submittedOffer];
      setOffers(updatedOffers);
      localStorage.setItem('offers', JSON.stringify(updatedOffers));
    }

    // Reset modal state
    setIsModalOpen(false);
    setNewOffer({
      candidateId: '',
      position: '',
      salary: '',
      bonus: '',
      benefits: '',
      startDate: '',
      status: 'Pending',
    });
    setEditingOffer(null);
  };

  // Open view modal
  const openViewModal = (offer) => {
    setSelectedOffer(offer);
    setIsViewModalOpen(true);
  };

  // Open edit modal
  const openEditModal = (offer) => {
    setEditingOffer(offer);
    setNewOffer({
      candidateId: offer.candidateId.toString(),
      position: offer.position,
      salary: offer.salary,
      bonus: offer.bonus,
      benefits: offer.benefits,
      startDate: offer.startDate,
      status: offer.status,
    });
    setIsModalOpen(true);
  };


  return (
    <div className="bg-gray-50 p-6 rounded-xl border-2 border-solid border-violet-600">
      {/* Header and Create Button */}
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800"></h3>
        <button
          onClick={() => {
            setEditingOffer(null);
            setNewOffer({
              candidateId: '',
              position: '',
              salary: '',
              bonus: '',
              benefits: '',
              startDate: '',
              status: 'Pending',
            });
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          Create Offer
        </button>
      </div>

      {/* Offers Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-dotted border-violet-600">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Candidate</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Position</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Salary</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Bonus</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Start Date</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {offers.map((offer) => (
              <tr key={offer.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{offer.candidateName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{offer.position}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-semibold">{offer.salary}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{offer.bonus}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{offer.startDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    offer.status === 'Accepted' ? 'bg-green-100 text-green-800' : 
                    offer.status === 'Rejected' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {offer.status === 'Accepted' && <CheckCircle size={14} className="mr-1" />}
                    {offer.status === 'Rejected' && <XCircle size={14} className="mr-1" />}
                    {offer.status === 'Pending' && <Clock size={14} className="mr-1" />}
                    {offer.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => openViewModal(offer)} 
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      onClick={() => openEditModal(offer)} 
                      className="text-green-600 hover:text-green-800 flex items-center gap-1"
                    >
                      <Edit size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {offers.length === 0 && (
              <tr>
                <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
                  No offers available. Click "Create Offer" to add one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto animate-fade-in">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  {editingOffer ? 'Edit Offer' : 'Create Offer'}
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="text-gray-500 hover:text-gray-700 bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              {/* <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Candidate*</label>
                    <select
                      name="candidateId"
                      value={newOffer.candidateId}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    >
                      <option value="">Select Candidate</option>
                      {candidates.map((candidate) => (
                        <option key={candidate.id} value={candidate.id}>
                          {candidate.firstName} {candidate.lastName} - {candidate.position}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Position*</label>
                    <input
                      type="text"
                      name="position"
                      value={newOffer.position}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter position title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Salary*</label>
                    <input
                      type="text"
                      name="salary"
                      value={newOffer.salary}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="$75,000"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bonus</label>
                    <input
                      type="text"
                      name="bonus"
                      value={newOffer.bonus}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="$5,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date*</label>
                    <input
                      type="date"
                      name="startDate"
                      value={newOffer.startDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status*</label>
                    <select
                      name="status"
                      value={newOffer.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Benefits</label>
                    <textarea
                      name="benefits"
                      value={newOffer.benefits}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Health insurance, retirement plans, paid time off, etc."
                    />
                  </div>
                </div>
                <div className="pt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
                  >
                    {editingOffer ? 'Update Offer' : 'Create Offer'}
                  </button>
                </div>
              </form> */}
              <form onSubmit={handleSubmit} className="space-y-8">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Header with decorative element */}
    <div className="md:col-span-2 mb-2">
      <div className="h-1 w-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mb-6"></div>
      <h4 className="text-lg font-semibold text-gray-800 mb-1">Offer Information</h4>
      <p className="text-sm text-gray-500">Enter the details for this job offer</p>
    </div>
    
    {/* Candidate Selection - Full Width */}
    <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Candidate<span className="text-pink-500">*</span>
      </label>
      <select
        name="candidateId"
        value={newOffer.candidateId}
        onChange={handleInputChange}
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
        required
      >
        <option value="">Select Candidate</option>
        {candidates.map((candidate) => (
          <option key={candidate.id} value={candidate.id}>
            {candidate.firstName} {candidate.lastName} - {candidate.position}
          </option>
        ))}
      </select>
    </div>
    
    {/* Position - Left Column */}
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Position<span className="text-pink-500">*</span>
      </label>
      <input
        type="text"
        name="position"
        value={newOffer.position}
        onChange={handleInputChange}
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
        placeholder="Enter position title"
        required
      />
    </div>
    
    {/* Salary - Right Column */}
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Salary<span className="text-pink-500">*</span>
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span className="text-gray-500">$</span>
        </div>
        <input
          type="text"
          name="salary"
          value={newOffer.salary}
          onChange={handleInputChange}
          className="w-full pl-8 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
          placeholder="75,000"
          required
        />
      </div>
    </div>
    
    {/* Bonus - Left Column */}
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Bonus
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span className="text-gray-500">$</span>
        </div>
        <input
          type="text"
          name="bonus"
          value={newOffer.bonus}
          onChange={handleInputChange}
          className="w-full pl-8 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
          placeholder="5,000"
        />
      </div>
    </div>
    
    {/* Start Date - Right Column */}
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Start Date<span className="text-pink-500">*</span>
      </label>
      <input
        type="date"
        name="startDate"
        value={newOffer.startDate}
        onChange={handleInputChange}
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
        required
      />
    </div>
    
    {/* Status with Radio Buttons - Full Width */}
    <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <label className="block text-sm font-medium text-gray-700 mb-4">
        Status<span className="text-pink-500">*</span>
      </label>
      <div className="flex flex-wrap gap-4">
        <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${newOffer.status === 'Pending' ? 'bg-yellow-50 border-yellow-300 shadow-sm' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
          <input
            type="radio"
            name="status"
            value="Pending"
            checked={newOffer.status === 'Pending'}
            onChange={handleInputChange}
            className="hidden"
          />
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${newOffer.status === 'Pending' ? 'border-yellow-500' : 'border-gray-300'}`}>
            {newOffer.status === 'Pending' && (
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            )}
          </div>
          <span className={newOffer.status === 'Pending' ? 'font-medium text-yellow-700' : 'text-gray-700'}>Pending</span>
        </label>
        
        <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${newOffer.status === 'Accepted' ? 'bg-green-50 border-green-300 shadow-sm' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
          <input
            type="radio"
            name="status"
            value="Accepted"
            checked={newOffer.status === 'Accepted'}
            onChange={handleInputChange}
            className="hidden"
          />
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${newOffer.status === 'Accepted' ? 'border-green-500' : 'border-gray-300'}`}>
            {newOffer.status === 'Accepted' && (
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            )}
          </div>
          <span className={newOffer.status === 'Accepted' ? 'font-medium text-green-700' : 'text-gray-700'}>Accepted</span>
        </label>
        
        <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${newOffer.status === 'Rejected' ? 'bg-red-50 border-red-300 shadow-sm' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
          <input
            type="radio"
            name="status"
            value="Rejected"
            checked={newOffer.status === 'Rejected'}
            onChange={handleInputChange}
            className="hidden"
          />
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${newOffer.status === 'Rejected' ? 'border-red-500' : 'border-gray-300'}`}>
            {newOffer.status === 'Rejected' && (
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
            )}
          </div>
          <span className={newOffer.status === 'Rejected' ? 'font-medium text-red-700' : 'text-gray-700'}>Rejected</span>
        </label>
      </div>
    </div>
    
    {/* Benefits - Full Width */}
    <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Benefits
      </label>
      <textarea
        name="benefits"
        value={newOffer.benefits}
        onChange={handleInputChange}
        rows={4}
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
        placeholder="Health insurance, retirement plans, paid time off, etc."
      />
      <p className="mt-2 text-sm text-gray-500">Describe all benefits included in this offer package</p>
    </div>
  </div>
  
  {/* Buttons with gradient */}
  <div className="pt-6 flex justify-end space-x-4">
    <button
      type="button"
      onClick={() => setIsModalOpen(false)}
      className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
    >
      Cancel
    </button>
    <button
      type="submit"
      className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 transition-colors font-medium"
    >
      {editingOffer ? 'Update Offer' : 'Create Offer'}
    </button>
  </div>
</form>
            </div>
          </div>
        </div>
      )}

    
{isViewModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
    <div 
      className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-hidden animate-fade-in"
      style={{
        boxShadow: '0 25px 50px -12px rgba(79, 70, 229, 0.25)'
      }}
    >
      {/* Modal Header with Enhanced Gradient */}
      <div 
        className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-500 rounded-t-2xl p-6 relative"
        style={{
          backgroundSize: '200% 200%',
          animation: 'gradient-animation 3s ease infinite'
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-t-2xl"></div>
        
        <div className="flex items-center">
          <div className="bg-white bg-opacity-20 p-2 rounded-lg mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Offer Details</h3>
            <p className="text-purple-100 text-sm mt-1 opacity-80">Review complete information about this job offer</p>
          </div>
        </div>
        
        <button 
          onClick={() => setIsViewModalOpen(false)} 
          className="absolute top-6 right-6 text-white hover:text-purple-100 bg-white bg-opacity-20 rounded-full p-2 hover:bg-opacity-30 transition-all duration-200 hover:rotate-90 transform"
          style={{
            backdropFilter: 'blur(8px)'
          }}
        >
          <X size={20} />
        </button>
      </div>
      
      {/* Modal Content - with smooth scrolling */}
      <div className="p-6 md:p-8 overflow-y-auto max-h-[70vh]" style={{ scrollBehavior: 'smooth' }}>
        {selectedOffer && (
          <div className="space-y-6 text-gray-700">
            {/* Candidate & Position Cards - Side by side on larger screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Candidate */}
              <div className="flex items-start bg-gradient-to-br from-white to-purple-50 p-5 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full p-3 mr-4 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium text-indigo-500">Candidate</span>
                  <p className="text-lg font-semibold mt-1 text-gray-800">{selectedOffer.candidateName}</p>
                </div>
              </div>
              
              {/* Position */}
              <div className="flex items-start bg-gradient-to-br from-white to-pink-50 p-5 rounded-xl border border-pink-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-full p-3 mr-4 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium text-pink-500">Position</span>
                  <p className="text-lg font-semibold mt-1 text-gray-800">{selectedOffer.position}</p>
                </div>
              </div>
            </div>
            
            {/* Financial Details Card - Enhanced with subtle gradient */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
              <h4 className="text-md font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-emerald-100 p-2 rounded-md mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                Financial Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Salary */}
                <div className="p-4 bg-gradient-to-br from-gray-50 to-emerald-50 rounded-lg border border-emerald-100">
                  <span className="text-sm font-medium text-gray-500">Salary</span>
                  <p className="text-xl font-bold mt-1 text-emerald-600">{selectedOffer.salary}</p>
                </div>
                
                {/* Bonus */}
                <div className="p-4 bg-gradient-to-br from-gray-50 to-indigo-50 rounded-lg border border-indigo-100">
                  <span className="text-sm font-medium text-gray-500">Bonus</span>
                  <p className="text-xl font-semibold mt-1 text-indigo-600">{selectedOffer.bonus || 'None'}</p>
                </div>
              </div>
            </div>
            
            {/* Benefits */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
              <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                <span className="bg-blue-100 p-2 rounded-md mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </span>
                Benefits
              </h4>
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-lg mt-2 border border-blue-100">
                <p className="text-gray-700 leading-relaxed">{selectedOffer.benefits || 'No benefits specified for this offer.'}</p>
              </div>
            </div>
            
            {/* Timeline Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-violet-500"></div>
              <h4 className="text-md font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-purple-100 p-2 rounded-md mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                Timeline & Status
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Start Date */}
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg border border-blue-100">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full p-2 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-blue-600">Start Date</span>
                    <p className="text-sm font-semibold mt-1 text-gray-800">{selectedOffer.startDate}</p>
                  </div>
                </div>
                
                {/* Sent Date */}
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-gray-50 to-purple-50 rounded-lg border border-purple-100">
                  <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-full p-2 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-purple-600">Sent Date</span>
                    <p className="text-sm font-semibold mt-1 text-gray-800">{selectedOffer.sentDate}</p>
                  </div>
                </div>
              </div>
              
              {/* Status Badge - Enhanced with pulsing effect for pending */}
              <div className="mt-6 flex justify-center">
                <div className={`px-6 py-3 inline-flex items-center rounded-full shadow-md ${
                  selectedOffer.status === 'Accepted' ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white' : 
                  selectedOffer.status === 'Rejected' ? 'bg-gradient-to-r from-rose-500 to-red-500 text-white' : 
                  'bg-gradient-to-r from-amber-400 to-yellow-500 text-white animate-pulse'
                }`}
                style={{
                  boxShadow: selectedOffer.status === 'Accepted' ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 
                           selectedOffer.status === 'Rejected' ? '0 4px 12px rgba(239, 68, 68, 0.3)' : 
                           '0 4px 12px rgba(251, 191, 36, 0.3)'
                }}
                >
                  {selectedOffer.status === 'Accepted' && <CheckCircle size={18} className="mr-2" />}
                  {selectedOffer.status === 'Rejected' && <XCircle size={18} className="mr-2" />}
                  {selectedOffer.status === 'Pending' && <Clock size={18} className="mr-2" />}
                  <span className="font-semibold">{selectedOffer.status}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer with action button */}
      <div className="bg-gray-50 p-4 flex justify-end border-t border-gray-100 rounded-b-2xl">
        <button
          onClick={() => setIsViewModalOpen(false)}
          className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:translate-y-0.5 transform"
        >
          Close Details
        </button>
      </div>
    </div>
  </div>
)}

{/* CSS Animation for the header gradient - add to your style sheet */}
{/* 
@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
*/}
    </div>
  );
};

export default Offers;