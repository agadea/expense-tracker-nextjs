import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

/**
 * Checks if the current logged-in user exists in the database.
 * If the user does not exist, it creates a new user record.
 * This function is essential for synchronizing Clerk users with the application's database.
 *
 * @returns {Promise<User | null>} The user object from the database or null if no user is logged in.
 */
export const checkUser = async () => {
  const user = await currentUser();

  // Check for current logged in clerk user
  if (!user) {
    return null;
  }

  // Check if the user is already in the database
  const loggedInUser = await db.user.findUnique({
    where: {
      clerkUserId: user.id,
    },
  });

  // If user is in database, return user
  if (loggedInUser) {
    return loggedInUser;
  }

  // If not in database, create new user
  const newUser = await db.user.create({
    data: {
      clerkUserId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newUser;
};