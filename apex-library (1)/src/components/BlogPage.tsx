import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, BookOpen, Clock, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

const BLOG_POSTS = [
  {
    id: 'b1',
    bookTitle: 'Clean Code',
    blogTitle: 'Mastering the Art of Clean Code in 2024',
    excerpt: 'Writing code is easy. Writing code that others can read, maintain, and scale is an art form. Inspired by Robert C. Martin...',
    author: 'Sangeeta K.',
    date: 'May 12, 2024',
    readTime: '8 min read',
    mediumUrl: 'https://medium.com/topic/software-engineering',
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'b2',
    bookTitle: 'Adrian Newey: How to Build a Car',
    blogTitle: 'Aerodynamics and the Future of Formula 1 Design',
    excerpt: 'A deep dive into the engineering philosophy of Adrian Newey and how it reshaped modern automotive racing dynamics.',
    author: 'Sangeeta K.',
    date: 'May 10, 2024',
    readTime: '12 min read',
    mediumUrl: 'https://medium.com/topic/engineering',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'b3',
    bookTitle: 'The Art of Racing in the Rain',
    blogTitle: 'The Human Element: Lessons from the Track',
    excerpt: 'Exploring the intersection of philosophy, racing, and the bond between humans and their companions through the lens of Enzo.',
    author: 'Sangeeta K.',
    date: 'May 05, 2024',
    readTime: '6 min read',
    mediumUrl: 'https://medium.com/topic/books',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop'
  }
];

export const BlogPage: React.FC = () => {
  return (
    <main className="flex-grow p-8 space-y-12 max-w-[1600px] mx-auto w-full">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <p className="text-[10px] font-black text-destiny-red uppercase tracking-[0.4em] italic">Knowledge Transfer</p>
          <div className="h-[1px] w-12 bg-destiny-red/30"></div>
        </div>
        <h1 className="text-7xl md:text-9xl font-serif font-black tracking-tighter text-carbon leading-none">
          KLE <br />
          <span className="text-destiny-red italic lowercase -mt-4 block">Archive Blog</span>
        </h1>
        <p className="text-[11px] text-carbon/40 font-black uppercase tracking-[0.4em] italic leading-relaxed max-w-2xl mt-8">
          SYNCHRONIZING PERSPECTIVES. A CURATED COLLECTION OF SCHOLARLY DISCOURSE REPRESENTING THE ARCHIVAL NODES OF OUR GLOBAL REPOSITORY.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {BLOG_POSTS.map((post, idx) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative bg-white border border-destiny-border rounded-[2.5rem] overflow-hidden hover:border-destiny-red/30 transition-all duration-500 shadow-sm"
          >
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-2/5 relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.blogTitle} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
                <div className="absolute top-4 left-4">
                   <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest italic">
                      {post.bookTitle}
                   </div>
                </div>
              </div>
              
              <div className="md:w-3/5 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[9px] font-black text-destiny-red uppercase tracking-widest italic">{post.date}</span>
                    <div className="flex items-center gap-1.5 text-carbon/20 text-[9px] font-black uppercase tracking-widest italic">
                       <Clock size={10} />
                       {post.readTime}
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif font-black text-carbon leading-tight mb-4 group-hover:text-destiny-red transition-colors">
                    {post.blogTitle}
                  </h3>
                  <p className="text-xs text-carbon/50 font-medium leading-relaxed line-clamp-3 italic">
                    "{post.excerpt}"
                  </p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-destiny-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-destiny-red/10 border border-destiny-red/20 flex items-center justify-center">
                      <p className="text-[10px] font-black text-destiny-red italic">SK</p>
                    </div>
                    <p className="text-[10px] font-black text-carbon uppercase tracking-widest italic">{post.author}</p>
                  </div>
                  
                  <a 
                    href={post.mediumUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 text-destiny-red font-black text-[10px] uppercase tracking-widest italic group/link"
                  >
                    READ ON MEDIUM
                    <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-destiny-red rounded-[2.5rem] p-12 flex flex-col md:flex-row items-center justify-between shadow-2xl shadow-destiny-red/20 gap-8">
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-4xl font-serif font-black text-white italic lowercase">Want to contribute to the archive?</h2>
          <p className="text-white/60 text-xs font-black uppercase tracking-[0.3em] italic">Synthesize your thoughts into our collective intelligence.</p>
        </div>
        <button className="bg-white text-destiny-red px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.4em] italic hover:scale-105 transition-all shadow-xl">
          Submit Draft
        </button>
      </div>
    </main>
  );
};
