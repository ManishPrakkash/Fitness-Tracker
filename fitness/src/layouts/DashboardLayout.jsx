import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FiHome, FiAward, FiBarChart2, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Footer from '../components/common/Footer';

const DashboardLayout = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: FiHome },
    { name: 'Challenges', href: '/challenges', icon: FiAward },
    { name: 'Leaderboard', href: '/leaderboard', icon: FiBarChart2 },
    { name: 'Profile', href: '/profile', icon: FiUser },
  ];

  if (user?.isAdmin) {
    navigation.push({ name: 'Admin', href: '/admin', icon: FiUser });
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-0 z-20 transition-opacity bg-gray-600 bg-opacity-75 lg:hidden ${
          sidebarOpen ? 'opacity-100 ease-out duration-300' : 'opacity-0 ease-in duration-200 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      ></div>
      {/* Sidebar component */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transition duration-300 transform bg-white lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
        }`}
      >
        <div className="flex items-center justify-between flex-shrink-0 px-4 py-5">
          <NavLink to="/" className="text-xl font-bold text-gray-800">
            Fitness<span className="text-primary-600">Tracker</span>
          </NavLink>
          <button
            className="p-1 transition-colors duration-200 rounded-md text-gray-600 lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring"
            onClick={toggleSidebar}
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium transition-colors rounded-md group ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <item.icon className="flex-shrink-0 w-5 h-5 mr-3" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between px-4 py-4 bg-white border-b border-gray-200 sm:px-6 lg:px-8">
          <button
            className="p-1 text-gray-500 rounded-md lg:hidden hover:text-gray-900 focus:outline-none focus:ring"
            onClick={toggleSidebar}
          >
            <FiMenu className="w-6 h-6" />
          </button>

          <div className="flex items-center">
            <div className="relative ml-3">
              <div className="flex items-center">
                <span className="mr-3 text-sm font-medium text-gray-700">
                  {user?.name || user?.email}
                </span>
                <div className="flex items-center justify-center w-8 h-8 bg-primary-500 rounded-full">
                  <span className="text-sm font-medium text-white">
                    {user?.name ? user.name.charAt(0) : user?.email.charAt(0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="relative flex-1 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
