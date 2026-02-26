import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("cashflow.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT,
    age INTEGER DEFAULT 18,
    company_name TEXT,
    employee_count INTEGER,
    gov_scheme TEXT,
    subscription TEXT DEFAULT 'free',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    type TEXT, -- 'income' or 'expense'
    amount REAL,
    category TEXT,
    description TEXT,
    date TEXT,
    upi_id TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS advisors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    specialization TEXT,
    rating REAL,
    bio TEXT,
    image TEXT
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    advisor_id INTEGER,
    date TEXT,
    time TEXT,
    status TEXT DEFAULT 'pending',
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(advisor_id) REFERENCES advisors(id)
  );

  -- Initial Advisors
  INSERT OR IGNORE INTO advisors (id, name, specialization, rating, bio, image) VALUES 
  (1, 'Sarah Jenkins', 'Wealth Management & Tax', 4.9, 'Ex-Goldman Sachs advisor with 15 years of experience.', 'https://picsum.photos/seed/sarah/200/200'),
  (2, 'David Chen', 'Business Cash Flow', 4.8, 'Specializes in helping small business owners scale.', 'https://picsum.photos/seed/david/200/200'),
  (3, 'Elena Rodriguez', 'Student Financial Planning', 5.0, 'Dedicated to helping students manage debt.', 'https://picsum.photos/seed/elena/200/200');
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Mock Auth (In a real app, use JWT)
  app.post("/api/auth/login", (req, res) => {
    const { email, role, age, companyName, employeeCount, govScheme } = req.body;
    let user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    if (!user) {
      db.prepare("INSERT INTO users (email, role, age, company_name, employee_count, gov_scheme) VALUES (?, ?, ?, ?, ?, ?)")
        .run(email, role || 'individual', age || 18, companyName, employeeCount, govScheme);
      user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    }
    res.json(user);
  });

  app.get("/api/transactions/:userId", (req, res) => {
    const transactions = db.prepare("SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC").all(req.params.userId);
    res.json(transactions);
  });

  app.post("/api/transactions", (req, res) => {
    const { user_id, type, amount, category, description, date, upi_id } = req.body;
    db.prepare("INSERT INTO transactions (user_id, type, amount, category, description, date, upi_id) VALUES (?, ?, ?, ?, ?, ?, ?)")
      .run(user_id, type, amount, category, description, date, upi_id);
    res.json({ success: true });
  });

  app.get("/api/advisors", (req, res) => {
    const advisors = db.prepare("SELECT * FROM advisors").all();
    res.json(advisors);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
