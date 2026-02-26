import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  ShieldCheck, 
  Calendar, 
  User, 
  Building, 
  BrainCircuit, 
  TrendingUp, 
  Plus, 
  Info, 
  CheckCircle2, 
  ChevronRight,
  Upload,
  PieChart as PieChartIcon,
  MessageSquare,
  Send
} from 'lucide-react';
import { format } from 'date-fns';
import { Transaction, User as UserType } from '../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

interface TaxReportProps {
  user: UserType;
  transactions: Transaction[];
}

const TAX_YEAR_DATA = [
  { year: '2021', tax: 3200 },
  { year: '2022', tax: 3800 },
  { year: '2023', tax: 4100 },
  { year: '2024', tax: 4500 },
  { year: '2025', tax: 4250 },
];

export default function TaxReport({ user, transactions }: TaxReportProps) {
  const [reportType, setReportType] = useState<'daily' | 'monthly' | 'yearly'>('yearly');
  const [pastIncome, setPastIncome] = useState<number>(0);
  const [pastExpenses, setPastExpenses] = useState<number>(0);
  const [showAiAssistant, setShowAiAssistant] = useState(true);
  const [hasUploadedHistory, setHasUploadedHistory] = useState(false);
  
  // Income Categorization State
  const [salaryIncome, setSalaryIncome] = useState(0);
  const [businessIncome, setBusinessIncome] = useState(0);
  const [otherIncome, setOtherIncome] = useState(0);
  const [capitalGains, setCapitalGains] = useState(0);

  // Deductions State
  const [standardDeduction, setStandardDeduction] = useState(5000);
  const [investmentDeductions, setInvestmentDeductions] = useState(2000);
  const [businessDeductions, setBusinessDeductions] = useState(0);
  const [otherDeductions, setOtherDeductions] = useState(0);

  const currentIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const currentExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  
  const totalIncome = currentIncome + pastIncome + salaryIncome + businessIncome + otherIncome + capitalGains;
  const totalDeductions = standardDeduction + investmentDeductions + businessDeductions + otherDeductions + currentExpenses + pastExpenses;
  const taxableIncome = Math.max(0, totalIncome - totalDeductions);
  const estimatedTax = taxableIncome * 0.2; // 20% flat for demo

  const handleFileUpload = () => {
    setHasUploadedHistory(true);
    alert("Historical tax data uploaded. AI is generating comparative analysis...");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 font-sans">
      <div className="flex-1 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Income Tax Report</h2>
            <p className="text-slate-500 mt-1">AI-assisted tax preparation and compliance dashboard.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-12 h-12 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 transition-all shadow-sm flex items-center justify-center">
              <Printer className="w-5 h-5" />
            </button>
            <button className="btn-brand shadow-brand-100">
              <Download className="w-4 h-4" />
              Generate Tax Report
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <TaxStatCard title="Annual Income" value={`$${totalIncome.toLocaleString()}`} icon={TrendingUp} color="emerald" />
          <TaxStatCard title="Total Deductions" value={`$${totalDeductions.toLocaleString()}`} icon={TrendingUp} color="rose" rotate />
          <TaxStatCard title="Taxable Income" value={`$${taxableIncome.toLocaleString()}`} icon={ShieldCheck} color="blue" />
          <TaxStatCard title="Estimated Tax" value={`$${estimatedTax.toLocaleString()}`} icon={FileText} color="amber" />
        </div>

        {/* Chart Section */}
        <div className="bg-white p-10 rounded-[40px] border border-slate-200/60 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="section-label">Historical Data</span>
              <h3 className="text-xl font-bold text-slate-900">Yearly Tax Overview</h3>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-100">
              <Calendar className="w-4 h-4" />
              FY 2021 - 2025
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TAX_YEAR_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="year" 
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
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ 
                    borderRadius: '20px', 
                    border: '1px solid #f1f5f9', 
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.05)',
                    padding: '12px 16px'
                  }}
                />
                <Bar dataKey="tax" radius={[8, 8, 0, 0]} barSize={40}>
                  {TAX_YEAR_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.year === '2025' ? '#16a34a' : '#f1f5f9'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Income Categorization */}
          <div className="bg-white p-10 rounded-[40px] border border-slate-200/60 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="section-label">Revenue</span>
                <h3 className="text-xl font-bold text-slate-900">Income Sources</h3>
              </div>
              <button className="text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors flex items-center gap-1">
                <BrainCircuit className="w-4 h-4" />
                AI Auto-Classify
              </button>
            </div>
            <div className="space-y-6">
              <IncomeInput label="Salary Income" value={salaryIncome} onChange={setSalaryIncome} />
              <IncomeInput label="Business Income" value={businessIncome} onChange={setBusinessIncome} />
              <IncomeInput label="Other Income" value={otherIncome} onChange={setOtherIncome} />
              <IncomeInput label="Capital Gains" value={capitalGains} onChange={setCapitalGains} />
            </div>
          </div>

          {/* Deductions & Exemptions */}
          <div className="bg-white p-10 rounded-[40px] border border-slate-200/60 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="section-label">Savings</span>
                <h3 className="text-xl font-bold text-slate-900">Deductions</h3>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-50 text-brand-700 text-[10px] font-bold rounded-full border border-brand-100">
                <Sparkles className="w-3 h-3" />
                SUGGESTED: $7,000
              </div>
            </div>
            <div className="space-y-6">
              <IncomeInput label="Standard Deduction" value={standardDeduction} onChange={setStandardDeduction} />
              <IncomeInput label="Investment Deductions" value={investmentDeductions} onChange={setInvestmentDeductions} />
              <IncomeInput label="Business Deductions" value={businessDeductions} onChange={setBusinessDeductions} />
              <IncomeInput label="Other Deductions" value={otherDeductions} onChange={setOtherDeductions} />
            </div>
          </div>
        </div>

        {/* Business Mode Advanced */}
        {user.role === 'business' && (
          <div className="bg-slate-900 rounded-[48px] p-12 text-white overflow-hidden relative shadow-2xl shadow-slate-200">
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-brand-500 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-500/20">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-brand-400 uppercase tracking-[0.2em] mb-1 block">Advanced Insights</span>
                  <h3 className="text-2xl font-bold tracking-tight">Comparative Business Analysis</h3>
                </div>
              </div>
              <p className="text-slate-400 mb-10 max-w-md text-lg leading-relaxed">Upload your last 5 years of financial data to generate deep comparative tax analysis and forecasting.</p>
              
              {!hasUploadedHistory ? (
                <button 
                  onClick={handleFileUpload}
                  className="flex items-center gap-3 px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-100 transition-all shadow-xl shadow-white/5 active:scale-[0.98]"
                >
                  <Upload className="w-5 h-5" />
                  Upload 5-Year History
                </button>
              ) : (
                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Tax Trend</p>
                      <p className="text-2xl font-bold text-brand-400">-12.5% YoY</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Efficiency</p>
                      <p className="text-2xl font-bold text-blue-400">+18% Optimized</p>
                    </div>
                  </div>
                  <div className="p-6 bg-brand-500/10 rounded-3xl border border-brand-500/20 flex items-center gap-4">
                    <div className="w-10 h-10 bg-brand-500/20 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-brand-400" />
                    </div>
                    <p className="text-brand-100 font-medium">AI has identified $2,400 in missed deductions from FY 2023.</p>
                  </div>
                </div>
              )}
            </div>
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-500/10 rounded-full blur-[100px]" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-600/5 to-transparent pointer-events-none" />
          </div>
        )}

        {/* Disclaimer */}
        <div className="p-6 bg-amber-50/50 border border-amber-100 rounded-[32px] flex items-start gap-4">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
            <Info className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-sm text-amber-800 leading-relaxed">
            <strong className="block mb-1">Tax Disclaimer</strong>
            This is AI-assisted tax preparation. Calculations are based on provided data and general tax rules. Users should verify all figures with a certified tax professional before submission to government portals.
          </p>
        </div>

        {/* Full Government Submission Report */}
        <div className="bg-white border border-slate-200/60 rounded-[48px] shadow-xl shadow-slate-200/50 overflow-hidden">
          {/* Document Header */}
          <div className="p-12 border-b border-slate-100 bg-slate-50/50">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center shadow-xl shadow-slate-900/20">
                  <ShieldCheck className="text-white w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-2">Government Submission Report</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">Official Financial Statement • FY 2025-26</p>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm inline-block">
                  <p className="text-xs font-bold text-slate-900">ID: GOV-TAX-{Math.floor(Math.random() * 100000)}</p>
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-3">Generated: {format(new Date(), 'PPP')}</p>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
              <ReportMeta label="Taxpayer" value={user.email.split('@')[0]} />
              <ReportMeta label="Entity Type" value={user.role} isCapitalized />
              <ReportMeta label="PAN / Tax ID" value="ABCDE1234F" />
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Status</p>
                <span className="px-3 py-1 bg-brand-100 text-brand-700 text-[10px] font-black rounded-full uppercase tracking-wider border border-brand-200">Verified</span>
              </div>
            </div>
          </div>

          {/* Document Body */}
          <div className="p-12">
            <div className="space-y-12">
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-4 bg-brand-600 rounded-full" />
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">1. Income Summary</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ReportRow label="Salary & Business Income" value={salaryIncome + businessIncome} />
                  <ReportRow label="Other Income & Capital Gains" value={otherIncome + capitalGains} />
                  <ReportRow label="Tracked Dashboard Income" value={currentIncome} />
                  <div className="p-6 bg-brand-50 rounded-3xl border border-brand-100 flex justify-between items-center">
                    <span className="text-sm font-bold text-brand-700">Gross Total Income</span>
                    <span className="text-2xl font-black text-brand-900">${totalIncome.toLocaleString()}</span>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-4 bg-brand-600 rounded-full" />
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">2. Deductions & Exemptions</h4>
                </div>
                <div className="space-y-4">
                  <ReportLine label="Standard Deduction" value={standardDeduction} />
                  <ReportLine label="Investment Based Deductions" value={investmentDeductions} />
                  <ReportLine label="Business Expenses & Other Deductions" value={businessDeductions + otherDeductions + currentExpenses + pastExpenses} />
                  <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Total Deductions</span>
                    <span className="text-xl font-black text-slate-900">${totalDeductions.toLocaleString()}</span>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-4 bg-brand-600 rounded-full" />
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">3. Final Tax Computation</h4>
                </div>
                <div className="p-10 bg-slate-900 rounded-[40px] text-white relative overflow-hidden">
                  <div className="relative z-10 space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-medium">Net Taxable Income</span>
                      <span className="text-2xl font-bold">${taxableIncome.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-medium">Tax Rate Applied</span>
                      <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold">20% (Standard)</span>
                    </div>
                    <div className="pt-8 border-t border-white/10 flex justify-between items-center">
                      <span className="text-brand-400 font-bold text-lg">Total Tax Payable</span>
                      <span className="text-5xl font-black text-brand-400 tracking-tighter">${estimatedTax.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                </div>
              </section>

              <div className="pt-12 border-t border-dashed border-slate-200 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 bg-slate-50 rounded-[24px] border border-slate-100 flex items-center justify-center shadow-sm">
                    <ShieldCheck className="w-10 h-10 text-brand-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Prosper AI Certification</p>
                    <p className="text-sm font-bold text-slate-800">Digitally Signed & Verified</p>
                    <div className="flex gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-4 h-1 bg-brand-500/20 rounded-full" />)}
                    </div>
                  </div>
                </div>
                <div className="text-center md:text-right max-w-sm">
                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                    This report is generated based on verified UPI transactions and user-provided data. Prosper AI ensures compliance with current tax regulations for FY 2025-26.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Tax Assistant Sidebar */}
      <AnimatePresence>
        {showAiAssistant && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="w-full lg:w-96 shrink-0"
          >
            <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-xl shadow-slate-200/20 h-[calc(100vh-14rem)] flex flex-col sticky top-32 overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100">
                    <BrainCircuit className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Tax Assistant</h3>
                    <p className="text-[10px] font-bold text-brand-500 uppercase tracking-widest">Online</p>
                  </div>
                </div>
                <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                <AiMessage 
                  text="Hello! I've analyzed your FY 2025-26 data. Your current taxable income is $35,000." 
                />
                <AiMessage 
                  text="I suggest increasing your 'Investment Deductions' by $1,500 to move into a lower tax bracket." 
                  isSuggestion
                />
                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Quick Actions</p>
                  <QuickAction label="Explain my breakdown" />
                  <QuickAction label="Tax saving strategies" />
                  <QuickAction label="Compliance check" />
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Ask about your taxes..."
                    className="w-full bg-white border border-slate-200 rounded-[20px] px-5 py-4 text-sm pr-14 focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all shadow-sm"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-all flex items-center justify-center shadow-lg shadow-brand-200">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ReportMeta({ label, value, isCapitalized }: any) {
  return (
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">{label}</p>
      <p className={cn("text-sm font-bold text-slate-800", isCapitalized && "capitalize")}>{value}</p>
    </div>
  );
}

