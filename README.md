# Bluesky.bot

A service that allows Bluesky users to create custom `.bluesky.bot` handles for their profiles, making them easier to share and remember.

## ⚠️ Important Notice

**`.bluesky.bot` usernames do NOT guarantee authenticity**. Anyone can register any available name under `.bluesky.bot`. There is no identity verification, brand validation, or manual approval process. Always verify accounts through official channels.

## Features

- 🎯 **Custom Handles**: Create personalized subdomains like `yourname.bluesky.bot`
- 🔗 **Easy Sharing**: Share your Bluesky profile with a memorable URL
- 🔐 **OAuth Integration**: Secure authentication with Bluesky/AT Protocol
- 📱 **Responsive Design**: Works on all devices
- ⚡ **Fast Redirects**: Quick redirection to your actual Bluesky profile

## Architecture

This is a monorepo built with:

- **Framework**: Next.js 15 with TypeScript
- **Monorepo**: Turbo for build orchestration
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: AT Protocol OAuth
- **Styling**: Tailwind CSS

### Project Structure

```
apps/
├── web/          # Main web application (port 3000)
└── handle/       # Handle resolution service (port 3001)
packages/
└── database/     # Shared Prisma database package
```

## Prerequisites

- Node.js 18 or higher
- PostgreSQL database
- Bun (or yarn|npm|pnpm)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pirmax/bluesky.bot.git
   cd bluesky.bot
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/blueskybot"
   
   # Application
   NEXT_PUBLIC_URL="http://localhost:3000"
   COOKIE_PASSWORD="your-secure-32-character-secret-key"
   NODE_ENV="development"
   ```

4. **Set up the database**
   ```bash
   # Push the schema to your database
   bun run db:push
   
   # Or run migrations in production
   bun run db:migrate:deploy
   ```

5. **Generate Prisma client**
   ```bash
   bun run generate
   ```

## Development

### Start the development servers

```bash
# Start both web and handle apps
bun run dev
```

This will start:
- **Web app**: http://localhost:3000 (main application)
- **Handle service**: http://localhost:3001 (handle resolution)

### Individual app development

```bash
# Start only the web app
cd apps/web && bun run dev

# Start only the handle service
cd apps/handle && bun run dev
```

### Database commands

```bash
# Push schema changes to database (development)
bun run db:push

# Deploy migrations (production)
bun run db:migrate:deploy

# Seed the database (if seeding is implemented)
bun run db:seed
```

### Code quality

```bash
# Check code style and lint
bun run lint

# Format code
bun run format
```

## Production Build

```bash
# Build all applications
bun run build

# Start production servers
cd apps/web && bun run start
cd apps/handle && bun run start
```

## How It Works

1. **User Registration**: Users sign in with their existing Bluesky account using OAuth
2. **Handle Selection**: Users choose their desired `.bluesky.bot` subdomain
3. **Profile Management**: Users can update their custom handle through the management interface
4. **Handle Resolution**: When someone visits `username.bluesky.bot`, they're redirected to the user's actual Bluesky profile

### Technical Flow

1. User visits the web app and enters their current Bluesky handle
2. OAuth flow authenticates the user with Bluesky/AT Protocol
3. User selects their desired `.bluesky.bot` handle
4. Handle is stored in the database linked to their Bluesky DID
5. The handle service resolves requests to `*.bluesky.bot` and redirects to the appropriate profile

## Database Schema

The application uses three main models:

- **User**: Stores user information and handle mappings
- **AuthState**: Manages OAuth state during authentication
- **AuthSession**: Stores user sessions

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXT_PUBLIC_URL` | Base URL of the application | Yes |
| `COOKIE_PASSWORD` | Secret key for session encryption (32+ chars) | Yes |
| `NODE_ENV` | Environment mode (development/production) | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and test them
4. Run linting: `bun run lint`
5. Commit your changes: `git commit -m "Add your feature"`
6. Push to your branch: `git push origin feature/your-feature`
7. Create a Pull Request

## Security Notice

This service does not verify the identity of users claiming specific handles. Users should:

- Never rely solely on a `.bluesky.bot` handle to verify identity
- Cross-check accounts through official channels
- Look for verified custom domain handles on Bluesky for authentic accounts

## License

This project is licensed under the GPL v3.0 - see the [LICENSE](LICENSE) file for details.

## Support

For issues related to this service, please create an issue in this repository. For general Bluesky support, contact [Bluesky's moderation service](https://bsky.app/profile/moderation.bsky.app).
