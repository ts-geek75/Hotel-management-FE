import React from "react";

import { RoomsTable, AddRoomDialog } from "@/modules/rooms/components";

const Roomspage: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            Manage hotel rooms, pricing, and availability
          </p>
        </div>
        <AddRoomDialog />
      </div>

      <div className="rounded-xl border bg-white">
        <RoomsTable />
      </div>
    </div>
  );
};

export default Roomspage;
