'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: string;
  email: string;
  name: string | null;
  bio: string | null;
}

interface JournalEntry {
  id: string;
  content: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchUser();
    fetchEntries();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        router.push('/login');
      }
    } catch (err) {
      router.push('/login');
    }
  };

  const fetchEntries = async () => {
    try {
      const res = await fetch('/api/journal');
      if (res.ok) {
        const data = await res.json();
        setEntries(data.entries);
      }
    } catch (err) {
      console.error('Failed to fetch entries');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">AI Journaling Companion</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/profile" className="text-gray-700 hover:text-gray-900">
                Profile
              </Link>
              <Link href="/chat" className="text-gray-700 hover:text-gray-900">
                Chat with AI
              </Link>
              <Link href="/reminders" className="text-gray-700 hover:text-gray-900">
                Reminders
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">
            Welcome back, {user?.name || user?.email}!
          </h2>
          <Link
            href="/journal/new"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            New Journal Entry
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Entries</h3>
            {entries.length === 0 ? (
              <p className="text-gray-500">No entries yet. Create your first one!</p>
            ) : (
              <div className="space-y-4">
                {entries.slice(0, 5).map((entry) => (
                  <div key={entry.id} className="border-b pb-4">
                    <p className="text-sm text-gray-500 mb-2">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 line-clamp-3">{entry.content}</p>
                    <Link
                      href={`/journal/${entry.id}`}
                      className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                    >
                      View →
                    </Link>
                  </div>
                ))}
              </div>
            )}
            {entries.length > 5 && (
              <Link
                href="/journal"
                className="text-blue-600 hover:underline text-sm mt-4 inline-block"
              >
                View all entries →
              </Link>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                href="/journal/new"
                className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Write Entry
              </Link>
              <Link
                href="/chat"
                className="block w-full bg-green-600 text-white text-center py-2 px-4 rounded-md hover:bg-green-700"
              >
                Chat with AI
              </Link>
              <Link
                href="/ai/insight"
                className="block w-full bg-purple-600 text-white text-center py-2 px-4 rounded-md hover:bg-purple-700"
              >
                Generate Insight
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

