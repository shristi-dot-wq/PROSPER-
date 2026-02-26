import React, { useState } from 'react';
import { Target, Compass, AlertTriangle, CheckCircle2, ArrowRight, Mic } from 'lucide-react';
import { motion } from 'motion/react';

const PLANNER_OPTIONS = [
  { id: 'education', label: 'Education', icon: '🎓', description: 'Tuition, books, and courses' },
  { id: 'investment', label: 'Investment', icon: '📈', description: 'Stocks, crypto, or real estate' },
  { id: 'savings', label: 'Savings', icon: '💰', description: 'Long-term wealth building' },
  { id: 'marketing', label: 'Marketing', icon: '📢', description: 'Business growth and reach' },
  { id: 'business', label: 'Business Expansion', icon: '🏢', description: 'New equipment or locations' },
  { id: 'emergency', label: 'Emergency Fund', icon: '🚨', description: 'Safety net for surprises' },
  { id: 'entertainment', label: 'Entertainment', icon: '🎬', description: 'Travel, movies, and fun' },
];

export default function PlannerPage({ user, transactions }: { user: any, transactions: any[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);

  const [isListening, setIsListening] = useState(false);

  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice recognition not supported in this browser.');
      return;
    }
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript.toLowerCase();
      const match = PLANNER_OPTIONS.find(o => text.includes(o.label.toLowerCase()));
      if (match) handleAnalyze(match.id);
    };
    recognition.start();
  };

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  const handleAnalyze = (id: string) => {
    setSelected(id);
    // Simulated AI Analysis
    setTimeout(() => {
      const isRisky = balance < 1000;
      setAnalysis({
        recommendation: isRisky 
          ? "We recommend delaying this spend. Your current liquidity is low." 
          : "This is a safe investment. Your savings rate supports this growth.",
        warning: isRisky ? "High Risk: Current balance below safety threshold." : null,
        limit: Math.max(0, balance * 0.2).toLocaleString(),
        score: isRisky ? 45 : 85
      });
    }, 800);
  };

  return (
    <div className="space-y-10 font-sans">
      <div className="flex items-center justify-between max-w-4xl">
        <div>
          <span className="section-label">AI Planner</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Spending Planner</h2>
          <p className="text-slate-500 mt-2 text-lg leading-relaxed max-w-2xl">"Where Do You Want to Spend Next?" - Let Prosper AI analyze your financial health before you commit.</p>
        </div>
        <button 
          onClick={startVoiceInput}
          className={`w-16 h-16 rounded-[24px] flex items-center justify-center transition-all shadow-xl ${isListening ? 'bg-rose-100 text-rose-600 animate-pulse shadow-rose-200' : 'bg-white border border-slate-200 text-slate-400 hover:text-brand-600 hover:border-brand-200 shadow-slate-100'}`}
        >
          <Mic className="w-7 h-7" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PLANNER_OPTIONS.map((option) => (
          <button
            key={option.id}
            onClick={() => handleAnalyze(option.id)}
            className={`p-8 rounded-[40px] border text-left transition-all group relative overflow-hidden ${
              selected === option.id 
                ? 'border-brand-500 bg-brand-50/50 ring-4 ring-brand-500/10' 
                : 'border-slate-200 bg-white hover:border-brand-200 hover:bg-slate-50/50'
            }`}
          >
            <div className="relative z-10">
              <span className="text-4xl mb-6 block group-hover:scale-110 transition-transform">{option.icon}</span>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">{option.label}</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{option.description}</p>
            </div>
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-brand-500/5 rounded-full blur-2xl transition-all ${selected === option.id ? 'scale-150 opacity-100' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'}`} />
          </button>
        ))}
      </div>

      {analysis && (
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200/60 rounded-[48px] p-12 shadow-2xl shadow-slate-200/40 relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-6 mb-12">
              <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center border transition-transform hover:scale-110 ${analysis.warning ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                {analysis.warning ? <AlertTriangle className="w-8 h-8" /> : <CheckCircle2 className="w-8 h-8" />}
              </div>
              <div>
                <span className="section-label">AI Verdict</span>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Analysis for {PLANNER_OPTIONS.find(o => o.id === selected)?.label}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-1000 ${analysis.score > 70 ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${analysis.score}%` }} />
                  </div>
                  <span className="text-xs font-black text-slate-900 uppercase tracking-widest">{analysis.score}/100</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Recommendation</p>
                  <p className="text-xl text-slate-700 leading-relaxed font-medium">{analysis.recommendation}</p>
                </div>
                {analysis.warning && (
                  <div className="p-6 bg-rose-50 border border-rose-100 rounded-[32px] flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-rose-900 font-black uppercase tracking-widest mb-1">Risk Warning</p>
                      <p className="text-sm text-rose-700 font-medium leading-relaxed">{analysis.warning}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 relative group overflow-hidden">
                <div className="relative z-10">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Suggested Spending Limit</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-slate-900 tracking-tighter">${analysis.limit}</span>
                    <span className="text-slate-400 font-bold">USD</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-4 font-medium leading-relaxed">Based on your 20% safe-spend liquidity rule and current cash flow projections.</p>
                  <button className="w-full mt-10 btn-brand py-5 text-lg shadow-brand-100 group-hover:scale-[1.02] transition-transform">
                    Create Budget Goal
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-brand-500/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
