import React from 'react';
import { Book, UserRole } from '../types';
import { Edit2, Trash2, BookOpen, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

interface BookCardProps {
  book: Book;
  userRole: UserRole;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, userRole, onEdit, onDelete }) => {
  const isEmployeeOrAdmin = userRole === 'Employee' || userRole === 'Admin';

  return (
    <div className="bg-white border border-destiny-border rounded-[2rem] overflow-hidden group flex flex-col hover:border-destiny-red/30 transition-all shadow-sm">
      <div className="relative aspect-[3/4] overflow-hidden bg-black/5">
        <img 
          src={book.coverUrl} 
          alt={book.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <span className={cn(
            "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest italic shadow-2xl backdrop-blur-md",
            book.status === 'Available' ? "bg-green-500/20 text-green-600 border border-green-500/30" : 
            book.status === 'Borrowed' ? "bg-destiny-red/20 text-destiny-red border border-destiny-red/30" : "bg-blue-500/20 text-blue-600 border border-blue-500/30"
          )}>
            {book.status}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
            <p className="text-[10px] font-black text-white uppercase tracking-[0.3em] italic">Accessing node data...</p>
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <div className="mb-6">
          <h3 className="text-base font-black italic uppercase italic tracking-tighter leading-tight mb-2 line-clamp-2 text-carbon group-hover:text-destiny-red transition-colors">
            {book.title}
          </h3>
          <p className="text-carbon/40 text-[10px] font-black uppercase tracking-widest italic">{book.author}</p>
        </div>

        <div className="mt-auto pt-6 flex items-center justify-between border-t border-destiny-border">
          <div className="flex items-center gap-2 text-carbon/10 group-hover:text-destiny-red/40 transition-colors">
            <Clock size={14} />
            <span className="text-[10px] font-black italic">{book.year}</span>
          </div>

          <div className="flex gap-2">
            {isEmployeeOrAdmin ? (
              <>
                <ActionButton 
                  onClick={() => onEdit(book)}
                  icon={<Edit2 size={14} />}
                  className="bg-black/5 text-carbon/40 border border-destiny-border hover:bg-destiny-red hover:text-white hover:border-destiny-red"
                />
                <ActionButton 
                  onClick={() => onDelete(book.id)}
                  icon={<Trash2 size={14} />}
                  className="bg-black/5 text-carbon/40 border border-destiny-border hover:bg-black/10 hover:text-destiny-red"
                />
              </>
            ) : (
              <button className="flex items-center gap-2 text-[10px] font-black text-carbon/30 hover:text-carbon uppercase tracking-[0.2em] italic transition-colors">
                <BookOpen size={14} />
                ENGAGE
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionButton: React.FC<{ onClick: () => void; icon: React.ReactNode; className: string }> = ({ onClick, icon, className }) => (
  <button 
    onClick={onClick}
    className={cn(
      "w-9 h-9 flex items-center justify-center rounded-xl transition-all",
      className
    )}
  >
    {icon}
  </button>
);
