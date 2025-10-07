import { useState } from 'react'
import { Card } from './ui/Card'
import { Input } from './ui/Input'
import { Button } from './ui/Button'
import { Loader2, Mail, Send, ArrowLeft } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { storage } from '../utils/storage'
import { useNavigate } from 'react-router-dom'

export function ContactForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const messageData = {
      ...form,
      studentId: user.studentId,
      studentName: `${user.firstName} ${user.lastName}`,
      status: 'sent', // Novo campo para status
      replies: [] // Array para armazenar respostas
    };

    setTimeout(() => {
      storage.saveMessage(messageData);
      setLoading(false);
      setSuccess(true);
      setForm({ subject: "", message: "" });
      
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  }

  const handleBack = () => {
    navigate('/student-dashboard');
  };

  return (
    <section className="max-w-lg mx-auto px-4 py-6">
      {/* Header com Botão Voltar */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" onClick={handleBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Dashboard</span>
        </Button>
        <div className="flex items-center gap-2">
          <Mail className="text-bow-indigo w-5 h-5" />
          <h2 className="text-xl font-bold text-bow-indigo">Contact Admin</h2>
        </div>
      </div>

      <Card className="p-6 shadow-xl rounded-2xl">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
          />
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-bow-indigo focus:border-bow-indigo text-sm"
              placeholder="Type your message here..."
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-bow-indigo text-white hover:bg-bow-indigo/90 font-semibold py-2">
            {loading ? <Loader2 className="w-5 h-5 animate-spin inline-block mr-2" /> : <Send className="w-5 h-5 inline-block mr-2" />}
            {loading ? "Sending..." : "Send Message"}
          </Button>
          {success && (
            <div className="text-green-600 text-sm text-center py-2 bg-green-50 rounded-lg">
              ✓ Your message has been sent successfully!
            </div>
          )}
        </form>
      </Card>
    </section>
  );
}