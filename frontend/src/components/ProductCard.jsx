import { Link } from 'react-router-dom';
import { Heart, ArrowUpRight } from 'lucide-react';
import { money } from '../api';
export default function ProductCard({ product }) {
  return <article className="product-card">
    <Link to={`/products/${product.slug}`} className="product-image-wrap"><img src={product.imageUrl} alt={product.name} /><span className="image-arrow"><ArrowUpRight size={18}/></span></Link>
    <div className="product-meta"><span>{product.category?.name || 'Essentials'}</span><span>{product.stock > 0 ? 'In stock' : 'Sold out'}</span></div>
    <Link to={`/products/${product.slug}`} className="product-name">{product.name}</Link>
    <div className="price-row"><strong>{money(product.price)}</strong>{product.compareAt && <del>{money(product.compareAt)}</del>}</div>
  </article>;
}
