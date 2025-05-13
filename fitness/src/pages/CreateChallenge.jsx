import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createChallenge } from '../api/challengesAPI';
import Button from '../components/common/Button';
import { toast } from 'react-hot-toast';
import { FiCalendar, FiTarget, FiAward, FiInfo } from 'react-icons/fi';

const CreateChallenge = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    goalType: 'distance', // distance, steps, calories, etc.
    goalValue: '',
    reward: '',
    isPublic: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.description || !formData.startDate || 
        !formData.endDate || !formData.goalValue) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      setIsLoading(true);
      await createChallenge(formData);
      toast.success('Challenge created successfully!');
      navigate('/challenges');
    } catch (error) {
      console.error('Error creating challenge:', error);
      toast.error('Failed to create challenge. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Challenge</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <FiAward className="mr-2 text-indigo-600" />
                Challenge Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., 30-Day Running Challenge"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <FiInfo className="mr-2 text-indigo-600" />
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Describe your challenge..."
                rows="4"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2 flex items-center">
                  <FiCalendar className="mr-2 text-indigo-600" />
                  Start Date *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2 flex items-center">
                  <FiCalendar className="mr-2 text-indigo-600" />
                  End Date *
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2 flex items-center">
                  <FiTarget className="mr-2 text-indigo-600" />
                  Goal Type *
                </label>
                <select
                  name="goalType"
                  value={formData.goalType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="distance">Distance (km)</option>
                  <option value="steps">Steps</option>
                  <option value="calories">Calories</option>
                  <option value="workouts">Workouts</option>
                  <option value="minutes">Active Minutes</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2 flex items-center">
                  <FiTarget className="mr-2 text-indigo-600" />
                  Goal Value *
                </label>
                <input
                  type="number"
                  name="goalValue"
                  value={formData.goalValue}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., 100"
                  min="1"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <FiAward className="mr-2 text-indigo-600" />
                Reward
              </label>
              <input
                type="text"
                name="reward"
                value={formData.reward}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., Badge, Points, Real-world reward"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPublic"
                name="isPublic"
                checked={formData.isPublic}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="isPublic" className="ml-2 block text-gray-700">
                Make this challenge public
              </label>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button 
              type="button" 
              onClick={() => navigate('/challenges')}
              variant="outline"
              className="px-6"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              isLoading={isLoading}
              className="px-6"
            >
              Create Challenge
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChallenge;