import { useState, useEffect } from 'react'
import { Card } from './ui/Card'
import { Button } from './ui/Button'
import { Mail, ArrowLeft, MessageCircle, Clock, User, CheckCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { storage } from '../utils/storage'
import { useNavigate } from 'react-router-dom'

export function StudentMessages() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = () => {
    const studentMessages = storage.getStudentMessages(user.studentId);
    setMessages(studentMessages);
  };

  const handleBack = () => {
    navigate('/student-dashboard');
  };

  return (
    <section className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Mail className="text-bow-indigo w-6 h-6" />
          <div>
            <h2 className="text-xl font-bold text-bow-indigo">My Messages</h2>
            <p className="text-sm text-gray-600">Contact history with admin</p>
          </div>
        </div>
        <Button variant="outline" onClick={handleBack} size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <Card className="p-8 text-center">
            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No messages yet</h3>
            <p className="text-gray-500 mb-4">You haven't sent any messages to the admin.</p>
            <Button onClick={() => navigate('/contact')}>
              Contact Admin
            </Button>
          </Card>
        ) : (
          messages.map(message => (
            <Card key={message.id} className="p-4 border-l-4 border-bow-indigo">
              {/* Message Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-bow-indigo text-lg">
                      {message.subject}
                    </span>
                    {message.status === 'replied' && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    Sent: {new Date(message.timestamp).toLocaleDateString()}
                    {message.status === 'replied' && (
                      <span className="text-green-600 font-medium">• Replied</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Original Message */}
              <div className="mb-4">
                <div className="text-xs text-gray-500 mb-1">Your message:</div>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm">
                  {message.message}
                </p>
              </div>

              {/* Admin Replies */}
              {message.replies && message.replies.length > 0 && (
                <div className="space-y-3">
                  <div className="text-xs text-gray-500">Admin responses:</div>
                  {message.replies.map(reply => (
                    <div key={reply.id} className="bg-bow-indigo/5 p-3 rounded-lg border border-bow-indigo/20">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-bow-indigo" />
                        <span className="font-semibold text-bow-indigo text-sm">
                          {reply.adminName} (Admin)
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(reply.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">{reply.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {(!message.replies || message.replies.length === 0) && (
                <div className="text-center py-3 text-gray-500 text-sm">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Waiting for admin response...
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </section>
  );
}