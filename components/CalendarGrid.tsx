'use client';

import { Shift } from '@/types/shift';
import ShiftCard from './ShiftCard';

interface CalendarGridProps {
  shifts: Shift[];
  onAssignShift?: (shiftId: string) => void;
}

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const timeSlots = Array.from({ length: 14 }, (_, i) => i + 6); // 6 AM to 7 PM

export default function CalendarGrid({ shifts, onAssignShift }: CalendarGridProps) {
  const getShiftsForTimeSlot = (dayIndex: number, timeSlot: number) => {
    return shifts.filter(shift => {
      const shiftHour = parseInt(shift.startTime.split(':')[0]);
      return shift.dayOfWeek === dayIndex && shiftHour === timeSlot;
    });
  };

  const formatTimeSlot = (hour: number) => {
    return new Date(2024, 0, 1, hour).toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true
    });
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="grid grid-cols-8 gap-4">
        {/* Time column header */}
        <div className="font-medium text-gray-700 text-sm">Time</div>
        
        {/* Day headers */}
        {days.map((day) => (
          <div key={day} className="font-medium text-gray-700 text-sm text-center">
            {day}
          </div>
        ))}

        {/* Time slots and shifts */}
        {timeSlots.map((timeSlot) => (
          <div key={timeSlot} className="contents">
            {/* Time label */}
            <div className="flex items-start pt-2 text-xs text-gray-500 font-medium">
              {formatTimeSlot(timeSlot)}
            </div>
            
            {/* Day columns */}
            {days.map((day, dayIndex) => {
              const dayShifts = getShiftsForTimeSlot(dayIndex, timeSlot);
              
              return (
                <div
                  key={`${day}-${timeSlot}`}
                  className="min-h-[120px] bg-white rounded-lg border border-gray-200 p-2 space-y-2"
                >
                  {dayShifts.map((shift) => (
                    <ShiftCard
                      key={shift.id}
                      shift={shift}
                      onAssign={onAssignShift}
                      className="transform hover:scale-105 transition-transform duration-150"
                    />
                  ))}
                  
                  {dayShifts.length === 0 && (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-gray-300 text-xs text-center">
                        No shifts
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}