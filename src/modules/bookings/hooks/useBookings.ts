"use client";

import { toast } from "sonner";
import {
  BookingStatus,
  useBookingQuery,
  useUpdateBookingStatusMutation,
} from "@/generated/graphql";

type Booking = {
  checkInDate: string;
  checkOutDate: string;
  createdAt: string;
  updatedAt: string;
  status: BookingStatus;
  roomId: string;
  userId: string;
  room: {
    id: string;
    roomNumber: number;
  } | null;
  user: {
    name: string;
  } | null;
};

type UseBookingsReturn = {
  bookings: Booking[];
  loading: boolean;
  error: Error | undefined;
  refetch: () => void;
  handleUpdateStatus: (id: string, status: BookingStatus) => Promise<void>;
  handleCancelBooking: (id: string) => Promise<void>;
  updating: boolean;
  cancelling: boolean;
};

export const useBookings = (): UseBookingsReturn => {
  const { data, loading, error, refetch } = useBookingQuery();

  const [updateStatus, { loading: updating }] =
    useUpdateBookingStatusMutation();

  const handleUpdateStatus = async (id: string, status: BookingStatus) => {
    await updateStatus({
      variables: { id, status },
      refetchQueries: ["Booking"],
      onCompleted: () => toast.success("Booking updated"),
      onError: () => toast.error("Update failed"),
    });
  };

  const handleCancelBooking = async (id: string) => {
    await updateStatus({
      variables: { id, status: BookingStatus.Cancelled },
      refetchQueries: ["Booking"],
      onCompleted: () => toast.success("Booking cancelled"),
      onError: () => toast.error("Cancel failed"),
    });
  };

  const bookings: Booking[] =
    data?.allBookings?.nodes
      ?.filter(
        (booking): booking is NonNullable<typeof booking> =>
          Boolean(booking?.status)
      )
      .map((booking) => ({
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
        status: booking.status!,
        roomId: booking.roomId,
        userId: booking.userId,
        room: booking.roomByRoomId
          ? {
              id: booking.roomByRoomId.id,
              roomNumber: booking.roomByRoomId.roomNumber,
            }
          : null,
        user: booking.userByUserId
          ? {
              name: booking.userByUserId.name,
            }
          : null,
      })) ?? [];

  return {
    bookings,
    loading,
    error,
    refetch,
    handleUpdateStatus,
    handleCancelBooking,
    updating,
    cancelling: updating,
  };
};
