"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, BedDouble, CalendarCheck, Users } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useDashboardStats } from "./hooks/useDashboardStats";

type StatItem = {
  title: string;
  value: number;
  icon: React.ReactNode;
};

type ActionItem = {
  title: string;
  description: string;
  href: string;
};

const actions: ActionItem[] = [
  {
    title: "Manage Rooms",
    description: "View and edit room details",
    href: "/admin/rooms",
  },
  {
    title: "View Guests",
    description: "Guest information & history",
    href: "/admin/guests",
  },
  {
    title: "Manage Bookings",
    description: "Create and update bookings",
    href: "/admin/bookings",
  },
];

const DashboardSummary: React.FC = () => {
  const router = useRouter();
  const {totalRooms , availableRooms ,  bookedBookings ,  checkedInBookings} = useDashboardStats();
  const stats: StatItem[] = [
    {
      title: "Total Rooms",
      value: totalRooms,
      icon: <BedDouble className="h-8 w-8 text-indigo-200" />,
    },
    {
      title: "Available Rooms",
      value: availableRooms,
      icon: <BedDouble className="h-8 w-8 text-green-200" />,
    },
    {
      title: "Active Bookings",
      value: bookedBookings,
      icon: <CalendarCheck className="h-8 w-8 text-purple-200" />,
    },
    {
      title: "Checked-in Guests",
      value: checkedInBookings,
      icon: <Users className="h-8 w-8 text-orange-200" />,
    },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <Card key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                {item.title}
              </span>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {actions.map((action) => (
          <Card
            key={action.title}
            role="button"
            tabIndex={0}
            onClick={() => router.push(action.href)}
            className="cursor-pointer transition hover:bg-green-50 hover:shadow-md"
          >
            <CardContent className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">{action.title}</p>
                <p className="text-sm text-muted-foreground">
                  {action.description}
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardSummary;
