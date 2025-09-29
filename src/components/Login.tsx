import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from './ui/Card'
import { Input } from './ui/Input'
import { Button } from './ui/Button'
import { Loader2, LogIn, Shield, User } from 'lucide-react'

interface LoginProps {
  onLogin: (userType: "student" | "admin", userInfo: any) => void;
}

export function Login({ onLogin }: LoginProps) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Demo: "admin"/"admin123" = admin, anything else = student
    setTimeout(() => {
      if (form.username === "admin" && form.password === "admin123") {
        setLoading(false);
        onLogin("admin", { username: "admin", firstName: "Admin", lastName: "User" });
        navigate("/admin-dashboard");
      } else if (form.username && form.password) {
        setLoading(false);
        onLogin("student", { username: form.username, firstName: "Student", lastName: "User", studentId: "SD123456" });
        navigate("/student-dashboard");
      } else {
        setLoading(false);
        setError("Invalid login. Please try again.");
      }
    }, 1000);
  }

  return (
    <section className="max-w-md mx-auto px-4 mt-10">
      <Card className="p-8 shadow-2xl rounded-3xl">
        <div className="flex items-center gap-2 mb-6">
          <LogIn size={32} className="text-bow-indigo" />
          <h2 className="text-2xl font-bold text-bow-indigo">Login</h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit} aria-labelledby="login-header">
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