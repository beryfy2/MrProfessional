import { useState } from 'react';
import { login } from '../lib/api';

export default function Login({ onSuccess }: { onSuccess: () => void }) {
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
      onSuccess();
    } catch {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-[#0f4260] to-indigo-700">
      <form onSubmit={submit} className="w-full max-w-sm bg-white rounded-2xl shadow-card p-6">
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-[#0f4260]">MR PRO + Admin</div>
          <div className="text-gray-600">Sign in to continue</div>
        </div>
        {error && <div className="mb-3 text-red-600 text-sm">{error}</div>}
        <div className="space-y-3">
          <input type="email" className="border rounded-lg px-3 py-2 w-full" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" className="border rounded-lg px-3 py-2 w-full" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" disabled={loading} className="w-full px-4 py-2 rounded-lg bg-[#21c420] text-white font-semibold hover:bg-green-600">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>
      </form>
    </div>
  );
}
