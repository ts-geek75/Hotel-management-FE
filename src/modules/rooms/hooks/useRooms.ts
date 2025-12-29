"use client";

import { useCallback } from "react";
import { toast } from "sonner";

import {
  Room,
  RoomStatus,
  RoomType,
  useCreateRoomMutation,
  useDeleteRoomMutation,
  useRoomsQuery,
  useUpdateRoomMutation,
} from "@/generated/graphql";

type RoomFormInput = {
  type: RoomType;
  pricePerNight: string;
  status: RoomStatus;
};

interface UseRoomsResult {
  rooms: Room[];
  loading: boolean;
  refetchRooms: () => void;
  addRoom: (room: {
    roomNumber: number;
    type: RoomType;
    pricePerNight: string;
    status: RoomStatus;
  }) => Promise<void>;
  updateRoom: (
    roomNumber: number,
    originalRoom: RoomFormInput,
    roomPatch: RoomFormInput
  ) => Promise<void>;
  deleteRoom: (id: string) => Promise<void>;
}

export const useRooms = (): UseRoomsResult => {
  const { data, loading, refetch } = useRoomsQuery();
  const [createRoom] = useCreateRoomMutation();
  const [updateRoomMutation] = useUpdateRoomMutation();
  const [deleteRoomMutation] = useDeleteRoomMutation();

  const refetchRooms = useCallback(() => {
    refetch();
  }, [refetch]);

  const addRoom = useCallback(
    async (room: {
      roomNumber: number;
      type: RoomType;
      pricePerNight: string;
      status: RoomStatus;
    }) => {
      try {
        await createRoom({
          variables: {
            input: {
              room,
            },
          },
        });
        toast.success("Room added successfully!");
        refetchRooms();
      } catch (error: any) {
        if (
          error?.message?.includes("duplicate") ||
          error?.message?.includes("already exists")
        ) {
          toast.error("Room number already exists! Please use a different number.");
        } else {
          toast.error("Error adding room. Please try again.");
        }
      }
    },
    [createRoom, refetchRooms]
  );

  const updateRoom = useCallback(
    async (
      roomNumber: number,
      originalRoom: RoomFormInput,
      roomPatch: RoomFormInput
    ) => {
      const isUnchanged =
        originalRoom.type === roomPatch.type &&
        originalRoom.pricePerNight === roomPatch.pricePerNight &&
        originalRoom.status === roomPatch.status;

      if (isUnchanged) {
        toast.info("No changes detected. Please update a value.");
        return;
      }

      try {
        await updateRoomMutation({
          variables: {
            roomNumber,
            roomPatch,
          },
        });
        toast.success("Room updated successfully!");
        refetchRooms();
      } catch {
        toast.error("Error updating room. Please try again.");
      }
    },
    [updateRoomMutation, refetchRooms]
  );

  const deleteRoom = useCallback(
    async (id: string) => {
      try {
        await deleteRoomMutation({
          variables: { id },
        });
        toast.success("Room deleted successfully!");
        refetchRooms();
      } catch {
        toast.error("Failed to delete room!");
      }
    },
    [deleteRoomMutation, refetchRooms]
  );

  return {
    rooms: data?.allRooms?.nodes?.filter((room): room is Room => room !== null) ?? [],
    loading,
    refetchRooms,
    addRoom,
    updateRoom,
    deleteRoom,
  };
};
