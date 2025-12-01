import React from 'react';
import { Vehicle } from '../types';
import { Plus, MoreHorizontal, Calendar, Gauge } from 'lucide-react';

interface VehiclesProps {
  vehicles: Vehicle[];
}

export const Vehicles: React.FC<VehiclesProps> = ({ vehicles }) => {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">Vehicles</h2>
           <p className="text-slate-500 mt-1">Manage your fleet inventory and status.</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus size={16} />
          Add Vehicle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map(vehicle => (
          <div key={vehicle.id} className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col">
            <div className="h-40 bg-slate-100 relative overflow-hidden">
               <img 
                 src={vehicle.image} 
                 alt={vehicle.name} 
                 className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
               />
               <div className="absolute top-3 right-3">
                 <span className={`px-2 py-1 rounded-md text-xs font-medium backdrop-blur-md bg-white/80 ${
                    vehicle.status === 'service-needed' ? 'text-red-600 border border-red-200' : 'text-emerald-600 border border-emerald-200'
                 }`}>
                   {vehicle.status === 'service-needed' ? 'Service Due' : 'Active'}
                 </span>
               </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div>
                   <h3 className="font-semibold text-lg text-slate-900">{vehicle.name}</h3>
                   <p className="text-sm text-slate-500">{vehicle.year} • {vehicle.model}</p>
                </div>
                <button className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-50">
                  <MoreHorizontal size={18} />
                </button>
              </div>
              
              <div className="mt-auto space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Gauge size={16} className="text-slate-400" />
                  <span>{vehicle.mileage.toLocaleString()} km</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Calendar size={16} className="text-slate-400" />
                  <span>Next: {new Date(vehicle.nextServiceDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Empty State / Add New Placeholder */}
        <button className="rounded-xl border border-dashed border-slate-300 p-6 flex flex-col items-center justify-center gap-4 text-slate-400 hover:text-primary-600 hover:border-primary-300 hover:bg-primary-50 transition-all group min-h-[300px]">
           <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
             <Plus size={24} />
           </div>
           <span className="font-medium text-sm">Register a new vehicle</span>
        </button>
      </div>
    </div>
  );
};