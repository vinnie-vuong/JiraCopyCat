"use server";

import { db } from '@/lib/prisma';
import { auth, clerkClient } from '@clerk/nextjs/server';

const getOrganization = async (slug) => {
  const { userId } = await auth(); // get currently logged in user

  if (!userId) { 
    throw new Error("Unauthorized!");
  }

  // check if the user exists in the database
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // get the currently logged in organization
  const organization = await (await clerkClient()).organizations.getOrganization({
    slug
  })

  if (!organization) {
    return null
  }

  // get organization members
  const { data: membership } = await (await clerkClient()).organizations.getOrganizationMembershipList({
    organizationId: organization.id,
  })

  // check if the logged in user has membership of the organization
  const userMembership = membership.find(member => member.publicUserData.userId === userId)

  if (!userMembership) {
    return null;
  }

  return organization;
}

export default getOrganization;