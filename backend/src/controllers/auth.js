import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../config/db.js';
import { HttpError } from '../utils/http.js';

const registerSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().transform(v => v.toLowerCase()),
  password: z.string().min(8).max(100)
});
const loginSchema = z.object({ email: z.string().email().transform(v => v.toLowerCase()), password: z.string().min(1) });

function makeToken(user) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
}
function safeUser(user) {
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}
export async function register(req, res) {
  const data = registerSchema.parse(req.body);
  if (await prisma.user.findUnique({ where: { email: data.email } })) throw new HttpError(409, 'An account with this email already exists.');
  const user = await prisma.user.create({ data: { ...data, passwordHash: await bcrypt.hash(data.password, 12) } });
  res.status(201).json({ token: makeToken(user), user: safeUser(user) });
}
export async function login(req, res) {
  const data = loginSchema.parse(req.body);
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user || !(await bcrypt.compare(data.password, user.passwordHash))) throw new HttpError(401, 'Incorrect email or password.');
  res.json({ token: makeToken(user), user: safeUser(user) });
}
export async function me(req, res) {
  res.json({ user: req.user });
}
