"use client";

import { BookingStatus, useBookingQuery } from "@/generated/graphql";

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
};
export const useBookings = (): UseBookingsReturn => {
    const { data, loading, error, refetch } = useBookingQuery();

    const bookings: Booking[] =
        data?.allBookings?.nodes
            ?.filter((booking): booking is NonNullable<typeof booking> => Boolean(booking?.status))
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
    };
};
