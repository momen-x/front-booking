import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Plus, Trash2, Calendar, Save, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const days = [
  { id: 0, name: "Sunday", short: "Sun" },
  { id: 1, name: "Monday", short: "Mon" },
  { id: 2, name: "Tuesday", short: "Tue" },
  { id: 3, name: "Wednesday", short: "Wed" },
  { id: 4, name: "Thursday", short: "Thu" },
  { id: 5, name: "Friday", short: "Fri" },
  { id: 6, name: "Saturday", short: "Sat" },
];

const AddAvailableTimes = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card className="border-gray-200 shadow-sm">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Set Your Availability
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Manage your weekly working hours for bookings
              </p>
            </div>
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200"
            >
              <Clock className="h-3 w-3 mr-1" />
              Available
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          {/* Week Days Grid */}
          <div className="mb-8">
            <label className="text-sm font-semibold text-gray-700 mb-3 block">
              Select Day
            </label>
            <div className="grid grid-cols-7 gap-2">
              {days.map((day) => (
                <Button
                  key={day.id}
                  className={`
                    group relative px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200
                    ${
                      day.name === "Monday"
                        ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-normal opacity-70">Day</span>
                    <span>{day.short}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Add Time Slot Form */}
          <div className="mb-8">
            <label className="text-sm font-semibold text-gray-700 mb-3 block">
              Add Time Slot
            </label>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex flex-col sm:flex-row gap-3 items-end">
                <div className="flex-1 space-y-1">
                  <label className="text-xs text-gray-500">Start Time</label>
                  <Input
                    type="time"
                    className="bg-white border-gray-200 focus:border-blue-400"
                    defaultValue="09:00"
                  />
                </div>
                <div className="shrink-0 hidden sm:block">
                  <span className="text-gray-400 text-xl">→</span>
                </div>
                <div className="flex-1 space-y-1">
                  <label className="text-xs text-gray-500">End Time</label>
                  <Input
                    type="time"
                    className="bg-white border-gray-200 focus:border-blue-400"
                    defaultValue="17:00"
                  />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Slot
                </Button>
              </div>
            </div>
          </div>

          {/* Time Slots List */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Time Slots
                </label>
                <p className="text-xs text-gray-400 mt-0.5">
                  Monday · 5 slots available
                </p>
              </div>
              <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                <Calendar className="h-3 w-3 mr-1" />
                Monday
              </Badge>
            </div>

            {/* Slot Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* Sample Time Slots */}
              <div className="flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-gray-200 hover:shadow-sm transition-shadow group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      09:00 - 10:00
                    </p>
                    <p className="text-xs text-gray-400">1 hour</p>
                  </div>
                </div>
                <Button className="text-gray-300 hover:text-red-500 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-gray-200 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      10:00 - 11:00
                    </p>
                    <p className="text-xs text-gray-400">1 hour</p>
                  </div>
                </div>
                <Button className="text-gray-300 hover:text-red-500 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-gray-200 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      11:00 - 12:00
                    </p>
                    <p className="text-xs text-gray-400">1 hour</p>
                  </div>
                </div>
                <Button className="text-gray-300 hover:text-red-500 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-gray-200 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      13:00 - 14:00
                    </p>
                    <p className="text-xs text-gray-400">1 hour</p>
                  </div>
                </div>
                <Button className="text-gray-300 hover:text-red-500 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-gray-200 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      14:00 - 15:00
                    </p>
                    <p className="text-xs text-gray-400">1 hour</p>
                  </div>
                </div>
                <Button className="text-gray-300 hover:text-red-500 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <Button className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group">
                <Plus className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                <span className="text-sm text-gray-500 group-hover:text-blue-600">
                  Add slot
                </span>
              </Button>
            </div>

            {/* Empty State (Hidden when slots exist) */}
            <div className="hidden text-center py-12">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="h-8 w-8 text-gray-300" />
              </div>
              <p className="text-gray-400 font-medium">No time slots added</p>
              <p className="text-xs text-gray-300 mt-1">
                Add your first time slot above
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
            <Button
              variant="outline"
              className="border-gray-200 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
              <Save className="h-4 w-4 mr-2" />
              Save Availability
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5" />
          <div className="text-xs text-blue-700">
            <span className="font-medium">Tip:</span> Time slots are in 1-hour
            increments. Make sure to add all available hours for each day of the
            week.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAvailableTimes;
