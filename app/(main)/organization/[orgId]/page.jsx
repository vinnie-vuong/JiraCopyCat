import React from 'react'

const Organization = async ({ params }) => {
  const { orgId } = params
  return (
    <div>{ orgId }</div>
  )
}

export default Organization