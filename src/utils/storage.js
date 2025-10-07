import { courseData, programData } from '../data/demo.js';

// LocalStorage utilities to replace Convex database
export const storage = {
  // Users
  getUsers: () => {
    const users = localStorage.getItem('bow_users');
    return users ? JSON.parse(users) : [];
  },
  
  saveUser: (user) => {
    const users = storage.getUsers();
    const existingUserIndex = users.findIndex(u => u.username === user.username);
    
    if (existingUserIndex >= 0) {
      users[existingUserIndex] = user;
    } else {
      users.push(user);
    }
    
    localStorage.setItem('bow_users', JSON.stringify(users));
    return user;
  },
  
  getUserByUsername: (username) => {
    const users = storage.getUsers();
    return users.find(u => u.username === username);
  },
  
  // Courses
  getCourses: () => {
    const courses = localStorage.getItem('bow_courses');
    return courses ? JSON.parse(courses) : [];
  },
  
  saveCourse: (course) => {
    const courses = storage.getCourses();
    const existingCourseIndex = courses.findIndex(c => c.code === course.code);
    
    if (existingCourseIndex >= 0) {
      courses[existingCourseIndex] = course;
    } else {
      courses.push(course);
    }
    
    localStorage.setItem('bow_courses', JSON.stringify(courses));
    return course;
  },
  
  deleteCourse: (courseCode) => {
    const courses = storage.getCourses();
    const filteredCourses = courses.filter(c => c.code !== courseCode);
    localStorage.setItem('bow_courses', JSON.stringify(filteredCourses));
    return filteredCourses;
  },
  
  // Student Registrations
  getRegistrations: () => {
    const registrations = localStorage.getItem('bow_registrations');
    return registrations ? JSON.parse(registrations) : [];
  },
  
  saveRegistration: (registration) => {
    const registrations = storage.getRegistrations();
    const existingIndex = registrations.findIndex(r => 
      r.studentId === registration.studentId && r.courseCode === registration.courseCode && r.term === registration.term
    );
    
    if (existingIndex >= 0) {
      registrations[existingIndex] = registration;
    } else {
      registrations.push(registration);
    }
    
    localStorage.setItem('bow_registrations', JSON.stringify(registrations));
    return registration;
  },
  
  deleteRegistration: (studentId, courseCode, term) => {
    const registrations = storage.getRegistrations();
    const filtered = registrations.filter(r => 
      !(r.studentId === studentId && r.courseCode === courseCode && r.term === term)
    );
    localStorage.setItem('bow_registrations', JSON.stringify(filtered));
    return filtered;
  },
  
  getStudentRegistrations: (studentId, term) => {
    const registrations = storage.getRegistrations();
    return registrations.filter(r => r.studentId === studentId && r.term === term);
  },
  
  // Contact Messages
  getMessages: () => {
    const messages = localStorage.getItem('bow_messages');
    return messages ? JSON.parse(messages) : [];
  },
  
  saveMessage: (message) => {
    const messages = storage.getMessages();
    messages.push({
      ...message,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: 'sent',
      replies: []
    });
    localStorage.setItem('bow_messages', JSON.stringify(messages));
    return message;
  },

  // Contact Messages with Replies
  getMessagesWithReplies: () => {
    const messages = storage.getMessages();
    return messages.map(message => ({
      ...message,
      replies: message.replies || []
    }));
  },

  saveMessageReply: (messageId, reply) => {
    const messages = storage.getMessages();
    const messageIndex = messages.findIndex(m => m.id === messageId);
    
    if (messageIndex !== -1) {
      if (!messages[messageIndex].replies) {
        messages[messageIndex].replies = [];
      }
      
      messages[messageIndex].replies.push({
        ...reply,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        from: 'admin'
      });
      
      // Mark as replied
      messages[messageIndex].status = 'replied';
      
      localStorage.setItem('bow_messages', JSON.stringify(messages));
      return messages[messageIndex];
    }
    return null;
  },

  getStudentMessages: (studentId) => {
    const messages = storage.getMessages();
    return messages
      .filter(m => m.studentId === studentId)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  deleteMessage: (messageId) => {
    const messages = storage.getMessages();
    const filteredMessages = messages.filter(m => m.id !== messageId);
    localStorage.setItem('bow_messages', JSON.stringify(filteredMessages));
    return filteredMessages;
  }
};

// Initialize demo data if empty
export const initializeDemoData = () => {
  if (!localStorage.getItem('bow_courses') || JSON.parse(localStorage.getItem('bow_courses')).length === 0) {
    localStorage.setItem('bow_courses', JSON.stringify(courseData));
  }
  
  if (!localStorage.getItem('bow_programs') || JSON.parse(localStorage.getItem('bow_programs')).length === 0) {
    localStorage.setItem('bow_programs', JSON.stringify(programData));
  }
  
  // Add demo admin user
  const users = storage.getUsers();
  const adminUser = users.find(u => u.username === 'admin');
  if (!adminUser) {
    storage.saveUser({
      username: 'admin',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@bowcollege.ca',
      userType: 'admin',
      studentId: 'ADMIN001'
    });
  }
};