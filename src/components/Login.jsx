import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from './ui/Card'
import { Input } from './ui/Input'
import { Button } from './ui/Button'
import { Loader2, LogIn, Shield } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = login(form.username, form.password);
    
    if (result.success) {
      if (result.user.userType === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/student-dashboard');
      }
    } else {
      setError(result.error);
    }
    setLoading(false);
  }

  return (
    <section className="max-w-md mx-auto px-4 mt-10">
      <Card className="p-8 shadow-2xl rounded-3xl">
        <div className="flex items-center gap-2 mb-6">
          <LogIn size={32} className="text-bow-indigo" />
          <h2 className="text-2xl font-bold text-bow-indigo">Login</h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            autoComplete="username"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button type="submit" disabled={loading} className="w-full bg-bow-indigo text-white hover:bg-bow-indigo/90 font-semibold py-2">
            {loading ? <Loader2 size={20} className="animate-spin inline-block mr-2" /> : <Shield size={20} className="inline-block mr-2" />}
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <div className="mt-4">
          <span className="text-xs text-gray-500">Demo Admin: <b>admin / admin123</b></span>
        </div>
      </Card>
    </section>
  );
}