import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../api/challengesAPI';
import { FiAward, FiTrendingUp } from 'react-icons/fi';
import Loader from '../components/common/Loader';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('weekly'); // weekly, monthly, all-time
  const [challengeId, setChallengeId] = useState('all'); // all or specific challenge id

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);
        const data = await getLeaderboard(filter, challengeId);
        setLeaderboardData(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [filter, challengeId]);

  // Mock data for development
  const mockLeaderboard = [
    { rank: 1, userId: '1', username: 'JohnFitness', points: 1250, achievements: 8, avatar: 'https://i.pravatar.cc/150?img=1' },
    { rank: 2, userId: '2', username: 'SarahRunner', points: 1120, achievements: 7, avatar: 'https://i.pravatar.cc/150?img=5' },
    { rank: 3, userId: '3', username: 'MikeGym', points: 980, achievements: 6, avatar: 'https://i.pravatar.cc/150?img=3' },
    { rank: 4, userId: '4', username: 'EmmaFit', points: 870, achievements: 5, avatar: 'https://i.pravatar.cc/150?img=4' },
    { rank: 5, userId: '5', username: 'DavidTrainer', points: 760, achievements: 6, avatar: 'https://i.pravatar.cc/150?img=6' },
    { rank: 6, userId: '6', username: 'AlexWorkout', points: 640, achievements: 4, avatar: 'https://i.pravatar.cc/150?img=7' },
    { rank: 7, userId: '7', username: 'SophiaActive', points: 590, achievements: 3, avatar: 'https://i.pravatar.cc/150?img=8' },
    { rank: 8, userId: '8', username: 'RobertRace', points: 530, achievements: 4, avatar: 'https://i.pravatar.cc/150?img=9' },
    { rank: 9, userId: '9', username: 'OliviaYoga', points: 470, achievements: 5, avatar: 'https://i.pravatar.cc/150?img=10' },
    { rank: 10, userId: '10', username: 'JamesJump', points: 410, achievements: 3, avatar: 'https://i.pravatar.cc/150?img=11' },
  ];

  // Use mock data if in development mode
  const displayData = process.env.NODE_ENV === 'development' ? mockLeaderboard : leaderboardData;

  // Medal colors for top 3 positions
  const medalColors = {
    1: 'bg-yellow-500',  // Gold
    2: 'bg-gray-300',    // Silver
    3: 'bg-amber-700',   // Bronze
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <FiTrendingUp className="mr-2 text-indigo-600" />
              Leaderboard
            </h1>
            <p className="text-gray-600 mt-1">See who's leading the fitness challenge</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="weekly">This Week</option>
              <option value="monthly">This Month</option>
              <option value="all-time">All Time</option>
            </select>
            
            <select
              value={challengeId}
              onChange={(e) => setChallengeId(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Challenges</option>
              <option value="1">30-Day Running</option>
              <option value="2">Summer Fitness</option>
              <option value="3">Step Master</option>
            </select>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        ) : (
          <div className="overflow-hidden">
            {/* Top 3 Leaders (Featured Section) */}
            <div className="hidden md:flex justify-center gap-4 mb-8">
              {displayData.slice(0, 3).map((user, index) => (
                <div key={user.userId} className="flex flex-col items-center">
                  <div className="relative">
                    <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full ${medalColors[index+1]} flex items-center justify-center text-white font-bold shadow-lg`}>
                      {index + 1}
                    </div>
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-indigo-100">
                      <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <h3 className="font-semibold text-indigo-800">{user.username}</h3>
                    <p className="text-gray-600 font-medium">{user.points} pts</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Leaderboard Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Achievements</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displayData.map((user) => (
                    <tr key={user.userId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {user.rank <= 3 ? (
                            <div className={`w-6 h-6 rounded-full ${medalColors[user.rank]} flex items-center justify-center text-white font-bold mr-2`}>
                              {user.rank}
                            </div>
                          ) : (
                            <span className="text-gray-900 font-medium">{user.rank}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full object-cover" src={user.avatar} alt={user.username} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-semibold">{user.points} pts</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FiAward className="mr-1 text-indigo-600" />
                          <span className="text-sm text-gray-900">{user.achievements}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;