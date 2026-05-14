import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, Zap, Heart, Star, Calendar } from 'lucide-react';
import { cn } from '../lib/utils';

interface ImpactArchive {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  date: string;
  color: string;
}

const IMPACTS: ImpactArchive[] = [
  {
    id: '1',
    title: 'Top Research Institute 2025',
    category: 'INSTITUTIONAL',
    description: 'Recognized for pioneering contributions in artificial intelligence and machine learning research.',
    icon: <ShieldCheck size={24} />,
    date: 'MARCH 2025',
    color: 'from-destiny-red/20 to-transparent'
  },
  {
    id: '2',
    title: 'Sustainability Excellence Award',
    category: 'GREEN CAMPUS',
    description: 'Awarded for achieving 100% renewable energy usage across all campus data centers.',
    icon: <Zap size={24} />,
    date: 'AUGUST 2024',
    color: 'from-green-500/10 to-transparent'
  },
  {
    id: '3',
    title: 'Global Innovation Hub',
    category: 'INNOVATION',
    description: 'Establishment of the leading startup incubator in the region, fostering 50+ successful ventures.',
    icon: <Award size={24} />,
    date: 'DECEMBER 2024',
    color: 'from-blue-500/10 to-transparent'
  },
  {
    id: '4',
    title: 'Humanitarian Leadership',
    category: 'SOCIAL IMPACT',
    description: 'Outstanding community service outreach providing digital literacy to 10k individuals.',
    icon: <Heart size={24} />,
    date: 'OCTOBER 2024',
    color: 'from-pink-500/10 to-transparent'
  }
];

export const ImpactArchives: React.FC = () => {
  return (
    <div className="flex-grow p-8 space-y-12 max-w-[1600px] mx-auto w-full">
      <div className="space-y-4 text-carbon">
        <h1 className="text-6xl font-black tracking-tighter italic uppercase">
          Impact <span className="text-destiny-red">Archives</span>
        </h1>
        <p className="text-[10px] text-carbon/30 font-black uppercase tracking-[0.4em] italic leading-relaxed max-w-md">
          A persistent chronological log of institutional milestones and cognitive advancements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {IMPACTS.map((impact, index) => (
          <motion.div
            key={impact.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
            whileHover={{ y: -8 }}
            className={cn(
              "relative bg-white border border-destiny-border rounded-[2.5rem] p-10 overflow-hidden group shadow-sm transition-all",
              "hover:border-destiny-red/20"
            )}
          >
            {/* Background Gradient */}
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-40 group-hover:opacity-60 transition-opacity duration-700", impact.color)} />

            {/* Content Container */}
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start mb-12">
                <div className="w-14 h-14 rounded-2xl bg-black/5 border border-destiny-border flex items-center justify-center text-destiny-red shadow-xl group-hover:scale-110 group-hover:bg-destiny-red group-hover:text-white transition-all duration-500">
                  {impact.icon}
                </div>
                <div className="flex items-center gap-2 text-carbon/20 text-[9px] font-black uppercase tracking-widest italic pt-2">
                  <Calendar size={12} />
                  {impact.date}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-destiny-red text-[11px] font-black uppercase tracking-[0.3em] italic">
                  {impact.category}
                </p>
                <h2 className="text-4xl font-black italic uppercase tracking-tighter text-carbon group-hover:translate-x-2 transition-transform duration-500">
                  {impact.title}
                </h2>
                <p className="text-carbon/40 text-sm font-medium leading-relaxed max-w-lg mt-4 border-l-2 border-carbon/10 pl-6 group-hover:border-destiny-red transition-colors duration-500">
                  {impact.description}
                </p>
              </div>

              <div className="mt-12 flex items-center gap-4 text-carbon/10 group-hover:text-carbon/40 transition-colors">
                <div className="h-[1px] flex-grow bg-carbon/5" />
                <Star size={14} className="group-hover:rotate-180 transition-transform duration-1000" />
                <div className="h-[1px] flex-grow bg-carbon/5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
