"use server";

import { getProjects } from "@/actions/projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import DeleteProject from "./delete-project"

export default async function ProjectList({ orgId }) {
  const projects = await getProjects(orgId);
  if (projects.length === 0) {
    return (
      <p>
        No Projects Found.{" "}
        <Link
          href="/project/create"
          className="underline underline-offset-2 text-blue-200"
        >
          Create New
        </Link>
      </p>
    );
  } else {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((proj) => {
          return (
            <Card key={proj.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {proj.name}
                  <DeleteProject projectId={proj.id}/>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  {proj.description}
                </p>
                <Link
                  href={`/project/${proj.id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Project
                </Link>
              </CardContent>
            </Card>
          )})
        }
      </div>
    );
  }
}
