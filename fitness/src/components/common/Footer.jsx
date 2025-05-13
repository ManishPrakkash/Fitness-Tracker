import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">FitTrack</h4>
            <p className="text-gray-600 text-sm">
              Transform your fitness journey with community challenges.
            </p>
          </div>
          <div>
            <h5 className="font-medium mb-3">Navigation</h5>
            <ul className="space-y-2 text-sm">
              <li><Link to="/challenges" className="text-gray-600 hover:text-blue-600">Challenges</Link></li>
              <li><Link to="/leaderboard" className="text-gray-600 hover:text-blue-600">Leaderboard</Link></li>
              <li><Link to="/profile" className="text-gray-600 hover:text-blue-600">Profile</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-3">Legal</h5>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="text-gray-600 hover:text-blue-600">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-blue-600">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-3">Connect</h5>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-600">Twitter</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">Instagram</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">Discord</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          © {new Date().getFullYear()} FitTrack. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;