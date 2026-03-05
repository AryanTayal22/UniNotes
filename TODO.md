# UniNotes AI - Development Todo List

Based on PRD, Design Doc, and Tech Stack specifications.

---

## Phase 1: Project Setup

### 1.1 Initialize Project Structure
- [ ] Create project root folder
- [ ] Initialize Git repository
- [ ] Create `.gitignore` file
- [ ] Set up folder structure (frontend/, backend/)

### 1.2 Backend Setup
- [ ] Initialize Node.js project (`npm init`)
- [ ] Install Express.js
- [ ] Install development dependencies (nodemon, dotenv)
- [ ] Create basic Express server
- [ ] Set up environment variables (.env file)
- [ ] Configure CORS for frontend communication

### 1.3 Frontend Setup
- [ ] Create React app (Vite or Create React App)
- [ ] Install Bootstrap and React-Bootstrap
- [ ] Install Axios for API calls
- [ ] Install React Router for navigation
- [ ] Set up folder structure (components/, pages/, services/)

### 1.4 Database Setup
- [ ] Create MongoDB Atlas account (or local MongoDB)
- [ ] Create database cluster
- [ ] Get connection string
- [ ] Install Mongoose in backend
- [ ] Connect Express to MongoDB
- [ ] Test database connection

---

## Phase 2: Authentication System

### 2.1 User Schema
- [ ] Create User model with Mongoose
- [ ] Define fields: name, email, password, university, branch
- [ ] Add timestamps to schema
- [ ] Add email uniqueness validation

### 2.2 Password Security
- [ ] Install bcrypt
- [ ] Create password hashing middleware (pre-save hook)
- [ ] Create password comparison method

### 2.3 Passport.js Setup
- [ ] Install passport and passport-local
- [ ] Install express-session
- [ ] Configure session middleware
- [ ] Create Passport Local Strategy
- [ ] Set up serialize/deserialize user functions

### 2.4 Auth API Routes
- [ ] Create `/api/auth/signup` POST route
- [ ] Create `/api/auth/login` POST route
- [ ] Create `/api/auth/logout` POST route
- [ ] Create `/api/auth/me` GET route (get current user)
- [ ] Add input validation for all routes
- [ ] Add error handling middleware

### 2.5 Auth Frontend Pages
- [ ] Create Signup page component
- [ ] Build signup form (name, email, password, university, branch)
- [ ] Add form validation
- [ ] Create Login page component
- [ ] Build login form (email, password)
- [ ] Implement auth context/state management
- [ ] Create protected route wrapper component
- [ ] Add logout functionality

---

## Phase 3: File Storage Setup (Cloudinary)

### 3.1 Cloudinary Configuration
- [ ] Create Cloudinary account
- [ ] Get API credentials (cloud name, API key, API secret)
- [ ] Add credentials to environment variables
- [ ] Install Cloudinary SDK in backend

### 3.2 File Upload Middleware
- [ ] Install multer for handling multipart/form-data
- [ ] Configure multer storage settings
- [ ] Create Cloudinary upload utility function
- [ ] Set up file type validation (PDF, DOCX, PPT, Images)
- [ ] Set up file size limits
- [ ] Create upload error handling

---

## Phase 4: Notes Feature

### 4.1 Note Schema
- [ ] Create Note model with Mongoose
- [ ] Define fields: title, subject, semester, description, tags
- [ ] Add file URL field (Cloudinary URL)
- [ ] Add uploadedBy reference to User
- [ ] Add timestamps

### 4.2 Upload Notes API
- [ ] Create `/api/notes` POST route
- [ ] Implement file upload to Cloudinary
- [ ] Save note metadata to MongoDB
- [ ] Add authentication middleware (user must be logged in)
- [ ] Return created note data

### 4.3 Browse Notes API
- [ ] Create `/api/notes` GET route (list all notes)
- [ ] Add pagination support
- [ ] Add filtering by subject
- [ ] Add filtering by semester
- [ ] Add filtering by tags
- [ ] Add search functionality

### 4.4 Note Details API
- [ ] Create `/api/notes/:id` GET route
- [ ] Populate uploader information
- [ ] Handle not found errors

### 4.5 User Notes API
- [ ] Create `/api/users/me/notes` GET route
- [ ] Return notes uploaded by current user

### 4.6 Download Notes API
- [ ] Create `/api/notes/:id/download` GET route
- [ ] Track download count (optional)

---

## Phase 5: AI Note Generator

### 5.1 Gemini API Setup
- [ ] Create Google AI Studio account
- [ ] Generate Gemini API key
- [ ] Add API key to environment variables
- [ ] Install Google Generative AI SDK

### 5.2 AI Service
- [ ] Create AI service module
- [ ] Configure Gemini model
- [ ] Create prompt template for note generation
- [ ] Implement generateNotes function
- [ ] Handle API errors and rate limiting

### 5.3 AI Notes Schema
- [ ] Create AIGeneratedNote model
- [ ] Define fields: topic, generatedContent, generatedBy
- [ ] Add timestamps

