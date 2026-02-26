export const CATEGORIES = {
  income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'],
  expense: [
    'Food',
    'Rent',
    'Utilities',
    'Transport',
    'Entertainment',
    'Education',
    'Health',
    'Shopping',
    'Business',
    'Other',
  ],
  petty_cash: ['Office Supplies', 'Tea/Coffee', 'Small Repairs', 'Postage', 'Other'],
};

export const SUBSCRIPTION_PLANS = [
  {
    id: 'free',
    name: 'Free Plan',
    price: '$0',
    features: ['Basic expense tracking', 'Limited AI suggestions', 'Limited history'],
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: '$9.99/mo',
    features: ['Unlimited transactions', 'Advanced AI insights', 'Real-time dashboard', 'Monthly AI reports'],
    color: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    id: 'business_pro',
    name: 'Business Pro',
    price: '$29.99/mo',
    features: ['Full business dashboard', 'Profit/loss analytics', 'Cash flow forecasting', 'Tax tools', '1 free advisor session/mo'],
    color: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  {
    id: 'elite',
    name: 'Elite Plan',
    price: '$99.99/mo',
    features: ['Unlimited AI usage', 'Unlimited human consultations', 'Video advisory sessions', 'Personalized planning'],
    color: 'bg-amber-50 text-amber-700 border-amber-200',
  },
];
