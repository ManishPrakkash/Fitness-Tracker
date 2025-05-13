import React from 'react';
import { Link } from 'react-router-dom';
import { FiAlertTriangle } from 'react-icons/fi';
import Button from '../components/common/Button';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <FiAlertTriangle className="text-7xl text-indigo-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button as={Link} to="/" className="px-6">
            Go to Home
          </Button>
          <Button 
            as={Link} 
            to="/challenges" 
            variant="outline"
            className="px-6"
          >
            Browse Challenges
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;