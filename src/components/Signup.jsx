import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from './ui/Card'
import { Input } from './ui/Input'
import { Select } from './ui/Select'
import { Button } from './ui/Button'
import { Loader2, Sparkles, UserPlus } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { programData } from '../data/demo'

const defaultDepartment = "SD";

export function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthday: "",
    department: defaultDepartment,
    programCode: "",
    username: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = signup(form);
    
    if (result.success) {
      navigate('/student-dashboard');
    } else {
      setError(result.error);
    }
    setLoading(false);
  }

  return (
    <section className="max-w-xl mx-auto px-4 mt-10">
      <Card className="p-8 shadow-2xl rounded-3xl">
        <div className="flex items-center gap-2 mb-6">
          <UserPlus size={32} className="text-bow-indigo" />
          <h2 className="text-2xl font-bold text-bow-indigo">Student Signup</h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <Input
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              autoComplete="given-name"
            />
            <Input
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
              autoComplete="family-name"
            />
          </div>
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            autoComplete="tel"
          />
          <Input
            label="Birthday"
            name="birthday"
            type="date"
            value={form.birthday}
            onChange={handleChange}
          />
          <Select
            label="Department"
            name="department"
            value={form.department}
            onChange={handleChange}
            options={[{ value: defaultDepartment, label: "Software Development (SD)" }]}
            disabled
          />
          <Select
            label="Program"
            name="programCode"
            value={form.programCode}
            onChange={handleChange}
            options={programData.map((p) => ({
              value: p.code,
              label: `${p.name} (${p.type})`
            }))}
            required
          />
          <div className="grid grid-cols-2 gap-6">
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
              autoComplete="new-password"
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button type="submit" disabled={loading} className="w-full bg-bow-indigo text-white hover:bg-bow-indigo/90 font-semibold py-2">
            {loading ? <Loader2 size={20} className="animate-spin inline-block mr-2" /> : <Sparkles size={20} className="inline-block mr-2" />}
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
      </Card>
    </section>
  );
}