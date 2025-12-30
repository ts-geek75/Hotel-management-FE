"use client";

import React from "react";
import { Calendar, Plus, Table } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingHeaderProps {
  setIsBookingPanelOpen: (isOpen: boolean) => void;
  setView: (view: "calendar" | "table") => void;
  view: "calendar" | "table";
}

const BookingHeader: React.FC<BookingHeaderProps> = ({
  setIsBookingPanelOpen,
  setView,
  view,
}) => {
  return (
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

        <Button onClick={() => setIsBookingPanelOpen(true)} variant="secondary">
          <Plus className="w-4 h-4" />
          New Booking
        </Button>
      </div>
    </div>
  );
};

export default BookingHeader;
