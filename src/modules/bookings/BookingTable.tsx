"use client";

import React, { useState } from "react";
import { Eye, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components";
import { BookingStatus } from "@/generated/graphql";
import EditBookingDialog from "./components/EditBookingDialog";
import { useBookings } from "./hooks/useBookings";

const statusVariantMap: Record<BookingStatus, string> = {
  BOOKED: "bg-status-booked text-status-booked-text",
  CHECKED_IN: "bg-status-checked-in text-status-checked-in-text",
  CHECKED_OUT: "bg-status-checked-out text-status-checked-out-text",
  CANCELLED: "bg-status-cancelled text-status-cancelled-text",
};

interface BookingsTableProps {
  hideActions?: boolean;
  hideGuest?: boolean;
  guestId?: string;
}

const BookingsTable: React.FC<BookingsTableProps> = ({
  hideActions = false,
  hideGuest = false,
  guestId,
}) => {
  const { bookings, loading, handleCancelBooking } = useBookings();

  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [bookingToDelete, setBookingToDelete] = useState<any | null>(null);

  if (loading) return <Loader />;

  let filteredBookings = bookings;

  if (guestId) {
    filteredBookings = filteredBookings.filter(
      (b) => b.userId === guestId
    );
  }

  const handleConfirmCancel = () => {
    if (bookingToDelete) {
      handleCancelBooking(bookingToDelete.id);
      setBookingToDelete(null);
    }
  };

  return (
    <>
      <div className="rounded-xl border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {!hideGuest && <TableHead>Guest</TableHead>}
              <TableHead>Room</TableHead>
              <TableHead>Check-In</TableHead>
              <TableHead>Check-Out</TableHead>
              <TableHead>Status</TableHead>
              {!hideActions && (
                <TableHead className="text-right">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={hideGuest ? 5 : 6}
                  className="py-10 text-center text-muted-foreground"
                >
                  No bookings found
                </TableCell>
              </TableRow>
            ) : (
              filteredBookings.map((b) => (
                <TableRow key={b?.checkInDate + b?.roomId}>
                  {!hideGuest && <TableCell>{b?.user?.name}</TableCell>}
                  <TableCell>{b?.room?.roomNumber}</TableCell>
                  <TableCell>{b?.checkInDate}</TableCell>
                  <TableCell>{b?.checkOutDate}</TableCell>
                  <TableCell>
                    <Badge className={statusVariantMap[b.status]}>
                      {b.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  {!hideActions && (
                    <TableCell className="flex justify-end gap-3">
                      <Eye
                        className="h-4 w-4 cursor-pointer"
                        onClick={() =>
                          setSelectedBooking({
                            id: b?.roomId + b?.checkInDate,
                            guestName: b?.user?.name,
                            roomNumber: b?.room?.roomNumber,
                            checkIn: b?.checkInDate,
                            checkOut: b?.checkOutDate,
                            status: b?.status,
                          })
                        }
                      />
                      <X
                        className="h-4 w-4 cursor-pointer text-red-500"
                        onClick={() => setBookingToDelete(b)}
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {bookingToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Cancel Booking</h3>
            <p className="mb-6 text-muted-foreground">
              Are you sure you want to cancel this booking?
            </p>
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => setBookingToDelete(null)}
              >
                Keep Booking
              </Button>
              <Button variant="destructive" onClick={handleConfirmCancel}>
                Cancel Booking
              </Button>
            </div>
          </div>
        </div>
      )}

      <EditBookingDialog
        open={!!selectedBooking}
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </>
  );
};

export default BookingsTable;
