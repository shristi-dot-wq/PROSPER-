import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Target, 
  AlertCircle,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  BrainCircuit
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion } from 'motion/react';
import { format } from 'date-fns';
import { Transaction, User } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface DashboardProps {
  user: User;
  transactions: Transaction[];
  onAddTransaction: () => void;
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function Dashboard({ user, transactions, onAddTransaction }: DashboardProps) {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);
  
  const balance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) : 0;

  const categoryData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc: any[], t) => {
      const existing = acc.find(item => item.name === t.category);
      if (existing) {
        existing.value += t.amount;
      } else {
        acc.push({ name: t.category, value: t.amount });
      }
      return acc;
    }, []);

  const chartData = transactions
    .slice(0, 10)
    .reverse()
    .map(t => ({
      date: format(new Date(t.date), 'MMM dd'),
      amount: t.amount,
      type: t.type
    }));

  const healthScore = Math.min(100, Math.max(0, 50 + (Number(savingsRate) / 2)));

  return (
    <div className="space-y-10 font-sans">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Balance" 
          value={`$${balance.toLocaleString()}`} 
          icon={Wallet} 
          trend="+2.5%" 
          color="emerald"
        />
        <StatCard 
          title="Monthly Income" 
          value={`$${totalIncome.toLocaleString()}`} 
          icon={TrendingUp} 
          trend="+12%" 
          color="blue"
        />
        <StatCard 
          title="Monthly Expenses" 
          value={`$${totalExpenses.toLocaleString()}`} 
          icon={TrendingDown} 
          trend="-5%" 
          color="rose"
        />
        <StatCard 
          title="Health Score" 
          value={`${healthScore}%`} 
          icon={Target} 
          trend="Stable" 
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[40px] border border-slate-200/60 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="section-label">Performance</span>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Cash Flow Overview</h3>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-100">
              <Calendar className="w-4 h-4" />
              <span>Last 30 Days</span>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} 
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '20px', 
                    border: '1px solid #f1f5f9', 
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.05)',
                    padding: '12px 16px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#colorIncome)" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white p-10 rounded-[40px] border border-slate-200/60 shadow-sm">
          <div className="mb-10">
            <span className="section-label">Allocation</span>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Spending Breakdown</h3>
          </div>
          <div className="h-[220px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</span>
              <span className="text-xl font-black text-slate-900">${totalExpenses.toLocaleString()}</span>
            </div>
          </div>
          <div className="mt-10 space-y-4">
            {categoryData.slice(0, 4).map((item: any, index: number) => (
              <div key={item.name} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{item.name}</span>
                </div>
                <span className="text-xs font-black text-slate-900">${item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[40px] border border-slate-200/60 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="section-label">Activity</span>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Recent Transactions</h3>
            </div>
            <button 
              onClick={onAddTransaction}
              className="px-4 py-2 bg-slate-50 text-brand-600 text-xs font-bold rounded-xl hover:bg-brand-50 transition-all border border-slate-100"
            >
              View All
            </button>
          </div>
          <div className="space-y-2">
            {transactions.slice(0, 5).map((t) => (
              <div key={t.id} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-3xl transition-all group border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
                    t.type === 'income' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-rose-50 text-rose-600 border border-rose-100"
                  )}>
                    {t.type === 'income' ? <ArrowUpRight className="w-6 h-6" /> : <ArrowDownRight className="w-6 h-6" />}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{t.description}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{t.category} • {format(new Date(t.date), 'MMM dd')}</p>
                  </div>
                </div>
                <p className={cn(
                  "text-lg font-black tracking-tight",
                  t.type === 'income' ? "text-emerald-600" : "text-slate-900"
                )}>
                  {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 p-10 rounded-[48px] text-white shadow-2xl shadow-slate-200 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-110 transition-transform">
                  <BrainCircuit className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold tracking-tight">FlowBot Insight</h3>
              </div>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                "Your savings rate is up by <span className="text-brand-400 font-bold">5%</span> this month! At this rate, you'll reach your 'Emergency Fund' goal 2 months earlier than predicted."
              </p>
              <button className="px-8 py-4 bg-white text-slate-900 text-sm font-bold rounded-2xl hover:bg-slate-100 transition-all shadow-xl shadow-white/5 active:scale-[0.98]">
                Talk to FlowBot
              </button>
            </div>
            <BrainCircuit className="absolute -right-8 -bottom-8 w-48 h-48 text-brand-500/10 group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-600/5 to-transparent pointer-events-none" />
          </div>

          <div className="bg-white p-10 rounded-[40px] border border-slate-200/60 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100">
                <AlertCircle className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Smart Alerts</h3>
            </div>
            <div className="space-y-4">
              <AlertItem 
                title="Potential Overspending" 
                message="You've spent 85% of your 'Entertainment' budget for February." 
                color="amber"
              />
              <AlertItem 
                title="Subscription Renewal" 
                message="Your 'Business Pro' plan renews in 3 days." 
                color="blue"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AlertItem({ title, message, color }: { title: string, message: string, color: 'amber' | 'blue' }) {
  const colors = {
    amber: "bg-amber-50/50 border-amber-100 text-amber-800",
    blue: "bg-blue-50/50 border-blue-100 text-blue-800"
  };

  return (
    <div className={cn("p-5 rounded-3xl border transition-all hover:shadow-md", colors[color])}>
      <p className="text-sm font-bold mb-1">{title}</p>
      <p className="text-xs opacity-80 leading-relaxed font-medium">{message}</p>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, trend, color }: any) {
  const colors: any = {
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-8 rounded-[32px] border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all group"
    >
      <div className="flex items-center justify-between mb-6">
        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center border transition-transform group-hover:scale-110", colors[color])}>
          <Icon className="w-7 h-7" />
        </div>
        <div className={cn(
          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border",
          trend.startsWith('+') ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-slate-50 text-slate-600 border-slate-100"
        )}>
          {trend}
        </div>
      </div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">{title}</p>
      <h4 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h4>
    </motion.div>
  );
}

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
