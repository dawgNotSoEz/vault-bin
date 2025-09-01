import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 shadow-lg text-center max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-300 mb-6">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/dashboard"
          className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-semibold"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
