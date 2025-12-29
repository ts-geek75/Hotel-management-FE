"use client";

import React, { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader } from "@/components";
import EditRoomDialog from "./EditRoomDialog";
import { Button } from "@/components/ui/button";
import { useRooms } from "../hooks/useRooms";

type roomsTableProps = {
  showActions?: boolean;
};

const statusVariantMap: Record<string, string> = {
  BOOKED: "bg-blue-100 text-blue-700",
  AVAILABLE: "bg-green-100 text-green-800",
  MAINTENANCE: "bg-[#fef3e7] text-[#d97706]",
};

const RoomsTable: React.FC<roomsTableProps> = ({ showActions = true }) => {
  const { rooms, loading, deleteRoom } = useRooms();
  const [roomToDelete, setRoomToDelete] = useState<string | null>(null);

  if (loading) return <Loader />;

  const handleConfirmDelete = async () => {
    if (!roomToDelete) return;
    await deleteRoom(roomToDelete);
    setRoomToDelete(null);
  };

  return (
    <div className="rounded-xl border bg-white overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableHead>ROOM NO</TableHead>
            <TableHead>TYPE</TableHead>
            <TableHead>PRICE/NIGHT</TableHead>
            <TableHead>STATUS</TableHead>
            {showActions && (
              <TableHead className="text-right text-muted-foreground">
                ACTIONS
              </TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rooms.map((room) => (
            <TableRow key={room?.id}>
              <TableCell className="font-medium">{room?.roomNumber}</TableCell>
              <TableCell>{room?.type}</TableCell>
              <TableCell>${room?.pricePerNight}</TableCell>
              <TableCell>
                <span
                  className={`px-3 py-1.5 rounded-full text-[11px] font-medium  ${
                    statusVariantMap[room?.status]
                  }`}
                >
                  {room?.status}
                </span>
              </TableCell>

              {showActions && (
                <TableCell className="flex justify-end gap-5">
                  <EditRoomDialog room={room}>
                    <Pencil className="h-4 w-4 cursor-pointer text-muted-foreground" />
                  </EditRoomDialog>

                  <Trash
                    className="h-4 w-4 cursor-pointer text-red-500"
                    onClick={() => setRoomToDelete(room.id!)}
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {roomToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Delete Room</h3>
            <p className="mb-6">Are you sure you want to delete this room?</p>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setRoomToDelete(null)}>
                Cancel
              </Button>
              <Button variant="secondary" onClick={handleConfirmDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomsTable;
