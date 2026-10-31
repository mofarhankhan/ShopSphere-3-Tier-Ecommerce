import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Product from './pages/Product';
import Auth from './pages/Auth';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import Admin from './pages/Admin';

export default function App() {
  return <Routes><Route element={<Layout/>}>
    <Route index element={<Home/>}/>
    <Route path="products/:id" element={<Product/>}/>
    <Route path="login" element={<Auth/>}/>
    <Route path="register" element={<Auth mode="register"/>}/>
    <Route path="cart" element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
    <Route path="checkout" element={<ProtectedRoute><Checkout/></ProtectedRoute>}/>
    <Route path="orders" element={<ProtectedRoute><Orders/></ProtectedRoute>}/>
    <Route path="orders/:id" element={<ProtectedRoute><OrderDetail/></ProtectedRoute>}/>
    <Route path="admin" element={<ProtectedRoute admin><Admin/></ProtectedRoute>}/>
    <Route path="*" element={<div className="page-wrap empty-state"><h1>Page not found.</h1><a className="button button-dark" href="/">Back to shop</a></div>}/>
  </Route></Routes>;
}
