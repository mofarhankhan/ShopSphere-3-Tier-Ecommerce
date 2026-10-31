import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api';
import { useAuth } from './AuthContext';
const CartContext = createContext(null);
export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [], count: 0, subtotal: 0 });
  const refresh = async () => { if (!user) { setCart({ items: [], count: 0, subtotal: 0 }); return; } try { setCart((await api.get('/cart')).data.cart); } catch {} };
  useEffect(() => { refresh(); }, [user]);
  const add = async (productId, quantity = 1) => { const { data } = await api.post('/cart/items', { productId, quantity }); setCart(data.cart); };
  const update = async (id, quantity) => { const { data } = await api.patch(`/cart/items/${id}`, { quantity }); setCart(data.cart); };
  const remove = async id => { const { data } = await api.delete(`/cart/items/${id}`); setCart(data.cart); };
  return <CartContext.Provider value={{ cart, refresh, add, update, remove }}>{children}</CartContext.Provider>;
}
export const useCart = () => useContext(CartContext);
