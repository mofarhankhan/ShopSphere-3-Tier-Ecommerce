import { prisma } from '../config/db.js';
import { HttpError } from '../utils/http.js';

export async function listProducts(req, res) {
  const { search = '', category = '', sort = 'newest', page = '1', limit = '12' } = req.query;
  const take = Math.min(Math.max(Number(limit) || 12, 1), 48);
  const skip = (Math.max(Number(page) || 1, 1) - 1) * take;
  const where = {
    isActive: true,
    ...(search ? { OR: [{ name: { contains: search, mode: 'insensitive' } }, { description: { contains: search, mode: 'insensitive' } }] } : {}),
    ...(category ? { category: { slug: category } } : {})
  };
  const orderBy = sort === 'price-asc' ? { price: 'asc' } : sort === 'price-desc' ? { price: 'desc' } : { createdAt: 'desc' };
  const [products, total] = await Promise.all([
    prisma.product.findMany({ where, include: { category: true }, orderBy, skip, take }),
    prisma.product.count({ where })
  ]);
  res.json({ products, pagination: { page: Number(page) || 1, limit: take, total, pages: Math.ceil(total / take) } });
}
export async function getProduct(req, res) {
  const product = await prisma.product.findFirst({ where: { OR: [{ id: req.params.id }, { slug: req.params.id }], isActive: true }, include: { category: true, reviews: { include: { user: { select: { name: true } } }, orderBy: { createdAt: 'desc' } } } });
  if (!product) throw new HttpError(404, 'Product not found.');
  res.json({ product });
}
export async function listCategories(req, res) {
  res.json({ categories: await prisma.category.findMany({ orderBy: { name: 'asc' } }) });
}
