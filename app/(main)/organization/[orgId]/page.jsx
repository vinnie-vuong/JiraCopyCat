import React from 'react'

const Organization = async ({ params }) => {
  const { orgId } = await params
  return (
    <div>{ orgId }</div>
  )
}

export default Organization