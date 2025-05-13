import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import ProgressChart from '../components/dashboard/ProgressChart';
import StatsSummary from '../components/dashboard/StatsSummary';
import RecentActivities from '../components/dashboard/RecentActivities';
import useAuth from '../hooks/useAuth';
import useActivities from '../hooks/useActivities';
import useChallenges from '../hooks/useChallenges';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';
import Loader from '../components/common/Loader';

const Dashboard = () => {
  const { user } = useAuth();
  const { activities, isLoading: activitiesLoading, fetchActivities } = useActivities();
  const { userChallenges, isLoading: challengesLoading, fetchUserChallenges } = useChallenges();
  const [stats, setStats] = useState({
    totalActivities: 0,
    activeChallenges: 0,
    completedChallenges: 0,
    streak: 0,
    totalPoints: 0
  });

  useEffect(() => {
    if (user?.id) {
      fetchActivities(user.id);
      fetchUserChallenges(user.id);
    }
  }, [user?.id, fetchActivities, fetchUserChallenges]);

  useEffect(() => {
    if (activities.length && userChallenges) {
      // Calculate stats based on activities and challenges
      setStats({
        totalActivities: activities.length,
        activeChallenges: userChallenges.filter(c => c.status === 'active').length,
        completedChallenges: userChallenges.filter(c => c.status === 'completed').length,
        streak: calculateStreak(activities),
        totalPoints: activities.reduce((sum, activity) => sum + (activity.points || 0), 0)
      });
    }
  }, [activities, userChallenges]);

  // Helper function to calculate activity streak
  const calculateStreak = (activities) => {
    if (!activities.length) return 0;
    
    // Sort activities by date descending
    const sortedActivities = [...activities].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    let streak = 1;
    let currentDate = new Date(sortedActivities[0].date);
    currentDate.setHours(0, 0, 0, 0);
    
    let prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);
    
    for (let i = 1; i < sortedActivities.length; i++) {
      const activityDate = new Date(sortedActivities[i].date);
      activityDate.setHours(0, 0, 0, 0);
      
      if (activityDate.getTime() === prevDate.getTime()) {
        streak++;
        prevDate.setDate(prevDate.getDate() - 1);
      } else if (activityDate.getTime() < prevDate.getTime()) {
        // Skip this date, already counted a different activity for this day
        continue;
      } else {
        // Streak broken
        break;
      }
    }
    
    return streak;
  };

  if (activitiesLoading || challengesLoading) {
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user?.name || 'Fitness Enthusiast'}!</h1>
        <p className="text-gray-600">Here's how you're doing with your fitness goals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="bg-blue-50 border-blue-200">
          <div className="flex flex-col items-center p-4">
            <div className="text-blue-600 font-bold text-3xl">{stats.totalActivities}</div>
            <div className="text-gray-600">Total Activities</div>
          </div>
        </Card>
        
        <Card className="bg-green-50 border-green-200">
          <div className="flex flex-col items-center p-4">
            <div className="text-green-600 font-bold text-3xl">{stats.activeChallenges}</div>
            <div className="text-gray-600">Active Challenges</div>
          </div>
        </Card>
        
        <Card className="bg-purple-50 border-purple-200">
          <div className="flex flex-col items-center p-4">
            <div className="text-purple-600 font-bold text-3xl">{stats.streak}</div>
            <div className="text-gray-600">Day Streak</div>
          </div>
        </Card>
        
        <Card className="bg-orange-50 border-orange-200">
          <div className="flex flex-col items-center p-4">
            <div className="text-orange-600 font-bold text-3xl">{stats.totalPoints}</div>
            <div className="text-gray-600">Total Points</div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Your Progress</h2>
              <div className="flex space-x-2">
                <select className="bg-white border border-gray-300 text-gray-700 py-1 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </div>
            <div className="h-64">
              <ProgressChart activities={activities} />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Active Challenges</h2>
              <Link to="/challenges" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </Link>
            </div>
            
            {userChallenges.filter(c => c.status === 'active').length > 0 ? (
              <div className="space-y-4">
                {userChallenges
                  .filter(c => c.status === 'active')
                  .slice(0, 3)
                  .map(challenge => (
                    <div key={challenge.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-800">{challenge.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(challenge.progress)}`}>
                          {Math.round(challenge.progress)}%
                        </span>
                      </div>
                      <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="bg-blue-600 h-full rounded-full" 
                          style={{ width: `${challenge.progress}%` }}
                        ></div>
                      </div>
                      <div className="mt-2 flex justify-between text-xs text-gray-500">
                        <span>{challenge.startDate}</span>
                        <span>{challenge.endDate}</span>
                      </div>
                    </div>
                  ))}
                
                {userChallenges.filter(c => c.status === 'active').length > 3 && (
                  <div className="text-center mt-2">
                    <Link to="/challenges" className="text-blue-600 hover:text-blue-800 text-sm">
                      +{userChallenges.filter(c => c.status === 'active').length - 3} more challenges
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">You don't have any active challenges</p>
                <Link to="/challenges">
                  <Button variant="primary" size="sm">Join a Challenge</Button>
                </Link>
              </div>
            )}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Recent Activities</h2>
              <Button variant="secondary" size="sm" as={Link} to="/activities/log">
                Log Activity
              </Button>
            </div>
            <RecentActivities activities={activities.slice(0, 5)} />
            {activities.length > 5 && (
              <div className="mt-4 text-center">
                <Link to="/activities" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View All Activities
                </Link>
              </div>
            )}
          </div>
        </Card>
        
        <Card>
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Your Stats</h2>
              <select className="bg-white border border-gray-300 text-gray-700 py-1 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="all">All Time</option>
                <option value="month">This Month</option>
                <option value="week">This Week</option>
              </select>
            </div>
            <StatsSummary stats={{
              totalDistance: activities.reduce((sum, a) => sum + (a.distance || 0), 0),
              totalDuration: activities.reduce((sum, a) => sum + (a.duration || 0), 0),
              completedChallenges: stats.completedChallenges,
              totalCalories: activities.reduce((sum, a) => sum + (a.calories || 0), 0),
              achievements: user?.achievements?.length || 0
            }} />
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

// Helper function to get status color based on progress percentage
const getStatusColor = (progress) => {
  if (progress < 25) return 'bg-red-100 text-red-800';
  if (progress < 50) return 'bg-orange-100 text-orange-800';
  if (progress < 75) return 'bg-yellow-100 text-yellow-800';
  return 'bg-green-100 text-green-800';
};

export default Dashboard;