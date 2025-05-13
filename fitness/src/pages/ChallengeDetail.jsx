import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FiClock, FiFlag, FiCalendar, FiUsers, FiTrendingUp, FiPlusCircle, FiEdit, FiShare2 } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import DashboardLayout from '../layouts/DashboardLayout';
import ChallengeDetails from '../components/challenges/ChallengeDetails';
import LogActivityForm from '../components/activities/LogActivityForm';
import ActivityLog from '../components/activities/ActivityLog';
import LeaderboardTable from '../components/leaderboard/LeaderboardTable';
import { getChallenge, joinChallenge, leaveChallenge } from '../api/challengesAPI';
import { getChallengeActivities } from '../api/activitiesAPI';
import { getChallengeLeaderboard } from '../api/challengesAPI';

const ChallengeDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [activities, setActivities] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [isParticipant, setIsParticipant] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const [showLogForm, setShowLogForm] = useState(false);

  useEffect(() => {
    const fetchChallengeData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch challenge details
        const challengeData = await getChallenge(id);
        setChallenge(challengeData);
        
        // Check if user is a participant
        setIsParticipant(challengeData.participants?.some(p => p.id === user?.id) || false);
        
        // Fetch challenge activities
        const activitiesData = await getChallengeActivities(id);
        setActivities(activitiesData);
        
        // Fetch leaderboard
        const leaderboardData = await getChallengeLeaderboard(id);
        setLeaderboard(leaderboardData);
        
      } catch (err) {
        console.error('Error fetching challenge data:', err);
        setError(err.message || 'Failed to load challenge');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchChallengeData();
    }
  }, [id, user?.id]);

  const handleJoinChallenge = async () => {
    try {
      await joinChallenge(id);
      setIsParticipant(true);
      // Refresh challenge data
      const challengeData = await getChallenge(id);
      setChallenge(challengeData);
    } catch (err) {
      console.error('Error joining challenge:', err);
      setError(err.message || 'Failed to join challenge');
    }
  };

  const handleLeaveChallenge = async () => {
    try {
      await leaveChallenge(id);
      setIsParticipant(false);
      // Refresh challenge data
      const challengeData = await getChallenge(id);
      setChallenge(challengeData);
    } catch (err) {
      console.error('Error leaving challenge:', err);
      setError(err.message || 'Failed to leave challenge');
    }
  };

  const handleActivityLogged = async (newActivity) => {
    // Update activities list with new activity
    setActivities([newActivity, ...activities]);
    setShowLogForm(false);
    
    // Refresh leaderboard after logging activity
    try {
      const leaderboardData = await getChallengeLeaderboard(id);
      setLeaderboard(leaderboardData);
    } catch (err) {
      console.error('Error refreshing leaderboard:', err);
    }
  };

  const shareChallenge = () => {
    if (navigator.share) {
      navigator.share({
        title: challenge.name,
        text: `Join me in the ${challenge.name} fitness challenge!`,
        url: window.location.href,
      });
    } else {
      // Copy link to clipboard as fallback
      navigator.clipboard.writeText(window.location.href);
      alert('Challenge link copied to clipboard!');
    }
  };

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

  if (error) {
    return (
      <DashboardLayout>
        <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-md border border-red-200 dark:border-red-700">
          <h3 className="text-lg font-medium text-red-800 dark:text-red-300">Error</h3>
          <p className="mt-2 text-sm text-red-700 dark:text-red-200">{error}</p>
          <button
            onClick={() => navigate('/challenges')}
            className="mt-3 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
          >
            Back to Challenges
          </button>
        </div>
      </DashboardLayout>
    );
  }

  if (!challenge) {
    return (
      <DashboardLayout>
        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-md border border-yellow-200 dark:border-yellow-700">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">
            Challenge Not Found
          </h3>
          <p className="mt-2 text-sm text-yellow-700 dark:text-yellow-200">
            The challenge you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/challenges"
            className="mt-3 text-sm font-medium text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300"
          >
            Back to Challenges
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <>
      <Helmet>
        <title>{challenge.name} | FitChallenge</title>
      </Helmet>
      <DashboardLayout>
        <div className="container mx-auto px-4 py-6">
          {/* Challenge Header */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden mb-6">
            <div className="h-40 bg-gradient-to-r from-primary-600 to-primary-400 relative">
              {challenge.image && (
                <img
                  src={challenge.image}
                  alt={challenge.name}
                  className="object-cover w-full h-full opacity-30"
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-3xl font-bold text-white">{challenge.name}</h1>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-wrap justify-between items-center mb-4">
                <div className="flex flex-wrap items-center gap-4 mb-2 md:mb-0">
                  <span className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <FiClock className="mr-1" />
                    {challenge.duration} days
                  </span>
                  <span className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <FiFlag className="mr-1" />
                    Goal: {challenge.goal} {challenge.goalUnit}
                  </span>
                  <span className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <FiCalendar className="mr-1" />
                    {new Date(challenge.startDate).toLocaleDateString()} - {new Date(challenge.endDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <FiUsers className="mr-1" />
                    {challenge.participants?.length || 0} participants
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  {user?.role === 'admin' && (
                    <Link
                      to={`/challenges/edit/${challenge.id}`}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <FiEdit className="mr-1" /> Edit
                    </Link>
                  )}
                  
                  <button
                    onClick={shareChallenge}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <FiShare2 className="mr-1" /> Share
                  </button>
                  
                  {isParticipant ? (
                    <button
                      onClick={handleLeaveChallenge}
                      className="inline-flex items-center px-3 py-1.5 border border-red-300 dark:border-red-700 rounded-md text-sm font-medium text-red-700 dark:text-red-300 bg-white dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      Leave Challenge
                    </button>
                  ) : (
                    <button
                      onClick={handleJoinChallenge}
                      className="inline-flex items-center px-3 py-1.5 border border-primary-600 rounded-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none"
                    >
                      Join Challenge
                    </button>
                  )}
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300">{challenge.description}</p>
            </div>
          </div>
          
          {/* Challenge Content Tabs */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === 'details'
                    ? 'text-primary-600 border-b-2 border-primary-600 dark:text-primary-400 dark:border-primary-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
                onClick={() => setActiveTab('details')}
              >
                Details
              </button>
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === 'activities'
                    ? 'text-primary-600 border-b-2 border-primary-600 dark:text-primary-400 dark:border-primary-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
                onClick={() => setActiveTab('activities')}
              >
                Activities
              </button>
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === 'leaderboard'
                    ? 'text-primary-600 border-b-2 border-primary-600 dark:text-primary-400 dark:border-primary-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
                onClick={() => setActiveTab('leaderboard')}
              >
                <FiTrendingUp className="inline mr-1" /> Leaderboard
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'details' && (
                <ChallengeDetails challenge={challenge} />
              )}
              
              {activeTab === 'activities' && (
                <div>
                  {isParticipant && (
                    <div className="mb-6">
                      {showLogForm ? (
                        <LogActivityForm
                          challengeId={challenge.id}
                          onLogActivity={handleActivityLogged}
                          onCancel={() => setShowLogForm(false)}
                        />
                      ) : (
                        <button
                          onClick={() => setShowLogForm(true)}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none"
                        >
                          <FiPlusCircle className="mr-2" /> Log Activity
                        </button>
                      )}
                    </div>
                  )}
                  
                  <ActivityLog activities={activities} challengeId={challenge.id} />
                </div>
              )}
              
              {activeTab === 'leaderboard' && (
                <LeaderboardTable leaderboard={leaderboard} challenge={challenge} />
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default ChallengeDetail;