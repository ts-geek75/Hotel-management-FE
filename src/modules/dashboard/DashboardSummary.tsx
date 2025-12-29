"use client";

import React from "react";

import { ArrowRight, BedDouble, CalendarCheck, Users } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

type StatItem = {
  title: string;
  value: number;
  icon: React.ReactNode;
};

type ActionItem = {
  title: string;
  description: string;
};

const stats: StatItem[] = [
  {
    title: "Total Rooms",
    value: 8,
    icon: <BedDouble className="h-6 w-6 text-indigo-300" />,
  },
  {
    title: "Available Rooms",
    value: 4,
    icon: <BedDouble className="h-6 w-6 text-green-300" />,
  },
  {
    title: "Active Bookings",
    value: 3,
    icon: <CalendarCheck className="h-6 w-6 text-purple-300" />,
  },
  {
    title: "Checked-in Guests",
    value: 2,
    icon: <Users className="h-6 w-6 text-orange-300" />,
  },
];

const actions: ActionItem[] = [
  {
    title: "Manage Rooms",
    description: "View and edit room details",
  },
  {
    title: "View Guests",
    description: "Guest information & history",
  },
  {
    title: "Manage Bookings",
    description: "Create and update bookings",
  },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <Card key={item.title}>
            <CardHeader className="flex flex-row items-center justify-between ">
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
            className="cursor-pointer transition hover:shadow-md hover:bg-green-50"
          >
            <CardContent className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-semibold">{action.title}</p>
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

export default Dashboard;