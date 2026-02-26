export type UserRole = 'student' | 'teacher' | 'individual' | 'business';

export interface User {
  id: number;
  email: string;
  role: UserRole;
  age: number;
  subscription: 'free' | 'premium' | 'business_pro' | 'elite';
  company_name?: string;
  employee_count?: number;
  gov_scheme?: string;
}

export interface Transaction {
  id: number;
  user_id: number;
  type: 'income' | 'expense' | 'petty_cash';
  amount: number;
  category: string;
  description: string;
  date: string;
  upi_id?: string;
}

export interface Advisor {
  id: number;
  name: string;
  specialization: string;
  rating: number;
  bio: string;
  image: string;
}

export interface Booking {
  id: number;
  user_id: number;
  advisor_id: number;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}
