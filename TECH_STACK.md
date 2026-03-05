# Tech Stack

This project uses a simplified full stack architecture suitable for a demo project.

---

# Frontend

Technologies used:

React  
Bootstrap  
Axios  
React Router  

Responsibilities:

- User interface
- Page navigation
- Display notes
- Call backend APIs

Bootstrap is used for:

- Grid layouts
- Cards
- Forms
- Navigation bars
- Buttons

---

# Backend

Technologies:

Node.js  
Express.js  

Responsibilities:

- API development
- Authentication
- File uploads
- AI integration

---

# Authentication

Authentication is implemented using **Passport.js**.

Strategy used:

Passport Local Strategy

Features:

- User signup
- User login
- Session based authentication

Passwords are stored securely using **bcrypt hashing**.

---

# Database

Database used:

MongoDB

Mongoose is used for schema management.

Main collections:

Users  
Notes  
AI Generated Notes  

---

# File Storage

Cloudinary is used to store uploaded files.

Advantages:

- Easy file upload
- Fast delivery
- No need for local file storage

Supported file types:

PDF  
DOCX  
PPT  
Images  

---

# AI Integration

AI features use **Google Gemini API**.

Capabilities include:

- Generating notes from a topic
- Creating structured summaries

Example input:

Operating System Scheduling

Example output:

Key concepts  
Algorithms  
Short explanations  

---

# Development Tools

Git — Version control  
GitHub — Code repository  
Postman — API testing  
VS Code — Development environment  

---

# Deployment (Optional)

Frontend:

Vercel

Backend:

Render

Database:

MongoDB Atlas

---

# System Architecture

React + Bootstrap (Frontend)

↓

Node.js + Express API

↓

MongoDB Database

↓

Cloudinary (File Storage)

↓

Gemini API (AI Notes Generator)

---

This stack demonstrates:

- Full stack development
- AI integration
- File upload handling
- Authentication systems