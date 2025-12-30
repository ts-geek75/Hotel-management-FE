"use client";

import { toast } from "sonner";

import {
  BookingStatus,
  CreateBookingInput,
  useBookingQuery,
  useCreateBookingMutation,
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

type CreateBookingPayload = {
  roomId: string;
  userId: string;
  checkInDate: string;
  checkOutDate: string;
  status: BookingStatus;
};

type UseBookingsReturn = {
  bookings: Booking[];
  loading: boolean;
  error: Error | undefined;
  refetch: () => void;
  handleCreateBooking: (payload: CreateBookingPayload) => Promise<void>;
  handleUpdateStatus: (id: string, status: BookingStatus) => Promise<void>;
  handleCancelBooking: (id: string) => Promise<void>;
  creating: boolean;
  updating: boolean;
  cancelling: boolean;
};

const isDateOverlap = (
  startA: string,
  endA: string,
  startB: string,
  endB: string
) =>
  new Date(startA) < new Date(endB) &&
  new Date(endA) > new Date(startB);

export const useBookings = (): UseBookingsReturn => {
  const { data, loading, error, refetch } = useBookingQuery();

  const [createBooking, { loading: creating }] =
    useCreateBookingMutation();

  const [updateStatus, { loading: updating }] =
    useUpdateBookingStatusMutation();

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

  const handleCreateBooking = async (payload: CreateBookingPayload) => {
    const conflict = bookings.some(
      (booking) =>
        booking.roomId === payload.roomId &&
        booking.status !== BookingStatus.Cancelled &&
        isDateOverlap(
          payload.checkInDate,
          payload.checkOutDate,
          booking.checkInDate,
          booking.checkOutDate
        )
    );

    if (conflict) {
      toast.error(
        "Room already booked for the selected dates"
      );
      return;
    }

    await createBooking({
      variables: {
        input: {
          booking: payload,
        } as CreateBookingInput,
      },
      refetchQueries: ["Booking"],
      onCompleted: () => toast.success("Booking created"),
      onError: () => toast.error("Creation failed"),
    });
  };

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

  return {
    bookings,
    loading,
    error,
    refetch,
    handleCreateBooking,
    handleUpdateStatus,
    handleCancelBooking,
    creating,
    updating,
    cancelling: updating,
  };
};
