import react from "react";
import GuestsTable from "@/modules/guests/AllGuestsTable";

const page = () => {
  return (
    <div className="h-full p-6 bg-muted">
      <div className="text-sm text-muted-foreground pb-5">
        View guest information and booking history
      </div>
      <GuestsTable />
    </div>
  );
};

export default page;
