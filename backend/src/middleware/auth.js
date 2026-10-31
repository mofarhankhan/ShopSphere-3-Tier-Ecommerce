import jwt from 'jsonwebtoken';
import { prisma } from '../config/db.js';
import { HttpError, asyncHandler } from '../utils/http.js';

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.slice(7) : null;
  if (!token) throw new HttpError(401, 'Please sign in to continue.');
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await prisma.user.findUnique({ where: { id: payload.id }, select: { id: true, name: true, email: true, role: true } });
    if (!req.user) throw new Error('User not found');
    next();
  } catch { throw new HttpError(401, 'Your session is invalid or expired. Please sign in again.'); }
});

export const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'ADMIN') return next(new HttpError(403, 'Admin access required.'));
  next();
};
