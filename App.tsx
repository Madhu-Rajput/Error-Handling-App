
import React, { useState, useCallback } from 'react';
import { ErrorType } from './types';
import { callGeminiApi } from './services/geminiService';
import Header from './components/Header';
import ErrorSelector from './components/ErrorSelector';
import PromptInput from './components/PromptInput';
import ResponseDisplay from './components/ResponseDisplay';

export default function App() {
  const [prompt, setPrompt] = useState<string>("Why is the sky blue?");
  const [errorType, setErrorType] = useState<ErrorType>(ErrorType.SUCCESS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    if (!prompt) {
      setApiError("Please enter a prompt.");
      return;
    }
    
    setIsLoading(true);
    setApiResponse(null);
    setApiError(null);

    try {
      const result = await callGeminiApi(prompt, errorType);
      setApiResponse(result);
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [prompt, errorType]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl mx-auto">
        <Header />
        <main className="bg-gray-800 shadow-2xl rounded-2xl p-6 sm:p-8 space-y-6">
          <ErrorSelector
            selectedErrorType={errorType}
            setSelectedErrorType={setErrorType}
          />
          <PromptInput
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          <ResponseDisplay
            isLoading={isLoading}
            apiResponse={apiResponse}
            apiError={apiError}
          />
        </main>
      </div>
    </div>
  );
}
