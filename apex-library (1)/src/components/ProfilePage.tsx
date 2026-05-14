import React from 'react';
import { UserRole, StudentProfile, EmployeeProfile } from '../types';
import { Settings, BarChart3, Clock, BookOpen, Mail, Calendar, BadgeCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface ProfilePageProps {
  role: UserRole;
  studentProfile: StudentProfile;
  employeeProfile: EmployeeProfile;
  onEdit: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ role, studentProfile, employeeProfile, onEdit }) => {
  const isStudent = role === 'Student';
  const profile = isStudent ? studentProfile : employeeProfile;

  return (
    <div className="flex-grow flex flex-col bg-destiny-grey">
      <div className="p-8 space-y-12">
        {/* Profile Card & Banner Section */}
        <div className="relative">
          {/* Banner */}
          <div className="h-64 md:h-80 w-full rounded-[2rem] bg-gradient-to-r from-[#F9A8D4] to-[#BAE6FD]" />
          
          {/* Main Profile Info Card */}
          <div className="max-w-[1200px] mx-auto -mt-32 px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-12 border border-destiny-border shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Avatar (Perfectly Rounded as requested) */}
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-destiny-grey border-4 border-white flex items-center justify-center overflow-hidden shadow-lg relative group/avatar">
                  <div className="text-4xl font-black italic text-carbon uppercase">{profile.name[0]}</div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/avatar:opacity-100 transition-opacity pointer-events-none" />
                </div>

              <div className="text-center md:text-left text-carbon">
                  <h1 className="text-6xl md:text-8xl font-serif text-carbon leading-none tracking-tighter drop-shadow-sm mb-4">
                    {profile.name}
                  </h1>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                    <span className="bg-destiny-red text-white py-1 px-4 rounded-full text-[10px] font-black uppercase tracking-widest italic">{role}</span>
                    <button 
                      onClick={onEdit}
                      className="bg-black/5 hover:bg-destiny-red/10 text-carbon/40 hover:text-destiny-red py-1 px-3 rounded-full text-[9px] font-black uppercase tracking-widest italic border border-destiny-border transition-colors flex items-center gap-1.5"
                    >
                      <Settings size={12} />
                      EDIT PROFILE
                    </button>
                    <div className="flex items-center gap-2 text-carbon/40 text-[11px] font-black uppercase tracking-widest italic">
                        <Mail size={14} className="text-destiny-red" />
                        {isStudent ? (profile as StudentProfile).rollNumber : (profile as EmployeeProfile).employeeId}@university.kl
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-center md:justify-start gap-2 text-carbon/20 text-[10px] font-black uppercase tracking-[0.2em] italic">
                    <Calendar size={12} />
                    JOINED OCTOBER 2023
                  </div>
                </div>
              </div>

              <div className="shrink-0">
                <button 
                  onClick={onEdit}
                  className="bg-destiny-red text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs italic shadow-[0_10px_30px_rgba(244,114,182,0.3)] hover:scale-105 transition-all active:scale-95 flex items-center gap-2"
                >
                  <Settings size={16} />
                  EDIT PROFILE
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="max-w-[1240px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 pb-20 text-carbon">
          {/* Borrowed Books Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
                <BookOpen size={20} className="text-destiny-red" />
                <h3 className="text-sm font-black uppercase tracking-[0.3em] italic">Borrowed Books</h3>
            </div>
            
            <div className="space-y-4">
                <BookRecordCard 
                    title="Let Us C" 
                    info="DUE IN 5 DAYS" 
                    progress={70} 
                    bannerColor="bg-destiny-red"
                />
                <BookRecordCard 
                    title="Thermodynamics V.1" 
                    info="DUE IN 12 DAYS" 
                    progress={30} 
                    bannerColor="bg-blue-500"
                />
            </div>
          </div>

          {/* Library Stats Section */}
          <div className="space-y-6 text-carbon">
            <div className="flex items-center gap-3">
                <BarChart3 size={20} className="text-destiny-red" />
                <h3 className="text-sm font-black uppercase tracking-[0.3em] italic">Library Stats</h3>
            </div>

            <div className="bg-white border border-destiny-border rounded-[2rem] p-8 h-full min-h-[300px] flex flex-col justify-center shadow-sm">
                <div className="grid grid-cols-2 gap-12">
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-carbon/30 uppercase tracking-[0.2em] italic">Total Books Read</p>
                        <div className="flex items-end gap-1 text-carbon">
                            <span className="text-5xl font-black tracking-tighter italic">42</span>
                            <span className="text-xs font-black text-destiny-red italic mb-2 uppercase">Assets</span>
                        </div>
                    </div>
                    
                    <div className="flex items-end justify-end gap-1">
                        {[40, 70, 45, 90, 60].map((h, i) => (
                            <div key={i} className="w-3 rounded-full bg-black/5 overflow-hidden h-24 relative">
                                <div 
                                    className="absolute bottom-0 left-0 w-full bg-destiny-red" 
                                    style={{ height: `${h}%` }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-destiny-border flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black text-carbon/30 uppercase tracking-[0.2em] italic">Current Rank</p>
                        <p className="text-lg font-black italic">TOP 5% RESEARCHER</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center text-destiny-red">
                        <BarChart3 size={24} />
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookRecordCard: React.FC<{ title: string; info: string; progress: number; bannerColor: string }> = ({ title, info, progress, bannerColor }) => (
    <div className="bg-white border border-destiny-border rounded-[2rem] p-6 flex flex-col md:flex-row items-center gap-6 group hover:translate-y-[-4px] transition-all shadow-sm">
        <div className={cn("w-24 h-24 rounded-2xl shrink-0 flex items-center justify-center overflow-hidden border border-black/5", bannerColor)}>
            <div className="text-white/40 font-black italic">{title[0]}</div>
        </div>
        <div className="flex-grow space-y-4 text-center md:text-left">
            <div>
                <h4 className="text-xl font-black uppercase tracking-tight italic group-hover:text-destiny-red transition-colors">{title}</h4>
                <p className="text-destiny-red text-[11px] font-black uppercase tracking-[0.2em] italic mt-1">{info}</p>
            </div>
            <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
                <div 
                    className={cn("h-full transition-all duration-1000", bannerColor)} 
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
        <button className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center hover:bg-destiny-red transition-colors group/btn">
            <Clock size={20} className="text-carbon/40 group-hover/btn:text-white" />
        </button>
    </div>
);
