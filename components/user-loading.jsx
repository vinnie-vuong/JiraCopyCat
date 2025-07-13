"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { BarLoader } from "react-spinners"

const UserLoading = () => {
  const { isLoaded: isOrganizationLoaded } = useOrganization();
  const { isLoaded: isUserLoaded } = useUser();

  if (!isOrganizationLoaded || !isUserLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>;
  }
  return <></>;
};

export default UserLoading;