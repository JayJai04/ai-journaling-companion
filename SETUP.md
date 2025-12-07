# Setup Guide

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Fill in all required values

3. **Set up databases**
   ```bash
   # PostgreSQL
   npx prisma migrate dev --name init
   npx prisma generate
   
   # MongoDB - make sure MongoDB is running
   ```

4. **Run the app**
   ```bash
   npm run dev
   ```

## Environment Variables

### Required Variables

- `DATABASE_URL` - PostgreSQL connection string
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens (use a strong random string)
- `GEMINI_API_KEY` - Google Gemini API key
- `CRON_SECRET` - Secret for protecting cron endpoints

### Getting a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key to your `.env.local` file

## Database Setup

### PostgreSQL

You can use:
- Local PostgreSQL installation
- [Supabase](https://supabase.com) (free tier available)
- [Neon](https://neon.tech) (free tier available)
- [Railway](https://railway.app) (free tier available)

### MongoDB

You can use:
- Local MongoDB installation
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier available)

## Testing the Setup

1. Start the dev server: `npm run dev`
2. Navigate to `http://localhost:3000`
3. Create an account
4. Create a journal entry
5. Try generating an AI insight

## Troubleshooting

### Prisma Issues

If you get Prisma errors:
```bash
npx prisma generate
npx prisma migrate reset  # WARNING: This deletes all data
```

### MongoDB Connection Issues

- Make sure MongoDB is running
- Check your `MONGODB_URI` format
- For MongoDB Atlas, whitelist your IP address

### Gemini API Issues

- Make sure your API key is valid
- Check your API quota/limits
- Verify the API key has proper permissions

