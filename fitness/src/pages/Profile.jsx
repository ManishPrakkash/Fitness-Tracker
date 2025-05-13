import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserProfile, updateUserProfile } from '../api/usersAPI';
import { getUserActivities } from '../api/activitiesAPI';
import { getUserChallenges } from '../api/challengesAPI';
import Loader from '../components/common/Loader';
import Button from '../components/common/Button';
import ProfileInfo from '../components/profile/ProfileInfo';
import AchievementSection from '../components/profile/AchievementSection';
import { toast } from 'react-hot-toast';
import { FiEdit, FiActivity, FiTrophy, FiUser } from 'react-icons/fi';

const Profile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [activities, setActivities] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    bio: '',
    fitnessGoals: '',
    preferredActivities: '',
  });
  const [activeTab, setActiveTab] = useState('activities');

  // Check if viewing own profile or someone else's
  const isOwnProfile = !userId; // No userId in params means viewing own profile

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        const profileData = await getUserProfile(userId);
        setProfile(profileData);
        setEditForm({
          username: profileData.username,
          email: profileData.email,
          bio: profileData.bio || '',
          fitnessGoals: profileData.fitnessGoals || '',
          preferredActivities: profileData.preferredActivities || '',
        });

        const activitiesData = await getUserActivities(userId || profileData.id);
        setActivities(activitiesData);

        const challengesData = await getUserChallenges(userId || profileData.id);
        setChallenges(challengesData);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        toast.error('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  // Mock data for development
  const mockProfile = {
    id: '1',
    username: 'FitnessEnthusiast',
    email: 'fitness@example.com',
    bio: 'Passionate about fitness and healthy living. Always looking for new challenges!',
    fitnessGoals: 'Run a marathon, improve core strength, and maintain overall wellness.',
    preferredActivities: 'Running, yoga, weightlifting, hiking',
    joinDate: '2023-03-15',
    totalPoints: 1580,
    level: 8,
    avatar: 'https://i.pravatar.cc/300',
    achievements: [
      { id: 1, title: 'First Steps', description: 'Complete your first activity', date: '2023-03-16', icon: '🏃‍♂️' },
      { id: 2, title: 'Challenge Accepted', description: 'Join your first challenge', date: '2023-03-18', icon: '🏆' },
      { id: 3, title: 'Consistency King', description: 'Log activity for 7 days in a row', date: '2023-03-25', icon: '📆' },
      { id: 4, title: 'Social Butterfly', description: 'Invite 3 friends to the platform', date: '2023-04-05', icon: '🦋' },
    ]
  };

  const mockActivities = [
    { id: 1, type: 'Running', duration: 45, distance: 5.2, calories: 420, date: '2023-05-12' },
    { id: 2, type: 'Cycling', duration: 60, distance: 15, calories: 350, date: '2023-05-10' },
    { id: 3, type: 'Swimming', duration: 30, distance: 1, calories: 280, date: '2023-05-08' },
    { id: 4, type: 'Yoga', duration: 40, distance: 0, calories: 180, date: '2023-05-05' },
    { id: 5, type: 'Running', duration: 50, distance: 6, calories: 480, date: '2023-05-03' },
  ];

  const mockChallenges = [
    { id: 1, title: '30-Day Running Challenge', progress: 65, endDate: '2023-06-10', status: 'active' },
    { id: 2, title: 'Summer Body Prep', progress: 100, endDate: '2023-04-30', status: 'completed' },
    { id: 3, title: 'Team Step Challenge', progress: 88, endDate: '2023-04-15', status: 'completed' },
    { id: 4, title: 'Morning Yoga Series', progress: 50, endDate: '2023-03-20', status: 'abandoned' },
  ];

  // Use mock data if in development mode
  const displayProfile = process.env.NODE_ENV === 'development' ? mockProfile : profile;
  const displayActivities = process.env.NODE_ENV === 'development' ? mockActivities : activities;
  const displayChallenges = process.env.NODE_ENV === 'development' ? mockChallenges : challenges;

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  const handleSaveProfile = async () => {
    try {
      await updateUserProfile(editForm);
      
      // Update local state with new values
      setProfile({
        ...profile,
        ...editForm,
      });
      
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  if (isLoading || !displayProfile) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-100 mb-4">
                <img src={displayProfile.avatar} alt={displayProfile.username} className="w-full h-full object-cover" />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-800">{displayProfile.username}</h1>
              <p className="text-gray-600 mb-4">Member since {new Date(displayProfile.joinDate).toLocaleDateString()}</p>
              
              <div className="w-full bg-gray-200 rounded-full h-4 mb-1">
                <div 
                  className="bg-indigo-600 h-4 rounded-full" 
                  style={{ width: `${(displayProfile.totalPoints % 1000) / 10}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Level {displayProfile.level} • {displayProfile.totalPoints} points • {1000 - (displayProfile.totalPoints % 1000)} points to next level
              </p>
              
              {isOwnProfile && !isEditing && (
                <Button 
                  onClick={() => setIsEditing(true)}
                  className="flex items-center w-full justify-center"
                >
                  <FiEdit className="mr-2" /> Edit Profile
                </Button>
              )}
            </div>
            
            {!isEditing ? (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-800 mb-2">Bio</h3>
                <p className="text-gray-600 mb-4">{displayProfile.bio || 'No bio provided'}</p>
                
                <h3 className="font-semibold text-gray-800 mb-2">Fitness Goals</h3>
                <p className="text-gray-600 mb-4">{displayProfile.fitnessGoals || 'No fitness goals set'}</p>
                
                <h3 className="font-semibold text-gray-800 mb-2">Preferred Activities</h3>
                <div className="flex flex-wrap gap-2">
                  {displayProfile.preferredActivities ? 
                    displayProfile.preferredActivities.split(',').map((activity, index) => (
                      <span key={index} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md text-sm">
                        {activity.trim()}
                      </span>
                    )) : 
                    <p className="text-gray-600">No preferred activities set</p>
                  }
                </div>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={editForm.username}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={editForm.bio}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows="3"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Fitness Goals</label>
                  <textarea
                    name="fitnessGoals"
                    value={editForm.fitnessGoals}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows="3"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Preferred Activities (comma-separated)</label>
                  <input
                    type="text"
                    name="preferredActivities"
                    value={editForm.preferredActivities}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., Running, Yoga, Weightlifting"
                  />
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <Button 
                    type="button" 
                    onClick={() => setIsEditing(false)}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="button" 
                    onClick={handleSaveProfile}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Achievements Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FiTrophy className="mr-2 text-indigo-600" />
              Achievements
            </h2>
            
            <div className="space-y-4">
              {displayProfile.achievements && displayProfile.achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-lg">
                    {achievement.icon}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-md font-medium text-gray-800">{achievement.title}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    <p className="text-xs text-gray-500 mt-1">Earned on {new Date(achievement.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('activities')}
                  className={`py-4 px-6 font-medium text-sm flex items-center ${
                    activeTab === 'activities'
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <FiActivity className="mr-2" />
                  Activities
                </button>
                <button
                  onClick={() => setActiveTab('challenges')}
                  className={`py-4 px-6 font-medium text-sm flex items-center ${
                    activeTab === 'challenges'
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <FiTrophy className="mr-2" />
                  Challenges
                </button>
              </nav>
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'activities' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activities</h2>
                  
                  {displayActivities.length > 0 ? (
                    <div className="space-y-4">
                      {displayActivities.map((activity) => (
                        <div key={activity.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-gray-800">{activity.type}</h3>
                              <p className="text-sm text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-indigo-600 font-medium">
                                {activity.distance > 0 ? `${activity.distance} km • ` : ''}
                                {activity.duration} min
                              </span>
                              <p className="text-sm text-gray-500">{activity.calories} calories</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 text-gray-500">
                      <p>No activities logged yet.</p>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'challenges' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Challenges</h2>
                  
                  {displayChallenges.length > 0 ? (
                    <div className="space-y-4">
                      {displayChallenges.map((challenge) => (
                        <div key={challenge.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                          <div className="mb-2">
                            <h3 className="font-medium text-gray-800">{challenge.title}</h3>
                            <div className="flex items-center justify-between mt-1">
                              <span 
                                className={`px-2 py-1 text-xs rounded-full ${
                                  challenge.status === 'active' ? 'bg-green-100 text-green-800' :
                                  challenge.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
                              </span>
                              <span className="text-sm text-gray-500">
                                Ends: {new Date(challenge.endDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-indigo-600 h-2.5 rounded-full" 
                              style={{ width: `${challenge.progress}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-gray-500">Progress</span>
                            <span className="text-xs font-medium text-gray-700">{challenge.progress}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 text-gray-500">
                      <p>No challenges joined yet.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;