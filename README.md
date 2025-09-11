# Expense Tracker

This is a full-stack expense tracker application built with Next.js, TypeScript, and Prisma. It allows users to track their income and expenses, and it uses Clerk for authentication.

## Architecture

The application follows a modern Next.js architecture, leveraging server components and server actions to create a fast and interactive user experience.

- **Frontend:** Built with React and Next.js. The UI is composed of server components for data display and client components for user interactions.
- **Backend:** Server actions are used to handle form submissions and data mutations. These actions call a service layer that contains the core business logic.
- **Database:** Prisma is used as the ORM to interact with a PostgreSQL database.
- **Authentication:** Clerk is used for user authentication and management.

### Service Layer

To promote a clean architecture, the business logic is separated from the Next.js-specific code. All database operations and core logic are handled in a `services` directory. The server actions are thin wrappers that call these services. This separation of concerns makes the code more modular, reusable, and easier to test.

## Getting Started

First, you need to set up your environment variables. Copy the `.env.example` file to a new file named `.env` and fill in the required values:

```bash
cp .env.example .env
```

Then, install the dependencies:

```bash
npm install
```

Next, run the database migrations:

```bash
npx prisma migrate dev
```

Finally, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Schema

The database schema is defined in `prisma/schema.prisma`. It consists of two models:

- **User:** Stores user information, including their Clerk ID, email, and name.
- **Transaction:** Stores transaction details, including the text, amount, and a reference to the user who created it.

Here is a simplified view of the schema:

```prisma
model User {
  id           String        @id @default(uuid())
  clerkUserId  String        @unique
  email        String        @unique
  name         String?
  imageUrl     String?
  transactions Transaction[]
}

model Transaction {
  id        String   @id @default(uuid())
  text      String
  amount    Float
  userId    String
  user      User     @relation(fields: [userId], references: [clerkUserId], onDelete: Cascade)
  createdAt DateTime @default(now())
}
```
