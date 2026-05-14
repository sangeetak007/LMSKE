import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, Users, Library, CheckCircle2, 
  Clock, Plus, Filter, Search, 
  MessageSquare, UserPlus, ClipboardList, Briefcase
} from 'lucide-react';
import { EmployeeProfile, Book } from '../types';
import { cn } from '../lib/utils';

interface EmployeeDashboardProps {
  profile: EmployeeProfile;
  books: Book[];
  onCreateBook: () => void;
}

export const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({ profile, books, onCreateBook }) => {
  const activeLoans = books.filter(b => b.status === 'Borrowed');
  
  return (
    <main className="flex-grow p-8 space-y-8 max-w-[1600px] mx-auto w-full text-carbon">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
        <div className="space-y-2">
           <div className="flex items-center gap-3">
              <span className="bg-destiny-blue/10 text-destiny-blue text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full border border-destiny-blue/20">Staff Console</span>
              <div className="h-[1px] w-8 bg-destiny-border" />
           </div>
           <h1 className="text-6xl md:text-8xl font-serif font-black tracking-tighter text-carbon leading-none">
             Station <span className="text-destiny-red italic lowercase">{profile.designation.split(' ')[1]}</span>
           </h1>
           <p className="text-[10px] text-carbon/40 font-black uppercase tracking-[0.4em] italic leading-relaxed max-w-xl">
             OPERATIONS HUB // {profile.department.toUpperCase()} // EMP-9921
           </p>
        </div>
        
        <div className="flex gap-4">
           <button 
            onClick={onCreateBook}
            className="destiny-btn-primary px-8 py-4 flex items-center gap-2"
           >
             <Plus size={16} />
             Upload Asset
           </button>
        </div>
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <EmployeeKPICard label="Active Users" value="1,204" growth="+5.2%" icon={<Users />} />
        <EmployeeKPICard label="Books Issued" value={activeLoans.length.toString()} growth="+1.4%" icon={<ClipboardList />} />
        <EmployeeKPICard label="Waitlist Volume" value="12" growth="-2.1%" icon={<Clock />} />
        <EmployeeKPICard label="Assist Density" value="8" growth="+12%" icon={<MessageSquare />} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-stretch">
        <div className="xl:col-span-2 space-y-8">
          {/* Inventory Snapshot Table */}
          <div className="space-y-6">
            <div className="flex justify-between items-center px-4">
               <h3 className="text-[10px] font-black text-carbon/30 uppercase tracking-[0.4em] italic">Inventory Lifecycle</h3>
               <div className="flex gap-4">
                  <button className="text-[10px] font-black text-destiny-blue uppercase italic">All Status</button>
                  <button className="text-[10px] font-black text-carbon/20 uppercase italic">Recent</button>
               </div>
            </div>
            
            <div className="bg-white border border-destiny-border rounded-[2.5rem] overflow-hidden shadow-xl">
               <div className="grid grid-cols-[1fr,150px,120px,100px] gap-4 px-8 py-6 bg-destiny-grey border-b border-destiny-border text-[9px] font-black uppercase tracking-widest italic text-carbon/40">
                  <span>Asset Entity</span>
                  <span>Custodian / ID</span>
                  <span>Load Level</span>
                  <span className="text-right">Sync</span>
               </div>
               <div className="divide-y divide-destiny-border">
                  {books.slice(0, 6).map(book => (
                    <div key={book.id} className="grid grid-cols-[1fr,150px,120px,100px] gap-4 px-8 py-5 items-center group hover:bg-destiny-red/5 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg bg-destiny-light-blue flex items-center justify-center shrink-0">
                          <Library size={14} className="text-destiny-blue" />
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase italic tracking-tight text-carbon truncate max-w-[200px]">{book.title}</p>
                          <p className="text-[8px] font-bold text-carbon/30 uppercase tracking-widest italic">{book.category}</p>
                        </div>
                      </div>
                      <p className="font-mono text-[9px] text-carbon/40 uppercase tracking-tighter">@{book.id}</p>
                      <div>
                        <div className="h-1 w-full bg-destiny-grey rounded-full overflow-hidden">
                           <div className={cn("h-full", book.status === 'Available' ? 'bg-green-500 w-full' : 'bg-destiny-red w-1/3')} />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className={cn("w-2 h-2 rounded-full", book.status === 'Available' ? 'bg-green-500' : 'bg-destiny-red')} />
                      </div>
                    </div>
                  ))}
               </div>
               <button className="w-full py-5 text-[9px] font-black text-carbon/20 hover:text-destiny-red uppercase tracking-widest italic transition-colors">
                  Synchronize Full Catalog
               </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-white border border-destiny-border rounded-[2rem] p-10 space-y-8 shadow-sm">
                <h3 className="text-[10px] font-black text-carbon/30 uppercase tracking-[0.4em] italic">Assistance Requests</h3>
                <div className="space-y-6">
                   <RequestItem user="Ananya S." query="Access to Research Node 4" time="2m ago" />
                   <RequestItem user="Rahul V." query="Renewed clearance for 'Clean Code'" time="15m ago" />
                   <RequestItem user="Sneha K." query="Technical fault in Sector 2" time="1h ago" />
                </div>
             </div>
             
             <div className="bg-white border border-destiny-border rounded-[2rem] p-10 space-y-8 shadow-sm">
                <h3 className="text-[10px] font-black text-carbon/30 uppercase tracking-[0.4em] italic">Staff Tasks</h3>
                <div className="space-y-4">
                   <TaskItem label="Catalog Physical Nodes" completed />
                   <TaskItem label="Update Security Protocol v5.1" />
                   <TaskItem label="Interview Impact Applicants" />
                   <TaskItem label="Verify Digital Certificates" />
                </div>
             </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
           <div className="bg-destiny-blue rounded-[2.5rem] p-10 text-white shadow-2xl shadow-destiny-blue/20 relative overflow-hidden group">
              <div className="absolute -right-8 -top-8 text-white/5 group-hover:scale-110 transition-transform duration-700">
                <Briefcase size={200} />
              </div>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-8 relative z-10 text-white/50">Duty Log</p>
              <div className="space-y-6 relative z-10">
                 <div className="flex justify-between items-end border-b border-white/10 pb-4">
                    <p className="text-xs font-black italic uppercase tracking-widest">Shift Status</p>
                    <p className="text-3xl font-black italic">ACTIVE</p>
                 </div>
                 <div className="flex justify-between items-end border-b border-white/10 pb-4">
                    <p className="text-xs font-black italic uppercase tracking-widest">Clocked In</p>
                    <p className="text-lg font-black italic">08:00 AM</p>
                 </div>
                 <div className="flex justify-between items-end">
                    <p className="text-xs font-black italic uppercase tracking-widest">Efficiency</p>
                    <p className="text-lg font-black italic text-green-300">98%</p>
                 </div>
              </div>
              <button className="w-full mt-10 bg-white/10 hover:bg-white/20 border border-white/20 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] italic transition-all backdrop-blur-md relative z-10">
                End Duty Shift
              </button>
           </div>

           <div className="bg-white border border-destiny-border rounded-[2.5rem] p-10 space-y-8 shadow-sm">
              <h4 className="text-[10px] font-black text-carbon/30 uppercase tracking-[0.4em] italic">Neural Status</h4>
              <div className="space-y-6">
                 <StatusIndicator label="Cognitive Load" value="42%" color="bg-destiny-blue" />
                 <StatusIndicator label="Sync Latency" value="0.2ms" color="bg-green-500" />
                 <StatusIndicator label="Security Layer" value="Hardened" color="bg-destiny-red" />
              </div>
           </div>
        </div>
      </div>
    </main>
  );
};

const EmployeeKPICard: React.FC<{ label: string; value: string; growth: string; icon: React.ReactNode }> = ({ label, value, growth, icon }) => (
  <div className="bg-white border border-destiny-border rounded-3xl p-8 space-y-4 hover:border-destiny-blue/30 transition-all group shadow-sm">
    <div className="flex justify-between items-start">
      <div className="p-3 rounded-2xl bg-destiny-grey text-destiny-blue group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className={cn("text-[9px] font-black uppercase italic tracking-widest", growth.startsWith('+') ? 'text-green-500' : 'text-destiny-red')}>
        {growth}
      </span>
    </div>
    <div>
      <p className="text-[9px] font-black text-carbon/30 uppercase tracking-widest italic">{label}</p>
      <p className="text-4xl font-black italic tracking-tighter text-carbon">{value}</p>
    </div>
  </div>
);

const RequestItem: React.FC<{ user: string; query: string; time: string }> = ({ user, query, time }) => (
  <div className="flex gap-4 items-start group cursor-pointer">
    <div className="w-10 h-10 rounded-xl bg-destiny-grey border border-destiny-border flex items-center justify-center shrink-0 group-hover:border-destiny-red/30 transition-all">
      <Users size={16} className="text-carbon/40" />
    </div>
    <div className="space-y-1">
      <p className="text-xs font-black uppercase italic tracking-tight text-carbon group-hover:text-destiny-red transition-colors">{user}</p>
      <p className="text-[10px] font-medium text-carbon/40 leading-tight italic">"{query}"</p>
      <p className="text-[8px] font-black text-carbon/20 uppercase tracking-widest italic pt-1">{time}</p>
    </div>
  </div>
);

const TaskItem: React.FC<{ label: string; completed?: boolean }> = ({ label, completed }) => (
  <div className="flex items-center gap-4 p-4 bg-destiny-grey rounded-xl border border-transparent hover:border-destiny-border/50 transition-all cursor-pointer">
    <div className={cn("w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all", completed ? "bg-destiny-red border-destiny-red" : "border-destiny-border")}>
      {completed && <CheckCircle2 size={12} className="text-white" />}
    </div>
    <span className={cn("text-[10px] font-black uppercase tracking-widest italic", completed ? "text-carbon/20 line-through" : "text-carbon")}>
      {label}
    </span>
  </div>
);

const StatusIndicator: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div className="space-y-2">
     <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest italic">
        <span className="text-carbon/40">{label}</span>
        <span className="text-carbon">{value}</span>
     </div>
     <div className="h-1.5 w-full bg-destiny-grey rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: value.includes('%') ? value : '100%' }}
          className={cn("h-full", color)}
        />
     </div>
  </div>
);
