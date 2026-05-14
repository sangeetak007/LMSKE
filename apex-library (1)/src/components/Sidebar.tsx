import React from 'react';
import { 
  Library, User, Search, Menu, Settings, Bell, HelpCircle, 
  LayoutDashboard, Bookmark, History, FileText, ExternalLink, 
  ShieldCheck, Users, ClipboardList, Database, MessageSquare,
  Package, LineChart
} from 'lucide-react';
import { PageType, UserRole, Book, StudentProfile, EmployeeProfile } from '../types';
import { cn } from '../lib/utils';

interface SidebarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  studentProfile: StudentProfile;
  employeeProfile: EmployeeProfile;
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentRole, 
  onRoleChange, 
  searchQuery, 
  setSearchQuery,
  studentProfile,
  employeeProfile,
  currentPage,
  onPageChange
}) => {
  return (
    <aside className="bg-white text-carbon w-20 lg:w-72 flex flex-col h-screen sticky top-0 shrink-0 transition-all duration-300 border-r border-destiny-border z-50">
      {/* User Branding Top */}
      <div className="p-6 h-20 flex items-center justify-center lg:justify-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-black/5 border border-destiny-border flex items-center justify-center shrink-0">
          <User className="text-carbon/60" size={20} />
        </div>
        <div className="hidden lg:block overflow-hidden whitespace-nowrap">
          <h1 className="font-script text-2xl leading-none italic text-destiny-red mb-1">
            {currentRole === 'Student' ? studentProfile.name : employeeProfile.name}
          </h1>
          <p className="text-[8px] font-bold text-carbon/30 tracking-[0.2em] uppercase">{currentRole}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 scrollbar-hide">
        <div>
          <p className="text-[10px] font-black text-carbon/20 uppercase tracking-[0.3em] px-4 mb-4">
            {currentRole === 'Admin' ? 'System Control' : currentRole === 'Employee' ? 'Staff Console' : 'Navigation'}
          </p>
          <div className="space-y-2">
            <NavItem 
              icon={<LayoutDashboard size={20} />} 
              label="Overview" 
              active={currentPage === 'dashboard'} 
              onClick={() => onPageChange('dashboard')}
            />

            {currentRole === 'Student' && (
              <>
                <NavItem 
                  icon={<Library size={20} />} 
                  label="The Library" 
                  active={currentPage === 'library'}
                  onClick={() => onPageChange('library')}
                />
                <NavItem 
                  icon={<Search size={20} />} 
                  label="Research" 
                  active={currentPage === 'research'}
                  onClick={() => onPageChange('research')}
                />
                <NavItem 
                  icon={<Bookmark size={20} />} 
                  label="Impact" 
                  active={currentPage === 'impact'}
                  onClick={() => onPageChange('impact')}
                />
              </>
            )}

            {currentRole === 'Employee' && (
              <>
                <NavItem 
                  icon={<Package size={20} />} 
                  label="Inventory" 
                  active={currentPage === 'library'}
                  onClick={() => onPageChange('library')}
                />
                <NavItem 
                  icon={<MessageSquare size={20} />} 
                  label="Requests" 
                  active={currentPage === 'dashboard'} // Employee dashboard has requests
                  onClick={() => onPageChange('dashboard')}
                />
                <NavItem 
                  icon={<ClipboardList size={20} />} 
                  label="Tracking" 
                  onClick={() => onPageChange('dashboard')}
                />
              </>
            )}

            {currentRole === 'Admin' && (
              <>
                <NavItem 
                  icon={<Users size={20} />} 
                  label="Identity Hub" 
                  active={currentPage === 'users'}
                  onClick={() => onPageChange('users')}
                />
                <NavItem 
                  icon={<Database size={20} />} 
                  label="Resources" 
                  active={currentPage === 'library'}
                  onClick={() => onPageChange('library')}
                />
                <NavItem 
                  icon={<LineChart size={20} />} 
                  label="Analytics" 
                  onClick={() => onPageChange('dashboard')}
                />
              </>
            )}

            <NavItem 
              icon={<User size={20} />} 
              label="Profile" 
              active={currentPage === 'profile'} 
              onClick={() => onPageChange('profile')}
            />
          </div>
        </div>
      </div>

      {/* Role Toggler at bottom as per image */}
      <div className="p-4 space-y-6">
        <div className="bg-black/5 p-1 rounded-xl flex items-center gap-1 border border-destiny-border">
            <RoleSwitch 
                active={currentRole === 'Student'} 
                onClick={() => onRoleChange('Student')} 
                label="Student" 
            />
            <RoleSwitch 
                active={currentRole === 'Employee'} 
                onClick={() => onRoleChange('Employee')} 
                label="Employee" 
            />
            <RoleSwitch 
                active={currentRole === 'Admin'} 
                onClick={() => onRoleChange('Admin')} 
                label="Admin" 
            />
        </div>

        <button className="flex items-center gap-4 px-3 py-2 text-carbon/40 hover:text-carbon text-xs font-black uppercase tracking-widest transition-all">
          <Settings size={18} />
          <span className="hidden lg:block">Log Out</span>
        </button>
      </div>

      {/* Footer System Info */}
      <div className="p-6 h-20 border-t border-destiny-border flex items-center gap-3">
        <div className="hidden lg:block">
            <div className="flex items-center gap-2 text-carbon/40 text-[10px] font-bold mb-1">
                <Settings size={12} />
                <span>31°C SUNNY</span>
            </div>
            <p className="text-[8px] text-carbon/20 font-bold uppercase tracking-widest italic">Hubballi Repository</p>
        </div>
      </div>
    </aside>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={cn(
    "flex items-center gap-4 px-4 py-3 rounded-xl transition-all w-full group text-left",
    active ? "bg-destiny-red text-white shadow-[0_5px_20px_rgba(244,114,182,0.3)] scale-[1.02]" : "text-carbon/40 hover:text-carbon hover:bg-destiny-red/5"
  )}>
    <div className={cn("shrink-0 transition-colors", active ? "text-white" : "group-hover:text-destiny-red")}>
      {icon}
    </div>
    <span className="hidden lg:block font-black text-[10px] tracking-[0.2em] uppercase italic">{label}</span>
  </button>
);

const RoleSwitch: React.FC<{ active: boolean; onClick: () => void; label: string }> = ({ active, onClick, label }) => (
    <button 
        onClick={onClick}
        className={cn(
            "flex-1 py-2 rounded-lg text-[8px] font-black uppercase tracking-tighter transition-all",
            active ? "bg-destiny-red text-white" : "text-carbon/30 hover:text-carbon/50"
        )}
    >
        <span className="truncate">{label}</span>
    </button>
);
