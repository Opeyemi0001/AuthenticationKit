"use client"

import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useRedirect = (redirect: string) => {
  const {useLoginStatus} = useUserContext();
  const router = useRouter();

  useEffect(() => {
    const redirectUser = async () => {
      try {
        const isLoggedUser = await useLoginStatus();
        console.log("isLoggedUser", isLoggedUser);

        if (isLoggedUser) router.push(redirect);
      } catch (error) {
        console.log("Error in redirecting User", error);
      }
    };

    redirectUser();
  },[redirect, useLoginStatus, router]);
};

export default useRedirect;