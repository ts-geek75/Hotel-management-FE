"use client";

import React from "react";
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
import { useBookingQuery } from "@/generated/graphql";
import { Loader } from "@/components";

type BookingsTableProps = {
  showActions?: boolean;
  showName?: boolean;
  guestId?: string;
};

const statusVariantMap: Record<string, string> = {
  BOOKED: "bg-status-booked text-status-booked-text",
  CHECKED_IN: "bg-status-checked-in text-status-checked-in-text",
  CHECKED_OUT: "bg-status-checked-out text-status-checked-out-text",
  CANCELLED: "bg-status-cancelled text-status-cancelled-text",
};

const BookingsTable: React.FC<BookingsTableProps> = ({
  showActions = true,
  showName = true,
  guestId,
}) => {
  const { data, loading } = useBookingQuery();

  if (loading) {
    return <Loader />;
  }
  const filteredBookings = (data?.allBookings?.nodes || [])
    .filter((booking): booking is NonNullable<typeof booking> => !!booking) 
    .filter((booking) =>
      guestId ? booking.userByUserId?.id === guestId : true
    );
  return (
    <div className="rounded-xl border bg-white overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-200">
          <TableRow>
            {showName && <TableHead>GUEST</TableHead>}
            <TableHead>ROOM</TableHead>
            <TableHead>CHECK-IN</TableHead>
            <TableHead>CHECK-OUT</TableHead>
            <TableHead>STATUS</TableHead>
            {showActions && (
              <TableHead className="text-right text-muted-foreground">
                ACTIONS
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBookings.map((booking) => (
            <TableRow key={booking.createdAt}>
              {" "}
              {showName && (
                <TableCell className="font-medium">
                  {booking.userByUserId?.name}
                </TableCell>
              )}
              <TableCell>{booking.roomByRoomId?.roomNumber}</TableCell>
              <TableCell>{booking.checkInDate}</TableCell>
              <TableCell>{booking.checkOutDate}</TableCell>
              <TableCell>
                <Badge
                  className={`rounded-full px-3 py-1 text-[11px] font-medium ${
                    statusVariantMap[booking.status] || ""
                  }`}
                >
                  {booking.status.replace("_", " ")}
                </Badge>
              </TableCell>
              {showActions && (
                <TableCell className="flex justify-end gap-3">
                  <Eye className="h-4 w-4 cursor-pointer text-muted-foreground" />
                  {booking.status !== "CHECKED_OUT" && (
                    <X className="h-4 w-4 cursor-pointer text-red-500" />
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingsTable;
