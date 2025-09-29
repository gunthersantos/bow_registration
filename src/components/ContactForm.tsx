import { useState } from 'react'
import { Card } from './ui/Card'
import { Input } from './ui/Input'
import { Button } from './ui/Button'
import { Loader2, Mail, Send } from 'lucide-react'

interface ContactFormProps {
  userInfo: any;
}

export function ContactForm({ userInfo }: ContactFormProps) {
  const [form, setForm] = useState({
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setForm({ subject: "", message: "" });
    }, 1000);
  }

  return (
    <section className="max-w-lg mx-auto px-4 mt-12">
      <Card className="p-8 shadow-2xl rounded-3xl">
        <div className="flex items-center gap-2 mb-6">
          <Mail size={32} className="text-bow-indigo" />
          <h2 className="text-2xl font-bold text-bow-indigo">Contact Admin</h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit} aria-labelledby="contact-header">
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
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-bow-indigo focus:border-bow-indigo"
              placeholder="Type your message here..."
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-bow-indigo text-white hover:bg-bow-indigo/90 font-semibold py-2">
            {loading ? <Loader2 size={20} className="animate-spin inline-block mr-2" /> : <Send size={20} className="inline-block mr-2" />}
            {loading ? "Sending..." : "Send Message"}
          </Button>
          {success && (
            <div className="text-green-600 text-sm mt-2">Your message has been sent. Thank you!</div>
          )}
        </form>
      </Card>
    </section>
  );
}