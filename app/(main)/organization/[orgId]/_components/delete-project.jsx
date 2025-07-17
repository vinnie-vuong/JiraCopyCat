"use client";

import { deleteProject } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import { useOrganization } from "@clerk/nextjs";
import { Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DeleteProject = ({ projectId }) => {
  const { membership } = useOrganization();
  const router = useRouter();

  const {
    data: deleted,
    loading: isDeleting,
    error,
    fn: deleteProjectFn,
  } = useFetch(deleteProject);

  console.log('deleted: ', deleted)

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteProjectFn(projectId);
    }
  };

  useEffect(() => {
    if (deleted?.success) {
      toast.success("Project deleted!");
      router.refresh(); {/* keep the UI in sync with the server, make sure the deleted project is gone from the UI */}
    }
  }, [deleted])

  const isAdmin = membership?.role === "org:admin";

  if (!isAdmin) return null;

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className={`${isDeleting ? "animate-pulse" : ""}`}
        onClick={handleDelete}
        disabled={isDeleting}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </>
  );
};

export default DeleteProject;
