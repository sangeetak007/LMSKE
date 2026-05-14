import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, Users, Activity, Settings, 
  BarChart, Layers, Globe, Zap,
  BellRing, Search, Lock, UserCog, Database, LineChart
} from 'lucide-react';
import { cn } from '../lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const USER_DATA = [
  { name: 'Students', value: 850, color: '#F472B6' },
  { name: 'Employees', value: 120, color: '#0EA5E9' },
  { name: 'Admins', value: 34, color: '#1E293B' },
];

export const AdminDashboard: React.FC = () => {
  return (
    <main className="flex-grow p-8 space-y-12 max-w-[1600px] mx-auto w-full text-carbon">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
        <div className="space-y-2">
           <div className="flex items-center gap-3">
              <span className="bg-black text-white text-[8px] font-black uppercase tracking-[0.4em] px-3 py-1 rounded-full">Root Authorization Protocol</span>
              <div className="h-[1px] w-12 bg-destiny-border" />
           </div>
           <h1 className="text-7xl md:text-9xl font-serif font-black tracking-tighter text-carbon leading-none">
             Nexus <span className="text-destiny-red italic lowercase">Control</span>
           </h1>
           <p className="text-[10px] text-carbon/40 font-black uppercase tracking-[0.4em] italic leading-relaxed max-w-xl">
             FULL STACK AUTHORITY // SYSTEM LEVEL ACCESS // KERNEL v9.0.4
           </p>
        </div>
        
        <div className="flex gap-4">
           <button className="bg-black text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] italic hover:bg-destiny-red transition-all shadow-2xl flex items-center gap-3">
             <ShieldCheck size={20} />
             System Hardening
           </button>
        </div>
      </div>

      {/* High-Level KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <AdminStatCard label="Network Traffic" value="2.4 GB/s" icon={<Globe />} status="STABLE" />
        <AdminStatCard label="User Sessions" value="214" icon={<Users />} status="HIGH" />
        <AdminStatCard label="Threat Detection" value="0.00" icon={<ShieldCheck />} status="NONE" />
        <AdminStatCard label="Cognitive Throughput" value="99.8%" icon={<Zap />} status="OPTIMAL" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* User Management Section */}
        <div className="xl:col-span-2 space-y-8">
          <div className="bg-white border border-destiny-border rounded-[2.5rem] p-10 space-y-8 shadow-sm">
             <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                   <h3 className="text-2xl font-black uppercase italic tracking-tighter text-carbon leading-none">Identity Management</h3>
                   <p className="text-[9px] font-black text-carbon/30 uppercase tracking-widest mt-2">Managing 1,004 cognitive identities</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                   <div className="flex-grow flex items-center gap-3 px-4 py-3 bg-destiny-grey border border-destiny-border rounded-xl">
                      <Search size={14} className="text-carbon/20" />
                      <input 
                        type="text" 
                        placeholder="SEARCH IDENTITIES..." 
                        className="bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-widest w-full"
                      />
                   </div>
                   <button className="p-3 bg-black text-white rounded-xl hover:bg-destiny-red transition-all shrink-0">
                      <UserCog size={18} />
                   </button>
                </div>
             </div>

             <div className="overflow-x-auto">
                <table className="w-full">
                   <thead>
                      <tr className="border-b border-destiny-border text-[9px] font-black text-carbon/30 uppercase tracking-widest italic">
                         <th className="text-left py-4 pb-6">Identity</th>
                         <th className="text-left py-4 pb-6">Clearance</th>
                         <th className="text-left py-4 pb-6">Status</th>
                         <th className="text-left py-4 pb-6">Latency</th>
                         <th className="text-right py-4 pb-6">Protocol</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-destiny-border">
                      <UserRow name="Aryan Sharma" role="Student" status="Active" latency="12ms" />
                      <UserRow name="Dinesh Kumar" role="Employee" status="Inactive" latency="142ms" />
                      <UserRow name="Simran Kaur" role="Admin" status="Active" latency="2ms" />
                      <UserRow name="Vikram Singh" role="Student" status="Active" latency="85ms" />
                      <UserRow name="Priya Rao" role="Employee" status="Active" latency="22ms" />
                   </tbody>
                </table>
             </div>
             <button className="w-full py-2 text-[9px] font-black text-carbon/20 hover:text-carbon uppercase tracking-widest italic transition-colors">
                Load More Identities
             </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-white border border-destiny-border rounded-[2.5rem] p-10 space-y-8 shadow-sm">
                <h3 className="text-[10px] font-black text-carbon/30 uppercase tracking-[0.4em] italic">Announcement Publisher</h3>
                <div className="space-y-4">
                   <div className="space-y-2">
                      <label className="text-[8px] font-black text-carbon/40 uppercase tracking-widest italic">Broadcast Subject</label>
                      <input type="text" className="w-full bg-destiny-grey border border-destiny-border rounded-xl px-4 py-3 text-xs font-black uppercase italic outline-none focus:border-destiny-red transition-colors" placeholder="ENTER SUBJECT..." />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[8px] font-black text-carbon/40 uppercase tracking-widest italic">Message Stream</label>
                      <textarea className="w-full bg-destiny-grey border border-destiny-border rounded-xl px-4 py-3 text-xs font-black uppercase italic outline-none focus:border-destiny-red transition-colors h-24 resize-none" placeholder="ENTER MESSAGE..."></textarea>
                   </div>
                   <button className="w-full destiny-btn-primary py-4">Publish Announcement</button>
                </div>
             </div>

             <div className="bg-black rounded-[2.5rem] p-10 space-y-8 text-white relative overflow-hidden group">
                <div className="absolute -right-12 -bottom-12 text-white/5 group-hover:scale-110 transition-all duration-1000">
                   <Database size={300} />
                </div>
                <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic relative z-10">Resource Management</h3>
                <div className="space-y-6 relative z-10">
                   <div className="flex items-center gap-4 group/item cursor-pointer">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover/item:bg-destiny-red transition-all">
                         <LineChart size={20} />
                      </div>
                      <div>
                         <p className="text-xs font-black uppercase italic tracking-widest">Global Reports</p>
                         <p className="text-[8px] font-black text-white/30 uppercase tracking-widest">Generate quarterly synthesis</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 group/item cursor-pointer">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover/item:bg-destiny-red transition-all">
                         <Settings size={20} />
                      </div>
                      <div>
                         <p className="text-xs font-black uppercase italic tracking-widest">System Settings</p>
                         <p className="text-[8px] font-black text-white/30 uppercase tracking-widest">Alter kernel parameters</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
           <div className="bg-white border border-destiny-border rounded-[2.5rem] p-10 space-y-8 shadow-sm">
              <h3 className="text-[10px] font-black text-carbon/30 uppercase tracking-[0.4em] italic">Identity Distribution</h3>
              <div className="h-64 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={USER_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {USER_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#FFF', 
                        borderRadius: '12px', 
                        border: '1px solid #E0E0E0',
                        fontSize: '9px',
                        fontWeight: '900',
                        fontStyle: 'italic',
                        textTransform: 'uppercase'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                 {USER_DATA.map(item => (
                    <div key={item.name} className="flex justify-between items-center">
                       <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-[10px] font-black uppercase italic text-carbon/40">{item.name}</span>
                       </div>
                       <span className="text-xs font-black italic text-carbon">{item.value}</span>
                    </div>
                 ))}
              </div>
           </div>

           <div className="bg-white border border-destiny-border rounded-[2.5rem] p-10 space-y-8 shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="text-[10px] font-black text-carbon/30 uppercase tracking-[0.4em] italic">System Monitoring</h3>
                <Activity size={16} className="text-destiny-red animate-pulse" />
              </div>
              <div className="space-y-6">
                 <MonitorItem label="API Endpoints" status="Syncing" value="94%" />
                 <MonitorItem label="File Storage" status="Optimized" value="2.1 PB" />
                 <MonitorItem label="Auth Gate" status="Locked" value="100%" />
              </div>
           </div>

           <div className="bg-destiny-red rounded-[2.5rem] p-10 space-y-6 text-white shadow-xl shadow-destiny-red/20 relative overflow-hidden group">
              <div className="absolute -right-8 top-[-20px] text-white/10">
                 <BellRing size={150} />
              </div>
              <h4 className="text-xl font-black italic uppercase italic tracking-tighter leading-tight relative z-10">Broadcast Protocol</h4>
              <p className="text-[9px] font-black text-white/50 uppercase tracking-widest relative z-10">Sync with all campus nodes</p>
              <button className="bg-white text-destiny-red px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest italic hover:scale-105 transition-all relative z-10">
                 Initiate
              </button>
           </div>
        </div>
      </div>
    </main>
  );
};

