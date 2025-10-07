# Bow Course Registration System

A full-stack web application for course registration in the Software Development department. This system allows students to register for courses and administrators to manage courses and student information.

## 🚀 Features

### For Students
- **User Registration & Authentication** - Secure signup and login system
- **Course Registration** - Register for 2-5 courses per term
- **Profile Management** - View and edit personal information
- **Contact Admin** - Send messages to administrators
- **Message History** - View sent messages and admin responses
- **Course Search** - Search courses by name or code
- **Term Selection** - Choose from Spring, Summer, Fall, or Winter terms

### For Administrators
- **Course Management** - Create, edit, and delete courses
- **Student Management** - View student details and course registrations
- **Message System** - Receive and respond to student messages
- **Dashboard** - Comprehensive admin dashboard with analytics

## 🛠️ Tech Stack

- **Frontend**: React.js with Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Data Persistence**: LocalStorage (for frontend phase)
- **Build Tool**: Vite

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

## ⚡ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bow-registration
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── Home.jsx        # Landing page
│   ├── Login.jsx       # Login form
│   ├── Signup.jsx      # Student registration
│   ├── StudentDashboard.jsx
│   ├── AdminDashboard.jsx
│   ├── Profile.jsx
│   ├── ContactForm.jsx
│   └── ...
├── context/            # React context for state management
│   └── AuthContext.jsx
├── data/               # Sample data and constants
│   └── demo.js
├── utils/              # Utility functions
│   └── storage.js      # LocalStorage management
└── App.jsx             # Main application component
```

## 🔐 Default Accounts

### Demo Admin Account
- **Username**: `admin`
- **Password**: `admin123`

### Student Accounts
- Create new accounts via the signup page
- Or use any username/password combination (demo mode)

## 🎯 Key Functionalities

### Student Features
1. **Course Registration**
   - Select term (Spring, Summer, Fall, Winter)
   - Register for 2-5 courses per term
   - Search and filter available courses
   - Add/remove courses from selection

2. **Profile Management**
   - View personal information
   - Edit contact details
   - Update profile information

3. **Communication**
   - Send messages to administrators
   - View message history and responses

### Admin Features
1. **Course Management**
   - Create new courses with details
   - Edit existing course information
   - Delete courses from the system
   - Search and filter courses

2. **Student Management**
   - View all registered students
   - Access student details and profiles
   - See course registrations per student

3. **Message System**
   - Receive student messages
   - Reply to student inquiries
   - Delete messages when resolved

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop computers (1024px+)
- Large screens (1280px+)

## 🚦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔄 Data Persistence

Currently using browser's LocalStorage for data persistence. This is suitable for the frontend development phase and can be easily replaced with a backend API in future phases.

## 🎨 Design System

- **Primary Color**: Bow Indigo (`#6366f1`)
- **Secondary Colors**: Pink, Yellow, Teal accents
- **Typography**: Inter font family
- **Components**: Custom Button, Card, Input, Select components

## 📞 Support

For questions or issues regarding this project, please contact the development team or refer to the project documentation.

## 📄 License

This project is developed for educational purposes as part of the Software Development program.

---

**Built with ❤️ for the Bow Valley College Software Development Department**
