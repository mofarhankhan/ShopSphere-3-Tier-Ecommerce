import { z } from 'zod';
import { prisma } from '../config/db.js';
import { HttpError } from '../utils/http.js';

const productSchema = z.object({
  name: z.string().trim().min(2), description: z.string().trim().min(5),
  price: z.coerce.number().positive(), compareAt: z.coerce.number().positive().optional().nullable(),
  stock: z.coerce.number().int().min(0), imageUrl: z.string().url(),
  categoryId: z.string().min(1), isActive: z.coerce.boolean().optional()
});
const slugify = s => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export async function stats(req, res) {
  const [products, orders, users, revenue] = await Promise.all([
    prisma.product.count(), prisma.order.count(), prisma.user.count({ where: { role: 'CUSTOMER' } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { paymentStatus: 'PAID' } })
  ]);
  res.json({ stats: { products, orders, customers: users, revenue: Number(revenue._sum.total || 0) } });
}
export async function createProduct(req, res) {
  const data = productSchema.parse(req.body);
  const product = await prisma.product.create({ data: { ...data, slug: `${slugify(data.name)}-${Date.now().toString().slice(-5)}` } });
  res.status(201).json({ product });
}
export async function updateProduct(req, res) {
  const data = productSchema.partial().parse(req.body);
  const existing = await prisma.product.findUnique({ where: { id: req.params.id } });
  if (!existing) throw new HttpError(404, 'Product not found.');
  const product = await prisma.product.update({ where: { id: existing.id }, data });
  res.json({ product });
}
export async function deleteProduct(req, res) {
  const existing = await prisma.product.findUnique({ where: { id: req.params.id } });
  if (!existing) throw new HttpError(404, 'Product not found.');
  await prisma.product.update({ where: { id: existing.id }, data: { isActive: false } });
  res.json({ message: 'Product archived.' });
}
