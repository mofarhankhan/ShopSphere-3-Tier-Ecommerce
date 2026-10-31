import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  { name: 'Electronics', slug: 'electronics' },
  { name: 'Fashion', slug: 'fashion' },
  { name: 'Home & Living', slug: 'home-living' },
  { name: 'Accessories', slug: 'accessories' }
];

const products = [
  ['Wireless Headphones', 'wireless-headphones', 'Immersive sound, comfortable fit and long battery life.', 2499, 3299, 35, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900', 'electronics'],
  ['Smart Watch', 'smart-watch', 'Track activity, notifications and everyday wellness.', 3999, 4999, 22, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900', 'electronics'],
  ['Minimal Sneakers', 'minimal-sneakers', 'Everyday sneakers with a clean silhouette.', 2199, 2799, 40, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900', 'fashion'],
  ['Classic Backpack', 'classic-backpack', 'A durable backpack for work, college and travel.', 1599, 1999, 28, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900', 'accessories'],
  ['Desk Lamp', 'desk-lamp', 'Warm adjustable lighting for your workspace.', 1299, null, 18, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900', 'home-living'],
  ['Ceramic Coffee Set', 'ceramic-coffee-set', 'A simple ceramic set for your daily coffee ritual.', 899, 1199, 50, 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=900', 'home-living'],
  ['Everyday Sunglasses', 'everyday-sunglasses', 'Lightweight frames with a timeless look.', 999, null, 32, 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=900', 'accessories'],
  ['Cotton Oversized Tee', 'cotton-oversized-tee', 'Soft cotton tee with a relaxed fit.', 799, 999, 60, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900', 'fashion']
];

async function main() {
  for (const c of categories) await prisma.category.upsert({ where: { slug: c.slug }, update: {}, create: c });

  for (const p of products) {
    const category = await prisma.category.findUnique({ where: { slug: p[7] } });
    await prisma.product.upsert({
      where: { slug: p[1] },
      update: {},
      create: {
        name: p[0], slug: p[1], description: p[2], price: p[3],
        compareAt: p[4], stock: p[5], imageUrl: p[6], categoryId: category.id
      }
    });
  }

  const adminHash = await bcrypt.hash('Admin123!', 12);
  const customerHash = await bcrypt.hash('Customer123!', 12);
  await prisma.user.upsert({
    where: { email: 'admin@shopsphere.local' },
    update: {},
    create: { name: 'ShopSphere Admin', email: 'admin@shopsphere.local', passwordHash: adminHash, role: 'ADMIN' }
  });
  await prisma.user.upsert({
    where: { email: 'customer@shopsphere.local' },
    update: {},
    create: { name: 'Demo Customer', email: 'customer@shopsphere.local', passwordHash: customerHash }
  });
  console.log('Seed complete.');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
