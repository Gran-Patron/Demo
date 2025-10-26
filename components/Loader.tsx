
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="w-12 h-12 border-4 border-t-4 border-gray-600 border-t-purple-500 rounded-full animate-spin"></div>
      <p className="text-purple-300 text-sm font-medium">Analyzing with AI...</p>
    </div>
  );
};

export default Loader;
