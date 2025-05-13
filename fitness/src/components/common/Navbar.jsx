import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="/assets/images/logo.png" 
              alt="Logo"
              className="h-8 w-auto mr-2"
            />
            <span className="text-xl font-bold text-blue-600">FitTrack</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" as={Link} to="/challenges">
              Challenges
            </Button>
            <Button variant="ghost" as={Link} to="/leaderboard">
              Leaderboard
            </Button>
            <Button variant="primary" as={Link} to="/login">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;