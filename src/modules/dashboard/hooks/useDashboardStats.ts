"use client";

import { useDashboardStatsQuery } from "@/generated/graphql";
import { useMemo } from "react";

export interface DashboardStats {
  totalRooms: number;
  availableRooms: number;
  bookedBookings: number;
  checkedInBookings: number;
  loading: boolean;
  refetch: () => void;
}

export const useDashboardStats = (): DashboardStats => {
  const { data, loading, refetch } = useDashboardStatsQuery();

  const stats = useMemo(() => ({
    totalRooms: data?.totalRooms?.totalCount ?? 0,
    availableRooms: data?.availableRooms?.totalCount ?? 0,
    bookedBookings: data?.bookedBookings?.totalCount ?? 0,
    checkedInBookings: data?.checkedInBookings?.totalCount ?? 0,
    loading,
    refetch,
  }), [data, loading, refetch]);

  return stats;
};
