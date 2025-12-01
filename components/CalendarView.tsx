import React from 'react';
import { Vehicle, Intervention } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  vehicles: Vehicle[];
  interventions: Intervention[];
}

export const CalendarView: React.FC<CalendarProps> = ({ vehicles, interventions }) => {
  // Mock Date: October 2023 to match mock data mostly, or use current.
  // Let's use current month dynamic generation, but fallback to Oct 2023 for visuals if needed.
  // Actually, let's just render the current month relative to the mock data. 
  // Since mock data has various dates, let's render a generic month view grid.
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // Hardcoded for visual structure demonstration (35 cells)
  const calendarDays = Array.from({ length: 35 }, (_, i) => {
    const day = i - 2; // Offset to start mid-week
    return day > 0 && day <= 31 ? day : null;
  });

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-6">
        <div>
           <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">Schedule</h2>
           <p className="text-slate-500 mt-1">Plan and track maintenance windows.</p>
        </div>
        <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-lg p-1">
          <button className="p-1 hover:bg-slate-100 rounded text-slate-500"><ChevronLeft size={20} /></button>
          <span className="text-sm font-medium w-32 text-center text-slate-900">November 2023</span>
          <button className="p-1 hover:bg-slate-100 rounded text-slate-500"><ChevronRight size={20} /></button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-7 border-b border-slate-200">
          {days.map(day => (
            <div key={day} className="py-3 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>
        
        {/* Grid */}
        <div className="grid grid-cols-7 flex-1 auto-rows-fr">
          {calendarDays.map((day, idx) => {
            // Find tasks for this day (Mock matching logic)
            // In a real app, match exact ISO dates.
            // Here, we match mock data just for visuals if day matches 'date' string day part.
            const dayTasks = day ? interventions.filter(i => {
                const d = new Date(i.date);
                return d.getDate() === day; // Very loose matching for demo
            }) : [];

            return (
              <div key={idx} className={`border-b border-r border-slate-100 p-2 min-h-[100px] relative hover:bg-slate-50 transition-colors ${!day ? 'bg-slate-50/50' : 'bg-white'}`}>
                {day && (
                  <>
                    <span className={`text-sm font-medium ${day === 15 ? 'text-primary-600 bg-primary-50 w-6 h-6 flex items-center justify-center rounded-full' : 'text-slate-500'}`}>
                      {day}
                    </span>
                    <div className="mt-2 space-y-1">
                      {dayTasks.map(task => {
                         const v = vehicles.find(veh => veh.id === task.vehicleId);
                         return (
                           <div key={task.id} className={`text-[10px] px-2 py-1 rounded border truncate cursor-pointer transition-transform hover:scale-105 ${
                             task.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                             task.status === 'overdue' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-primary-50 text-primary-700 border-primary-100'
                           }`}>
                             {task.type} - {v?.name.split(' ')[0]}
                           </div>
                         )
                      })}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};