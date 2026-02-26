import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import FlowBot from './components/FlowBot';
import TransactionsPage from './pages/TransactionsPage';
import AdvisorPage from './pages/AdvisorPage';
import SubscriptionPage from './pages/SubscriptionPage';
import FutureInsights from './pages/FutureInsights';
import TaxReport from './pages/TaxReport';
import PlannerPage from './pages/PlannerPage';
import VideoAdvisor from './pages/VideoAdvisor';
import SettingsPage from './pages/SettingsPage';
import Home from './pages/Home';
import { User, Transaction, UserRole } from './types';
import { api } from './services/api';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, User as UserIcon, Briefcase, School } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [showRoleSelect, setShowRoleSelect] = useState(false);

  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  useEffect(() => {
    if (user) {
      loadTransactions();
    }
  }, [user]);

  const loadTransactions = async () => {
    if (!user) return;
    const data = await api.getTransactions(user.id);
    setTransactions(data);
  };

  const handleLogin = async (email: string, role: UserRole, age: number, businessData?: any) => {
    setIsAuthLoading(true);
    try {
      const userData = await api.login(email, role, age, businessData);
      setUser(userData);
      setActiveTab('transactions'); // Default to transactions as requested
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleAddTransaction = async (t: Omit<Transaction, 'id'>) => {
    await api.addTransaction(t);
    loadTransactions();
  };

  if (!user) {
    return (
      <AnimatePresence mode="wait">
        {showRoleSelect ? (
          <motion.div 
            key="role-select"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-slate-50 flex items-center justify-center p-6"
          >
            <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-slate-100 w-full max-w-2xl">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome to Prosper</h2>
              <p className="text-slate-500 mb-8">Choose your role and enter your details to get started.</p>
              
              <form onSubmit={(e: any) => {
                e.preventDefault();
                const email = e.target.email.value;
                const age = Number(e.target.age.value);
                const role = selectedRole || 'individual';
                const businessData = role === 'business' ? {
                  companyName: e.target.companyName.value,
                  employeeCount: Number(e.target.employeeCount.value),
                  govScheme: e.target.govScheme.value
                } : undefined;
                handleLogin(email, role as UserRole, age, businessData);
              }} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Email Address</label>
                    <input 
                      name="email" 
                      type="email" 
                      required 
                      placeholder="name@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Your Age</label>
                    <input 
                      name="age" 
                      type="number" 
                      required 
                      min="1"
                      placeholder="18"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-semibold text-slate-700">Select Your Role</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { id: 'student', label: 'Student', icon: GraduationCap },
                      { id: 'teacher', label: 'Teacher', icon: School },
                      { id: 'individual', label: 'Individual', icon: UserIcon },
                      { id: 'business', label: 'Business', icon: Briefcase },
                    ].map((role) => (
                      <button 
                        key={role.id} 
                        type="button"
                        onClick={() => setSelectedRole(role.id as UserRole)}
                        className={`p-4 rounded-2xl border text-center transition-all ${
                          selectedRole === role.id 
                            ? 'border-emerald-500 bg-emerald-50 ring-4 ring-emerald-500/10' 
                            : 'border-slate-200 bg-slate-50 hover:bg-white'
                        }`}
                      >
                        <role.icon className={`w-6 h-6 mx-auto mb-2 ${selectedRole === role.id ? 'text-emerald-600' : 'text-slate-400'}`} />
                        <span className={`text-xs font-bold ${selectedRole === role.id ? 'text-emerald-700' : 'text-slate-600'}`}>{role.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedRole === 'business' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-6 pt-4 border-t border-slate-100"
                  >
                    <h3 className="text-sm font-bold text-slate-800">Business Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Company Name</label>
                        <input name="companyName" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Employee Count</label>
                        <input name="employeeCount" type="number" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Government Scheme Registration</label>
                      <input name="govScheme" placeholder="e.g. MSME, Startup India" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none" />
                    </div>
                  </motion.div>
                )}

                <button 
                  type="submit"
                  disabled={isAuthLoading}
                  className="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 disabled:opacity-50"
                >
                  {isAuthLoading ? 'Creating Account...' : 'Continue to Dashboard'}
                </button>
                <button 
                  type="button"
                  onClick={() => setShowRoleSelect(false)}
                  className="w-full text-slate-400 text-sm font-medium hover:text-slate-600"
                >
                  Back to Home
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          <Home key="home" onStart={() => setShowRoleSelect(true)} />
        )}
      </AnimatePresence>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            user={user} 
            transactions={transactions} 
            onAddTransaction={() => setActiveTab('transactions')} 
          />
        );
      case 'transactions':
        return (
          <TransactionsPage 
            user={user} 
            transactions={transactions} 
            onAddTransaction={handleAddTransaction} 
          />
        );
      case 'planner':
        return <PlannerPage user={user} transactions={transactions} />;
      case 'flowbot':
        return <FlowBot user={user} transactions={transactions} />;
      case 'video-advisor':
        return <VideoAdvisor user={user} />;
      case 'insights':
        return <FutureInsights user={user} />;
      case 'tax':
        return <TaxReport user={user} transactions={transactions} />;
      case 'advisors':
        return <AdvisorPage />;
      case 'subscription':
        return <SubscriptionPage currentPlan={user.subscription} />;
      case 'settings':
        return <SettingsPage user={user} />;
      default:
        return null;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      user={user} 
      onLogout={() => setUser(null)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}
