"use client";

import React, { useState } from "react";

import BookingCalendar from "@/modules/bookings/BookingCalender";
import CreateBookingDialog from "@/modules/bookings/components/CreateBooking";

const Bookingpage: React.FC = () => {
  const [isBookingPanelOpen, setIsBookingPanelOpen] = useState(false);
  const [view, setView] = useState<"calendar" | "table">("calendar");

  return (
    <>
      <BookingCalendar
        setIsBookingPanelOpen={setIsBookingPanelOpen}
        view={view}
        setView={setView}
      />

      <CreateBookingDialog
        open={isBookingPanelOpen}
        onOpenChange={setIsBookingPanelOpen}
      />
    </>
  );
}

export default Bookingpage ;