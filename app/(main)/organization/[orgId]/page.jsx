import React from 'react'
import getOrganization from '@/actions/organization';

const Organization = async ({ params }) => {
  const { orgId } = await params;

  const organization = await getOrganization(orgId);

  if (!organization) {
    return <div>Organization Not Found</div>
  }

  return (
    <div>
      <h1>{organization.name}&rsquo;s Projects</h1>
    </div>
  )
}

export default Organization