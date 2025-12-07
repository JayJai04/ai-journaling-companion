import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function generateWeeklyInsight(
  userName: string,
  entries: Array<{ content: string; createdAt: Date }>
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const entriesText = entries
    .map((entry, idx) => {
      const date = new Date(entry.createdAt).toLocaleDateString();
      return `Entry ${idx + 1} (${date}): ${entry.content}`;
    })
    .join('\n\n');

  const prompt = `You are an AI journaling companion analyzing ${userName}'s journal entries. Based on the following entries, provide a personalized insight about their mood, patterns, and behavior. Be warm, empathetic, and helpful. Keep it concise (2-3 sentences).

Journal Entries:
${entriesText}

Generate a personalized insight for ${userName}:`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export async function generateChatResponse(
  userName: string,
  userMessage: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>,
  recentEntries: Array<{ content: string; createdAt: Date }>
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const entriesContext = recentEntries
    .slice(-5) // Last 5 entries for context
    .map((entry) => {
      const date = new Date(entry.createdAt).toLocaleDateString();
      return `${date}: ${entry.content}`;
    })
    .join('\n');

  const historyText = conversationHistory
    .slice(-10) // Last 10 messages
    .map((msg) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
    .join('\n');

  const prompt = `You are an AI journaling companion helping ${userName}. You have access to their recent journal entries and conversation history. Be warm, empathetic, and helpful.

Recent Journal Entries:
${entriesContext}

Conversation History:
${historyText}

User: ${userMessage}
Assistant:`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

