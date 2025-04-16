// import React, { useState, useEffect } from 'react';
// import { FiPlus, FiTrash2, FiEdit2, FiSave, FiX } from 'react-icons/fi';

// const TaxSettings = () => {
//   const [taxRules, setTaxRules] = useState([]);
//   const [isAdding, setIsAdding] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentRule, setCurrentRule] = useState(null);
//   const [formData, setFormData] = useState({ name: '', description: '', taxRate: '', minAmount: '', maxAmount: '', appliesTo: 'all' });
//   const [calcSalary, setCalcSalary] = useState('');
//   const [calcEmployeeType, setCalcEmployeeType] = useState('regular');
//   const [calcResult, setCalcResult] = useState(null);

//   useEffect(() => {
//     const storedTaxRules = localStorage.getItem('payroll_taxRules');
//     if (storedTaxRules) {
//       setTaxRules(JSON.parse(storedTaxRules));
//     } else {
//       const dummyRules = [
//         { id: 1, name: 'Standard Income Tax', description: 'Basic income tax for all employees', taxRate: 15, minAmount: 0, maxAmount: 50000, appliesTo: 'all' },
//         { id: 2, name: 'High Income Tax', description: 'Additional tax for high earners', taxRate: 20, minAmount: 50001, maxAmount: 100000, appliesTo: 'all' },
//         { id: 3, name: 'Executive Tax', description: 'Tax rate for executive level employees', taxRate: 25, minAmount: 100001, maxAmount: null, appliesTo: 'executives' },
//         { id: 4, name: 'State Tax', description: 'Additional state tax', taxRate: 5, minAmount: 0, maxAmount: null, appliesTo: 'state-residents' },
//       ];
//       setTaxRules(dummyRules);
//       localStorage.setItem('payroll_taxRules', JSON.stringify(dummyRules));
//     }
//   }, []);

//   useEffect(() => {
//     if (taxRules.length > 0) {
//       localStorage.setItem('payroll_taxRules', JSON.stringify(taxRules));
//     }
//   }, [taxRules]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleAddRule = () => {
//     setIsAdding(true);
//     setFormData({ name: '', description: '', taxRate: '', minAmount: '', maxAmount: '', appliesTo: 'all' });
//   };

//   const handleEditRule = (rule) => {
//     setIsEditing(true);
//     setCurrentRule(rule);
//     setFormData({ name: rule.name, description: rule.description, taxRate: rule.taxRate, minAmount: rule.minAmount, maxAmount: rule.maxAmount, appliesTo: rule.appliesTo });
//   };

//   const handleDeleteRule = (id) => {
//     if (window.confirm('Are you sure you want to delete this tax rule?')) {
//       setTaxRules(taxRules.filter(rule => rule.id !== id));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newRule = {
//       id: isAdding ? taxRules.length + 1 : currentRule.id,
//       ...formData,
//       taxRate: Number(formData.taxRate),
//       minAmount: formData.minAmount ? Number(formData.minAmount) : null,
//       maxAmount: formData.maxAmount ? Number(formData.maxAmount) : null
//     };
//     if (isAdding) {
//       setTaxRules([...taxRules, newRule]);
//     } else {
//       setTaxRules(taxRules.map(rule => rule.id === currentRule.id ? newRule : rule));
//     }
//     setIsAdding(false);
//     setIsEditing(false);
//   };

//   const cancelForm = () => {
//     setIsAdding(false);
//     setIsEditing(false);
//   };

//   const calculateTax = (salary, employeeType) => {
//     const applicableRules = taxRules.filter(rule => {
//       const inRange = (rule.minAmount === null || salary >= rule.minAmount) && (rule.maxAmount === null || salary <= rule.maxAmount);
//       const applies = rule.appliesTo === 'all' || rule.appliesTo === employeeType;
//       return inRange && applies;
//     });
//     const totalTaxRate = applicableRules.reduce((sum, rule) => sum + rule.taxRate, 0);
//     const taxAmount = (salary * totalTaxRate) / 100;
//     return { totalTaxRate, taxAmount, applicableRules };
//   };

