import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Car, 
  Wrench, 
  BarChart3, 
  Settings, 
  LogOut,
  Bell,
  Search,
  ChevronDown
} from 'lucide-react';
import { NAV_ITEMS, MOCK_VEHICLES, MOCK_INTERVENTIONS } from './constants';
import { Dashboard } from './components/Dashboard';
import { Vehicles } from './components/Vehicles';
import { Stats } from './components/Stats';
import { CalendarView } from './components/CalendarView';

// --- Icons Map for Dynamic Rendering ---
const IconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard size={20} />,
  Calendar: <Calendar size={20} />,
  Car: <Car size={20} />,
  Wrench: <Wrench size={20} />,
  BarChart3: <BarChart3 size={20} />,
  Settings: <Settings size={20} />,
};

// --- Maintenance List View (Simple Inline Component) ---
const MaintenanceList = () => (
    <div className="animate-in slide-in-from-bottom-4 duration-500">
       <div className="flex justify-between items-center mb-6">
        <div>
           <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">Maintenance Logs</h2>
           <p className="text-slate-500 mt-1">History of all interventions and services.</p>
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 font-semibold text-slate-500 uppercase tracking-wider text-xs">Date</th>
              <th className="px-6 py-3 font-semibold text-slate-500 uppercase tracking-wider text-xs">Vehicle</th>
              <th className="px-6 py-3 font-semibold text-slate-500 uppercase tracking-wider text-xs">Intervention</th>
              <th className="px-6 py-3 font-semibold text-slate-500 uppercase tracking-wider text-xs">Cost</th>
              <th className="px-6 py-3 font-semibold text-slate-500 uppercase tracking-wider text-xs">Status</th>
              <th className="px-6 py-3 font-semibold text-slate-500 uppercase tracking-wider text-xs">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_INTERVENTIONS.map(task => {
              const vehicle = MOCK_VEHICLES.find(v => v.id === task.vehicleId);
              return (
                <tr key={task.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-slate-600 font-medium">{new Date(task.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-slate-900">
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 rounded bg-slate-100 overflow-hidden">
                         <img src={vehicle?.image} className="w-full h-full object-cover" />
                       </div>
                       {vehicle?.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{task.type}</td>
                  <td className="px-6 py-4 text-slate-600 font-mono">${task.cost}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                       task.status === 'completed' ? 'bg-emerald-50 text-emerald-700' :
                       task.status === 'overdue' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-primary-600 hover:text-primary-800 font-medium text-xs">Edit</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
);

// --- Settings Placeholder ---
const SettingsView = () => (
  <div className="animate-in fade-in duration-500 max-w-2xl">
     <h2 className="text-2xl font-semibold text-slate-900 tracking-tight mb-6">Settings</h2>
     <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm space-y-8">
        <div>
          <h3 className="text-lg font-medium text-slate-900 mb-4">Profile</h3>
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-2xl">👤</div>
             <div>
               <button className="text-sm bg-white border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50 font-medium text-slate-700">Change Avatar</button>
             </div>
          </div>
        </div>
        <div className="space-y-4">
           <h3 className="text-lg font-medium text-slate-900">Preferences</h3>
           <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Currency</span>
              <span className="text-slate-900 font-medium">USD ($)</span>
           </div>
           <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Distance Unit</span>
              <span className="text-slate-900 font-medium">Kilometers (km)</span>
           </div>
           <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Notifications</span>
              <div className="w-10 h-5 bg-primary-600 rounded-full relative cursor-pointer">
                 <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
              </div>
           </div>
        </div>
     </div>
  </div>
)

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard vehicles={MOCK_VEHICLES} interventions={MOCK_INTERVENTIONS} />;
      case 'vehicles':
        return <Vehicles vehicles={MOCK_VEHICLES} />;
      case 'interventions':
        return <MaintenanceList />;
      case 'calendar':
        return <CalendarView vehicles={MOCK_VEHICLES} interventions={MOCK_INTERVENTIONS} />;
      case 'stats':
        return <Stats interventions={MOCK_INTERVENTIONS} />;
      case 'settings':
        return <SettingsView />;
      default:
        return <Dashboard vehicles={MOCK_VEHICLES} interventions={MOCK_INTERVENTIONS} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0 z-20">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">Veloce Fleet</span>
          </div>
          
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  activeTab === item.id
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span className={activeTab === item.id ? 'text-primary-600' : 'text-slate-400'}>
                  {IconMap[item.iconName]}
                </span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-100">
           <button className="flex items-center gap-3 text-sm font-medium text-slate-500 hover:text-red-600 transition-colors">
             <LogOut size={18} />
             Sign Out
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 w-1/3">
             <div className="relative w-full max-w-md">
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
               <input 
                 type="text" 
                 placeholder="Search vehicles, tasks..." 
                 className="w-full pl-10 pr-4 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400 transition-all bg-slate-50/50"
               />
             </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <button className="flex items-center gap-2 hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
               <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold text-sm">
                 JD
               </div>
               <span className="text-sm font-medium text-slate-700 hidden md:block">John Doe</span>
               <ChevronDown size={14} className="text-slate-400" />
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto p-8">
           <div className="max-w-7xl mx-auto">
              {renderContent()}
           </div>
        </div>
      </main>
    </div>
  );
}