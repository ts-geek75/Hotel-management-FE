"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RoomStatus, RoomType } from "@/generated/graphql";
import { useRooms } from "../hooks/useRooms";

interface EditRoomDialogProps {
  room: {
    roomNumber: number;
    type: RoomType;
    pricePerNight: string;
    status: RoomStatus;
  };
  children: React.ReactNode;
}

const EditRoomDialog: React.FC<EditRoomDialogProps> = ({ room, children }) => {
  const [roomType, setRoomType] = useState<RoomType>(room.type);
  const [price, setPrice] = useState(room.pricePerNight);
  const [status, setStatus] = useState<RoomStatus>(room.status);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { updateRoom } = useRooms();

  useEffect(() => {
    setRoomType(room.type);
    setPrice(room.pricePerNight);
    setStatus(room.status);
  }, [room]);

  const handleUpdateRoom = async () => {
    setLoading(true);

    await updateRoom(
      room.roomNumber,
      {
        type: room.type,
        pricePerNight: room.pricePerNight,
        status: room.status,
      },
      {
        type: roomType,
        pricePerNight: price,
        status,
      }
    );

    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-105">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Edit Room</DialogTitle>
          <DialogClose asChild>
            <button>
              <X className="h-4 w-4" />
            </button>
          </DialogClose>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Room Number</label>
            <Input type="number" value={room.roomNumber} readOnly />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Room Type</label>
            <Select
              value={roomType}
              onValueChange={(value) => setRoomType(value as RoomType)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={RoomType.Single}>Single</SelectItem>
                <SelectItem value={RoomType.Double}>Double</SelectItem>
                <SelectItem value={RoomType.Deluxe}>Deluxe</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Price per Night</label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Status</label>
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as RoomStatus)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={RoomStatus.Available}>Available</SelectItem>
                <SelectItem value={RoomStatus.Booked}>Booked</SelectItem>
                <SelectItem value={RoomStatus.Maintenance}>
                  Maintenance
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="secondary"
              onClick={handleUpdateRoom}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Room"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditRoomDialog;
