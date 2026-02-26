import React from 'react';
import { Check, Sparkles, Zap, Building2, Crown } from 'lucide-react';
import { motion } from 'motion/react';
import { SUBSCRIPTION_PLANS } from '../constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function SubscriptionPage({ currentPlan }: { currentPlan: string }) {
  const icons: any = {
    free: Zap,
    premium: Sparkles,
    business_pro: Building2,
    elite: Crown
  };

  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Choose the Right Plan for Your Growth</h2>
        <p className="text-slate-500">
          Whether you're a student managing a budget or a business owner scaling operations, we have a plan designed for your financial success.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SUBSCRIPTION_PLANS.map((plan) => {
          const Icon = icons[plan.id];
          const isCurrent = currentPlan === plan.id;

          return (
            <motion.div
              key={plan.id}
              whileHover={{ y: -10 }}
              className={cn(
                "relative bg-white rounded-3xl border p-8 flex flex-col shadow-sm transition-all",
                isCurrent ? "border-emerald-500 ring-4 ring-emerald-500/10" : "border-slate-200"
              )}
            >
              {isCurrent && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                  Current Plan
                </div>
              )}
              
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6", plan.color)}>
                <Icon className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-slate-900">{plan.price.split('/')[0]}</span>
                <span className="text-slate-500 text-sm">{plan.price.includes('/') ? `/${plan.price.split('/')[1]}` : ''}</span>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-sm text-slate-600 leading-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                disabled={isCurrent}
                className={cn(
                  "w-full py-3 rounded-xl font-bold transition-all",
                  isCurrent 
                    ? "bg-slate-100 text-slate-400 cursor-default" 
                    : "bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-200"
                )}
              >
                {isCurrent ? 'Active' : 'Upgrade Now'}
              </button>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-slate-900 rounded-3xl p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-2">Need a Custom Enterprise Plan?</h3>
          <p className="text-slate-400 max-w-md">
            For large organizations and financial institutions, we offer tailored solutions with dedicated support and custom API access.
          </p>
        </div>
        <button className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-colors shrink-0">
          Contact Sales
        </button>
      </div>
    </div>
  );
}
