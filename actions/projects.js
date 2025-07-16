"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server"

export async function createProject (data) {
  const { userId, orgId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized")
  }

  if (!orgId) {
    throw new Error("No Organization Selected")
  }

  // get the currently logged in organization
  const organization = await (await clerkClient()).organizations.getOrganization({
    slug: orgId,
  })

  if (!organization) {
    throw new Error("Error in fetching organization");
  }
  // get organization members
  const { data: membership } =
    await (await clerkClient()).organizations.getOrganizationMembershipList({
      organizationId: organization.id,
    });

  // check if the logged in user has membership of the organization
  const userMembership = membership.find(member => member.publicUserData.userId === userId);

  // check if user has an admin role so they can create projects
  if (!userMembership || userMembership.role !== "org:admin") {
    throw new Error("Only organization admins can create projects");
  }

  try {
    const project = await db.project.create({
      data: {
        name: data.name,
        key: data.key,
        description: data.description,
        organizationId: orgId,
      }
    });
    return project;
  } catch (error) {
    throw new Error("Error creating project: " + error.message);
  }
}