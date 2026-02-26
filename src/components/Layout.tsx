import React from 'react';
import { 
  LayoutDashboard, 
  Receipt, 
  BrainCircuit, 
  Users, 
  CreditCard, 
  Settings, 
  LogOut,
  TrendingUp,
  Menu,
  X,
  FileText,
  Compass,
  Video
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: any;
  onLogout: () => void;
}

export default function Layout({ children, activeTab, setActiveTab, user, onLogout }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: Receipt },
    { id: 'planner', label: 'Planner', icon: Compass },
    { id: 'flowbot', label: 'AI Consultant', icon: BrainCircuit },
    { id: 'tax', label: 'Income Tax', icon: FileText },
    { id: 'insights', label: 'Future Insights', icon: TrendingUp },
    { id: 'video-advisor', label: 'Video Advisor', icon: Video },
    { id: 'advisors', label: 'Human Advisors', icon: Users },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 flex font-sans">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 100 }}
        className="bg-white border-r border-slate-200/60 flex flex-col sticky top-0 h-screen z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
      >
        <div className="p-8 flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-brand-200">
            <TrendingUp className="text-white w-6 h-6" />
          </div>
          {isSidebarOpen && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-display font-bold text-2xl text-slate-900 tracking-tight whitespace-nowrap"
            >
              Prosper
            </motion.span>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-1.5 mt-4 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group relative",
                activeTab === item.id 
                  ? "bg-brand-50 text-brand-700 font-semibold" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 shrink-0 transition-colors",
                activeTab === item.id ? "text-brand-600" : "text-slate-400 group-hover:text-slate-600"
              )} />
              {isSidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="whitespace-nowrap text-sm"
                >
                  {item.label}
                </motion.span>
              )}
              {activeTab === item.id && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-6 bg-brand-600 rounded-r-full"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 px-3 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm mb-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-slate-400" />
            </div>
            {isSidebarOpen && (
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold text-slate-900 truncate">{user?.email?.split('@')[0]}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{user?.role}</p>
              </div>
            )}
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all font-semibold text-sm"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
        
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-4 top-12 bg-white border border-slate-200 rounded-xl p-2 shadow-md hover:bg-slate-50 transition-all z-50"
        >
          {isSidebarOpen ? <X className="w-4 h-4 text-slate-400" /> : <Menu className="w-4 h-4 text-slate-400" />}
        </button>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-slate-50/30">
        <header className="h-24 glass border-b border-slate-200/60 flex items-center justify-between px-12 sticky top-0 z-40">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-brand-600 uppercase tracking-[0.2em] mb-1">Platform</span>
            <h1 className="text-2xl font-bold text-slate-900 capitalize tracking-tight">
              {activeTab.replace('-', ' ')}
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                {user?.subscription?.replace('_', ' ')}
              </span>
            </div>
            <button className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 hover:text-brand-600 hover:border-brand-200 transition-all shadow-sm">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>
        <div className="p-12 max-w-7xl mx-auto w-full">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
