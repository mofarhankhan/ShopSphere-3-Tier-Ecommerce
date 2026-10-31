import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api, { getError, money } from '../api';
export default function OrderDetail() {
  const { id } = useParams(); const [order, setOrder] = useState(null); const [error, setError] = useState('');
  useEffect(() => { api.get(`/orders/${id}`).then(r => setOrder(r.data.order)).catch(e => setError(getError(e))); }, [id]);
  if (error) return <div className="page-wrap notice error">{error}</div>;
  if (!order) return <div className="loading">Loading order…</div>;
  return <div className="page-wrap order-detail"><div className="success-mark">✓</div><div className="eyebrow">ORDER CONFIRMED</div><h1>Thanks for your order<span>.</span></h1><p>Your order <strong>{order.orderNumber}</strong> has been placed.</p><div className="order-progress">{['PLACED','CONFIRMED','PROCESSING','SHIPPED','DELIVERED'].map((s,i) => <div className={['CANCELLED'].includes(order.status) ? '' : ['PLACED','CONFIRMED','PROCESSING','SHIPPED','DELIVERED'].indexOf(order.status) >= i ? 'done' : ''} key={s}><i/>{s}</div>)}</div><div className="order-detail-card"><h3>Items</h3>{order.items.map(i => <div className="checkout-product" key={i.id}><img src={i.imageUrl} alt=""/><span>{i.name} × {i.quantity}</span><strong>{money(Number(i.price) * i.quantity)}</strong></div>)}<div className="summary-total"><span>Total paid / due</span><strong>{money(order.total)}</strong></div><p>Payment: {order.paymentMethod === 'COD' ? 'Cash on delivery' : 'Demo payment'} · {order.paymentStatus}</p></div><div className="order-actions"><Link className="button button-dark" to="/orders">View all orders</Link><Link className="text-link" to="/">Continue shopping</Link></div></div>;
}
