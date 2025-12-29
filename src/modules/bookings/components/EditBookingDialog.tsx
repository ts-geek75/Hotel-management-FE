"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookingStatus } from "@/generated/graphql";
import { useBookings } from "../hooks/useBookings";

type BookingDetails = {
  id: string;
  guestName: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
};

type EditBookingDialogProps = {
  open: boolean;
  booking: BookingDetails | null;
  onClose: () => void;
};

const EditBookingDialog: React.FC<EditBookingDialogProps> = ({
  open,
  booking,
  onClose,
}) => {
  const [status, setStatus] = useState<BookingStatus | "">("");
  const { handleUpdateStatus, updating } = useBookings();

  useEffect(() => {
    if (booking) setStatus(booking.status);
  }, [booking]);

  if (!booking) return null;

  const onUpdateClick = async () => {
    if (!status || status === booking.status) return;
    await handleUpdateStatus(booking.id, status);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Booking Details
          </DialogTitle>
          <DialogClose asChild>
            <button className="absolute right-4 top-9">
              <X className="h-5 w-5" />
            </button>
          </DialogClose>
        </DialogHeader>

        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)" }}
        >
          <div>
            <p className="text-sm text-muted-foreground">Guest</p>
            <p>{booking.guestName}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Room</p>
            <p>{booking.roomNumber}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Check-In</p>
            <p>{booking.checkIn}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Check-Out</p>
            <p>{booking.checkOut}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Status</p>
          <Select
            value={status}
            onValueChange={(v) => setStatus(v as BookingStatus)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BOOKED">Booked</SelectItem>
              <SelectItem value="CHECKED_IN">Checked In</SelectItem>
              <SelectItem value="CHECKED_OUT">Checked Out</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end">
          <Button
            variant="secondary"
            onClick={onUpdateClick}
            disabled={updating || status === booking.status}
          >
            Update Status
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookingDialog;
