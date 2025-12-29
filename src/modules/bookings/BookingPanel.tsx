"use client";

import React, { useState } from "react";
import { X, Calendar, Table, Plus } from "lucide-react";
import BookingCalendar from "./BookingCalander";
import BookingTable from "./BookingTable";

const BookingPanel: React.FC = () => {
  const [isBookingPanelOpen, setIsBookingPanelOpen] = useState(false);
  const [view, setView] = useState<"calendar" | "table">("calendar");
  const [formData, setFormData] = useState({
    guestName: "",
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    status: "BOOKED",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking data:", formData);
    // TODO: Add mutation to create booking
    setIsBookingPanelOpen(false);
  };

  if (!isBookingPanelOpen) return <BookingCalendar isBookingPanelOpen={isBookingPanelOpen} setIsBookingPanelOpen={setIsBookingPanelOpen} view={view} setView={setView} />;

  // Show table view
  if (view === "table") {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={() => setView("calendar")}
        ></div>

        {/* Panel */}
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-auto">
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4 rounded-t-lg sticky top-0">
              <h2 className="text-lg font-semibold text-white">Bookings Table</h2>
              <button
                onClick={() => setView("calendar")}
                className="text-white hover:bg-teal-800 p-1 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Table Content */}
            <div className="p-6">
              <BookingTable />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={() => setIsBookingPanelOpen(false)}
      ></div>

      {/* Panel */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4 rounded-t-lg">
            <h2 className="text-lg font-semibold text-white">New Booking</h2>
            <button
              onClick={() => setIsBookingPanelOpen(false)}
              className="text-white hover:bg-teal-800 p-1 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Guest Name
              </label>
              <input
                type="text"
                name="guestName"
                value={formData.guestName}
                onChange={handleInputChange}
                placeholder="Enter guest name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room Number
              </label>
              <input
                type="text"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleInputChange}
                placeholder="Enter room number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check-in Date
              </label>
              <input
                type="date"
                name="checkInDate"
                value={formData.checkInDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check-out Date
              </label>
              <input
                type="date"
                name="checkOutDate"
                value={formData.checkOutDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="BOOKED">Booked</option>
                <option value="CHECKED_IN">Checked In</option>
                <option value="CHECKED_OUT">Checked Out</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsBookingPanelOpen(false)}
                className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors"
              >
                Create Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPanel;
