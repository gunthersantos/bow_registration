import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from './ui/Card'
import { Input } from './ui/Input'
import { Select } from './ui/Select'
import { Button } from './ui/Button'
import { Loader2, Sparkles, UserPlus } from 'lucide-react'
import { programData } from '../data/demo'
import { Program } from '../data/types'

interface SignupProps {
  onSignup: (userInfo: any) => void;
}

const defaultDepartment = "SD";

export function Signup({ onSignup }: SignupProps) {
  const navigate = useNavigate();
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
  const [error, setError] = useState<string | null>(null);

  // Generate a random Student ID
  function generateStudentId(): string {
    return "SD" + Math.floor(100000 + Math.random() * 900000).toString();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simple validation
    if (!form.firstName || !form.lastName || !form.email || !form.programCode || !form.username || !form.password) {
      setError("Please fill all required fields.");
      setLoading(false);
      return;
    }

    // Simulate server-side signup (replace with real mutation if available)
    setTimeout(() => {
      const userInfo = {
        ...form,
        studentId: generateStudentId(),
        program: programData.find(p => p.code === form.programCode)
      };
      setLoading(false);
      onSignup(userInfo);
      navigate("/student-dashboard");
    }, 1200);
  }

  return (
    <section className="max-w-xl mx-auto px-4 mt-10">
      <Card className="p-8 shadow-2xl rounded-3xl">
        <div className="flex items-center gap-2 mb-6">
          <UserPlus size={32} className="text-bow-indigo" />
          <h2 className="text-2xl font-bold text-bow-indigo">Student Signup</h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit} aria-labelledby="signup-header">
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
            options={programData.map((p: Program) => ({
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