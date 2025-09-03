'use client';

import { useState } from 'react';
import { ChevronDown, Filter, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FilterState } from '@/types/shift';

interface HeaderProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export default function Header({ filters, onFilterChange }: HeaderProps) {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const getWeekRange = (date: Date) => {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    
    const formatDate = (d: Date) => {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };
    
    return `${formatDate(start)} - ${formatDate(end)}`;
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newDate);
  };

  const goToCurrentWeek = () => {
    setCurrentWeek(new Date());
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Title and Week Navigation */}
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Shift Schedule</h1>
            <p className="text-sm text-gray-500">Manage your team's shifts and assignments</p>
          </div>
          
          <div className="flex items-center space-x-2 ml-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateWeek('prev')}
              className="p-2"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="text-sm font-medium text-gray-700 min-w-[140px] text-center">
              {getWeekRange(currentWeek)}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateWeek('next')}
              className="p-2"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={goToCurrentWeek}
              className="ml-2"
            >
              Current Week
            </Button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* View Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button
              variant={filters.view === 'shift' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onFilterChange({ ...filters, view: 'shift' })}
              className="text-xs px-3 py-1"
            >
              Shift View
            </Button>
            <Button
              variant={filters.view === 'staff' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onFilterChange({ ...filters, view: 'staff' })}
              className="text-xs px-3 py-1"
            >
              Staff View
            </Button>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={filters.status}
              onChange={(e) => onFilterChange({ ...filters, status: e.target.value as FilterState['status'] })}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="unassigned">Unassigned</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Team Filter */}
          <div className="relative">
            <select
              value={filters.team}
              onChange={(e) => onFilterChange({ ...filters, team: e.target.value as FilterState['team'] })}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Teams</option>
              <option value="kitchen">Kitchen</option>
              <option value="service">Service</option>
              <option value="management">Management</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Advanced Filter */}
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Advanced Filter</span>
          </Button>

          {/* Period Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button
              variant={filters.period === 'week' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onFilterChange({ ...filters, period: 'week' })}
              className="text-xs px-3 py-1"
            >
              Week
            </Button>
            <Button
              variant={filters.period === 'month' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onFilterChange({ ...filters, period: 'month' })}
              className="text-xs px-3 py-1"
            >
              Month
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}