"use client";

import { sprintSchema } from "@/app/lib/validator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const SprintCreationForm = ({
  projectTitle,
  projectId,
  projectKey,
  sprintKey,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: addDays(new Date(), 14),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(sprintSchema),
    defaultValues: {
      name: `${projectKey}-${sprintKey}`,
      startDate: dateRange.from,
      endDate: dateRange.to,
    },
  });
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-5xl font-bold mb-8 gradient-title">
          {projectTitle}
        </h1>
        <Button
          className="mt-2"
          onClick={() => setShowForm(!showForm)}
          variant={showForm ? "destructive" : "default"}
        >
          {showForm ? "Cancel" : "Create New Sprint"}
        </Button>
        {showForm && (
          <Card className="pt-4 mb-4">
            <CardContent>
              <form className="flex gap-4 items-end">
                <div className="flex-1">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1"
                  >
                    Sprint Name
                  </label>
                  <Input
                    id="name"
                    readOnly
                    className="bg-slate-950"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Sprint Duration
                  </label>
                  <Controller
                    control={control}
                    name="dateRange"
                    render={({ field }) => {
                      return (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                        </Popover>
                      );
                    }}
                  ></Controller>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default SprintCreationForm;
