'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import CalendarGrid from '@/components/CalendarGrid';
import FloatingActionButton from '@/components/FloatingActionButton';
import { FilterState, Shift } from '@/types/shift';

// Mock data for demonstration
const mockShifts: Shift[] = [
  {
    id: '1',
    startTime: '09:00',
    endTime: '13:00',
    duration: 4,
    wage: 880,
    status: 'confirmed',
    assignedStaff: [
      { id: '1', name: 'Alice Johnson', role: 'Server', avatar: '' },
      { id: '2', name: 'Bob Smith', role: 'Cook', avatar: '' }
    ],
    department: 'service',
    dayOfWeek: 1, // Monday
    timeSlot: 9
  },
  {
    id: '2',
    startTime: '14:00',
    endTime: '18:00',
    duration: 4,
    wage: 960,
    status: 'pending',
    assignedStaff: [
      { id: '3', name: 'Carol Davis', role: 'Manager', avatar: '' }
    ],
    department: 'management',
    dayOfWeek: 2, // Tuesday
    timeSlot: 14
  },
  {
    id: '3',
    startTime: '10:00',
    endTime: '15:00',
    duration: 5,
    wage: 1200,
    status: 'unassigned',
    assignedStaff: [],
    department: 'kitchen',
    dayOfWeek: 3, // Wednesday
    timeSlot: 10
  },
  {
    id: '4',
    startTime: '08:00',
    endTime: '12:00',
    duration: 4,
    wage: 800,
    status: 'confirmed',
    assignedStaff: [
      { id: '4', name: 'David Wilson', role: 'Barista', avatar: '' },
      { id: '5', name: 'Eva Brown', role: 'Server', avatar: '' },
      { id: '6', name: 'Frank Miller', role: 'Cook', avatar: '' }
    ],
    department: 'kitchen',
    dayOfWeek: 4, // Thursday
    timeSlot: 8
  },
  {
    id: '5',
    startTime: '16:00',
    endTime: '20:00',
    duration: 4,
    wage: 920,
    status: 'confirmed',
    assignedStaff: [
      { id: '7', name: 'Grace Taylor', role: 'Server', avatar: '' }
    ],
    department: 'service',
    dayOfWeek: 5, // Friday
    timeSlot: 16
  },
  {
    id: '6',
    startTime: '11:00',
    endTime: '15:00',
    duration: 4,
    wage: 880,
    status: 'pending',
    assignedStaff: [
      { id: '8', name: 'Henry Anderson', role: 'Cook', avatar: '' }
    ],
    department: 'kitchen',
    dayOfWeek: 6, // Saturday
    timeSlot: 11
  }
];

export default function Home() {
  const [filters, setFilters] = useState<FilterState>({
    view: 'shift',
    status: 'all',
    team: 'all',
    period: 'week'
  });

  const filteredShifts = mockShifts.filter(shift => {
    if (filters.status !== 'all' && shift.status !== filters.status) return false;
    if (filters.team !== 'all' && shift.department !== filters.team) return false;
    return true;
  });

  const handleAssignShift = (shiftId: string) => {
    console.log('Assign shift:', shiftId);
    // In a real app, this would open a modal or navigate to assignment page
  };

  const handleCreateShift = () => {
    console.log('Create new shift');
    // In a real app, this would open a create shift modal
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Header filters={filters} onFilterChange={setFilters} />
        
        <main className="flex-1 overflow-auto p-6">
          <CalendarGrid 
            shifts={filteredShifts} 
            onAssignShift={handleAssignShift}
          />
        </main>
      </div>

      <FloatingActionButton onClick={handleCreateShift} />
    </div>
  );
}