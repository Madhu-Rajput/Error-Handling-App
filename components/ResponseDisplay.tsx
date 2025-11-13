
import React from 'react';
import Spinner from './Spinner';

interface ResponseDisplayProps {
  isLoading: boolean;
  apiResponse: string | null;
  apiError: string | null;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ isLoading, apiResponse, apiError }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-200">3. API Response</h2>
      <div className="min-h-[150px] bg-gray-900/70 rounded-lg p-4 border border-gray-700 flex items-center justify-center">
        {isLoading && <Spinner />}
        {!isLoading && !apiResponse && !apiError && (
          <p className="text-gray-500">The API response will appear here.</p>
        )}
        {apiError && (
          <div className="w-full text-red-400">
            <h3 className="font-bold text-lg mb-2">Error Occurred</h3>
            <pre className="bg-red-900/30 p-3 rounded-md whitespace-pre-wrap font-mono text-sm">
              <code>{apiError}</code>
            </pre>
          </div>
        )}
        {apiResponse && (
          <div className="w-full text-gray-300">
            <h3 className="font-bold text-lg mb-2 text-green-400">Success</h3>
            <p className="whitespace-pre-wrap text-base">{apiResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponseDisplay;
