import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { BrainCircuit, TrendingUp, AlertTriangle, Lightbulb, Upload, FileText, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useDropzone } from 'react-dropzone';

const FORECAST_DATA = [
  { year: '2025', balance: 5000, predicted: 5000 },
  { year: '2026', balance: null, predicted: 7500 },
  { year: '2027', balance: null, predicted: 12000 },
  { year: '2028', balance: null, predicted: 18000 },
  { year: '2029', balance: null, predicted: 25000 },
  { year: '2030', balance: null, predicted: 35000 },
];

export default function FutureInsights({ user }: { user: any }) {
  const [hasUploadedReport, setHasUploadedReport] = useState(false);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setHasUploadedReport(true);
      alert(`Successfully uploaded ${acceptedFiles.length} historical reports. AI is re-analyzing your future path using both current dashboard data and historical trends...`);
    }
  });

  return (
    <div className="space-y-10 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div 
          {...getRootProps()} 
          className={`lg:col-span-3 border-2 border-dashed rounded-[40px] p-12 text-center transition-all cursor-pointer group ${
            isDragActive ? 'border-brand-500 bg-brand-50' : 'border-slate-200 bg-white hover:border-brand-400 hover:bg-slate-50/50'
          }`}
        >
          <input {...getInputProps()} />
          <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-sm">
            <Upload className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Upload Historical Financial Data</h3>
          <p className="text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">Upload previous tax returns, bank statements, or reports to gain deeper insights into your financial trajectory.</p>
          {hasUploadedReport && (
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-full uppercase tracking-widest border border-emerald-100">
              <CheckCircle2 className="w-3 h-3" />
              Historical Data Integrated
            </div>
          )}
        </div>
      </div>

      <div className="bg-slate-900 rounded-[48px] p-12 text-white shadow-2xl shadow-slate-200 relative overflow-hidden group">
        <div className="relative z-10">
          <div className="flex items-center gap-6 mb-10">
            <div className="w-16 h-16 bg-brand-500 rounded-[24px] flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-110 transition-transform">
              <BrainCircuit className="w-8 h-8 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-black text-brand-400 uppercase tracking-[0.2em] mb-1 block">AI Forecast</span>
              <h2 className="text-3xl font-black tracking-tight">5-Year Wealth Projection</h2>
              <p className="text-slate-400 mt-1 font-medium">
                {hasUploadedReport 
                  ? "Combined Analysis: Dashboard Data + Historical Reports" 
                  : "Predicting your long-term financial path based on current dashboard trends."}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProjectionCard 
              label="Predicted Net Worth (2030)" 
              value="$35,000.00" 
              trend="+600% from current"
              trendIcon={TrendingUp}
            />
            <ProjectionCard 
              label="Long-term Goal Progress" 
              value="42%" 
              trend="On track for Retirement 2045"
            />
            <ProjectionCard 
              label="Risk Assessment" 
              value="Stable" 
              trend="Consistent growth projected"
            />
          </div>
        </div>
        <BrainCircuit className="absolute -right-12 -bottom-12 w-64 h-64 text-brand-500/5 group-hover:scale-110 transition-transform duration-1000" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-600/5 to-transparent pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-10 rounded-[40px] border border-slate-200/60 shadow-sm">
          <div className="mb-10">
            <span className="section-label">Trajectory</span>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Wealth Forecast (Next 5 Years)</h3>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={FORECAST_DATA}>
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
                  contentStyle={{ 
                    borderRadius: '20px', 
                    border: '1px solid #f1f5f9', 
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.05)',
                    padding: '12px 16px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#10b981" 
                  strokeWidth={4} 
                  dot={{r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff'}} 
                  activeDot={{r: 8, strokeWidth: 0}}
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#10b981" 
                  strokeWidth={2} 
                  strokeDasharray="8 8" 
                  dot={false} 
                  opacity={0.5}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-10 rounded-[40px] border border-slate-200/60 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100">
                <Lightbulb className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">AI Recommendations</h3>
            </div>
            <div className="space-y-4">
              <InsightItem 
                title="Optimize Subscriptions" 
                message="You have 3 streaming services with low usage. Cancelling 2 could save you $340/year." 
                color="slate"
              />
              <InsightItem 
                title="Investment Opportunity" 
                message="Your cash balance is $2k above your emergency fund. Consider moving this to a high-yield index fund." 
                color="slate"
              />
            </div>
          </div>

          <div className="bg-rose-50/50 p-8 rounded-[32px] border border-rose-100 flex items-start gap-4 transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-rose-600" />
            </div>
            <div>
              <h4 className="text-sm font-black text-rose-900 uppercase tracking-widest mb-1">Potential Risks</h4>
              <p className="text-sm text-rose-700 leading-relaxed font-medium">
                "If your expenses continue to grow at the current 8% monthly rate, your savings will be depleted by December 2026. We recommend a 10% reduction in non-essential spending."
              </p>
            </div>
          </div>

          <div className="bg-brand-50/50 p-8 rounded-[32px] border border-brand-100 flex items-start gap-4 transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-brand-100 rounded-2xl flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6 text-brand-600" />
            </div>
            <div>
              <h4 className="text-sm font-black text-brand-900 uppercase tracking-widest mb-1">Recurring Spending Analysis</h4>
              <p className="text-sm text-brand-700 leading-relaxed font-medium">
                FlowBot detected 3 similar UPI transactions for "Cloud Services". We predict a recurring expense of $45.00 on the 15th of every month.
              </p>
              <div className="mt-4 flex gap-2">
                <span className="px-3 py-1 bg-white rounded-full text-[10px] font-black text-brand-600 border border-brand-100 uppercase tracking-widest">Subscription Alert</span>
                <span className="px-3 py-1 bg-white rounded-full text-[10px] font-black text-brand-600 border border-brand-100 uppercase tracking-widest">Auto-Budgeted</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {user.role === 'business' && (
        <div className="bg-white p-12 rounded-[48px] border border-slate-200/60 shadow-xl shadow-slate-200/40">
          <div className="mb-10">
            <span className="section-label">Compliance</span>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Tax Estimation & Compliance</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Estimated Tax Liability (FY 2025-26)</p>
              <div className="flex items-baseline gap-3 mb-10">
                <span className="text-5xl font-black text-slate-900 tracking-tighter">$4,250.00</span>
                <span className="text-slate-400 font-bold">USD</span>
              </div>
              <div className="space-y-4">
                <TaxRow label="Federal Tax (21%)" value="$3,150.00" />
                <TaxRow label="State Tax (7%)" value="$1,100.00" />
                <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-900">Total Due</span>
                  <span className="text-2xl font-black text-brand-600">$4,250.00</span>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 relative group overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-lg font-bold text-slate-900 tracking-tight mb-8">Compliance Settings</h4>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Accounting Standard</span>
                    <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest shadow-sm outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all">
                      <option>GAAP</option>
                      <option>IFRS</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Fiscal Year End</span>
                    <span className="text-xs font-black text-slate-900 uppercase tracking-widest bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">December 31</span>
                  </div>
                  <button className="w-full mt-6 btn-brand py-5 text-lg shadow-brand-100 group-hover:scale-[1.02] transition-transform">
                    <FileText className="w-5 h-5" />
                    Generate Tax Report (PDF)
                  </button>
                </div>
              </div>
              <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-brand-500/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectionCard({ label, value, trend, trendIcon: Icon }: any) {
  return (
    <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[32px] border border-white/10 transition-all hover:bg-white/10 group">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 group-hover:text-brand-400 transition-colors">{label}</p>
      <p className="text-3xl font-black tracking-tight mb-2">{value}</p>
      <p className="text-xs text-brand-400 font-bold flex items-center gap-1.5">
        {Icon && <Icon className="w-4 h-4" />}
        {trend}
      </p>
    </div>
  );
}

function InsightItem({ title, message, color }: any) {
  return (
    <div className="p-6 bg-slate-50/50 rounded-[24px] border border-slate-100 transition-all hover:shadow-md hover:bg-white group">
      <p className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1 group-hover:text-brand-600 transition-colors">{title}</p>
      <p className="text-xs text-slate-500 leading-relaxed font-medium">{message}</p>
    </div>
  );
}

function TaxRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">{label}</span>
      <span className="text-sm font-black text-slate-900">{value}</span>
    </div>
  );
}