const AdminStatCard: React.FC<{ label: string; value: string; icon: React.ReactNode; status: string }> = ({ label, value, icon, status }) => (
  <div className="bg-white border border-destiny-border rounded-[2rem] p-8 space-y-6 group hover:border-destiny-red/30 transition-all shadow-sm">
    <div className="flex justify-between items-start">
      <div className="p-4 rounded-2xl bg-destiny-grey text-carbon/20 group-hover:text-destiny-red transition-colors">
        {icon}
      </div>
      <span className={cn(
        "text-[8px] font-black px-2 py-1 rounded-full border uppercase tracking-widest italic",
        status === 'OPTIMAL' || status === 'STABLE' ? 'bg-green-500/10 text-green-600 border-green-500/20' : 
        status === 'HIGH' ? 'bg-destiny-red/10 text-destiny-red border-destiny-red/20' : 'bg-gray-100 text-gray-400 border-gray-200'
      )}>
        {status}
      </span>
    </div>
    <div>
      <p className="text-[9px] font-black text-carbon/30 uppercase tracking-widest italic">{label}</p>
      <p className="text-3xl font-black italic tracking-tighter text-carbon">{value}</p>
    </div>
  </div>
);

const UserRow: React.FC<{ name: string; role: string; status: string; latency: string }> = ({ name, role, status, latency }) => (
  <tr className="group hover:bg-destiny-red/5 transition-all">
    <td className="py-5">
       <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-destiny-light-blue flex items-center justify-center shrink-0 border border-destiny-border">
             <span className="text-[10px] font-black text-destiny-blue uppercase italic">{name[0]}</span>
          </div>
          <span className="text-xs font-black uppercase italic tracking-tight text-carbon group-hover:text-destiny-red transition-colors">{name}</span>
       </div>
    </td>
    <td className="py-5">
       <span className={cn(
         "px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest italic border",
         role === 'Admin' ? 'bg-black text-white border-black' : 
         role === 'Employee' ? 'bg-destiny-blue/10 text-destiny-blue border-destiny-blue/20' : 
         'bg-destiny-red/10 text-destiny-red border-destiny-red/20'
       )}>
          {role}
       </span>
    </td>
    <td className="py-5">
       <div className="flex items-center gap-2">
          <div className={cn("w-1.5 h-1.5 rounded-full", status === 'Active' ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,1)]' : 'bg-carbon/20')} />
          <span className="text-[10px] font-black uppercase italic text-carbon">{status}</span>
       </div>
    </td>
    <td className="py-5">
       <span className="font-mono text-[9px] text-carbon/40">{latency}</span>
    </td>
    <td className="py-5 text-right">
       <button className="text-carbon/20 hover:text-destiny-red transition-colors">
          <Lock size={14} />
       </button>
    </td>
  </tr>
);

const MonitorItem: React.FC<{ label: string; status: string; value: string }> = ({ label, status, value }) => (
  <div className="space-y-2">
     <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest italic">
        <span className="text-carbon/40">{label}</span>
        <span className={cn(status === 'Locked' ? 'text-destiny-red' : 'text-green-500')}>{status}</span>
     </div>
     <div className="flex items-center gap-4">
        <div className="flex-grow h-1 bg-destiny-grey rounded-full overflow-hidden">
           <div className="h-full bg-carbon w-full opacity-10" />
        </div>
        <span className="text-xs font-black italic text-carbon shrink-0">{value}</span>
     </div>
  </div>
);
