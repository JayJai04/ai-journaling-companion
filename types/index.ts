export interface User {
  id: string;
  email: string;
  name: string | null;
  bio: string | null;
}

export interface JournalEntry {
  id: string;
  content: string;
  createdAt: Date | string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ReminderSettings {
  enabled: boolean;
  time: string | null;
}

