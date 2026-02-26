import React from 'react';
import { User, Shield, Bell, Moon, Sun, CreditCard, Lock, Globe } from 'lucide-react';
import { motion } from 'motion/react';

export default function SettingsPage({ user }: { user: any }) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Settings</h2>
        <p className="text-slate-500">Manage your account preferences and security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-4">
          <nav className="space-y-1">
            {['Profile', 'Security', 'Notifications', 'Billing', 'Preferences'].map((item) => (
              <button
                key={item}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  item === 'Profile' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-600" />
              Profile Information
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                  <input readOnly value={user.email} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Role</label>
                  <input readOnly value={user.role} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none capitalize" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Display Name</label>
                <input placeholder="Enter your name" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none" />
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              Security & Privacy
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <div>
                  <p className="text-sm font-bold text-slate-800">Two-Factor Authentication</p>
                  <p className="text-xs text-slate-500">Add an extra layer of security to your account.</p>
                </div>
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">Enable</button>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <div>
                  <p className="text-sm font-bold text-slate-800">Data Encryption</p>
                  <p className="text-xs text-slate-500">Your financial data is encrypted with AES-256.</p>
                </div>
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-600" />
              Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Dark Mode</span>
                <button className="w-12 h-6 bg-slate-200 rounded-full relative transition-all">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Currency</span>
                <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold">
                  <option>USD ($)</option>
                  <option>INR (₹)</option>
                  <option>EUR (€)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