### 5.4 AI API Routes
- [ ] Create `/api/ai/generate` POST route
- [ ] Accept topic input
- [ ] Call Gemini API
- [ ] Save generated notes to database
- [ ] Return generated content
- [ ] Create `/api/ai/notes` GET route (user's AI notes history)

---

## Phase 6: Frontend UI Components

### 6.1 Layout Components
- [ ] Create Navbar component
  - [ ] Logo/brand
  - [ ] Navigation links (Home, Browse, Upload, AI Generator)
  - [ ] Auth buttons (Login/Signup or User menu)
  - [ ] Responsive mobile menu
- [ ] Create Footer component
  - [ ] Links
  - [ ] Copyright

### 6.2 Note Card Component
- [ ] Create NoteCard component
- [ ] Display title, subject, description
- [ ] Add download button
- [ ] Add hover effects
- [ ] Make responsive

### 6.3 Search Bar Component
- [ ] Create SearchBar component
- [ ] Add search input
- [ ] Add search button
- [ ] Implement search functionality

### 6.4 Upload Form Component
- [ ] Create UploadForm component
- [ ] Add drag-and-drop area
- [ ] Add file input fallback
- [ ] Add title, subject, semester, description fields
- [ ] Add tags input
- [ ] Add submit button
- [ ] Show upload progress

### 6.5 AI Output Box Component
- [ ] Create AIOutputBox component
- [ ] Display generated notes in bullet format
- [ ] Add copy to clipboard button
- [ ] Add save button

### 6.6 Filter Sidebar Component
- [ ] Create FilterSidebar component
- [ ] Add subject filter dropdown
- [ ] Add semester filter dropdown
- [ ] Add tags filter
- [ ] Add clear filters button

---

## Phase 7: Frontend Pages

### 7.1 Landing Page
- [ ] Create LandingPage component
- [ ] Build hero section with large heading
- [ ] Add search bar
- [ ] Add "Browse Notes" button
- [ ] Create trending notes section
- [ ] Create popular subjects section
- [ ] Add AI generator preview section
- [ ] Ensure responsive design

### 7.2 Browse Notes Page
- [ ] Create BrowseNotesPage component
- [ ] Implement left sidebar with filters
- [ ] Implement right section with note grid
- [ ] Connect to browse API
- [ ] Implement filtering logic
- [ ] Add loading states
- [ ] Add empty state
- [ ] Implement pagination

### 7.3 Note Details Page
- [ ] Create NoteDetailsPage component
- [ ] Display note title, subject, description
- [ ] Show uploader information
- [ ] Add download button
- [ ] Add file preview (if supported)
- [ ] Handle loading and error states

### 7.4 Upload Notes Page
- [ ] Create UploadNotesPage component
- [ ] Integrate UploadForm component
- [ ] Handle form submission
- [ ] Show success/error messages
- [ ] Redirect after successful upload

### 7.5 AI Generator Page
- [ ] Create AIGeneratorPage component
- [ ] Add topic input field
- [ ] Add generate button
- [ ] Show loading state during generation
- [ ] Display generated notes
- [ ] Add option to save/download generated notes

### 7.6 User Dashboard Page
- [ ] Create DashboardPage component
- [ ] Show user's uploaded notes
- [ ] Show user's AI generated notes
- [ ] Add note management options

---

## Phase 8: Styling & Polish

### 8.1 Apply Design System
- [ ] Implement color palette (dark gray, white, light blue)
- [ ] Set up typography (Inter/Helvetica)
- [ ] Apply text hierarchy (large/medium/small)
- [ ] Configure 12-column responsive grid

### 8.2 Responsive Design
- [ ] Test desktop layout (3-4 cards per row)
- [ ] Test tablet layout (2 cards per row)
- [ ] Test mobile layout (1 card per row)
- [ ] Fix any responsive issues

### 8.3 Animations
- [ ] Add card hover effects
- [ ] Add button hover effects
- [ ] Add smooth page transitions
- [ ] Keep animations minimal

### 8.4 Accessibility
- [ ] Ensure good color contrast
- [ ] Use readable font sizes
- [ ] Add proper button labels
- [ ] Add alt text to images
- [ ] Test keyboard navigation

---

## Phase 9: Integration & Testing

### 9.1 API Integration
- [ ] Create Axios instance with base URL
- [ ] Add auth interceptors
- [ ] Create API service functions for all endpoints
- [ ] Handle API errors gracefully

### 9.2 Testing
- [ ] Test user registration flow
- [ ] Test user login/logout flow
- [ ] Test note upload flow
- [ ] Test note browsing and filtering
- [ ] Test note download
- [ ] Test AI note generation
- [ ] Test all pages on different devices

### 9.3 Bug Fixes
- [ ] Fix identified bugs
- [ ] Improve error messages
- [ ] Add loading states where missing

---

## Phase 10: Deployment (Optional)

### 10.1 Prepare for Deployment
- [ ] Update environment variables for production
- [ ] Build frontend for production
- [ ] Test production build locally

### 10.2 Deploy Backend
- [ ] Create Render account
- [ ] Connect GitHub repository
- [ ] Configure environment variables
- [ ] Deploy backend service
- [ ] Test deployed API

### 10.3 Deploy Frontend
- [ ] Create Vercel account
- [ ] Connect GitHub repository
- [ ] Configure build settings
- [ ] Set API base URL environment variable
- [ ] Deploy frontend
- [ ] Test deployed application

### 10.4 Database
- [ ] Ensure MongoDB Atlas is configured for production
- [ ] Whitelist deployment IP addresses
- [ ] Test database connection from deployed backend

---

## Summary Checklist

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Project Setup | ⬜ |
| 2 | Authentication System | ⬜ |
| 3 | File Storage (Cloudinary) | ⬜ |
| 4 | Notes Feature | ⬜ |
| 5 | AI Note Generator | ⬜ |
| 6 | Frontend UI Components | ⬜ |
| 7 | Frontend Pages | ⬜ |
| 8 | Styling & Polish | ⬜ |
| 9 | Integration & Testing | ⬜ |
| 10 | Deployment | ⬜ |

---

**Total Estimated Tasks: ~120 items**

*Mark items with [x] as you complete them.*
