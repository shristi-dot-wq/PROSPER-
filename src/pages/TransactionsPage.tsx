import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal,
  Trash2,
  Edit2,
  FileText,
  Upload,
  Mic,
  Calendar as CalendarIcon,
  Coins,
  BrainCircuit
} from 'lucide-react';
import { format } from 'date-fns';
import { Transaction, User } from '../types';
import { CATEGORIES } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { useDropzone } from 'react-dropzone';

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

interface TransactionsPageProps {
  user: User;
  transactions: Transaction[];
  onAddTransaction: (t: Omit<Transaction, 'id'>) => void;
}

export default function TransactionsPage({ user, transactions, onAddTransaction }: TransactionsPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

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
      const text = event.results[0][0].transcript;
      setSearchTerm(text);
    };
    recognition.start();
  };

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      // Create a fake transaction from the first file for demo purposes
      const file = acceptedFiles[0];
      if (file) {
        onAddTransaction({
          user_id: user.id,
          type: 'expense',
          amount: Math.floor(Math.random() * 100) + 10,
          category: 'Other',
          description: `Receipt: ${file.name}`,
          date: new Date().toISOString(),
          upi_id: 'UPI' + Math.floor(Math.random() * 1000000000000)
        });
        alert('Receipt uploaded and analyzed! A new transaction has been added.');
      }
    },
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'image/*': ['.png', '.jpg', '.jpeg']
    }
  });

  return (
    <div className="space-y-10 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div 
          {...getRootProps()} 
          className={cn(
            "lg:col-span-3 border-2 border-dashed rounded-[40px] p-12 text-center transition-all cursor-pointer group",
            isDragActive ? "border-brand-500 bg-brand-50" : "border-slate-200 hover:border-brand-400 hover:bg-slate-50/50"
          )}
        >
          <input {...getInputProps()} />
          <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-sm">
            <Upload className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Upload Receipts or Reports</h3>
          <p className="text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">Drag & drop your PDF, Excel, or Image files here for AI analysis and automatic entry</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search transactions, categories, or merchants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-[20px] pl-14 pr-14 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all shadow-sm"
          />
          <button 
            onClick={startVoiceInput}
            className={`absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-xl transition-all ${isListening ? 'bg-rose-100 text-rose-600 animate-pulse' : 'text-slate-400 hover:text-brand-600 hover:bg-brand-50'}`}
          >
            <Mic className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <select 
            value={filterType}
            onChange={(e: any) => setFilterType(e.target.value)}
            className="bg-white border border-slate-200 rounded-[20px] px-6 py-4 text-sm font-bold text-slate-600 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all shadow-sm appearance-none min-w-[140px]"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expenses</option>
          </select>
          <button className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-200 rounded-[20px] text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn-brand shadow-brand-100"
          >
            <Plus className="w-4 h-4" />
            Manual Entry
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-xl shadow-slate-200/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Transaction</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Category</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Date</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Amount</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
                        t.type === 'income' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
                        t.type === 'petty_cash' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
                      )}>
                        {t.type === 'income' ? <ArrowUpRight className="w-6 h-6" /> : 
                         t.type === 'petty_cash' ? <Coins className="w-6 h-6" /> : <ArrowDownRight className="w-6 h-6" />}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block group-hover:text-brand-600 transition-colors">{t.description}</span>
                        {t.upi_id && <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase mt-1 block">UPI: {t.upi_id}</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-4 py-1.5 bg-slate-100 text-slate-600 text-[10px] font-black rounded-full uppercase tracking-wider border border-slate-200">
                      {t.category}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-500">
                    {format(new Date(t.date), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-8 py-6">
                    <span className={cn(
                      "text-lg font-black tracking-tight",
                      t.type === 'income' ? 'text-emerald-600' : 'text-slate-900'
                    )}>
                      {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-full uppercase tracking-widest border border-emerald-100">
                      Completed
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-slate-900 hover:bg-white rounded-xl transition-all opacity-0 group-hover:opacity-100 shadow-sm border border-transparent hover:border-slate-100">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredTransactions.length === 0 && (
          <div className="py-32 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center mx-auto mb-6 border border-slate-100 shadow-sm">
              <FileText className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">No transactions found</h3>
            <p className="text-slate-500 mt-2 font-medium">Try adjusting your search or filters to find what you're looking for</p>
          </div>
        )}
      </div>

      {/* Add Transaction Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 40 }}
              className="relative bg-white rounded-[48px] shadow-2xl w-full max-w-xl overflow-hidden border border-white/20"
            >
              <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Manual Entry</h2>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Add a new transaction</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all shadow-sm">
                  <Plus className="w-6 h-6 rotate-45" />
                </button>
              </div>
              <form 
                onSubmit={(e: any) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  onAddTransaction({
                    user_id: user.id,
                    type: formData.get('type') as any,
                    amount: Number(formData.get('amount')),
                    category: formData.get('category') as string,
                    description: formData.get('description') as string,
                    date: formData.get('date') as string || new Date().toISOString(),
                    upi_id: formData.get('upi_id') as string || undefined,
                  });
                  setIsModalOpen(false);
                }}
                className="p-10 space-y-8"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Type</label>
                    <select name="type" className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 focus:bg-white outline-none transition-all appearance-none">
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                      <option value="petty_cash">Petty Cash</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Amount</label>
                    <div className="relative group">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-brand-600 transition-colors">$</span>
                      <input name="amount" type="number" step="0.01" required placeholder="0.00" className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-10 py-4 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 focus:bg-white outline-none transition-all" />
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">UPI Transaction ID (Optional)</label>
                  <input name="upi_id" type="text" placeholder="e.g. 123456789012" className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 focus:bg-white outline-none transition-all" />
                  <div className="flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 text-[10px] font-bold rounded-xl border border-brand-100">
                    <BrainCircuit className="w-3 h-3" />
                    FlowBot will analyze this ID to verify the merchant
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Category</label>
                    <select name="category" className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 focus:bg-white outline-none transition-all appearance-none">
                      {CATEGORIES.expense.map(c => <option key={c} value={c}>{c}</option>)}
                      {CATEGORIES.income.map(c => <option key={c} value={c}>{c}</option>)}
                      {CATEGORIES.petty_cash.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Date</label>
                    <input name="date" type="date" defaultValue={format(new Date(), 'yyyy-MM-dd')} className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 focus:bg-white outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Description</label>
                  <input name="description" type="text" required placeholder="What was this for?" className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 focus:bg-white outline-none transition-all" />
                </div>
                <button type="submit" className="w-full btn-brand py-5 text-lg shadow-brand-200 mt-4">
                  Save Transaction
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
