
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center my-8">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
        Gemini API Error Handling
      </h1>
      <p className="text-lg text-gray-400">
        Test and see how to handle different API error responses gracefully.
      </p>
    </header>
  );
};

export default Header;
