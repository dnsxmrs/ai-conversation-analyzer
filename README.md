# AI Conversation Analyzer

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)

## Description

AI Conversation Analyzer is a web application designed to analyze raw text conversations using artificial intelligence. It acts as a private communication coach, helping users uncover the hidden dynamics of their chats by detecting tone, sentiment, communication patterns, and potential red flags (such as passive aggression or emotional manipulation).

Built with Next.js, Neon DB, Prisma, and Better Auth, it provides a secure and premium experience for users to upload or paste entire conversation logs, analyze them instantly using Google's Gemini AI, and receive a comprehensive health score and detailed breakdown of their communication.

## Features

- **Tone & Sentiment Analysis**: Instantly understand the overall mood of an interaction.
- **Red Flag Detection**: Identify hidden toxic patterns message-by-message.
- **Health Scoring**: Get an overall communication health score out of 100.
- **Secure Authentication**: Utilizing Better Auth for Email/Password and 2FA support.
- **Dark Mode Support**: Beautiful UI matching your system preferences with a frosted-glass premium aesthetic.

## Installation

Use [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) to install the dependencies.

```bash
npm install
# or
yarn install
```

### Setup Database & Enivornment
Copy the `.env.example` to `.env` (or `.env.local` for Next.js) and fill in your variables:

```bash
cp .env.example .env.local
```

Required environment variables include:
- `DATABASE_URL` (Your Neon Database connection string)
- `GEMINI_API_KEY` (Your Google Gemini API key)
- `BETTER_AUTH_SECRET` (A strong random string for Better Auth)
- `NEXT_PUBLIC_APP_URL` (e.g., http://localhost:3000)

Run Prisma migrations to setup your database schema:

```bash
npx prisma db push
# or
npx prisma migrate dev
```

## Usage

Start the development server:

```bash
npm run dev
# or
yarn dev
```

1. Navigate to `http://localhost:3000`.
2. Create an account or sign in.
3. Access the Dashboard and go to the Upload section.
4. Paste a conversation.
5. Wait for the AI to process and return your comprehensive conversation analysis and health score.

## Support

If you encounter any issues or have questions, please open an issue in the issue tracker.

## Roadmap

- Implement social login providers (Google, GitHub) via Better Auth.
- Support for uploading different file formats (Text file, PDF, images for OCR).
- Advanced historic conversation tracking and improvement graphs over time.
- Real dashboard

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Authors and acknowledgment

- **[dnsxmrs](https://github.com/dnsxmrs)**

## License

[GNU GPLv3](https://choosealicense.com/licenses/agpl-3.0/)

## Project status

Active development.