//   const handleCalculateTax = () => {
//     const salary = Number(calcSalary);
//     if (isNaN(salary) || salary <= 0) {
//       alert('Please enter a valid salary');
//       return;
//     }
//     const result = calculateTax(salary, calcEmployeeType);
//     setCalcResult(result);
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">Tax Settings</h1>
//       <div className="flex justify-end mb-6">
//         <button onClick={handleAddRule} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center" disabled={isAdding || isEditing}><FiPlus className="mr-2" /> Add Tax Rule</button>
//       </div>

//       {(isAdding || isEditing) && (
//         <div className="bg-white rounded-lg shadow p-6 mb-6">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">{isAdding ? 'Add New Tax Rule' : 'Edit Tax Rule'}</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Rule Name</label>
//                 <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
//                 <input type="number" name="taxRate" value={formData.taxRate} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required min="0" max="100" step="0.1" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Amount</label>
//                 <input type="number" name="minAmount" value={formData.minAmount} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" min="0" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Amount</label>
//                 <input type="number" name="maxAmount" value={formData.maxAmount} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" min="0" />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Applies To</label>
//                 <select name="appliesTo" value={formData.appliesTo} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
//                   <option value="all">All Employees</option>
//                   <option value="executives">Executives Only</option>
//                   <option value="state-residents">State Residents</option>
//                   <option value="non-residents">Non-Residents</option>
//                 </select>
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                 <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
//               </div>
//             </div>
//             <div className="mt-6 flex justify-end gap-3">
//               <button type="button" onClick={cancelForm} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center"><FiX className="mr-2" /> Cancel</button>
//               <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"><FiSave className="mr-2" /> Save Rule</button>
//             </div>
//           </form>
//         </div>
//       )}

//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Range</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applies To</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {taxRules.map(rule => (
//                 <tr key={rule.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rule.name}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.taxRate}%</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.minAmount !== null ? `$${rule.minAmount.toLocaleString()}` : 'No min'} - {rule.maxAmount !== null ? ` $${rule.maxAmount.toLocaleString()}` : ' No max'}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {rule.appliesTo === 'all' && 'All Employees'}
//                     {rule.appliesTo === 'executives' && 'Executives Only'}
//                     {rule.appliesTo === 'state-residents' && 'State Residents'}
//                     {rule.appliesTo === 'non-residents' && 'Non-Residents'}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">{rule.description}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     <div className="flex gap-2">
//                       <button onClick={() => handleEditRule(rule)} className="text-blue-600 hover:text-blue-800"><FiEdit2 /></button>
//                       <button onClick={() => handleDeleteRule(rule.id)} className="text-red-600 hover:text-red-800"><FiTrash2 /></button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow p-6 mt-6">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">Tax Calculation Example</h2>
//         <div className="bg-gray-50 p-4 rounded-lg mb-4">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Annual Salary</label>
//               <input type="number" value={calcSalary} onChange={(e) => setCalcSalary(e.target.value)} placeholder="Enter amount" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Employee Type</label>
//               <select value={calcEmployeeType} onChange={(e) => setCalcEmployeeType(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
//                 <option value="regular">Regular Employee</option>
//                 <option value="executives">Executive</option>
//                 <option value="state-residents">State Resident</option>
//                 <option value="non-residents">Non-Resident</option>
//               </select>
//             </div>
//             <div className="flex items-end">
//               <button onClick={handleCalculateTax} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">Calculate Tax</button>
//             </div>
//           </div>
//         </div>
//         {calcResult && (
//           <div className="bg-blue-50 p-4 rounded-lg">
//             <h3 className="text-lg font-medium text-blue-800 mb-2">Estimated Tax Calculation</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm text-gray-600">Applicable Tax Rules:</p>
//                 <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
//                   {calcResult.applicableRules.map(rule => (
//                     <li key={rule.id}>{rule.name} ({rule.taxRate}%)</li>
//                   ))}
//                 </ul>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Total Estimated Tax:</p>
//                 <p className="text-xl font-bold text-blue-600 mt-1">${calcResult.taxAmount.toFixed(2)} ({calcResult.totalTaxRate}%)</p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TaxSettings;

