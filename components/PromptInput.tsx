
import React from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading) {
        onSubmit();
      }
    }
  };
    
  return (
    <div className="space-y-4">
      <label htmlFor="prompt-input" className="block text-lg font-semibold text-gray-200">
        2. Enter Your Prompt
      </label>
      <div className="relative">
        <textarea
          id="prompt-input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., Why is the sky blue?"
          className="w-full h-32 p-4 bg-gray-900/50 rounded-lg border-2 border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors"
          disabled={isLoading}
        />
      </div>
      <button
        onClick={onSubmit}
        disabled={isLoading || !prompt}
        className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
      >
        {isLoading ? 'Processing...' : 'Send Request'}
      </button>
    </div>
  );
};

export default PromptInput;
