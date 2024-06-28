This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and uses [TypeScript](https://www.typescriptlang.org/) and [Prisma](https://www.prisma.io/) as the ORM.

## Project demo video is present in project demo folder

## Getting Started

### Prerequisites

Ensure you have the following installed on your development machine:

- Node.js (v12.x or later)
- npm (v6.x or later) or yarn (v1.22.x or later) or pnpm (v5.x or later) or bun (v0.x or later)
- SQLite (or another database if you're using a different one with Prisma)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Set up your database:
   - Create a `.env` file in the root of your project and add your database URL:
     ```env
     DATABASE_URL="file:./dev.db"
     ```
   - Run Prisma migrations to set up your database schema:
     ```bash
     npx prisma migrate dev --name init
     ```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