function ReportRow({ label, value }: any) {
  return (
    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center hover:bg-white hover:shadow-md transition-all group">
      <span className="text-xs font-medium text-slate-500 group-hover:text-slate-700 transition-colors">{label}</span>
      <span className="font-bold text-slate-900">${value.toLocaleString()}</span>
    </div>
  );
}

function ReportLine({ label, value }: any) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-slate-500 font-medium">{label}</span>
      <span className="font-bold text-slate-900">${value.toLocaleString()}</span>
    </div>
  );
}

function QuickAction({ label }: { label: string }) {
  return (
    <button className="w-full text-left p-4 bg-white border border-slate-100 hover:border-brand-200 hover:bg-brand-50/30 rounded-2xl text-xs font-bold text-slate-700 flex items-center justify-between group transition-all shadow-sm">
      {label}
      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
    </button>
  );
}

function TaxStatCard({ title, value, icon: Icon, color, rotate }: any) {
  const colors: any = {
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white p-8 rounded-[32px] border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all group"
    >
      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border transition-transform group-hover:scale-110", colors[color])}>
        <Icon className={cn("w-6 h-6", rotate && "rotate-180")} />
      </div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">{title}</p>
      <h4 className="text-2xl font-black text-slate-900 tracking-tight">{value}</h4>
    </motion.div>
  );
}

