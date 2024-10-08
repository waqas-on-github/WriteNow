"use client";
import { logout } from "@/actions/logout";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useLogout = () => {

  const { mutate, isPending, data } = useMutation({
    mutationFn: logout,
    onMutate: () => {
    },
    onSuccess: () => {
      toast.message("logged out successfully");
    },
    onError: (error) => {
      console.error("Logout error", error);
      toast.message("something went wrong");
    },
  });

  return {
    mutate,
    isPending,
    data,
  };
};
