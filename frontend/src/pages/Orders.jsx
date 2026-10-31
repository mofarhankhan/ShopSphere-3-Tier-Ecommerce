import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { getError, money } from '../api';
export default function Orders() {
  const [orders, setOrders] = useState([]); const [error, setError] = useState('');
  useEffect(() => { api.get('/orders/my').then(r => setOrders(r.data.orders)).catch(e => setError(getError(e))); }, []);
  return <div className="page-wrap"><div className="eyebrow">YOUR SHOPPING JOURNEY</div><h1 className="page-title">Your orders<span>.</span></h1>{error && <div className="notice error">{error}</div>}{orders.length ? <div className="order-list">{orders.map(o => <Link className="order-row" to={`/orders/${o.id}`} key={o.id}><div><strong>{o.orderNumber}</strong><span>{new Date(o.createdAt).toLocaleDateString('en-IN')}</span></div><span className="status">{o.status}</span><strong>{money(o.total)}</strong></Link>)}</div> : <div className="empty-state"><h3>No orders yet.</h3><p>Your future favourites will show up here.</p><Link className="button button-dark" to="/">Start exploring</Link></div>}</div>;
}
