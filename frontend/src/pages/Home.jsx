import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import api, { getError } from '../api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [params] = useSearchParams(); const search = params.get('search') || '';
  const [products, setProducts] = useState([]); const [categories, setCategories] = useState([]); const [category, setCategory] = useState(''); const [sort, setSort] = useState('newest');
  const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  useEffect(() => { api.get('/categories').then(r => setCategories(r.data.categories)).catch(() => {}); }, []);
  useEffect(() => { setLoading(true); api.get('/products', { params: { search, category, sort, limit: 24 } }).then(r => setProducts(r.data.products)).catch(e => setError(getError(e))).finally(() => setLoading(false)); }, [search, category, sort]);
  return <><section className="hero">
    <div className="hero-copy"><div className="eyebrow"><Sparkles size={15}/> THE EVERYDAY EDIT</div><h1>Find your<br/><em>everyday</em> good.</h1><p>Thoughtful essentials, timeless finds and little upgrades that make a big difference.</p><a className="button button-dark" href="#shop">Explore the collection <ArrowRight size={17}/></a></div>
    <div className="hero-art"><img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200" alt="Curated everyday fashion collection"/><div className="hero-sticker">GOOD<br/>THINGS<br/>LIVE HERE.</div></div>
    <div className="hero-index">01 — 04 <span/> CURATED FOR YOU</div>
  </section>
  <section className="benefit-strip"><span>✳ Curated quality</span><span>✳ Easy returns</span><span>✳ Secure checkout</span><span>✳ Free shipping over ₹1,500</span></section>
  <section className="shop-section" id="shop"><div className="section-heading"><div><div className="eyebrow">THE GOOD STUFF</div><h2>{search ? `Results for “${search}”` : 'Made to be loved.'}</h2><p>Pieces you'll reach for, day after day.</p></div><select value={sort} onChange={e => setSort(e.target.value)}><option value="newest">Newest first</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option></select></div>
    <div className="category-pills"><button className={!category ? 'active' : ''} onClick={() => setCategory('')}>All products</button>{categories.map(c => <button key={c.id} className={category === c.slug ? 'active' : ''} onClick={() => setCategory(c.slug)}>{c.name}</button>)}</div>
    {loading ? <div className="loading">Finding good things…</div> : error ? <div className="notice error">{error}</div> : products.length ? <div className="product-grid">{products.map(p => <ProductCard key={p.id} product={p}/>)}</div> : <div className="empty-state"><h3>Nothing here just yet.</h3><p>Try another search or category.</p></div>}
  </section>
  <section className="story-banner" id="about"><div><div className="eyebrow">A BETTER KIND OF SHOPPING</div><h2>Less noise.<br/><em>More good stuff.</em></h2></div><p>We believe the things you bring into your life should earn their place. That's why every pick is chosen with care.</p><Link to="/" className="text-link">Shop all essentials <ArrowRight size={16}/></Link></section>
  </>;
}
