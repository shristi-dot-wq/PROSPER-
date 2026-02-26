import { User, Transaction, Advisor } from "../types";

export const api = {
  async login(email: string, role: string, age: number, businessData?: { companyName?: string, employeeCount?: number, govScheme?: string }): Promise<User> {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, role, age, ...businessData }),
    });
    return res.json();
  },

  async getTransactions(userId: number): Promise<Transaction[]> {
    const res = await fetch(`/api/transactions/${userId}`);
    return res.json();
  },

  async addTransaction(transaction: Omit<Transaction, "id">): Promise<{ success: boolean }> {
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    });
    return res.json();
  },

  async getAdvisors(): Promise<Advisor[]> {
    const res = await fetch("/api/advisors");
    return res.json();
  },
};
