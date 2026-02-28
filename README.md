# Bluesky.bot

A Next.js application that allows Bluesky users to set custom handles with a dedicated `.bluesky.bot` domain suffix, making it easy to identify and differentiate bot accounts on the Bluesky social network.

## 🤖 What is Bluesky.bot?

Bluesky.bot provides a simple way for bot creators to claim a unique handle under the `.bluesky.bot` domain (e.g., `yourbot.bluesky.bot`). This helps distinguish automated accounts from regular users, promoting transparency and trust within the Bluesky ecosystem.

## 🛠️ How it Works

1. **OAuth Authentication**: Users authenticate with their Bluesky account via AT Protocol OAuth
2. **Handle Selection**: Choose a custom handle prefix (e.g., `mybot` → `mybot.bluesky.bot`)
3. **DNS Configuration**: The app manages the DNS records to point your chosen handle to your Bluesky DID
4. **Profile Update**: Your Bluesky profile is automatically updated with the new bot handle

## 📋 Prerequisites

- **Bun** >= 1.0 (or Node.js >= 18)
- **PostgreSQL** >= 14
- A **Bluesky** account for testing

## 🚀 Local Installation

### 1. Clone the Repository

```bash
git clone https://github.com/pirmax/bluesky.bot.git
cd bluesky.bot
```

### 2. Install Dependencies

```bash
bun install
```

Or with npm:

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
NEXT_PUBLIC_URL="http://localhost:3000"
NEXT_PUBLIC_HANDLE_SUFFIX=".bluesky.bot"
COOKIE_PASSWORD="generate-a-random-32-character-string"
DATABASE_URL="postgresql://user:password@localhost:5432/bluesky_bot"
```

**Note**: Generate a secure `COOKIE_PASSWORD` using:

```bash
openssl rand -base64 32
```

### 4. Set Up the Database

Create a PostgreSQL database and run migrations:

```bash
# Generate Prisma client
bun run prisma generate

# Run database migrations
bun run prisma migrate deploy
```

For development, you can use:

```bash
bun run prisma migrate dev
```

### 5. Run the Development Server

```bash
bun run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
├── prisma/              # Database schema and migrations
├── src/
│   ├── app/            # Next.js App Router pages
│   ├── components/     # React components
│   ├── lib/            # Core utilities (OAuth, Prisma, etc.)
│   └── types/          # TypeScript type definitions
└── public/             # Static assets
```

## 🧪 Development

### Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run Biome linter
- `bun run format` - Format code with Biome

### Database Management

- `bunx prisma studio` - Open Prisma Studio to view/edit data
- `bunx prisma migrate dev` - Create and apply new migration
- `bunx prisma generate` - Regenerate Prisma Client

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and test thoroughly
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Ideas for Contributions

- Add support for custom domains
- Implement handle verification badges
- Create an admin dashboard for managing handles
- Add rate limiting and abuse prevention
- Improve UI/UX with better animations
- Add internationalization (i18n)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Bluesky](https://bsky.app)
- [AT Protocol Documentation](https://atproto.com)
- [Issue Tracker](https://github.com/pirmax/bluesky.bot/issues)

## ⚠️ Disclaimer

This is an independent project and is not officially affiliated with Bluesky Social PBC.

