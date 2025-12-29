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
};

const statusVariantMap: Record<string, string> = {
  BOOKED: "bg-status-booked text-status-booked-text",
  CHECKED_IN: "bg-status-checked-in text-status-checked-in-text",
  CHECKED_OUT: "bg-status-checked-out text-status-checked-out-text",
  CANCELLED: "bg-status-cancelled text-status-cancelled-text",
};

const BookingsTable: React.FC<BookingsTableProps> = ({
  showActions = true,
}) => {
  const { data, loading } = useBookingQuery();

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="rounded-xl border bg-white">
      <Table>
        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableHead className="text-muted-foreground">GUEST</TableHead>
            <TableHead className="text-muted-foreground">ROOM</TableHead>
            <TableHead className="text-muted-foreground">CHECK-IN</TableHead>
            <TableHead className="text-muted-foreground">CHECK-OUT</TableHead>
            <TableHead className="text-muted-foreground">STATUS</TableHead>
            {showActions && (
              <TableHead className="text-right text-muted-foreground">
                ACTIONS
              </TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.allBookings?.nodes.map((booking) => (
            <TableRow key={booking?.createdAt}>
              <TableCell className="font-medium">
                {booking?.userByUserId?.name}
              </TableCell>

              <TableCell>
                {booking?.roomByRoomId?.roomNumber}
              </TableCell>

              <TableCell>{booking?.checkInDate}</TableCell>

              <TableCell>{booking?.checkOutDate}</TableCell>

              <TableCell>
                <Badge
                  className={`rounded-full px-3 py-1 text-[11px] font-medium ${
                    statusVariantMap[booking.status]
                  }`}
                >
                  {booking?.status.replace("_", " ")}
                </Badge>
              </TableCell>

              {showActions && (
                <TableCell className="flex justify-end gap-3">
                  <Eye className="h-4 w-4 cursor-pointer text-muted-foreground" />
                  {booking?.status !== "CHECKED_OUT" && (
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
