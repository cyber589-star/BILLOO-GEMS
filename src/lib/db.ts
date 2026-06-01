import { supabaseAdmin } from './supabase';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  count: string;
  createdAt: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  productId: string;
  productName: string;
  quantity: number;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  source: 'customer' | 'admin';
  createdAt: string;
}

function mapRow<T>(row: Record<string, unknown> | null): T | null {
  if (!row) return null;
  return row as unknown as T;
}

function mapRows<T>(rows: Record<string, unknown>[]): T[] {
  return rows as unknown as T[];
}

export async function readProducts(): Promise<Product[]> {
  const { data, error } = await supabaseAdmin.from('products').select('*').order('createdAt', { ascending: false });
  if (error) throw new Error(error.message);
  return mapRows<Product>(data || []);
}

export async function readProduct(id: string): Promise<Product | null> {
  const { data, error } = await supabaseAdmin.from('products').select('*').eq('id', id).single();
  if (error) return null;
  return mapRow<Product>(data);
}

export async function createProduct(body: Record<string, unknown>): Promise<Product> {
  const now = new Date().toISOString();
  const product = {
    id: generateId(),
    name: body.name as string,
    category: body.category as string,
    price: Number(body.price),
    image: (body.image as string) || '',
    description: (body.description as string) || '',
    createdAt: now,
    updatedAt: now,
  };
  const { error } = await supabaseAdmin.from('products').insert(product);
  if (error) throw new Error(error.message);
  return product as Product;
}

export async function updateProduct(id: string, body: Record<string, unknown>): Promise<Product | null> {
  const updates: Record<string, unknown> = { updatedAt: new Date().toISOString() };
  if (body.name !== undefined) updates.name = body.name;
  if (body.category !== undefined) updates.category = body.category;
  if (body.price !== undefined) updates.price = Number(body.price);
  if (body.image !== undefined) updates.image = body.image;
  if (body.description !== undefined) updates.description = body.description;

  const { data, error } = await supabaseAdmin.from('products').update(updates).eq('id', id).select().single();
  if (error) return null;
  return mapRow<Product>(data);
}

export async function deleteProduct(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin.from('products').delete().eq('id', id);
  return !error;
}

export async function readCategories(): Promise<Category[]> {
  const { data, error } = await supabaseAdmin.from('categories').select('*').order('createdAt', { ascending: false });
  if (error) throw new Error(error.message);
  return mapRows<Category>(data || []);
}

export async function readCategory(id: string): Promise<Category | null> {
  const { data, error } = await supabaseAdmin.from('categories').select('*').eq('id', id).single();
  if (error) return null;
  return mapRow<Category>(data);
}

export async function createCategory(body: Record<string, unknown>): Promise<Category> {
  const category = {
    id: generateId(),
    name: body.name as string,
    description: (body.description as string) || '',
    image: (body.image as string) || '',
    count: (body.count as string) || '0',
    createdAt: new Date().toISOString(),
  };
  const { error } = await supabaseAdmin.from('categories').insert(category);
  if (error) throw new Error(error.message);
  return category as Category;
}

export async function updateCategory(id: string, body: Record<string, unknown>): Promise<Category | null> {
  const updates: Record<string, unknown> = {};
  if (body.name !== undefined) updates.name = body.name;
  if (body.description !== undefined) updates.description = body.description;
  if (body.image !== undefined) updates.image = body.image;
  if (body.count !== undefined) updates.count = body.count;

  const { data, error } = await supabaseAdmin.from('categories').update(updates).eq('id', id).select().single();
  if (error) return null;
  return mapRow<Category>(data);
}

export async function deleteCategory(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin.from('categories').delete().eq('id', id);
  return !error;
}

export async function readOrders(): Promise<Order[]> {
  const { data, error } = await supabaseAdmin.from('orders').select('*').order('createdAt', { ascending: false });
  if (error) throw new Error(error.message);
  return mapRows<Order>(data || []);
}

export async function readOrder(id: string): Promise<Order | null> {
  const { data, error } = await supabaseAdmin.from('orders').select('*').eq('id', id).single();
  if (error) return null;
  return mapRow<Order>(data);
}

export async function createOrder(body: Record<string, unknown>): Promise<Order> {
  const order = {
    id: generateId(),
    customerName: body.customerName as string,
    customerEmail: (body.customerEmail as string) || '',
    productId: (body.productId as string) || '',
    productName: (body.productName as string) || '',
    quantity: Number(body.quantity) || 1,
    total: Number(body.total) || 0,
    status: (body.status as string) || 'pending',
    source: (body.source as string) || 'customer',
    createdAt: new Date().toISOString(),
  };
  const { error } = await supabaseAdmin.from('orders').insert(order);
  if (error) throw new Error(error.message);
  return order as Order;
}

export async function updateOrder(id: string, body: Record<string, unknown>): Promise<Order | null> {
  const updates: Record<string, unknown> = {};
  if (body.status !== undefined) updates.status = body.status;
  if (body.customerName !== undefined) updates.customerName = body.customerName;
  if (body.productName !== undefined) updates.productName = body.productName;
  if (body.total !== undefined) updates.total = Number(body.total);

  const { data, error } = await supabaseAdmin.from('orders').update(updates).eq('id', id).select().single();
  if (error) return null;
  return mapRow<Order>(data);
}

export async function deleteOrder(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin.from('orders').delete().eq('id', id);
  return !error;
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}
