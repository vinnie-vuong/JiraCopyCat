import { getProject } from '@/actions/projects';
import { notFound } from 'next/navigation';
import React from 'react'

const ProjectPage = async ({ params }) => {

  const { projectId } = params;

  const project = await getProject(projectId);

  if (!project) {
    notFound();
  }
  return (
    <div>
      {/* Sprint Creation */ }

      {/* Sprint Board */}
      {project.sprints.length > 0 ? (
        <></>
      ) : (
        <div>Create a Sprint from the button above</div>
      )}
    </div>
  );
}

export default ProjectPage