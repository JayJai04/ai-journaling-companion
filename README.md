# AI Journaling Companion

An AI-powered journaling application that helps users track their thoughts, feelings, and experiences with personalized AI insights.

## Features

- **User Management**: Sign up, login, logout, password reset, and profile management
- **Journal Entries**: Create, read, update, and delete journal entries
- **AI Insights**: Get personalized insights from Gemini AI based on your journal entries
- **Weekly Insights**: Automated weekly insights delivered via in-app notifications
- **AI Chatbot**: Chat with AI about your journal entries and get real-time insights
- **Reminders**: Set up daily reminders at your preferred time
- **Onboarding**: Guided onboarding flow for new users

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (users) + MongoDB (journal entries)
- **ORM**: Prisma
- **Authentication**: JWT with bcrypt
- **AI**: Google Gemini API
- **Hosting**: Vercel
- **Cron Jobs**: Vercel Cron

## Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database
- MongoDB database
- Google Gemini API key

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd ai-journaling-companion
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ai_journaling?schema=public"

# MongoDB
MONGODB_URI="mongodb://localhost:27017/ai_journaling"

# JWT Secret (change this in production!)
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# Gemini API Key
GEMINI_API_KEY="your-gemini-api-key"

# Cron Secret (for Vercel cron jobs)
CRON_SECRET="your-cron-secret-key"

# Node Environment
NODE_ENV="development"
```

### 4. Set up PostgreSQL database

```bash
# Run Prisma migrations
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate
```

### 5. Set up MongoDB

Make sure MongoDB is running and accessible at the `MONGODB_URI` you specified.

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add all environment variables in Vercel dashboard
4. Deploy!

The weekly insights cron job will run every Monday at 9 AM UTC.

## Project Structure

```
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── journal/      # Journal entry endpoints
│   │   ├── ai/           # AI insight endpoints
│   │   ├── users/        # User management endpoints
│   │   ├── reminders/    # Reminder settings
│   │   ├── notifications/# Notifications
│   │   └── cron/         # Cron jobs
│   ├── dashboard/        # Dashboard page
│   ├── journal/          # Journal entry pages
│   ├── chat/             # AI chat page
│   ├── profile/          # User profile page
│   ├── reminders/        # Reminder settings page
│   ├── login/            # Login page
│   ├── signup/           # Signup page
│   └── onboarding/       # Onboarding page
├── lib/                  # Utility functions
│   ├── auth.ts          # Authentication helpers
│   ├── db.ts            # Database connections
│   ├── gemini.ts        # Gemini AI integration
│   └── middleware.ts    # Auth middleware
├── prisma/
│   └── schema.prisma    # Prisma schema
└── public/              # Static assets
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/password-reset` - Reset password

### Journal Entries
- `GET /api/journal` - Get all entries
- `POST /api/journal` - Create entry
- `GET /api/journal/[id]` - Get entry
- `PATCH /api/journal/[id]` - Update entry
- `DELETE /api/journal/[id]` - Delete entry

### AI
- `POST /api/ai/chat` - Chat with AI
- `POST /api/ai/weekly-insight` - Generate weekly insight

### Users
- `GET /api/users/profile` - Get profile
- `PATCH /api/users/profile` - Update profile
- `DELETE /api/users/delete` - Delete account

### Reminders
- `GET /api/reminders` - Get reminder settings
- `PATCH /api/reminders` - Update reminder settings

## License

See LICENSE file for details.
