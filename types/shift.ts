export interface Staff {
  id: string;
  name: string;
  avatar?: string;
  role: string;
}

export interface Shift {
  id: string;
  startTime: string;
  endTime: string;
  duration: number;
  wage: number;
  status: 'confirmed' | 'pending' | 'unassigned';
  assignedStaff: Staff[];
  department: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  timeSlot: number; // 0-23 (hour of day)
}

export interface FilterState {
  view: 'shift' | 'staff';
  status: 'all' | 'confirmed' | 'pending' | 'unassigned';
  team: 'all' | 'kitchen' | 'service' | 'management';
  period: 'week' | 'month';
}