import React from 'react';
import { TrendingUp, Shield, Zap, Globe, ArrowRight, Play, Receipt, BrainCircuit, Check, X, Calendar, FileText, Sparkles, Users, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function FeatureCard({ icon: Icon, title, desc }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 bg-white rounded-[32px] border border-slate-100 card-shadow transition-all group"
    >
      <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function SolutionItem({ title, desc }: any) {
  return (
    <div className="flex gap-5 p-6 rounded-3xl hover:bg-slate-50 transition-colors">
      <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center shrink-0">
        <Zap className="w-5 h-5 fill-brand-600" />
      </div>
      <div>
        <h4 className="text-lg font-bold text-slate-900 mb-1">{title}</h4>
        <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default function Home({ onStart }: { onStart: () => void }) {
  const [showDemo, setShowDemo] = React.useState(false);
  return (
    <div className="min-h-screen bg-white overflow-hidden font-sans">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between relative z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-200">
            <TrendingUp className="text-white w-6 h-6" />
          </div>
          <span className="font-display font-bold text-2xl text-slate-900 tracking-tight">Prosper</span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-sm font-semibold text-slate-500">
          <a href="#features" className="hover:text-brand-600 transition-colors">Features</a>
          <a href="#solutions" className="hover:text-brand-600 transition-colors">Solutions</a>
          <a href="#pricing" className="hover:text-brand-600 transition-colors">Pricing</a>
        </div>
        <button 
          onClick={onStart}
          className="btn-primary"
        >
          Get Started
        </button>
      </nav>

      {/* Demo Modal */}
      <AnimatePresence>
        {showDemo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/95 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              className="bg-white rounded-[48px] w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[85vh]"
            >
              <div className="md:w-3/5 bg-slate-900 relative group overflow-hidden">
                <video 
                  src="https://www.w3schools.com/html/mov_bbb.mp4" 
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                <button 
                  onClick={() => setShowDemo(false)}
                  className="absolute top-8 left-8 p-3 glass rounded-full text-white hover:bg-white hover:text-slate-900 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="md:w-2/5 p-12 overflow-y-auto bg-slate-50/50">
                <div className="mb-10">
                  <span className="section-label">Interactive Tour</span>
                  <h2 className="text-3xl font-bold text-slate-900">Platform Demo</h2>
                </div>
                
                <div className="space-y-10">
                  <DemoStep 
                    icon={Receipt} 
                    title="Transaction Entry" 
                    desc="Easily log expenses by typing them in manually or simply uploading an image of your receipt. Our AI extracts the data instantly." 
                  />
                  <DemoStep 
                    icon={Calendar} 
                    title="Financial Planner" 
                    desc="Set budgets and financial goals. The planner helps you stay on track by comparing your actual spending against your targets." 
                  />
                  <DemoStep 
                    icon={TrendingUp} 
                    title="Dashboards & Results" 
                    desc="Visualize your financial health with real-time charts. See exactly where your money goes and how your net worth is growing." 
                  />
                  <DemoStep 
                    icon={BrainCircuit} 
                    title="5-Year Future Insights" 
                    desc="Go beyond the present. Our AI forecasts your financial trajectory for the next 5 years, helping you plan for long-term wealth." 
                  />
                  <DemoStep 
                    icon={Play} 
                    title="Video Advisor" 
                    desc="Get personalized advice through our AI Video Advisor. A life-like avatar speaks directly to you, providing expert financial guidance." 
                  />
                  <DemoStep 
                    icon={FileText} 
                    title="Income Tax Report" 
                    desc="Convert raw transaction data into structured, submission-ready tax reports with AI-powered deduction suggestions." 
                  />
                </div>
                
                <button 
                  onClick={onStart}
                  className="btn-brand w-full mt-12 py-4"
                >
                  Try it yourself
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overview Section */}
      <section className="py-24 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] bg-slate-100 rounded-[48px] overflow-hidden shadow-2xl relative group">
              <img src="https://picsum.photos/seed/prosper-overview/1000/1250" alt="Prosper Overview" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-brand-600/10 mix-blend-multiply group-hover:opacity-0 transition-opacity" />
            </div>
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="absolute -bottom-10 -right-10 glass p-10 rounded-[32px] shadow-2xl max-w-xs border-white/40"
            >
              <p className="text-brand-600 font-display font-black text-5xl mb-3">99.9%</p>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">Accuracy in AI financial forecasting and expense categorization.</p>
            </motion.div>
          </div>
          <div>
            <span className="section-label">The Ecosystem</span>
            <h2 className="text-5xl font-bold text-slate-900 mb-8 leading-tight">A New Standard for <br/><span className="text-brand-600 italic">Financial Intelligence.</span></h2>
            <p className="text-xl text-slate-500 leading-relaxed mb-10">
              Prosper is more than just a tracking tool. It's a complete financial ecosystem built on the principles of transparency, growth, and security. We combine cutting-edge AI with human intuition to provide a financial experience that adapts to your life.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { text: 'End-to-end encryption', icon: Shield },
                { text: 'Real-time UPI verification', icon: Zap },
                { text: 'Certified human advisors', icon: Users },
                { text: 'Multi-role custom dashboards', icon: TrendingUp }
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <item.icon className="w-5 h-5 text-brand-600" />
                  </div>
                  <span className="text-slate-700 font-semibold text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Co-founders Section */}
      <section className="py-32 px-6 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-xl">
              <span className="section-label">The Visionaries</span>
              <h2 className="text-5xl font-bold text-slate-900 mb-6">Meet Our Co-founders</h2>
              <p className="text-xl text-slate-500">The minds behind Prosper's mission to democratize financial intelligence.</p>
            </div>
            <div className="flex gap-4">
              <div className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white hover:text-brand-600 transition-all cursor-pointer">
                <ArrowRight className="w-6 h-6 rotate-180" />
              </div>
              <div className="w-14 h-14 rounded-full bg-brand-600 flex items-center justify-center text-white shadow-lg shadow-brand-200 cursor-pointer">
                <ArrowRight className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { name: 'Yogita', role: 'Chief Executive Officer', image: 'https://picsum.photos/seed/yogita/600/800' },
              { name: 'Shristi', role: 'Chief Technology Officer', image: 'https://picsum.photos/seed/shristi/600/800' },
              { name: 'Nidhi', role: 'Chief Product Officer', image: 'https://picsum.photos/seed/nidhi/600/800' },
            ].map((founder) => (
              <motion.div 
                key={founder.name} 
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="aspect-[3/4] rounded-[40px] overflow-hidden mb-8 shadow-xl group-hover:shadow-2xl transition-all relative">
                  <img src={founder.image} alt={founder.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-8 left-8 right-8 text-white translate-y-4 group-hover:translate-y-0 transition-transform opacity-0 group-hover:opacity-100">
                    <p className="text-sm font-bold uppercase tracking-widest mb-1">Connect</p>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full glass flex items-center justify-center"><Globe className="w-4 h-4" /></div>
                      <div className="w-10 h-10 rounded-full glass flex items-center justify-center"><Users className="w-4 h-4" /></div>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">{founder.name}</h3>
                <p className="text-brand-600 font-semibold tracking-wide uppercase text-xs">{founder.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-600/5 -skew-x-12 translate-x-1/2" />
      </section>

      {/* Hero Section */}
      <section className="relative pt-20 pb-40 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand-50 text-brand-700 text-xs font-bold rounded-full mb-8 border border-brand-100">
              <Sparkles className="w-4 h-4" />
              AI-POWERED FINANCIAL ECOSYSTEM
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-slate-900 leading-[0.95] mb-8 tracking-tighter">
              Present Expenses <br/>to <span className="text-brand-600">Future Wealth.</span>
            </h1>
            <p className="text-xl text-slate-500 mb-12 max-w-lg leading-relaxed">
              Prosper is the smart financial ecosystem designed to help students, teachers, and businesses manage, track, and forecast finances with AI and real human advisors.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <button 
                onClick={onStart}
                className="btn-brand w-full sm:w-auto px-10 py-5 text-lg"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setShowDemo(true)}
                className="w-full sm:w-auto px-10 py-5 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-sm"
              >
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                  <Play className="w-3 h-3 fill-slate-700 ml-0.5" />
                </div>
                Watch Demo
              </button>
            </div>
            <div className="mt-16 flex items-center gap-8">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-sm">
                    <img src={`https://picsum.photos/seed/user${i}/80/80`} alt="User" />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm text-slate-900 font-bold">10,000+ Active Users</p>
                <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">Managing $250M+ in assets</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 bg-white rounded-[48px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden p-4">
              <div className="bg-slate-50 rounded-[36px] overflow-hidden border border-slate-100">
                <img 
                  src="https://picsum.photos/seed/dashboard/1200/900" 
                  alt="Dashboard Preview" 
                  className="w-full h-auto"
                />
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-100 rounded-full blur-[120px] opacity-40 animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-100 rounded-full blur-[120px] opacity-40 animate-pulse" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-xl">
              <span className="section-label">Capabilities</span>
              <h2 className="text-5xl font-bold text-slate-900 mb-6">Powerful Features</h2>
              <p className="text-xl text-slate-500">Everything you need to master your money in one place, powered by next-gen AI.</p>
            </div>
            <button className="text-brand-600 font-bold flex items-center gap-2 hover:gap-4 transition-all">
              View all features <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard icon={Receipt} title="Expense Tracking" desc="Log every transaction with UPI ID verification and AI categorization." />
            <FeatureCard icon={BrainCircuit} title="AI Advisor" desc="Get real-time insights from FlowBot, our financial AI that understands context." />
            <FeatureCard icon={TrendingUp} title="Future Forecasting" desc="Predict your net worth and savings 5 years ahead with high accuracy." />
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-32 px-6 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <span className="section-label">Tailored for you</span>
              <h2 className="text-5xl font-bold text-slate-900 mb-10 leading-tight">Solutions for <br/>Every Stage of Life.</h2>
              <div className="space-y-4">
                <SolutionItem title="For Students" desc="Manage student loans, track daily budgets, and build healthy financial habits early." />
                <SolutionItem title="For Teachers" desc="Plan for retirement, manage classroom expenses, and optimize your savings." />
                <SolutionItem title="For Businesses" desc="Advanced cash flow monitoring, tax estimation, and multi-user financial management." />
              </div>
            </div>
            <div className="bg-slate-900 rounded-[48px] p-16 text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                <h3 className="text-4xl font-bold mb-6 leading-tight">Ready to transform <br/>your finances?</h3>
                <p className="text-xl text-slate-400 mb-12 leading-relaxed">Join thousands of users who have already taken control of their future with Prosper.</p>
                <button onClick={onStart} className="w-full py-5 bg-brand-600 text-white font-bold rounded-2xl hover:bg-brand-700 transition-all shadow-xl shadow-brand-900/40 flex items-center justify-center gap-3">
                  Get Started Now
                  <ArrowUpRight className="w-6 h-6" />
                </button>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="section-label mx-auto">Pricing</span>
            <h2 className="text-5xl font-bold text-slate-900 mb-6">Simple, Transparent.</h2>
            <p className="text-xl text-slate-500">Choose the plan that fits your financial goals. No hidden fees.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { name: 'Free', price: '$0', features: ['Basic Tracking', 'FlowBot AI', '1 Account'] },
              { name: 'Premium', price: '$9', features: ['Advanced Insights', 'Video Advisor', '5 Accounts'] },
              { name: 'Business', price: '$29', features: ['Tax Compliance', 'Team Access', 'Unlimited'] },
              { name: 'Elite', price: '$99', features: ['Human Advisor', 'Custom Strategy', 'Priority Support'] }
            ].map((plan) => (
              <div key={plan.name} className="p-10 rounded-[40px] border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-2xl hover:border-transparent transition-all group">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                  <span className="text-slate-400 font-medium">/mo</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                      <Check className="w-4 h-4 text-brand-600" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={onStart} className="w-full py-4 bg-white border border-slate-200 text-slate-900 font-bold rounded-2xl group-hover:bg-slate-900 group-hover:text-white group-hover:border-transparent transition-all">
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-white w-5 h-5" />
            </div>
            <span className="font-display font-bold text-xl text-slate-900 tracking-tight">Prosper</span>
          </div>
          <div className="flex gap-10 text-sm font-semibold text-slate-400">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Security</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Contact</a>
          </div>
          <p className="text-sm text-slate-400 font-medium">© 2026 Prosper Financial Ecosystem.</p>
        </div>
      </footer>
    </div>
  );
}

function DemoStep({ icon: Icon, title, desc }: any) {
  return (
    <div className="flex gap-6 group">
      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-slate-100 group-hover:bg-brand-600 group-hover:text-white transition-all">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className="font-bold text-slate-900 mb-1">{title}</h4>
        <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
