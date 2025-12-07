'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const instructions = `
Welcome to AI Journaling Companion!

Here's how to use the app:

1. **Journal Entries**: Create journal entries to track your thoughts, feelings, and experiences. You can create, edit, and delete entries anytime.

2. **AI Insights**: The AI (Thinker) will analyze your journal entries and provide personalized insights about your mood, patterns, and behavior.

3. **Weekly Insights**: Every week, you'll receive an automated insight based on your recent journal entries.

4. **Chat with AI**: You can chat with the AI anytime to get insights, ask questions, or have conversations about your journaling journey.

5. **Reminders**: Set up daily reminders at your preferred time to help you maintain a consistent journaling habit.

6. **Privacy**: Your journal entries are private and secure. Only you can access them.

Start by creating your first journal entry!
`;

export default function OnboardingPage() {
  const [read, setRead] = useState(false);
  const router = useRouter();

  const handleContinue = () => {
    if (read) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Getting Started</h1>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6 max-h-96 overflow-y-auto">
          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
            {instructions}
          </pre>
        </div>

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="read"
            checked={read}
            onChange={(e) => setRead(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="read" className="text-sm text-gray-700">
            I have read and understood the instructions
          </label>
        </div>

        <button
          onClick={handleContinue}
          disabled={!read}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Dashboard
        </button>
      </div>
    </div>
  );
}

