import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Shift, Staff } from '@/types/shift';
import { Clock, DollarSign, User } from 'lucide-react';

interface ShiftCardProps {
  shift: Shift;
  onAssign?: (shiftId: string) => void;
  className?: string;
}

export default function ShiftCard({ shift, onAssign, className }: ShiftCardProps) {
  const getStatusColor = (status: Shift['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'unassigned':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (time: string) => {
    return new Date(`2024-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const getStaffInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-4 border border-gray-100 ${className}`}>
      {/* Time Range */}
      <div className="flex items-center space-x-2 mb-3">
        <Clock className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-semibold text-gray-900">
          {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
        </span>
      </div>

      {/* Duration and Wage */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <span className="text-xs text-gray-500">Duration:</span>
            <span className="text-sm font-medium text-gray-900">{shift.duration}h</span>
          </div>
          <div className="flex items-center space-x-1">
            <DollarSign className="w-3 h-3 text-gray-500" />
            <span className="text-sm font-medium text-gray-900">${shift.wage}</span>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="mb-4">
        <Badge 
          variant="secondary" 
          className={`text-xs font-medium ${getStatusColor(shift.status)}`}
        >
          {shift.status.charAt(0).toUpperCase() + shift.status.slice(1)}
        </Badge>
      </div>

      {/* Assigned Staff */}
      <div className="space-y-3">
        {shift.assignedStaff.length > 0 ? (
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <User className="w-3 h-3 text-gray-500" />
              <span className="text-xs text-gray-500">Assigned:</span>
            </div>
            <div className="flex -space-x-2">
              {shift.assignedStaff.slice(0, 3).map((staff) => (
                <Avatar key={staff.id} className="w-8 h-8 border-2 border-white">
                  <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                    {getStaffInitials(staff.name)}
                  </AvatarFallback>
                </Avatar>
              ))}
              {shift.assignedStaff.length > 3 && (
                <div className="w-8 h-8 bg-gray-100 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs text-gray-600">+{shift.assignedStaff.length - 3}</span>
                </div>
              )}
            </div>
            <div className="mt-2">
              {shift.assignedStaff.slice(0, 2).map((staff) => (
                <p key={staff.id} className="text-xs text-gray-600">
                  {staff.name} - {staff.role}
                </p>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-2">
            <p className="text-xs text-gray-500">No staff assigned</p>
            <Button
              size="sm"
              onClick={() => onAssign?.(shift.id)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Assign Staff
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}