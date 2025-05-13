import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import ChallengeList from '../components/challenges/ChallengeList';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import useChallenges from '../hooks/useChallenges';
import useAuth from '../hooks/useAuth';

const Challenges = () => {
  const { user } = useAuth();
  const { challenges, userChallenges, isLoading, fetchChallenges, fetchUserChallenges } = useChallenges();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  useEffect(() => {
    fetchChallenges();
    if (user?.id) {
      fetchUserChallenges(user.id);
    }
  }, [fetchChallenges, fetchUserChallenges, user?.id]);
  
  const categories = [
    'Running',
    'Cycling',
    'Swimming',
    'Walking',
    'Yoga',
    'Strength',
    'HIIT',
    'Meditation'
  ];
  
  const getFilteredChallenges = () => {
    // First apply search and category filters
    let filtered = challenges.filter(challenge => {
      const matchesSearch = searchTerm === '' || 
        challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesCategory = categoryFilter === '' || 
        challenge.category === categoryFilter;
        
      return matchesSearch && matchesCategory;
    });
    
    // Then apply user status filter if needed
    if (filter !== 'all' && userChallenges) {
      const userChallengeIds = userChallenges
        .filter(uc => {
          if (filter === 'active') return uc.status === 'active';
          if (filter === 'completed') return uc.status === 'completed';
          return false;
        })
        .map(uc => uc.challengeId);
      
      filtered = filtered.filter(challenge => userChallengeIds.includes(challenge.id));
    }
    
    return filtered;
  };
  
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Fitness Challenges</h1>
          <p className="text-gray-600">Find and join challenges to boost your fitness journey</p>
        </div>
        
        <Link to="/create-challenge">
          <Button variant="primary" className="mt-4 md:mt-0">
            Create Challenge
          </Button>
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <div className="relative">
              <input
                type="text"
                placeholder="Search challenges..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Challenges</option>
              <option value="active">My Active Challenges</option>
              <option value="completed">My Completed Challenges</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex gap-4 overflow-x-auto pb-2 mb-6">
            <button
              className={`px-4 py-2 whitespace-nowrap rounded-full ${
                filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
              }`}
              onClick={() => setFilter('all')}
            >
              All Challenges
            </button>
            <button
              className={`px-4 py-2 whitespace-nowrap rounded-full ${
                filter === 'active' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
              }`}
              onClick={() => setFilter('active')}
            >
              My Active Challenges
            </button>
            <button
              className={`px-4 py-2 whitespace-nowrap rounded-full ${
                filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
              }`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
          
          <ChallengeList 
            challenges={getFilteredChallenges()} 
            userChallenges={userChallenges} 
          />
          
          {getFilteredChallenges().length === 0 && (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No challenges found</h3>
              <p className="mt-1 text-gray-500">
                {filter !== 'all'
                  ? `You don't have any ${filter} challenges.`
                  : 'Try adjusting your search or filters, or create a new challenge.'}
              </p>
              {filter !== 'all' && (
                <Button
                  variant="secondary"
                  className="mt-4"
                  onClick={() => setFilter('all')}
                >
                  View All Challenges
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Challenges;