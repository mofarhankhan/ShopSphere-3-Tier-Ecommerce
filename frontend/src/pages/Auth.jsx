import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getError } from '../api';

export default function Auth({ mode = 'login' }) {
  const isRegister = mode === 'register'; const { login, register } = useAuth(); const navigate = useNavigate(); const location = useLocation();
  const [form, setForm] = useState({ name: '', email: '', password: '' }); const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  const change = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async e => { e.preventDefault(); setError(''); setBusy(true); try { const user = isRegister ? await register(form) : await login({ email: form.email, password: form.password }); navigate(location.state?.from?.pathname || (user.role === 'ADMIN' ? '/admin' : '/'), { replace: true }); } catch(e) { setError(getError(e)); } finally { setBusy(false); } };
  return <div className="auth-page"><div className="auth-art"><div className="brand">shop<span>sphere.</span></div><h2>Good things<br/>are waiting.</h2><p>Find the little things that make every day better.</p></div><form className="auth-card" onSubmit={submit}><div className="eyebrow">{isRegister ? 'JOIN THE GOOD SIDE' : 'WELCOME BACK'}</div><h1>{isRegister ? 'Create account' : 'Sign in'}</h1><p>{isRegister ? 'A better everyday starts here.' : 'Your next favourite thing is just a sign in away.'}</p>{isRegister && <label>Your name<input name="name" value={form.name} onChange={change} required minLength="2" placeholder="Your full name"/></label>}<label>Email address<input type="email" name="email" value={form.email} onChange={change} required placeholder="you@example.com"/></label><label>Password<input type="password" name="password" value={form.password} onChange={change} required minLength={isRegister ? 8 : 1} placeholder={isRegister ? 'At least 8 characters' : 'Your password'}/></label>{error && <div className="notice error">{error}</div>}<button className="button button-dark full-button" disabled={busy}>{busy ? 'Please wait…' : isRegister ? 'Create account' : 'Sign in'}</button><div className="auth-switch">{isRegister ? 'Already have an account?' : "Don't have an account?"} <Link to={isRegister ? '/login' : '/register'}>{isRegister ? 'Sign in' : 'Create one'}</Link></div></form></div>;
}
