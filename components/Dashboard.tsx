import React from 'react';
import { Vehicle, Intervention } from '../types';
import { Activity, AlertCircle, CheckCircle2, DollarSign, Clock } from 'lucide-react';

interface DashboardProps {
  vehicles: Vehicle[];
  interventions: Intervention[];
}

export const Dashboard: React.FC<DashboardProps> = ({ vehicles, interventions }) => {
  const activeVehicles = vehicles.filter(v => v.status !== 'archived').length;
  const overdueTasks = interventions.filter(i => i.status === 'overdue').length;
  const plannedTasks = interventions.filter(i => i.status === 'planned').length;
  const totalCost = interventions.reduce((acc, curr) => acc + (curr.status === 'completed' ? curr.cost : 0), 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">Overview</h2>
          <p className="text-slate-500 mt-1">Welcome back. Here's what's happening with your fleet today.</p>
        </div>
        <div className="text-sm text-slate-400">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Active Vehicles" 
          value={activeVehicles} 
          icon={<Activity className="w-4 h-4 text-primary-600" />} 
        />
        <MetricCard 
          title="Attention Needed" 
          value={overdueTasks} 
          trend="Action required"
          trendColor="text-red-500"
          icon={<AlertCircle className="w-4 h-4 text-red-500" />} 
        />
        <MetricCard 
          title="Planned Jobs" 
          value={plannedTasks} 
          icon={<Clock className="w-4 h-4 text-amber-500" />} 
        />
        <MetricCard 
          title="YTD Spend" 
          value={`$${totalCost.toLocaleString()}`} 
          icon={<DollarSign className="w-4 h-4 text-emerald-500" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Urgent Tasks */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">Upcoming & Overdue</h3>
          <div className="space-y-4">
            {interventions
              .filter(i => i.status !== 'completed')
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .slice(0, 4)
              .map(task => {
                const vehicle = vehicles.find(v => v.id === task.vehicleId);
                return (
                  <div key={task.id} className="flex items-center justify-between group p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${task.status === 'overdue' ? 'bg-red-500' : 'bg-amber-500'}`} />
                      <div>
                        <p className="font-medium text-slate-900">{task.type}</p>
                        <p className="text-sm text-slate-500">{vehicle?.name} • {new Date(task.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-xs font-medium text-slate-600 bg-white border border-slate-200 px-3 py-1 rounded hover:bg-slate-100">
                        View
                      </button>
                    </div>
                  </div>
                );
              })}
              {interventions.filter(i => i.status !== 'completed').length === 0 && (
                <div className="text-center py-8 text-slate-400 text-sm">No pending tasks. Great job!</div>
              )}
          </div>
        </div>

        {/* Quick Vehicle Status */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">Fleet Health</h3>
          <div className="space-y-6">
             {vehicles.slice(0, 3).map(vehicle => (
               <div key={vehicle.id} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 overflow-hidden">
                    {vehicle.image ? <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" /> : '🚗'}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-sm text-slate-900">{vehicle.name}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                        vehicle.status === 'active' 
                        ? 'bg-emerald-50 text-emerald-700' 
                        : vehicle.status === 'service-needed' ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {vehicle.status === 'active' ? 'Healthy' : 'Service'}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${vehicle.status === 'service-needed' ? 'bg-red-400' : 'bg-emerald-400'}`} 
                        style={{ width: vehicle.status === 'service-needed' ? '90%' : '100%' }}
                      />
                    </div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; trend?: string; trendColor?: string }> = ({ 
  title, value, icon, trend, trendColor = 'text-slate-500' 
}) => (
  <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
        {icon}
      </div>
      {trend && <span className={`text-xs font-medium ${trendColor}`}>{trend}</span>}
    </div>
    <div>
      <h4 className="text-slate-500 text-sm font-medium">{title}</h4>
      <p className="text-3xl font-semibold text-slate-900 mt-1 tracking-tight">{value}</p>
    </div>
  </div>
);
