"use client";

import React, { useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Calendar, Table, Plus } from "lucide-react";
import { useBookingQuery } from "@/generated/graphql";
import BookingTable from "./BookingTable";
import { Loader } from "@/components";

interface BookingCalendarProps {
  isBookingPanelOpen: boolean;
  setIsBookingPanelOpen: (isOpen: boolean) => void;
  view: "calendar" | "table";
  setView: (view: "calendar" | "table") => void;
}

const statusColorMap: Record<string, string> = {
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

const BookingCalendar: React.FC<BookingCalendarProps> = ({ isBookingPanelOpen, setIsBookingPanelOpen, view, setView }) => {
  const { data, loading, error } = useBookingQuery();

  

  const events = useMemo(() => {
  if (!data?.allBookings?.nodes) return [];

  const allEvents = data.allBookings.nodes.flatMap((booking) => {
    if (!booking?.checkInDate || !booking?.checkOutDate) return [];

    const room = booking.roomByRoomId?.roomNumber ?? "Room";
    const guest = booking.userByUserId?.name ?? "Guest";
    const titleBase = `${room} - ${guest}`;

    // For BOOKED status: show the entire booking period (check-in to check-out)
    if (booking.status === "BOOKED") {
      return [
        {
          title: `${titleBase} (Booked)`,
          start: booking.checkInDate,
          end: booking.checkOutDate,
          backgroundColor: statusColorMap.BOOKED,
          borderColor: statusColorMap.BOOKED,
          textColor: "#ffffff",
          allDay: true,
        },
      ];
    }

    // For CHECKED_IN status: show only the check-in date (guest has arrived)
    if (booking.status === "CHECKED_IN") {
      return [
        {
          title: `${titleBase} (Checked In)`,
          start: booking.checkInDate,
          end:booking.checkOutDate,
          backgroundColor: statusColorMap.CHECKED_IN,
          borderColor: statusColorMap.CHECKED_IN,
          textColor: "#ffffff",
          allDay: true,
        },
      ];
    }

    // For CHECKED_OUT status: show full duration from check-in to check-out
    if (booking.status === "CHECKED_OUT") {
      return [
        {
          title: `${titleBase} (Checked Out)`,
          start: booking.checkInDate,
          end: booking.checkOutDate,
          backgroundColor: statusColorMap.CHECKED_OUT,
          borderColor: statusColorMap.CHECKED_OUT,
          textColor: "#ffffff",
          allDay: true,
        },
      ];
    }

    // For CANCELLED status: show full duration like BOOKED
    if (booking.status === "CANCELLED") {
      return [
        {
          title: `${titleBase} (Cancelled)`,
          start: booking.checkInDate,
          end: booking.checkOutDate,
          backgroundColor: statusColorMap.CANCELLED,
          borderColor: statusColorMap.CANCELLED,
          textColor: "#ffffff",
          allDay: true,
        },
      ];
    }

    return [];
  });

  // Debug: Log events to console
  console.log("Calendar Events:", allEvents);
  console.log("Checked Out Events:", allEvents.filter(e => e.title.includes("Checked Out")));

  return allEvents;
}, [data]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Failed to load bookings</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* View Toggle and Actions */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView("calendar")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                view === "calendar"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Calendar className="w-4 h-4" />
              Calendar
            </button>
            <button
              onClick={() => setView("table")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                view === "table"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Table className="w-4 h-4" />
              Table
            </button>
          </div>
          <button 
            onClick={() => setIsBookingPanelOpen(true)}
            className="flex items-center justify-center gap-2 bg-primary-green hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Plus className="w-4 h-4" />
            New Booking
          </button>
        </div>
      </div>

      {/* Table View */}
      {view === "table" && (
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <BookingTable />
        </div>
      )}

      {/* Calendar View */}
      {view === "calendar" && (
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="fullcalendar-wrapper">
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                initialDate="2025-12-01"
                events={events}
                headerToolbar={{
                  left: "title",
                  center: "",
                  right: "prev,today,next",
                }}
                height="auto"
                eventContent={(arg) => {
                  return (
                    <div className="text-xs px-1.5 py-0.5 truncate text-white rounded">
                      {arg.event.title}
                    </div>
                  );
                }}
                dayMaxEvents={3}
                moreLinkText={(num) => `+${num} more`}
                dayHeaderFormat={{ weekday: "short" }}
                editable={false}
                selectable={false}
              />
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                {statusLegend.map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded ${item.color}`}></div>
                    <span className="text-xs sm:text-sm text-gray-600">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingCalendar