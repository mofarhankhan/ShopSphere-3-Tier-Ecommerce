import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ShoppingBag, UserRound, LogOut, LayoutDashboard, Search, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function Layout() {
  const { user, logout } = useAuth(); const { cart } = useCart(); const navigate = useNavigate(); const [query, setQuery] = useState('');
  const submit = e => { e.preventDefault(); navigate(`/?search=${encodeURIComponent(query)}`); };
  return <div className="app-shell">
    <div className="announcement">A little something for your everyday life · Free shipping over ₹1,500</div>
    <header className="site-header">
      <Link to="/" className="brand">shop<span>sphere.</span></Link>
      <nav className="main-nav"><NavLink to="/">Shop</NavLink><a href="/#collections">Collections</a><a href="/#about">Our story</a></nav>
      <form className="header-search" onSubmit={submit}><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products..." /></form>
      <div className="header-actions">
        {user?.role === 'ADMIN' && <Link title="Admin dashboard" to="/admin"><LayoutDashboard size={20}/></Link>}
        {user ? <button className="icon-button" title="Logout" onClick={() => { logout(); navigate('/'); }}><LogOut size={20}/></button> : <Link title="Sign in" to="/login"><UserRound size={20}/></Link>}
        <Link className="cart-link" to="/cart"><ShoppingBag size={20}/><span>{cart.count}</span></Link>
      </div>
    </header>
    <main><Outlet /></main>
    <footer className="footer"><div className="brand">shop<span>sphere.</span></div><p>Good things for everyday living.</p><div className="footer-bottom"><span>© {new Date().getFullYear()} ShopSphere</span><span>Thoughtfully selected. Made for you.</span></div></footer>
  </div>;
}
