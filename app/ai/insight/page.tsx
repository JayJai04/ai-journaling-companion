'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function InsightPage() {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleGenerate = async () => {
    setError('');
    setLoading(true);
    setInsight(null);

    try {
      const res = await fetch('/api/ai/weekly-insight', {
        method: 'POST',
      });

      if (res.ok) {
        const data = await res.json();
        setInsight(data.insight);
      } else if (res.status === 401) {
        router.push('/login');
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to generate insight');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-xl font-bold">
                AI Journaling Companion
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">AI Insight</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <p className="text-gray-700 mb-4">
            Generate a personalized insight based on your recent journal entries. The AI will analyze your mood, patterns, and behavior.
          </p>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating Insight...' : 'Generate Insight'}
          </button>
        </div>

        {insight && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Your Insight</h2>
            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{insight}</p>
          </div>
        )}
      </main>
    </div>
  );
}

