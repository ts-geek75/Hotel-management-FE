"use client";

import { useAllGuestsQuery } from "@/generated/graphql";
import { useMemo } from "react";

export interface Guest {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string | null;
}

export const useGuests = () => {
  const { data, loading, refetch } = useAllGuestsQuery();

  const guests: Guest[] = useMemo(() => {
    return (
      data?.allUsers?.edges?.map((edge) => ({
        id: edge?.node?.id ?? "",
        name: edge?.node?.name ?? "",
        email: edge?.node?.email ?? "",
        phoneNumber: edge?.node?.phoneNumber ?? null,
      })) ?? []
    );
  }, [data]);

  return {
    guests,
    loading,
    refetch,
  };
};