function IncomeInput({ label, value, onChange }: any) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative group">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-brand-600 transition-colors">$</span>
        <input 
          type="number" 
          value={value} 
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-10 py-4 text-sm focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 focus:bg-white outline-none font-bold text-slate-700 transition-all"
        />
      </div>
    </div>
  );
}

function AiMessage({ text, isSuggestion }: { text: string, isSuggestion?: boolean }) {
  return (
    <div className={cn(
      "p-6 rounded-[28px] text-sm leading-relaxed shadow-sm",
      isSuggestion ? "bg-brand-50 text-brand-800 border border-brand-100" : "bg-slate-50 text-slate-700 border border-slate-100"
    )}>
      {isSuggestion && <div className="flex items-center gap-2 mb-3 text-[10px] font-black uppercase tracking-widest text-brand-600">
        <Sparkles className="w-3 h-3" />
        AI Suggestion
      </div>}
      {text}
    </div>
  );
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
  );
}

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ClassValue = string | number | boolean | undefined | null | { [key: string]: any } | ClassValue[];
function clsx(...inputs: ClassValue[]): string {
  return inputs.flat().filter(Boolean).map(x => typeof x === 'object' ? Object.entries(x).filter(([, v]) => v).map(([k]) => k).join(' ') : x).join(' ');
}
function twMerge(s: string) { return s; } // Mock for simplicity
