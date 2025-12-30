"use client";

import React, { useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { Loader } from "@/components";
import { BookingStatus, useBookingQuery } from "@/generated/graphql";

import BookingHeader from "./components/BookingHeader";
import BookingTable from "./BookingTable";
import DayBooking from "./components/DayBooking";

interface BookingCalendarProps {
  setIsBookingPanelOpen: (isOpen: boolean) => void;
  view: "calendar" | "table";
  setView: (view: "calendar" | "table") => void;
}

const statusColorMap: Record<BookingStatus, string> = {
  BOOKED: "#3b82f6",
  CHECKED_IN: "#a855f7",
  CHECKED_OUT: "#6b7280",
  CANCELLED: "#f87171",
};
const statusLegend = [
  { label: "Booked", color: "bg-blue-500" },
  { label: "Checked In", color: "bg-purple-500" },
  { label: "Checked Out", color: "bg-gray-500" },
  { label: "Cancelled", color: "bg-red-400" },
];
const BookingCalendar: React.FC<BookingCalendarProps> = ({
  setIsBookingPanelOpen,
  view,
  setView,
}) => {
  const { data, loading, error } = useBookingQuery();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [dayDialogOpen, setDayDialogOpen] = useState(false);

  const events = useMemo(() => {
    if (!data?.allBookings?.nodes) return [];

    return data.allBookings.nodes.flatMap((booking) => {
      if (!booking?.checkInDate || !booking?.checkOutDate) return [];

      const room = booking.roomByRoomId?.roomNumber ?? "Room";
      const guest = booking.userByUserId?.name ?? "Guest";

      return [
        {
          title: `${room} - ${guest}`,
          start: booking.checkInDate,
          end: booking.checkOutDate,
          backgroundColor: statusColorMap[booking.status],
          borderColor: statusColorMap[booking.status],
          textColor: "#ffffff",
          allDay: true,
        },
      ];
    });
  }, [data]);

  const dayBookings = useMemo(() => {
    if (!selectedDate || !data?.allBookings?.nodes) return [];

    return data.allBookings.nodes
      .filter((b): b is NonNullable<typeof b> =>
        Boolean(b?.checkInDate && b?.checkOutDate)
      )
      .filter(
        (b) => selectedDate >= b.checkInDate && selectedDate < b.checkOutDate
      )
      .map((b) => ({
        id: b.id,
        checkInDate: b.checkInDate,
        checkOutDate: b.checkOutDate,
        status: b.status!,
        room: b.roomByRoomId ? { roomNumber: b.roomByRoomId.roomNumber } : null,
        user: b.userByUserId ? { name: b.userByUserId.name } : null,
      }));
  }, [data, selectedDate]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load bookings
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BookingHeader
        setIsBookingPanelOpen={setIsBookingPanelOpen}
        setView={setView}
        view={view}
      />

      {view === "table" && (
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <BookingTable />
        </div>
      )}

      {view === "calendar" && (
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-lg border shadow-sm p-4 sm:p-6">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              headerToolbar={{
                left: "title",
                center: "",
                right: "prev,today,next",
              }}
              height="auto"
              dayMaxEvents={2}
              moreLinkClick="nothing"
              editable={false}
              selectable={false}
              dateClick={(info) => {
                setSelectedDate(info.dateStr);
                setDayDialogOpen(true);
              }}
              eventClick={(info) => {
                const dateStr = info.event.start?.toISOString().split("T")[0];
                if (dateStr) {
                  setSelectedDate(dateStr);
                  setDayDialogOpen(true);
                }
              }}
            />
            <div className="mt-6 ">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                {statusLegend.map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 sm:w-4 sm:h-4 rounded ${item.color}`}
                    ></div>
                    <span className="text-xs sm:text-sm text-gray-600">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <DayBooking
        open={dayDialogOpen}
        date={selectedDate}
        bookings={dayBookings}
        onOpenChange={setDayDialogOpen}
      />
    </div>
  );
};

export default BookingCalendar;
