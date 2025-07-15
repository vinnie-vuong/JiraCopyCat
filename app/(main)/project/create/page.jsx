"use client";

import OrgSwitcher from '@/components/org-switcher';
import { useOrganization, useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema } from '@/app/lib/validator';
import { Input } from '@/components/ui/input';

const createProjectPage = () => {
  const { isLoaded: isOrgLoaded, membership } = useOrganization();
  const { isLoaded: isUserLoaded } = useUser();
  const [ isAdmin, setIsAdmin ] = useState(false);

  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: zodResolver(projectSchema),
  })

  useEffect(() => {
    if (isOrgLoaded && isUserLoaded && membership) {
      setIsAdmin(membership.role === "org:admin");
    }
  }, [isOrgLoaded, isUserLoaded, membership]);

  if (!isOrgLoaded || !isUserLoaded) {
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col gap-2 items-center">
        <span className="text-2xl gradient-title">
          Oops! Only admins can create projects!
        </span>
        <OrgSwitcher/>
      </div>
    )
  }
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-6xl text-center font-bold mb-8 gradient-title">
        Create New Project
      </h1>

      <form>
        <Input
          id="name"
          className="bg-slate-950"
          placeHolder="Project Name"
        />
      </form>
    </div>
  )
};

export default createProjectPage;