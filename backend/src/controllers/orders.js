import { prisma } from '../config/db.js';
import { HttpError } from '../utils/http.js';

const statuses = ['PLACED', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

export async function createOrder(req, res) {
  const { fullName, phone, line1, city, state, postalCode, paymentMethod = 'COD' } = req.body;
  if (![fullName, phone, line1, city, state, postalCode].every(v => typeof v === 'string' && v.trim())) throw new HttpError(400, 'Please complete all shipping address fields.');
  if (!['COD', 'DEMO'].includes(paymentMethod)) throw new HttpError(400, 'Invalid payment method.');
  const cart = await prisma.cart.findUnique({ where: { userId: req.user.id }, include: { items: { include: { product: true } } } });
  if (!cart?.items.length) throw new HttpError(400, 'Your cart is empty.');
  for (const item of cart.items) if (item.quantity > item.product.stock) throw new HttpError(400, `${item.product.name} does not have enough stock.`);
  const subtotal = cart.items.reduce((sum, i) => sum + Number(i.product.price) * i.quantity, 0);
  const shipping = subtotal >= 1500 ? 0 : 99;
  const order = await prisma.$transaction(async tx => {
    const created = await tx.order.create({
      data: {
        orderNumber: `SS-${Date.now().toString().slice(-8)}`,
        userId: req.user.id, subtotal, shipping, total: subtotal + shipping,
        paymentMethod, paymentStatus: paymentMethod === 'DEMO' ? 'PAID' : 'PENDING',
        address: { fullName, phone, line1, city, state, postalCode },
        items: { create: cart.items.map(i => ({ productId: i.productId, name: i.product.name, imageUrl: i.product.imageUrl, price: i.product.price, quantity: i.quantity })) }
      },
      include: { items: true }
    });
    for (const item of cart.items) await tx.product.update({ where: { id: item.productId }, data: { stock: { decrement: item.quantity } } });
    await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
    return created;
  });
  res.status(201).json({ order });
}
export async function myOrders(req, res) {
  const orders = await prisma.order.findMany({ where: { userId: req.user.id }, include: { items: true }, orderBy: { createdAt: 'desc' } });
  res.json({ orders });
}
export async function getOrder(req, res) {
  const order = await prisma.order.findFirst({ where: { id: req.params.id, userId: req.user.id }, include: { items: true } });
  if (!order) throw new HttpError(404, 'Order not found.');
  res.json({ order });
}
export async function adminOrders(req, res) {
  const orders = await prisma.order.findMany({ include: { items: true, user: { select: { name: true, email: true } } }, orderBy: { createdAt: 'desc' } });
  res.json({ orders });
}
export async function updateOrderStatus(req, res) {
  const { status } = req.body;
  if (!statuses.includes(status)) throw new HttpError(400, 'Invalid order status.');
  const order = await prisma.order.update({ where: { id: req.params.id }, data: { status } });
  res.json({ order });
}
