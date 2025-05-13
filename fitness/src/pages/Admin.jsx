import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../context/AuthContext';
import DashboardLayout from '../layouts/DashboardLayout';
import ChallengeManager from '../components/admin/ChallengeManager';
import UserManager from '../components/admin/UserManager';
import { FiUsers, FiAward, FiSettings } from 'react-icons/fi';

const Admin = () => {
  const { user, isAdmin } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('users');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check admin status and redirect if not admin
    if (user && !isAdmin) {
      window.location.href = '/dashboard';
    }
    
    setIsLoading(false);
  }, [user, isAdmin]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | FitChallenge</title>
      </Helmet>
      <DashboardLayout>
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">
              Admin Dashboard
            </h1>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === 'users'
                    ? 'text-primary-600 border-b-2 border-primary-600 dark:text-primary-400 dark:border-primary-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
                onClick={() => setActiveTab('users')}
              >
                <FiUsers className="inline mr-2" /> Users
              </button>
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === 'challenges'
                    ? 'text-primary-600 border-b-2 border-primary-600 dark:text-primary-400 dark:border-primary-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
                onClick={() => setActiveTab('challenges')}
              >
                <FiAward className="inline mr-2" /> Challenges
              </button>
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === 'settings'
                    ? 'text-primary-600 border-b-2 border-primary-600 dark:text-primary-400 dark:border-primary-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
                onClick={() => setActiveTab('settings')}
              >
                <FiSettings className="inline mr-2" /> Settings
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'users' && <UserManager />}
              {activeTab === 'challenges' && <ChallengeManager />}
              {activeTab === 'settings' && (
                <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-md border border-yellow-200 dark:border-yellow-700">
                  <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">
                    Site Settings
                  </h3>
                  <p className="mt-2 text-sm text-yellow-700 dark:text-yellow-200">
                    This section is under development. Settings functionality will be available soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Admin;