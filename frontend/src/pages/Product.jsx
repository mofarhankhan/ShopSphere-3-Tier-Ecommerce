import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, ShieldCheck } from 'lucide-react';
import api, { getError, money } from '../api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Product() {
  const { id } = useParams(); const [product, setProduct] = useState(null); const [qty, setQty] = useState(1); const [error, setError] = useState(''); const [message, setMessage] = useState('');
  const { add } = useCart(); const { user } = useAuth(); const navigate = useNavigate();
  useEffect(() => { api.get(`/products/${id}`).then(r => setProduct(r.data.product)).catch(e => setError(getError(e))); }, [id]);
  const addToCart = async () => { if (!user) return navigate('/login'); try { await add(product.id, qty); setMessage('Added to your bag.'); } catch(e) { setError(getError(e)); } };
  if (error && !product) return <div className="page-wrap"><div className="notice error">{error}</div></div>;
  if (!product) return <div className="loading">Loading product…</div>;
  return <div className="page-wrap"><Link to="/" className="back-link"><ArrowLeft size={16}/> Back to shop</Link><div className="product-detail"><div className="detail-image"><img src={product.imageUrl} alt={product.name}/></div><div className="detail-copy"><div className="eyebrow">{product.category?.name}</div><h1>{product.name}</h1><div className="detail-price">{money(product.price)} {product.compareAt && <del>{money(product.compareAt)}</del>}</div><p>{product.description}</p><div className="stock-line">{product.stock > 0 ? `${product.stock} available` : 'Currently out of stock'}</div><div className="quantity-row"><button onClick={() => setQty(Math.max(1, qty - 1))}>−</button><span>{qty}</span><button onClick={() => setQty(Math.min(20, qty + 1))}>+</button></div><button disabled={!product.stock} className="button button-dark add-button" onClick={addToCart}><ShoppingBag size={18}/> Add to bag</button>{message && <div className="notice success">{message}</div>}{error && <div className="notice error">{error}</div>}<div className="detail-promise"><ShieldCheck size={18}/> Secure checkout · Easy returns</div><div className="description-block"><h3>About this piece</h3><p>{product.description}</p></div></div></div></div>;
}
