# UniNotes AI 📚

A modern web application for university students to **share, browse, and generate study notes using AI**.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)
![Gemini](https://img.shields.io/badge/Google-Gemini_AI-yellow?logo=google)

## ✨ Features

- **📤 Upload Notes** - Share study materials (PDF, DOC, PPT, Images) with fellow students
- **🔍 Browse & Search** - Find notes by subject, semester, or keywords
- **🤖 AI Note Generator** - Generate comprehensive study notes on any topic using Google Gemini AI
- **📝 AI Summaries** - Automatic AI-powered summaries for uploaded documents
- **👤 User Dashboard** - Track your uploads, downloads, and AI-generated notes
- **🔐 Secure Authentication** - User signup/login with session-based auth

## 🛠️ Tech Stack

### Frontend
- React 19 with Vite
- React Bootstrap for UI
- React Router for navigation
- Axios for API calls
- React Markdown for rendering AI content

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- Passport.js for authentication
- Cloudinary for file storage
- Google Gemini AI for note generation

## 📁 Project Structure

```
UniNotes/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── context/          # Auth context
│   │   ├── services/         # API service
│   │   └── styles/           # CSS themes
│   └── package.json
├── backend/                  # Express backend
│   ├── config/               # DB & Cloudinary config
│   ├── middleware/           # Auth middleware
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API routes
│   ├── services/             # AI service
│   └── server.js
├── PRD.md                    # Product requirements
├── DESIGN_DOC.md             # Design documentation
└── TECH_STACK.md             # Technology decisions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Cloudinary account
- Google AI Studio API key (Gemini)

### Environment Variables

Create `.env` file in `/backend`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GEMINI_API_KEY=your_gemini_api_key
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AryanTayal22/UniNotes.git
   cd UniNotes
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start the backend server**
   ```bash
   cd ../backend
   npm run dev
   ```

5. **Start the frontend (new terminal)**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Open in browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Create new account |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/logout` | User logout |
| GET | `/api/auth/me` | Get current user |

### Notes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Browse all notes (with filters) |
| GET | `/api/notes/:id` | Get note details |
| POST | `/api/notes` | Upload new note |
| DELETE | `/api/notes/:id` | Delete note |
| GET | `/api/notes/user/me` | Get user's notes |
| GET | `/api/notes/:id/download` | Download note file |

### AI Generator
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/generate` | Generate AI notes |
| GET | `/api/ai/notes` | Get AI notes history |
| DELETE | `/api/ai/notes/:id` | Delete AI note |

## 🎨 Design System

The UI follows a **light-tech design system**:

- **Background**: Soft sky gradient (`#f8fbff` → `#eaf2fb` → `#dde9f7`)
- **Cards**: Solid white with subtle shadows
- **Primary Text**: `#1f2937`
- **Secondary Text**: `#6b7280`
- **Accent Color**: `#3B82F6` (Blue)

## 📸 Screenshots

### Home Page
Clean landing page with hero section, feature highlights, and call-to-action.

### Browse Notes
Grid layout with filter sidebar for searching notes by subject, semester, and keywords.

### AI Generator
Generate comprehensive study notes on any topic with history sidebar.

### Dashboard
Track uploads, AI notes, and download statistics.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Aryan Tayal**
- GitHub: [@AryanTayal22](https://github.com/AryanTayal22)

---

⭐ Star this repo if you find it helpful!
