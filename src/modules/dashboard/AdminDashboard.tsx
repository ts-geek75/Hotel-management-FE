import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Dashboard from "./DashboardSummary";
import BookingsTable from "../bookings/BookingTable";

const AdminDashboard: React.FC = () => {
  return (
    <div className="h-full bg-muted p-6 space-y-6">
      <Dashboard />

      <div className="rounded-xl border bg-white overflow-hidden">
        <div className="flex items-center justify-between border-b px-3 py-4">
          <h2 className="text-base font-semibold ">Recent Bookings</h2>
          <Link
            href="/admin/bookings"
            className="flex items-center gap-1 text-sm font-medium hover:bg-green-50 p-2 hover:text-primary-green"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div>
          <BookingsTable showActions={false} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
