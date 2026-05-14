import React, { useState, useEffect } from 'react';
import { Book } from '../types';
import { X, Save, Plus } from 'lucide-react';
import { CATEGORIES } from '../constants';

interface BookFormProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
  onSave: (book: Partial<Book>) => void;
}

export const BookForm: React.FC<BookFormProps> = ({ isOpen, onClose, book, onSave }) => {
  const [formData, setFormData] = useState<Partial<Book>>({
    title: '',
    author: '',
    year: new Date().getFullYear(),
    category: CATEGORIES[0],
    isbn: '',
    coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=1000',
  });

  useEffect(() => {
    if (book) {
      setFormData(book);
    } else {
      setFormData({
        title: '',
        author: '',
        year: new Date().getFullYear(),
        category: CATEGORIES[0],
        isbn: '',
        coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=1000',
      });
    }
  }, [book, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-destiny-border">
        <div className="bg-destiny-red text-white p-6 flex items-center justify-between">
          <h2 className="font-display font-black uppercase tracking-tight flex items-center gap-3">
            {book ? <Plus size={24} className="rotate-45" /> : <Plus size={24} />}
            <span className="text-lg italic tracking-tighter">{book ? 'Update Catalog' : 'New Catalog Entry'}</span>
          </h2>
          <button onClick={onClose} className="hover:rotate-90 transition-transform p-1 hover:bg-white/10 rounded-full">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="text-[10px] uppercase font-black text-carbon/40 tracking-widest mb-2 block italic">Resource Title</label>
              <input 
                required
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full bg-destiny-grey border border-destiny-border rounded-xl p-3 text-carbon focus:border-destiny-red focus:ring-1 ring-destiny-red/20 outline-none transition-all font-bold italic" 
                placeholder="Enter title"
              />
            </div>
            
            <div>
              <label className="text-[10px] uppercase font-black text-carbon/40 tracking-widest mb-2 block italic">Lead Author</label>
              <input 
                required
                value={formData.author}
                onChange={e => setFormData({...formData, author: e.target.value})}
                className="w-full bg-destiny-grey border border-destiny-border rounded-xl p-3 text-carbon focus:border-destiny-red focus:ring-1 ring-destiny-red/20 outline-none transition-all font-bold italic" 
                placeholder="Author name"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-black text-carbon/40 tracking-widest mb-2 block italic">Release Year</label>
              <input 
                type="number"
                required
                value={formData.year}
                onChange={e => setFormData({...formData, year: parseInt(e.target.value)})}
                className="w-full bg-destiny-grey border border-destiny-border rounded-xl p-3 text-carbon focus:border-destiny-red focus:ring-1 ring-destiny-red/20 outline-none transition-all font-mono italic" 
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-black text-carbon/40 tracking-widest mb-2 block italic">Classification</label>
              <select 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                className="w-full bg-destiny-grey border border-destiny-border rounded-xl p-3 text-carbon focus:border-destiny-red focus:ring-1 ring-destiny-red/20 outline-none transition-all font-black uppercase text-xs italic"
              >
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase font-black text-carbon/40 tracking-widest mb-2 block italic">ISBN Code</label>
              <input 
                required
                value={formData.isbn}
                onChange={e => setFormData({...formData, isbn: e.target.value})}
                className="w-full bg-destiny-grey border border-destiny-border rounded-xl p-3 text-carbon focus:border-destiny-red focus:ring-1 ring-destiny-red/20 outline-none transition-all font-mono italic" 
                placeholder="ISBN-XXXX"
              />
            </div>

            <div className="col-span-2">
              <label className="text-[10px] uppercase font-black text-carbon/40 tracking-widest mb-2 block italic">Cover Asset URL</label>
              <input 
                value={formData.coverUrl}
                onChange={e => setFormData({...formData, coverUrl: e.target.value})}
                className="w-full bg-destiny-grey border border-destiny-border rounded-xl p-3 text-carbon focus:border-destiny-red focus:ring-1 ring-destiny-red/20 outline-none transition-all text-xs font-mono" 
              />
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 bg-black/5 text-carbon/40 py-3.5 rounded-xl font-display font-black uppercase text-xs tracking-widest hover:bg-black/10 transition-colors italic"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 bg-destiny-red text-white py-3.5 rounded-xl font-display font-black uppercase text-xs tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-destiny-red/20 italic"
            >
              <Save size={18} />
              Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
