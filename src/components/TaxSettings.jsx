import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiSave, FiX } from 'react-icons/fi';

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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tax Settings</h1>
      <div className="flex justify-end mb-6">
        <button onClick={handleAddRule} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center" disabled={isAdding || isEditing}><FiPlus className="mr-2" /> Add Tax Rule</button>
      </div>

      {(isAdding || isEditing) && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{isAdding ? 'Add New Tax Rule' : 'Edit Tax Rule'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rule Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
                <input type="number" name="taxRate" value={formData.taxRate} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required min="0" max="100" step="0.1" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Amount</label>
                <input type="number" name="minAmount" value={formData.minAmount} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" min="0" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Amount</label>
                <input type="number" name="maxAmount" value={formData.maxAmount} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" min="0" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Applies To</label>
                <select name="appliesTo" value={formData.appliesTo} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="all">All Employees</option>
                  <option value="executives">Executives Only</option>
                  <option value="state-residents">State Residents</option>
                  <option value="non-residents">Non-Residents</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={cancelForm} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center"><FiX className="mr-2" /> Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"><FiSave className="mr-2" /> Save Rule</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Range</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applies To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {taxRules.map(rule => (
                <tr key={rule.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rule.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.taxRate}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.minAmount !== null ? `$${rule.minAmount.toLocaleString()}` : 'No min'} - {rule.maxAmount !== null ? ` $${rule.maxAmount.toLocaleString()}` : ' No max'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {rule.appliesTo === 'all' && 'All Employees'}
                    {rule.appliesTo === 'executives' && 'Executives Only'}
                    {rule.appliesTo === 'state-residents' && 'State Residents'}
                    {rule.appliesTo === 'non-residents' && 'Non-Residents'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{rule.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex gap-2">
                      <button onClick={() => handleEditRule(rule)} className="text-blue-600 hover:text-blue-800"><FiEdit2 /></button>
                      <button onClick={() => handleDeleteRule(rule.id)} className="text-red-600 hover:text-red-800"><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Tax Calculation Example</h2>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Annual Salary</label>
              <input type="number" value={calcSalary} onChange={(e) => setCalcSalary(e.target.value)} placeholder="Enter amount" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employee Type</label>
              <select value={calcEmployeeType} onChange={(e) => setCalcEmployeeType(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="regular">Regular Employee</option>
                <option value="executives">Executive</option>
                <option value="state-residents">State Resident</option>
                <option value="non-residents">Non-Resident</option>
              </select>
            </div>
            <div className="flex items-end">
              <button onClick={handleCalculateTax} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">Calculate Tax</button>
            </div>
          </div>
        </div>
        {calcResult && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-blue-800 mb-2">Estimated Tax Calculation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Applicable Tax Rules:</p>
                <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                  {calcResult.applicableRules.map(rule => (
                    <li key={rule.id}>{rule.name} ({rule.taxRate}%)</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Estimated Tax:</p>
                <p className="text-xl font-bold text-blue-600 mt-1">${calcResult.taxAmount.toFixed(2)} ({calcResult.totalTaxRate}%)</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxSettings;