import React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, Clock, Star, Bell, Plus, 
  ArrowUpRight, Bookmark, History, Calendar,
  MessageSquare, LayoutGrid
} from 'lucide-react';
import { StudentProfile, Book } from '../types';
import { cn } from '../lib/utils';

interface StudentDashboardProps {
  profile: StudentProfile;
  books: Book[];
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ profile, books }) => {
  const borrowedBooks = books.filter(b => b.status === 'Borrowed');
  
  return (
    <main className="flex-grow p-8 space-y-8 max-w-[1600px] mx-auto w-full">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
        <div className="space-y-2">
           <div className="flex items-center gap-3">
              <span className="bg-destiny-red/10 text-destiny-red text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full border border-destiny-red/20">Active Session</span>
              <div className="h-[1px] w-8 bg-destiny-border" />
           </div>
           <h1 className="text-6xl md:text-8xl font-serif font-black tracking-tighter text-carbon leading-none">
             Hello, <span className="text-destiny-red italic lowercase">{profile.name}</span>
           </h1>
           <p className="text-[10px] text-carbon/40 font-black uppercase tracking-[0.4em] italic leading-relaxed max-w-xl">
             CONNECTED TO INSTITUTIONAL REPOSITORY // CS2026-001 PHASE ALPHA
           </p>
        </div>
        
        <div className="flex gap-4">
           <button className="destiny-btn-primary px-8 py-4 flex items-center gap-2">
             <Plus size={16} />
             Synthesize Note
           </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard label="Borrowed" value={borrowedBooks.length.toString()} icon={<BookOpen />} color="text-destiny-blue" />
        <StatsCard label="Waitlist" value="2" icon={<Clock />} color="text-destiny-red" />
        <StatsCard label="Resources" value="14" icon={<Star />} color="text-yellow-500" />
        <StatsCard label="Dues" value="None" icon={<Bell />} color="text-green-500" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-stretch">
        {/* Borrowed Books Section */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
             <h3 className="text-sm font-black uppercase tracking-[0.3em] italic text-carbon/40">Borrowed Archives</h3>
             <button className="text-[10px] font-black text-destiny-red hover:underline uppercase italic">Expand All</button>
          </div>
          
          <div className="bg-white border border-destiny-border rounded-[2.5rem] overflow-hidden shadow-sm">
            <div className="divide-y divide-destiny-border">
              {borrowedBooks.length > 0 ? borrowedBooks.map(book => (
                <div key={book.id} className="p-6 flex items-center justify-between group hover:bg-destiny-red/5 transition-colors">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-16 bg-destiny-light-blue rounded-lg border border-destiny-border flex items-center justify-center shrink-0">
                      <BookOpen size={20} className="text-destiny-blue/40" />
                    </div>
                    <div>
                      <h4 className="text-base font-black uppercase italic tracking-tight text-carbon group-hover:text-destiny-red transition-colors">{book.title}</h4>
                      <p className="text-[9px] font-black text-carbon/30 uppercase tracking-widest italic">{book.author}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-carbon/20 uppercase tracking-widest mb-1">Due in 4 days</p>
                    <div className="bg-destiny-red/10 text-destiny-red px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Action Required</div>
                  </div>
                </div>
              )) : (
                <div className="p-12 text-center text-carbon/20 font-black italic uppercase">No active loans detected.</div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-destiny-border rounded-[2rem] p-8 space-y-6 shadow-sm">
              <h3 className="text-[10px] font-black text-carbon/30 uppercase tracking-[0.4em] italic">Saved Research</h3>
              <div className="space-y-4">
                <ResearchItem title="Cognitive Architecture v2" tag="Draft" />
                <ResearchItem title="Neural Network Safety" tag="Syncing" />
                <ResearchItem title="Distributed Ledger" tag="Review" />
              </div>
            </div>
            <div className="bg-white border border-destiny-border rounded-[2rem] p-8 space-y-6 shadow-sm">
              <h3 className="text-[10px] font-black text-carbon/30 uppercase tracking-[0.4em] italic">Quick Access</h3>
              <div className="grid grid-cols-2 gap-4">
                <QuickAction icon={<LayoutGrid />} label="Nodes" />
                <QuickAction icon={<Bookmark />} label="impact" />
                <QuickAction icon={<History />} label="history" />
                <QuickAction icon={<Calendar />} label="booking" />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar info */}
        <div className="space-y-8">
           <div className="bg-destiny-red rounded-[2.5rem] p-10 text-white shadow-2xl shadow-destiny-red/20 relative overflow-hidden group">
              <div className="absolute right-[-20px] top-[-20px] text-white/5 group-hover:scale-110 transition-transform duration-700">
                <Bell size={180} />
              </div>
              <h4 className="text-2xl font-black uppercase italic tracking-tighter mb-4 relative z-10">Notifications</h4>
              <div className="space-y-4 relative z-10">
                <NotificationItem text="Book 'Clean Code' is now due." time="2m ago" />
                <NotificationItem text="Research proposal approved." time="1h ago" />
                <NotificationItem text="Library closing in 30 mins." time="4h ago" />
              </div>
           </div>

           <div className="bg-white border border-destiny-border rounded-[2.5rem] p-10 space-y-8 shadow-sm">
              <h4 className="text-[10px] font-black text-carbon/30 uppercase tracking-[0.4em] italic">Session Timeline</h4>
              <div className="space-y-6 relative border-l border-destiny-border ml-2 pl-6">
                <TimelineItem time="10:42 AM" text="Logged into KLE Repository" />
                <TimelineItem time="11:15 AM" text="Borrowed 'Design Patterns'" />
                <TimelineItem time="01:20 PM" text="Applied for Resource Extension" />
              </div>
           </div>
        </div>
      </div>
    </main>
  );
};

const StatsCard: React.FC<{ label: string; value: string; icon: React.ReactNode; color: string }> = ({ label, value, icon, color }) => (
  <div className="bg-white border border-destiny-border rounded-[2rem] p-8 flex items-center justify-between group hover:border-destiny-red/30 transition-all shadow-sm">
    <div className="space-y-2">
      <p className="text-[9px] font-black text-carbon/30 uppercase tracking-widest italic">{label}</p>
      <p className="text-4xl font-black italic tracking-tighter text-carbon">{value}</p>
    </div>
    <div className={cn("p-4 rounded-2xl bg-destiny-grey group-hover:scale-110 transition-transform", color)}>
      {icon}
    </div>
  </div>
);

const ResearchItem: React.FC<{ title: string; tag: string }> = ({ title, tag }) => (
  <div className="flex items-center justify-between p-4 bg-destiny-grey rounded-xl group hover:bg-destiny-red/5 transition-colors cursor-pointer">
    <span className="text-xs font-black uppercase italic tracking-tight text-carbon">{title}</span>
    <span className="text-[8px] font-black text-destiny-red uppercase tracking-widest px-2 py-0.5 border border-destiny-red/20 rounded-full">{tag}</span>
  </div>
);

const QuickAction: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <button className="flex flex-col items-center justify-center p-4 bg-destiny-grey rounded-2xl border border-destiny-border/50 hover:border-destiny-red/50 hover:bg-destiny-red/5 transition-all text-carbon/40 hover:text-destiny-red gap-2 group">
    <div className="group-hover:scale-110 transition-transform">{icon}</div>
    <span className="text-[8px] font-black uppercase tracking-widest italic">{label}</span>
  </button>
);

const NotificationItem: React.FC<{ text: string; time: string }> = ({ text, time }) => (
  <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-white/80 space-y-1 group hover:bg-white/20 transition-all">
    <p className="text-[11px] font-bold leading-tight">{text}</p>
    <p className="text-[8px] font-black uppercase tracking-widest text-white/30">{time}</p>
  </div>
);

const TimelineItem: React.FC<{ time: string; text: string }> = ({ time, text }) => (
  <div className="relative">
    <div className="absolute -left-[30px] top-1 w-2 h-2 rounded-full bg-destiny-red shadow-[0_0_10px_rgba(244,114,182,1)]" />
    <p className="text-[8px] font-black text-carbon/30 uppercase tracking-widest italic mb-1">{time}</p>
    <p className="text-xs font-black uppercase italic tracking-tight text-carbon">{text}</p>
  </div>
);
