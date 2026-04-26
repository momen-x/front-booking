"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell, CheckCheck, Clock, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const notifications = [
  {
    id: 1,
    title: "Booking Confirmed!",
    message:
      "Your appointment for Premium Haircut is confirmed for Monday at 2:00 PM",
    time: "2 minutes ago",
    read: false,
  },
  {
    id: 2,
    title: "Special Offer",
    message: "Get 20% off on your next booking! Limited time offer.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    title: "Reminder",
    message: "You have a booking tomorrow at 10:00 AM",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 4,
    title: "Payment Successful",
    message: "Your payment of $45.00 has been processed successfully",
    time: "5 hours ago",
    read: true,
  },
  {
    id: 5,
    title: "New Barber Added",
    message: "Meet our new expert stylist, Sarah! Book now.",
    time: "1 day ago",
    read: true,
  },
];

const NotificationButton = () => {
  const [open, setOpen] = useState(false);
  const [notifList, setNotifList] = useState(notifications);

  const unreadCount = notifList.filter((n) => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifList(
      notifList.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif,
      ),
    );
  };

  return (
    <div className="">

    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="relative p-2 rounded-lg hover:bg-gray-50 transition-colors">
          <Bell className="h-5 w-5 text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 bg-red-500 text-white text-[10px] font-medium rounded-full flex items-center justify-center px-1">
              {unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="w-100 p-0 rounded-xl border-gray-100 shadow-xl mr-4 bg-white"
        align="end"
        sideOffset={8}
      >
        {/* Simple Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-gray-900">Notifications</h3>
            <span className="text-sm text-gray-400">{unreadCount} new</span>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={() =>
                setNotifList(notifList.map((n) => ({ ...n, read: true })))
              }
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* Notifications */}
        <div className="max-h-[460px] overflow-y-auto">
          {notifList.length === 0 ? (
            <div className="py-12 text-center">
              <Bell className="h-10 w-10 text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-gray-400">No notifications</p>
            </div>
          ) : (
            notifList.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "px-5 py-4 border-t border-gray-50 hover:bg-gray-50/30 transition-colors",
                  !notification.read && "bg-blue-50/20",
                )}
              >
                <div className="flex gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4
                        className={cn(
                          "text-sm font-medium",
                          !notification.read
                            ? "text-gray-900"
                            : "text-gray-700",
                        )}
                      >
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mb-2 leading-relaxed">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {notification.time}
                      </span>
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {notifList.length > 0 && (
          <div className="px-5 py-3 border-t border-gray-100">
            <button
              className="w-full text-center text-sm text-gray-400 hover:text-gray-600 py-2 transition-colors"
              onClick={() => setOpen(false)}
            >
              View all notifications
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
    </div>

  );
};

export default NotificationButton;
