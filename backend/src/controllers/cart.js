import { prisma } from '../config/db.js';
import { HttpError } from '../utils/http.js';

async function getOrCreateCart(userId) {
  return prisma.cart.upsert({ where: { userId }, update: {}, create: { userId }, include: { items: { include: { product: true } } } });
}
function shape(cart) {
  const items = cart.items.map(i => ({ id: i.id, quantity: i.quantity, product: i.product }));
  return { items, count: items.reduce((n, i) => n + i.quantity, 0), subtotal: items.reduce((n, i) => n + Number(i.product.price) * i.quantity, 0) };
}
export async function getCart(req, res) { res.json({ cart: shape(await getOrCreateCart(req.user.id)) }); }
export async function addItem(req, res) {
  const productId = String(req.body.productId || '');
  const quantity = Math.max(1, Math.min(20, Number(req.body.quantity) || 1));
  const product = await prisma.product.findFirst({ where: { id: productId, isActive: true } });
  if (!product) throw new HttpError(404, 'Product not found.');
  if (product.stock < quantity) throw new HttpError(400, 'Not enough stock available.');
  const cart = await getOrCreateCart(req.user.id);
  await prisma.cartItem.upsert({
    where: { cartId_productId: { cartId: cart.id, productId } },
    update: { quantity: { increment: quantity } },
    create: { cartId: cart.id, productId, quantity }
  });
  res.json({ cart: shape(await getOrCreateCart(req.user.id)) });
}
export async function updateItem(req, res) {
  const quantity = Number(req.body.quantity);
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) throw new HttpError(400, 'Quantity must be between 1 and 20.');
  const item = await prisma.cartItem.findFirst({ where: { id: req.params.id, cart: { userId: req.user.id } }, include: { product: true } });
  if (!item) throw new HttpError(404, 'Cart item not found.');
  if (quantity > item.product.stock) throw new HttpError(400, 'Not enough stock available.');
  await prisma.cartItem.update({ where: { id: item.id }, data: { quantity } });
  res.json({ cart: shape(await getOrCreateCart(req.user.id)) });
}
export async function removeItem(req, res) {
  await prisma.cartItem.deleteMany({ where: { id: req.params.id, cart: { userId: req.user.id } } });
  res.json({ cart: shape(await getOrCreateCart(req.user.id)) });
}
