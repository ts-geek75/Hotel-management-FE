import React from "react";
import { X, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { BookingStatus } from "@/generated/graphql";

interface Booking {
  id: string;
  checkInDate: string;
  checkOutDate: string;
  status: BookingStatus;
  room?: {
    roomNumber: number;
  } | null;
  user?: {
    name: string;
  } | null;
}

interface DayBookingProps {
  open: boolean;
  date: string | null;
  bookings: Booking[];
  onOpenChange: (open: boolean) => void;
}

const statusVariantMap: Record<BookingStatus, string> = {
  BOOKED: "bg-status-booked text-status-booked-text",
  CHECKED_IN: "bg-status-checked-in text-status-checked-in-text",
  CHECKED_OUT: "bg-status-checked-out text-status-checked-out-text",
  CANCELLED: "bg-status-cancelled text-status-cancelled-text",
};

const DayBooking: React.FC<DayBookingProps> = ({
  open,
  date,
  bookings,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="relative">
          <DialogTitle>Bookings on {date}</DialogTitle>
          <DialogClose className="absolute right-4 focus:outline-none">
            <X className="h-4 w-4" />
          </DialogClose>
        </DialogHeader>

        <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
          {bookings.length === 0 && (
            <p className="text-sm text-gray-500">No bookings for this date</p>
          )}

          {bookings.map((booking) => (
            <div key={booking.id} className="rounded-lg border p-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">
                  Room {booking.room?.roomNumber ?? "-"}
                </p>
                <Badge className={statusVariantMap[booking.status]}>
                  {booking.status.replace("_", " ")}
                </Badge>
              </div>

              <p className="text-sm text-gray-600 mb-1">
                Guest: {booking.user?.name ?? "-"}
              </p>

              <p className="text-xs text-gray-500 flex items-center gap-1">
                {booking.checkInDate} <ArrowRight className="h-3 w-3" />{" "}
                {booking.checkOutDate}
              </p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DayBooking;
