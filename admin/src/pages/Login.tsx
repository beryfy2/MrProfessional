import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../lib/api';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-wrapper">

        {/* Top Icon */}
        <div className="login-icon">
          🔒
        </div>

        <h1 className="login-title">Admin Dashboard</h1>
        <p className="login-subtitle">
          Sign in to manage your business
        </p>

        {/* Card */}
        <div className="login-card">

          <h2>Welcome Back</h2>
          <p className="login-helper">
            Enter your credentials to access the dashboard
          </p>

          <form onSubmit={submit}>
            <label>Email Address</label>
            <div className="input-box">
              <input type="email" placeholder="admin@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="password-row">
              <label>Password</label>
              <span className="forgot">Forgot?</span>
            </div>

            <div className="input-box">
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '16px', textAlign: 'center' }}>
            Demo: admin@example.com / admin123
          </p>

        </div>
      </div>
    </div>
  );
}
