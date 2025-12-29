"use client";

import React, { useState } from "react";
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
import { useRooms } from "../hooks/useRooms";
import { RoomStatus, RoomType } from "@/generated/graphql";

const AddRoomDialog: React.FC = () => {
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("SINGLE");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("AVAILABLE");

  const { addRoom } = useRooms();
  const [loading, setLoading] = useState(false);

  const handleAddRoom = async () => {
    if (!roomNumber || !price || !roomType || !status) return;

    setLoading(true);

    await addRoom({
      roomNumber: Number(roomNumber),
      type: RoomType[roomType as keyof typeof RoomType],
      pricePerNight: price,
      status: RoomStatus[status as keyof typeof RoomStatus],
    });

    setRoomNumber("");
    setPrice("");
    setRoomType("");
    setStatus("");
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="flex items-center gap-2">
          + Add Room
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-105">
        <DialogHeader className="flex-row items-center justify-between">
          <DialogTitle>Add New Room</DialogTitle>
          <DialogClose asChild>
            <button className="cursor-pointer">
              <X className="h-4 w-4" />
            </button>
          </DialogClose>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Room Number</label>
            <Input
              type="number"
              placeholder="Eg-101"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              className="no-spinner"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Room Type</label>
            <Select value={roomType} onValueChange={setRoomType}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SINGLE">Single</SelectItem>
                <SelectItem value="DOUBLE">Double</SelectItem>
                <SelectItem value="DELUXE">Deluxe</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Price per Night ($)</label>
            <Input
              type="number"
              placeholder="Eg-80"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="no-spinner"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AVAILABLE">Available</SelectItem>
                <SelectItem value="BOOKED">Booked</SelectItem>
                <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="secondary"
              onClick={handleAddRoom}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Room"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddRoomDialog;