import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiSave, FiX, FiDollarSign, FiPercent } from 'react-icons/fi';

const TaxSettings = () => {
  const [taxRules, setTaxRules] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRule, setCurrentRule] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', taxRate: '', minAmount: '', maxAmount: '', appliesTo: 'all' });
  const [calcSalary, setCalcSalary] = useState('');
  const [calcEmployeeType, setCalcEmployeeType] = useState('regular');
  const [calcResult, setCalcResult] = useState(null);

  useEffect(() => {
    const storedTaxRules = localStorage.getItem('payroll_taxRules');
    if (storedTaxRules) {
      setTaxRules(JSON.parse(storedTaxRules));
    } else {
      const dummyRules = [
        { id: 1, name: 'Standard Income Tax', description: 'Basic income tax for all employees', taxRate: 15, minAmount: 0, maxAmount: 50000, appliesTo: 'all' },
        { id: 2, name: 'High Income Tax', description: 'Additional tax for high earners', taxRate: 20, minAmount: 50001, maxAmount: 100000, appliesTo: 'all' },
        { id: 3, name: 'Executive Tax', description: 'Tax rate for executive level employees', taxRate: 25, minAmount: 100001, maxAmount: null, appliesTo: 'executives' },
        { id: 4, name: 'State Tax', description: 'Additional state tax', taxRate: 5, minAmount: 0, maxAmount: null, appliesTo: 'state-residents' },
      ];
      setTaxRules(dummyRules);
      localStorage.setItem('payroll_taxRules', JSON.stringify(dummyRules));
    }
  }, []);

  useEffect(() => {
    if (taxRules.length > 0) {
      localStorage.setItem('payroll_taxRules', JSON.stringify(taxRules));
    }
  }, [taxRules]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddRule = () => {
    setIsAdding(true);
    setFormData({ name: '', description: '', taxRate: '', minAmount: '', maxAmount: '', appliesTo: 'all' });
  };

  const handleEditRule = (rule) => {
    setIsEditing(true);
    setCurrentRule(rule);
    setFormData({ name: rule.name, description: rule.description, taxRate: rule.taxRate, minAmount: rule.minAmount, maxAmount: rule.maxAmount, appliesTo: rule.appliesTo });
  };

  const handleDeleteRule = (id) => {
    if (window.confirm('Are you sure you want to delete this tax rule?')) {
      setTaxRules(taxRules.filter(rule => rule.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRule = {
      id: isAdding ? taxRules.length + 1 : currentRule.id,
      ...formData,
      taxRate: Number(formData.taxRate),
      minAmount: formData.minAmount ? Number(formData.minAmount) : null,
      maxAmount: formData.maxAmount ? Number(formData.maxAmount) : null
    };
    if (isAdding) {
      setTaxRules([...taxRules, newRule]);
    } else {
      setTaxRules(taxRules.map(rule => rule.id === currentRule.id ? newRule : rule));
    }
    setIsAdding(false);
    setIsEditing(false);
  };

  const cancelForm = () => {
    setIsAdding(false);
    setIsEditing(false);
  };

  const calculateTax = (salary, employeeType) => {
    const applicableRules = taxRules.filter(rule => {
      const inRange = (rule.minAmount === null || salary >= rule.minAmount) && (rule.maxAmount === null || salary <= rule.maxAmount);
      const applies = rule.appliesTo === 'all' || rule.appliesTo === employeeType;
      return inRange && applies;
    });
    const totalTaxRate = applicableRules.reduce((sum, rule) => sum + rule.taxRate, 0);
    const taxAmount = (salary * totalTaxRate) / 100;
    return { totalTaxRate, taxAmount, applicableRules };
  };

  const handleCalculateTax = () => {
    const salary = Number(calcSalary);
    if (isNaN(salary) || salary <= 0) {
      alert('Please enter a valid salary');
      return;
    }
    const result = calculateTax(salary, calcEmployeeType);
    setCalcResult(result);
  };

  // Map employee types to more readable labels
  const employeeTypeLabels = {
    'all': 'All Employees',
    'executives': 'Executives Only',
    'state-residents': 'State Residents',
    'non-residents': 'Non-Residents',
    'regular': 'Regular Employee'
  };

  // Get badge color based on tax rate
  const getTaxRateBadgeColor = (rate) => {
    if (rate <= 10) return 'bg-emerald-100 text-emerald-800';
    if (rate <= 20) return 'bg-blue-100 text-blue-800';
    return 'bg-purple-100 text-purple-800';
  };

  return (
    <div className=" bg-gray-50 min-h-screen p-6 border border-violet-600">
      <div className="max-w-9xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-indigo-900 flex items-center">
            <span className="bg-indigo-600 text-white p-2 rounded-lg mr-3">
              <FiPercent />
            </span>
            Tax Settings
          </h1>
          <button 
            onClick={handleAddRule} 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-2 px-6 rounded-full shadow-lg flex items-center transition duration-300" 
            disabled={isAdding || isEditing}
          >
            <FiPlus className="mr-2" /> Add Tax Rule
          </button>
        </div>

        {(isAdding || isEditing) && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-l-4 border-indigo-500 animate-fadeIn">
            <h2 className="text-xl font-semibold text-indigo-800 mb-6 flex items-center">
              {isAdding ? <FiPlus className="mr-2 text-indigo-600" /> : <FiEdit2 className="mr-2 text-indigo-600" />}
              {isAdding ? 'Add New Tax Rule' : 'Edit Tax Rule'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-sm font-medium text-indigo-700 mb-2 transition group-hover:text-indigo-600">Rule Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-3 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" 
                    required 
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-indigo-700 mb-2 transition group-hover:text-indigo-600">Tax Rate (%)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPercent className="text-indigo-400" />
                    </div>
                    <input 
                      type="number" 
                      name="taxRate" 
                      value={formData.taxRate} 
                      onChange={handleInputChange} 
                      className="w-full pl-10 px-4 py-3 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" 
                      required 
                      min="0" 
                      max="100" 
                      step="0.1" 
                    />
                  </div>
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-indigo-700 mb-2 transition group-hover:text-indigo-600">Minimum Amount</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiDollarSign className="text-indigo-400" />
                    </div>
                    <input 
                      type="number" 
                      name="minAmount" 
                      value={formData.minAmount} 
                      onChange={handleInputChange} 
                      className="w-full pl-10 px-4 py-3 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" 
                      min="0" 
                      placeholder="No minimum"
                    />
                  </div>
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-indigo-700 mb-2 transition group-hover:text-indigo-600">Maximum Amount</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiDollarSign className="text-indigo-400" />
                    </div>
                    <input 
                      type="number" 
                      name="maxAmount" 
                      value={formData.maxAmount} 
                      onChange={handleInputChange} 
                      className="w-full pl-10 px-4 py-3 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" 
                      min="0" 
                      placeholder="No maximum"
                    />
                  </div>
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-indigo-700 mb-2 transition group-hover:text-indigo-600">Applies To</label>
                  <select 
                    name="appliesTo" 
                    value={formData.appliesTo} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-3 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition appearance-none bg-white"
                  >
                    <option value="all">All Employees</option>
                    <option value="executives">Executives Only</option>
                    <option value="state-residents">State Residents</option>
                    <option value="non-residents">Non-Residents</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-indigo-700 mb-2 transition group-hover:text-indigo-600">Description</label>
                  <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-3 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" 
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <div className="mt-8 flex justify-end gap-4">
                <button 
                  type="button" 
                  onClick={cancelForm} 
                  className="px-6 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 flex items-center transition"
                >
                  <FiX className="mr-2" /> Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full shadow-md hover:shadow-lg flex items-center transition"
                >
                  <FiSave className="mr-2" /> Save Rule
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-indigo-100">
              <thead className="bg-gradient-to-r from-indigo-500 to-purple-500">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Rate</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Amount Range</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Applies To</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Description</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-indigo-50">
                {taxRules.map((rule, index) => (
                  <tr key={rule.id} className={`hover:bg-indigo-50 transition ${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-900">{rule.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${getTaxRateBadgeColor(rule.taxRate)}`}>
                        {rule.taxRate}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {rule.minAmount !== null ? `$${rule.minAmount.toLocaleString()}` : 'No min'} 
                      <span className="text-indigo-400 mx-2">to</span> 
                      {rule.maxAmount !== null ? `$${rule.maxAmount.toLocaleString()}` : 'No max'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-sm leading-5 font-medium rounded-full bg-indigo-100 text-indigo-800">
                        {employeeTypeLabels[rule.appliesTo]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">{rule.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-4">
                        <button 
                          onClick={() => handleEditRule(rule)} 
                          className="text-indigo-600 hover:text-indigo-900 transition"
                          title="Edit rule"
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDeleteRule(rule.id)} 
                          className="text-rose-600 hover:text-rose-900 transition"
                          title="Delete rule"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-semibold text-indigo-800 mb-6 flex items-center">
            <span className="mr-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-2 rounded-lg">
              <FiDollarSign />
            </span>
            Tax Calculation Example
          </h2>
          <div className="bg-indigo-50 p-6 rounded-xl mb-6 border border-indigo-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-indigo-700 mb-2">Annual Salary</label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiDollarSign className="text-indigo-400" />
                  </div>
                  <input 
                    type="number" 
                    value={calcSalary} 
                    onChange={(e) => setCalcSalary(e.target.value)} 
                    placeholder="Enter amount" 
                    className="w-full pl-10 pr-4 py-3 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-indigo-700 mb-2">Employee Type</label>
                <select 
                  value={calcEmployeeType} 
                  onChange={(e) => setCalcEmployeeType(e.target.value)} 
                  className="w-full px-4 py-3 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition appearance-none bg-white"
                >
                  <option value="regular">Regular Employee</option>
                  <option value="executives">Executive</option>
                  <option value="state-residents">State Resident</option>
                  <option value="non-residents">Non-Resident</option>
                </select>
              </div>
              <div className="flex items-end">
                <button 
                  onClick={handleCalculateTax} 
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition"
                >
                  Calculate Tax
                </button>
              </div>
            </div>
          </div>
          {calcResult && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-indigo-100 animate-fadeIn">
              <h3 className="text-lg font-medium text-indigo-800 mb-4 pb-2 border-b border-indigo-100">Estimated Tax Calculation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-indigo-700 mb-2">Applicable Tax Rules:</p>
                  <ul className="space-y-2">
                    {calcResult.applicableRules.map(rule => (
                      <li key={rule.id} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                        <span>{rule.name}</span>
                        <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getTaxRateBadgeColor(rule.taxRate)}`}>
                          {rule.taxRate}%
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-indigo-100">
                  <p className="text-sm font-medium text-indigo-700 mb-2">Total Estimated Tax:</p>
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold text-indigo-600">${calcResult.taxAmount.toFixed(2)}</p>
                    <span className="bg-indigo-100 text-indigo-800 text-lg font-medium px-4 py-1 rounded-full">
                      {calcResult.totalTaxRate}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaxSettings;