/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, FC } from 'react';
import { PageType, UserRole, Book, StudentProfile, EmployeeProfile } from './types';
import { INITIAL_BOOKS, CATEGORIES } from './constants';
import { Sidebar } from './components/Sidebar';
import { BookCard } from './components/BookCard';
import { BookForm } from './components/BookForm';
import { ProfilePage } from './components/ProfilePage';
import { ProfileEditForm } from './components/ProfileEditForm';
import { ImpactArchives } from './components/ImpactArchives';
import { ResearchNodes } from './components/ResearchNodes';
import { BlogPage } from './components/BlogPage';
import { StudentDashboard } from './components/StudentDashboard';
import { EmployeeDashboard } from './components/EmployeeDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { Plus, Filter, LayoutGrid, List, BarChart3, Users, BookMarked, AlertCircle, Bookmark, Star, Search, Library, Bell } from 'lucide-react';

import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [role, setRole] = useState<UserRole>('Employee');
  const [studentProfile, setStudentProfile] = useState<StudentProfile>({
    name: 'sangeeta',
    avatarUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&h=400&auto=format&fit=crop',
    rollNumber: 'CS2026-001',
    branch: 'Computer Science Engineering'
  });
  const [employeeProfile, setEmployeeProfile] = useState<EmployeeProfile>({
    name: 'sangeeta',
    avatarUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&h=400&auto=format&fit=crop',
    employeeId: 'EMP-9921',
    department: 'Library Operations',
    designation: 'Senior Librarian'
  });
  const [books, setBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem('apex_library_books');
    return saved ? JSON.parse(saved) : INITIAL_BOOKS;
  });
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

  useEffect(() => {
    localStorage.setItem('apex_library_books', JSON.stringify(books));
  }, [books]);

  const filteredBooks = useMemo(() => {
    return books.filter(b => {
      const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
      const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            b.isbn.includes(searchQuery);
      return matchesCategory && matchesSearch;
    });
  }, [books, selectedCategory, searchQuery]);

  const stats = useMemo(() => ({
    total: books.length.toLocaleString(),
    activeLoans: books.filter(b => b.status === 'Borrowed').length.toLocaleString(),
    available: books.filter(b => b.status === 'Available').length.toLocaleString(),
    systemHealth: '100%'
  }), [books]);

  const handleCreateBook = () => {
    setEditingBook(null);
    setIsFormOpen(true);
  };

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
    setIsFormOpen(true);
  };

  const handleDeleteBook = (id: string) => {
    if (confirm('Are you sure you want to remove this catalog entry?')) {
      setBooks(prev => prev.filter(b => b.id !== id));
    }
  };

  const handleSaveBook = (bookData: Partial<Book>) => {
    if (editingBook) {
      setBooks(prev => prev.map(b => b.id === editingBook.id ? { ...b, ...bookData } as Book : b));
    } else {
      const newBook: Book = {
        ...bookData,
        id: Math.random().toString(36).substr(2, 9),
        status: 'Available'
      } as Book;
      setBooks(prev => [newBook, ...prev]);
    }
    setIsFormOpen(false);
  };

  const handleSaveProfile = (data: StudentProfile | EmployeeProfile) => {
    if (role === 'Student') {
      setStudentProfile(data as StudentProfile);
    } else {
      setEmployeeProfile(data as EmployeeProfile);
    }
  };

  const canManage = role === 'Employee' || role === 'Admin';

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        if (role === 'Student') {
          return <StudentDashboard profile={studentProfile} books={books} />;
        } else if (role === 'Employee') {
          return <EmployeeDashboard profile={employeeProfile} books={books} onCreateBook={handleCreateBook} />;
        } else if (role === 'Admin') {
          return <AdminDashboard />;
        }
        return null; // Fallback
      case 'library':
        return (
          <main className="flex-grow p-8 space-y-12 max-w-[1600px] mx-auto w-full">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col xl:flex-row gap-8">
                {/* Main Content Area */}
                <div className="flex-grow order-2 xl:order-1">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <h2 className="text-5xl font-black text-carbon uppercase tracking-tighter italic">Global <span className="text-destiny-red">Repository</span></h2>
                      <div className="h-10 w-[2px] bg-destiny-border mx-4"></div>
                      <span className="text-carbon/40 font-black italic text-xs uppercase tracking-widest">{filteredBooks.length} assets synced</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {canManage && (
                        <button 
                          onClick={handleCreateBook}
                          className="bg-destiny-red text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] italic hover:bg-destiny-red/80 transition-all flex items-center gap-2"
                        >
                          <Plus size={18} />
                          Synthesize Asset
                        </button>
                      )}
                      
                      <div className="bg-white border border-destiny-border rounded-xl p-1 flex shadow-sm">
                        <button 
                          onClick={() => setViewMode('grid')}
                          className={cn("p-1.5 rounded-lg transition-colors", viewMode === 'grid' ? "bg-destiny-red text-white" : "text-carbon/30 hover:text-carbon/60")}
                        >
                          <LayoutGrid size={20} />
                        </button>
                        <button 
                          onClick={() => setViewMode('list')}
                          className={cn("p-1.5 rounded-lg transition-colors", viewMode === 'list' ? "bg-destiny-red text-white" : "text-carbon/30 hover:text-carbon/60")}
                        >
                          <List size={20} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6 bg-[#BAE6FD]/20 p-2 rounded-2xl border border-destiny-border flex flex-wrap gap-2">
                    <CategoryBtn active={selectedCategory === 'All'} onClick={() => setSelectedCategory('All')}>All Nodes</CategoryBtn>
                    {CATEGORIES.map(cat => (
                      <CategoryBtn key={cat} active={selectedCategory === cat} onClick={() => setSelectedCategory(cat)}>
                        {cat}
                      </CategoryBtn>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {viewMode === 'list' ? (
                      <motion.div 
                        key="list"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="bg-white rounded-2xl border border-destiny-border overflow-hidden shadow-2xl"
                      >
                        <div className="grid grid-cols-[80px,1fr,1fr,120px,120px] gap-4 px-8 py-6 bg-destiny-grey border-b border-destiny-border text-[10px] font-black uppercase tracking-[0.2em] italic text-carbon/40">
                          <span>Alpha</span>
                          <span>Entity / Source</span>
                          <span>Nexus</span>
                          <span>Tier</span>
                          <span className="text-right">Action</span>
                        </div>
                        <div className="divide-y divide-destiny-border">
                          {filteredBooks.map(book => (
                            <BookRow 
                              key={book.id} 
                              book={book} 
                              userRole={role}
                              onEdit={handleEditBook}
                              onDelete={handleDeleteBook}
                            />
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="grid"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8"
                      >
                        {filteredBooks.map(book => (
                          <BookCard 
                            key={book.id} 
                            book={book} 
                            userRole={role}
                            onEdit={handleEditBook}
                            onDelete={handleDeleteBook}
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {filteredBooks.length === 0 && (
                    <div className="py-24 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-destiny-border">
                      <Search size={48} className="mx-auto text-carbon/10 mb-6" />
                      <p className="text-2xl font-black text-carbon/20 uppercase tracking-[0.2em] italic">No Signal Detected</p>
                      <button onClick={() => {setSearchQuery(''); setSelectedCategory('All');}} className="mt-6 text-destiny-red font-black uppercase italic tracking-widest hover:underline">Re-synchronize Filters</button>
                    </div>
                  )}
                </div>

                {/* Sidebar area remains, but styled for dark mode */}
                <div className="xl:w-80 space-y-8 order-1 xl:order-2 shrink-0">
                  <div className="bg-white border border-destiny-border p-8 rounded-[2rem] shadow-sm space-y-8">
                    <div>
                        <h3 className="text-[10px] font-black text-destiny-red uppercase tracking-[0.4em] italic mb-6">Node Status</h3>
                        <div className="space-y-4">
                            <NodeStatus label="Security Protocols" status="Operational" color="bg-green-500" />
                            <NodeStatus label="Optical Sorters" status="Syncing" color="bg-destiny-red" />
                            <NodeStatus label="Neural Bridges" status="Prime" color="bg-blue-500" />
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );
      case 'profile':
        return (
          <ProfilePage 
            role={role} 
            studentProfile={studentProfile} 
            employeeProfile={employeeProfile} 
            onEdit={() => setIsProfileEditOpen(true)}
          />
        );
      case 'impact':
        return <ImpactArchives />;
      case 'research':
        return <ResearchNodes />;
      case 'blog':
        return <BlogPage />;
      case 'users':
        return <AdminDashboard />; // AdminDashboard handles users as its primary focus
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-destiny-grey text-carbon overflow-hidden">
      <Sidebar 
        currentRole={role} 
        onRoleChange={setRole} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        studentProfile={studentProfile}
        employeeProfile={employeeProfile}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Top Navigation Bar as seen in image */}
        <div className="h-20 border-b border-destiny-border px-8 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-xl z-40">
          <div className="flex-grow flex justify-center items-center gap-12">
            <TopNavLink label="HOME" active={currentPage === 'dashboard'} onClick={() => setCurrentPage('dashboard')} />
            <TopNavLink label="BLOG" active={currentPage === 'blog'} onClick={() => setCurrentPage('blog')} />
            <TopNavLink label="ABOUT" />
            <TopNavLink label="CONTACT" />
          </div>
          <div className="flex items-center gap-6">
            <div className="bg-black/5 p-2 rounded-xl border border-destiny-border">
                <Bell size={20} className="text-carbon/40" />
            </div>
            <div className="hidden md:flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-destiny-red flex items-center justify-center -mr-1 shadow-[0_5px_15px_rgba(255,77,141,0.4)]">
                   <Library className="text-white" size={16} />
                </div>
                <span className="font-serif font-black text-2xl text-carbon tracking-tighter">KLE <span className="font-display font-light text-[10px] uppercase tracking-[0.3em] text-carbon/40 ml-1">LIBRARY</span></span>
            </div>
          </div>
        </div>

        {renderCurrentPage()}

        <footer className="mt-auto py-12 px-8 border-t border-destiny-border">
          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-black/5 border border-destiny-border flex items-center justify-center">
                <Library size={20} className="text-destiny-red" />
              </div>
              <div>
                <p className="text-[10px] font-black text-carbon/40 uppercase tracking-[0.2em] italic">© 2026 KLE NEURAL REPOSITORY</p>
                <p className="text-[8px] font-bold text-carbon/10 uppercase tracking-widest italic mt-1">All cognitive assets verified and synced.</p>
              </div>
            </div>
            <div className="flex gap-12">
              <FooterLink label="SYNC STATUS" />
              <FooterLink label="CORE PRIVACY" />
              <FooterLink label="NEURAL SUPPORT" />
            </div>
          </div>
        </footer>
      </div>

      <BookForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        book={editingBook}
        onSave={handleSaveBook}
      />

      <ProfileEditForm 
        isOpen={isProfileEditOpen}
        onClose={() => setIsProfileEditOpen(false)}
        role={role as 'Student' | 'Employee' | 'Admin'}
        studentProfile={studentProfile}
        employeeProfile={employeeProfile}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
const CategoryBtn: FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button 
    onClick={onClick}
    className={cn(
      "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all italic border",
      active 
        ? "bg-destiny-red text-white border-destiny-red shadow-[0_5px_20px_rgba(244,114,182,0.3)] scale-[1.05]" 
        : "bg-white text-carbon/40 border-destiny-border hover:bg-destiny-red/10"
    )}
  >
    {children}
  </button>
);

const KPICard: FC<{ label: string; value: string; growth: string; icon: React.ReactNode }> = ({ label, value, growth, icon }) => (
  <div className="bg-white border border-destiny-border rounded-[2.5rem] p-10 flex flex-col justify-between group hover:border-destiny-red/30 transition-all shadow-sm relative overflow-hidden">
    <div className="absolute -right-4 -top-4 text-destiny-red/[0.05] group-hover:text-destiny-red/[0.1] transition-colors">
        {React.cloneElement(icon as React.ReactElement, { size: 120 })}
    </div>
    <div className="flex justify-between items-start relative z-10">
        <h3 className="text-[10px] font-black text-carbon/30 uppercase tracking-[0.4em] italic mb-12">{label}</h3>
        <div className="text-destiny-red opacity-20 group-hover:opacity-100 transition-opacity">
            {icon}
        </div>
    </div>
    <div className="flex items-baseline gap-4 relative z-10">
        <p className="text-6xl font-black italic tracking-tighter text-carbon">{value}</p>
        <div className="flex items-center gap-1 text-destiny-red text-[10px] font-black italic uppercase tracking-widest">
            {growth}
            <span className="text-carbon/20 ml-1">VECTOR</span>
        </div>
    </div>
  </div>
);

const NodeStatus: FC<{ label: string; status: string; color: string }> = ({ label, status, color }) => (
    <div className="flex items-center justify-between p-5 bg-black/5 rounded-[1.5rem] border border-destiny-border group hover:bg-black/[0.08] transition-all">
        <div>
            <p className="text-[9px] font-black text-carbon/40 uppercase tracking-[0.2em] italic mb-1">{label}</p>
            <p className="text-xs font-black italic uppercase tracking-tight text-carbon">{status}</p>
        </div>
        <div className={cn("w-2.5 h-2.5 rounded-full shadow-[0_0_10px_currentColor]", color, color.replace('bg-', 'text-'))} />
    </div>
);

const FooterLink: FC<{ label: string }> = ({ label }) => (
    <a href="#" className="text-[9px] font-black text-carbon/20 hover:text-destiny-red transition-colors tracking-[0.3em] uppercase italic">
        {label}
    </a>
);

const TopNavLink: FC<{ label: string; active?: boolean; onClick?: () => void }> = ({ label, active, onClick }) => (
    <button 
        onClick={onClick}
        className={cn(
            "text-[10px] font-black uppercase tracking-[0.3em] transition-colors flex items-center gap-2 italic group",
            active ? "text-carbon" : "text-carbon/40 hover:text-carbon"
        )}
    >
        {label}
        {active && <div className="w-1.5 h-1.5 rounded-full bg-destiny-red shadow-[0_0_10px_rgba(255,77,141,0.8)]" />}
    </button>
);;

interface BookRowProps {
  book: Book;
  userRole: UserRole;
  onEdit: (b: Book) => void;
  onDelete: (id: string) => void;
}

const BookRow: FC<BookRowProps> = ({ book, userRole, onEdit, onDelete }) => {
  const canManage = userRole === 'Employee' || userRole === 'Admin';
  
  return (
    <div className="grid grid-cols-[80px,1fr,1fr,120px,120px] gap-4 px-8 py-6 hover:bg-destiny-red/5 transition-colors items-center group border-b border-destiny-border last:border-0">
      <span className="font-mono text-xs text-carbon/40 font-black italic">{book.year}</span>
      <div>
        <h4 className="text-base font-black italic uppercase tracking-tight group-hover:text-destiny-red transition-colors line-clamp-1 text-carbon">{book.title}</h4>
        <span className="text-[9px] font-black text-carbon/40 uppercase tracking-[0.2em] italic">SOURCE: {book.author.toUpperCase()}</span>
      </div>
      <div>
        <span className="bg-destiny-light-blue border border-destiny-border px-3 py-1 rounded-lg text-[9px] font-black text-destiny-blue uppercase tracking-widest italic">{book.category}</span>
      </div>
      <div>
        <span className={cn(
          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest italic",
          book.status === 'Available' ? "bg-green-500/10 text-green-600 border border-green-500/20" : 
          book.status === 'Borrowed' ? "bg-destiny-red/10 text-destiny-red border border-destiny-red/20" : "bg-blue-500/10 text-blue-600 border border-blue-500/20"
        )}>
          {book.status}
        </span>
      </div>
      <div className="flex justify-end gap-3">
        {canManage ? (
          <>
            <button 
              onClick={() => onEdit(book)}
              className="w-10 h-10 rounded-xl bg-black/5 text-carbon/40 flex items-center justify-center hover:bg-destiny-red hover:text-white transition-all border border-destiny-border"
            >
              <BarChart3 size={16} />
            </button>
            <button 
              onClick={() => onDelete(book.id)}
              className="w-10 h-10 rounded-xl bg-black/5 text-carbon/40 flex items-center justify-center hover:bg-black/10 hover:text-destiny-red transition-all border border-destiny-border"
            >
              <Plus size={16} className="rotate-45" /> 
            </button>
          </>
        ) : (
          <button className="text-[10px] font-black text-carbon/30 hover:text-carbon uppercase tracking-[0.2em] italic transition-colors">Observe</button>
        )}
      </div>
    </div>
  );
}
