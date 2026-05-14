import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Mail, IdCard, GraduationCap, Building2, Briefcase, Camera } from 'lucide-react';
import { StudentProfile, EmployeeProfile } from '../types';
import { cn } from '../lib/utils';

interface ProfileEditFormProps {
  isOpen: boolean;
  onClose: () => void;
  role: 'Student' | 'Employee' | 'Admin';
  studentProfile: StudentProfile;
  employeeProfile: EmployeeProfile;
  onSave: (data: StudentProfile | EmployeeProfile) => void;
}

export const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  isOpen,
  onClose,
  role,
  studentProfile,
  employeeProfile,
  onSave
}) => {
  const isStudent = role === 'Student';
  const initialData = isStudent ? studentProfile : employeeProfile;
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(isStudent ? studentProfile : employeeProfile);
  }, [studentProfile, employeeProfile, isStudent, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-white/60 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-xl bg-white border border-destiny-border rounded-[2.5rem] shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8 border-b border-destiny-border flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black uppercase italic tracking-tighter text-carbon">Edit Profile</h2>
              <p className="text-[10px] font-black text-carbon/30 uppercase tracking-[0.3em] mt-1 italic">{role} Identity Sync</p>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-carbon/40 hover:text-carbon transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-4">
              <InputGroup 
                label="Full Name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                icon={<User size={18} />} 
              />

              {isStudent ? (
                <>
                  <InputGroup 
                    label="Roll Number" 
                    name="rollNumber" 
                    value={(formData as StudentProfile).rollNumber} 
                    onChange={handleChange} 
                    icon={<IdCard size={18} />} 
                  />
                  <InputGroup 
                    label="Branch" 
                    name="branch" 
                    value={(formData as StudentProfile).branch} 
                    onChange={handleChange} 
                    icon={<GraduationCap size={18} />} 
                  />
                </>
              ) : (
                <>
                  <InputGroup 
                    label="Employee ID" 
                    name="employeeId" 
                    value={(formData as EmployeeProfile).employeeId} 
                    onChange={handleChange} 
                    icon={<IdCard size={18} />} 
                  />
                  <InputGroup 
                    label="Department" 
                    name="department" 
                    value={(formData as EmployeeProfile).department} 
                    onChange={handleChange} 
                    icon={<Building2 size={18} />} 
                  />
                  <InputGroup 
                    label="Designation" 
                    name="designation" 
                    value={(formData as EmployeeProfile).designation} 
                    onChange={handleChange} 
                    icon={<Briefcase size={18} />} 
                  />
                </>
              )}
            </div>

            <div className="pt-6 flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-black/5 text-carbon/40 py-4 rounded-2xl font-black uppercase tracking-widest text-xs italic hover:bg-black/10 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-[2] bg-destiny-red text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs italic shadow-[0_10px_30px_rgba(255,77,141,0.3)] hover:brightness-110 transition-all active:scale-95"
              >
                Save Identity
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const InputGroup: React.FC<{ 
  label: string; 
  name: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
}> = ({ label, name, value, onChange, icon }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-carbon/30 uppercase tracking-[0.2em] italic ml-2">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-carbon/20 group-focus-within:text-destiny-red transition-colors">
        {icon}
      </div>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-destiny-grey border border-destiny-border rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-carbon placeholder:text-carbon/10 focus:outline-none focus:ring-2 ring-destiny-red/50 transition-all"
      />
    </div>
  </div>
);
