import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, AlertCircle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-gray-900 to-zinc-900 text-white flex items-center justify-center p-4">
      <div className="text-center max-w-lg mx-auto">
        <div className="mb-8">
          <AlertCircle className="h-24 w-24 text-purple-400 mx-auto mb-6" />
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-neutral-300 mb-4">Page Not Found</h2>
          <p className="text-neutral-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-600/25"
          >
            <Home className="h-5 w-5" />
            Go to Dashboard
          </Link>
          
          <div className="text-neutral-500">or</div>
          
          <Link
            to="/create"
            className="inline-flex items-center gap-3 px-6 py-3 bg-neutral-700 hover:bg-neutral-600 text-white font-medium rounded-2xl transition-all duration-300"
          >
            <Search className="h-5 w-5" />
            Create a New Paste
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-700">
          <p className="text-sm text-neutral-500">
            Lost? Try checking the URL or go back to the main dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
