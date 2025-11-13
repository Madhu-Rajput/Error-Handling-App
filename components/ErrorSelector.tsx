
import React from 'react';
import { ErrorType, errorTypeDetails } from '../types';

interface ErrorSelectorProps {
  selectedErrorType: ErrorType;
  setSelectedErrorType: (type: ErrorType) => void;
}

const ErrorSelector: React.FC<ErrorSelectorProps> = ({ selectedErrorType, setSelectedErrorType }) => {
  return (
    <div className="space-y-4">
      <label className="block text-lg font-semibold text-gray-200">
        1. Select Scenario to Simulate
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {(Object.keys(errorTypeDetails) as Array<keyof typeof errorTypeDetails>).map((key) => (
          <div
            key={key}
            onClick={() => setSelectedErrorType(key)}
            className={`cursor-pointer p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedErrorType === key
                ? 'bg-blue-600/20 border-blue-500 scale-105 shadow-lg'
                : 'bg-gray-700/50 border-gray-600 hover:border-blue-500 hover:bg-gray-700'
            }`}
          >
            <p className="font-bold text-white">{errorTypeDetails[key].label}</p>
            <p className="text-sm text-gray-400 mt-1">{errorTypeDetails[key].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ErrorSelector;
