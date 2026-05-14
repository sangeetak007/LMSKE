import React from 'react';
import { motion } from 'motion/react';
import { Network, Database, Cpu, FlaskConical, Globe, Shield, Activity, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

interface ResearchNode {
  id: string;
  name: string;
  category: string;
  subtext: string;
  status: string;
  statusColor: string;
  load: string;
  availability: string;
  members: number;
  icon: React.ReactNode;
  accentColor: string;
}

const NODES: ResearchNode[] = [
  {
    id: '1',
    name: 'Neural Core Alpha',
    category: 'NLP & COGNITIVE MAPPING',
    subtext: 'Large Language Synthesis',
    status: 'OPTIMAL',
    statusColor: 'text-green-500',
    load: '14%',
    availability: '99.99%',
    members: 42,
    icon: <Network size={20} />,
    accentColor: 'bg-green-500/20'
  },
  {
    id: '2',
    name: 'Distributed Ledger Wing',
    category: 'BLOCKCHAIN & CONSENSUS',
    subtext: 'High-Integrity Persistence',
    status: 'ACTIVE',
    statusColor: 'text-destiny-red',
    load: '62%',
    availability: '100%',
    members: 28,
    icon: <Database size={20} />,
    accentColor: 'bg-destiny-red/20'
  },
  {
    id: '3',
    name: 'Quantum Logic Lab',
    category: 'QUANTUM CRYPTOGRAPHY',
    subtext: 'Sub-Atomic Computation',
    status: 'HEAVY LOAD',
    statusColor: 'text-blue-500',
    load: '92%',
    availability: '98.4%',
    members: 15,
    icon: <Cpu size={20} />,
    accentColor: 'bg-blue-500/20'
  },
  {
    id: '4',
    name: 'Institutional Bio-Link',
    category: 'GENETICS & SYNTHESIS',
    subtext: 'Biometric Repository',
    status: 'STANDBY',
    statusColor: 'text-carbon/20',
    load: '2%',
    availability: '100%',
    members: 12,
    icon: <FlaskConical size={20} />,
    accentColor: 'bg-black/5'
  },
  {
    id: '5',
    name: 'Macro-Economic Forge',
    category: 'ALGORITHMIC REVENUE',
    subtext: 'Fiscal Forecasting Node',
    status: 'ACTIVE',
    statusColor: 'text-destiny-red',
    load: '45%',
    availability: '99.5%',
    members: 21,
    icon: <Globe size={20} />,
    accentColor: 'bg-destiny-red/20'
  },
  {
    id: '6',
    name: 'Ethics Guard Node',
    category: 'AI ALIGNMENT',
    subtext: 'Decision Policy Auditor',
    status: 'VERIFIED',
    statusColor: 'text-green-500',
    load: '18%',
    availability: '100%',
    members: 33,
    icon: <Shield size={20} />,
    accentColor: 'bg-green-500/20'
  }
];

export const ResearchNodes: React.FC = () => {
  return (
    <div className="flex-grow p-8 space-y-12 max-w-[1600px] mx-auto w-full text-carbon">
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <h1 className="text-6xl font-black tracking-tighter italic uppercase">
            Research <span className="text-destiny-red">Nodes</span>
          </h1>
          <p className="text-[10px] text-carbon/30 font-black uppercase tracking-[0.4em] italic leading-relaxed max-w-md">
            Direct interface to neural processing clusters and institutional knowledge silos.
          </p>
        </div>
        <div className="flex gap-4">
            <button className="bg-black/5 border border-destiny-border px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] italic hover:bg-black/10 transition-all text-carbon">
                Sync All Nodes
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 pb-20">
        {NODES.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-destiny-border rounded-[2.5rem] p-10 group hover:border-destiny-red/30 transition-all shadow-sm flex flex-col justify-between h-[450px] relative overflow-hidden"
          >
            {/* Background Icon Watermark */}
            <div className="absolute -right-8 -top-8 text-destiny-red/[0.02] group-hover:text-destiny-red/[0.05] transition-colors">
                {React.cloneElement(node.icon as React.ReactElement, { size: 240 })}
            </div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-12">
                <div className="w-14 h-14 rounded-2xl bg-black/5 border border-destiny-border flex items-center justify-center text-destiny-red group-hover:bg-destiny-red group-hover:text-white transition-all duration-500">
                  {node.icon}
                </div>
                <div className="text-right">
                    <p className={cn("text-[9px] font-black uppercase tracking-[0.3em] italic mb-1", node.statusColor)}>
                        {node.status}
                    </p>
                    <p className="text-[10px] font-black text-carbon/20 uppercase tracking-widest italic">NODE-{node.id}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl font-black italic uppercase tracking-tighter text-carbon group-hover:text-destiny-red transition-colors leading-[0.9]">
                  {node.name}
                </h2>
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-destiny-red uppercase tracking-[0.2em] italic">
                        {node.category}
                    </p>
                    <p className="text-sm font-medium text-carbon/40 italic">{node.subtext}</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 space-y-8 mt-12 text-carbon">
                <div className="grid grid-cols-2 gap-6">
                    <div className="bg-black/5 rounded-2xl p-6 border border-destiny-border group-hover:border-destiny-red/10 transition-colors">
                        <p className="text-[9px] font-black text-carbon/30 uppercase tracking-widest italic mb-2">Load Index</p>
                        <p className="text-2xl font-black italic text-carbon tracking-tighter">{node.load}</p>
                    </div>
                    <div className="bg-black/5 rounded-2xl p-6 border border-destiny-border group-hover:border-destiny-red/10 transition-colors">
                        <p className="text-[9px] font-black text-carbon/30 uppercase tracking-widest italic mb-2">Availability</p>
                        <p className="text-2xl font-black italic text-green-600 tracking-tighter">{node.availability}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-destiny-border">
                    <div className="flex items-center gap-2 text-carbon/20">
                        <Zap size={14} className="text-destiny-red" />
                        <span className="text-[10px] font-black uppercase tracking-widest italic">{node.members} Core Members</span>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-destiny-red shadow-[0_0_10px_rgba(255,77,141,0.8)] animate-pulse" />
                </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
