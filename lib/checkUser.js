import { currentUser } from "@clerk/nextjs/server"
import { db } from "./prisma"

export const checkUser = async () => {
  const user = await currentUser(); // retrieve current user from clerk

  if (!user) {
    return null; // user not logged in yet, just exit
  }

  try {
    const loggedInUser = await db?.user.findUnique({
      where: {
        clerkUserId: user.id,
      }
    }); // find the loggedInUser in the database

    if (loggedInUser) {
      return loggedInUser; // if already exists, just return the user
    }

    // otherwise create a new one, persist to the database
    const name = `${user.firstName} ${user.lastName}`;

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    return newUser
  } catch (error) {
    console.error(error)
  }
}