-- Run this SQL in your Supabase SQL Editor (https://supabase.com/dashboard/project/wlgeojuktnghhieqvdqc/sql/new)

-- ===== PRODUCTS =====
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  image TEXT DEFAULT '',
  description TEXT DEFAULT '',
  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- ===== CATEGORIES =====
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  image TEXT DEFAULT '',
  count TEXT DEFAULT '0',
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- ===== ORDERS =====
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  "customerName" TEXT NOT NULL,
  "customerEmail" TEXT DEFAULT '',
  "productId" TEXT DEFAULT '',
  "productName" TEXT DEFAULT '',
  quantity INTEGER DEFAULT 1,
  total NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'pending',
  source TEXT DEFAULT 'customer',
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (optional)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow anon access (since this is a public admin panel)
CREATE POLICY "Allow all on products" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on categories" ON categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on orders" ON orders FOR ALL USING (true) WITH CHECK (true);
