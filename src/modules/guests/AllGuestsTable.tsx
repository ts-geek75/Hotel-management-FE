"use client";

import { useState } from "react";
import { Eye, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader } from "@/components";
import { useGuests } from "./hooks/useAllGuests";
import BookingsTable from "../bookings/BookingTable";

interface GuestBooking {
  id: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  status: string;
}

interface Guest {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string | null;
  bookings?: GuestBooking[];
}

interface GuestsTableProps {
  showActions?: boolean;
}

const GuestsTable: React.FC<GuestsTableProps> = ({ showActions = true }) => {
  const { guests, loading } = useGuests();
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);

  if (loading) return <Loader />;

  return (
    <div className="rounded-xl border bg-white overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-200 text-xs text-muted-foreground">
          <TableRow>
            <TableHead> NAME </TableHead>
            <TableHead>EMAIL</TableHead>
            <TableHead>PHONE</TableHead>
            {showActions && (
              <TableHead className="text-right text-xs">ACTIONS</TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {guests.map((guest: Guest) => (
            
            <TableRow key={guest.id} className="hover:bg-gray-50">
              <TableCell className="font-medium text-gray-900">
                {guest.name}
              </TableCell>
              <TableCell>{guest.email}</TableCell>
              <TableCell>{guest.phoneNumber || "N/A"}</TableCell>
              {showActions && (
                <TableCell className="flex justify-end pr-6">
                  <Eye
                    className="h-4 w-4 cursor-pointer hover:text-primary-green transition-colors"
                    onClick={() => setSelectedGuest(guest)}
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedGuest && (
    
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="px-6 pt-6 border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold ">Guest Details</h2>
                <button
                  onClick={() => setSelectedGuest(null)}
                  className="p-1  rounded-full transition-colors"
                >
                  <X className="h-6 w-6 text-muted-foreground cursor-pointer" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">
                    Name
                  </p>
                  <p> {selectedGuest.name} </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">
                    Email
                  </p>
                  <p> {selectedGuest.email} </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">
                    Phone
                  </p>
                  <p> {selectedGuest.phoneNumber || "N/A"} </p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-base font-medium mb-4">Booking History</h3>
              <div className="bg-white border rounded-lg overflow-hidden">
                <BookingsTable hideGuest={true} hideActions={true} guestId = {selectedGuest.id} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestsTable;
