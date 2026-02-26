import React from 'react';
import { Star, MessageSquare, Video, Calendar, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Advisor } from '../types';

const MOCK_ADVISORS: Advisor[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    specialization: "Wealth Management & Tax",
    rating: 4.9,
    bio: "Ex-Goldman Sachs advisor with 15 years of experience in helping individuals build long-term wealth.",
    image: "https://picsum.photos/seed/sarah/200/200"
  },
  {
    id: 2,
    name: "David Chen",
    specialization: "Business Cash Flow",
    rating: 4.8,
    bio: "Specializes in helping small to medium business owners optimize their operational costs and scale.",
    image: "https://picsum.photos/seed/david/200/200"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    specialization: "Student Financial Planning",
    rating: 5.0,
    bio: "Dedicated to helping students and young professionals manage debt and start their investment journey.",
    image: "https://picsum.photos/seed/elena/200/200"
  }
];

export default function AdvisorPage() {
  return (
    <div className="space-y-10 font-sans">
      <div className="bg-slate-900 rounded-[48px] p-12 text-white shadow-2xl shadow-slate-200 relative overflow-hidden group">
        <div className="relative z-10 max-w-3xl">
          <span className="text-[10px] font-black text-brand-400 uppercase tracking-[0.2em] mb-2 block">Human Expertise</span>
          <h2 className="text-4xl font-black mb-6 tracking-tight">Talk to a Real Human Expert</h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-2xl">
            Sometimes AI isn't enough. Connect with certified financial advisors for personalized strategies, tax planning, and business growth advice.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-12 h-12 rounded-2xl border-4 border-slate-900 bg-slate-800 overflow-hidden shadow-xl transition-transform hover:scale-110 hover:z-10">
                  <img src={`https://picsum.photos/seed/adv${i}/48/48`} alt="Advisor" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black uppercase tracking-widest text-white">50+ Certified Advisors</span>
              <span className="text-xs font-bold text-brand-400">Available Online Now</span>
            </div>
          </div>
        </div>
        <ShieldCheck className="absolute -right-12 -bottom-12 w-80 h-80 text-brand-500/5 group-hover:scale-110 transition-transform duration-1000" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-600/5 to-transparent pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {MOCK_ADVISORS.map((advisor) => (
          <motion.div 
            key={advisor.id}
            whileHover={{ y: -10 }}
            className="bg-white rounded-[40px] border border-slate-200/60 shadow-xl shadow-slate-200/40 overflow-hidden flex flex-col group"
          >
            <div className="p-10 flex-1">
              <div className="flex items-start gap-6 mb-8">
                <div className="relative">
                  <img 
                    src={advisor.image} 
                    alt={advisor.name} 
                    className="w-20 h-20 rounded-[24px] object-cover shadow-lg transition-transform group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-xl border-4 border-white flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-brand-600 transition-colors">{advisor.name}</h3>
                  <p className="text-brand-600 text-[10px] font-black uppercase tracking-widest mt-1">{advisor.specialization}</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-sm font-black text-slate-900">{advisor.rating}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">(120+ reviews)</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                {advisor.bio}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <AdvisorFeature icon={MessageSquare} label="Chat" />
                <AdvisorFeature icon={Video} label="Video Call" />
                <AdvisorFeature icon={Calendar} label="Available" />
                <AdvisorFeature icon={ShieldCheck} label="Certified" />
              </div>
            </div>
            <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex gap-4">
              <button className="flex-1 py-4 bg-white border border-slate-200 text-slate-900 text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all shadow-sm active:scale-[0.98]">
                Profile
              </button>
              <button className="flex-1 py-4 bg-brand-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-brand-700 transition-all shadow-xl shadow-brand-100 active:scale-[0.98]">
                Book
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AdvisorFeature({ icon: Icon, label }: { icon: any, label: string }) {
  return (
    <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-600 transition-colors">
      <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:border-brand-100 group-hover:bg-brand-50 transition-all">
        <Icon className="w-3 h-3 group-hover:text-brand-600 transition-colors" />
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </div>
  );
}
