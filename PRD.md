# Product Requirements Document (PRD)

## Product Name
UniNotes AI

---

# Product Overview

UniNotes AI is a web application that allows university students to **share, browse, and generate study notes using AI**.

Students can:
- Upload notes for different subjects
- Browse notes uploaded by other students
- Generate new notes using AI

The goal is to create a **centralized academic resource platform** where students can easily access study materials.

This project is designed as a **demo-level full stack project** to demonstrate:
- Full stack development
- AI integration
- File upload handling

---

# Problem Statement

Students often face problems such as:

- Difficulty finding quality notes for subjects
- Notes scattered across WhatsApp, Google Drive, etc.
- Time spent creating notes from textbooks

A centralized platform can make studying easier by providing **shared academic resources**.

---

# Goals

Primary goals of the platform:

1. Allow students to upload and share notes
2. Allow students to browse notes by subject
3. Use AI to generate structured study notes
4. Provide a simple and clean interface

---

# Target Users

Primary users:

- University students
- Students preparing for exams
- Students who want summarized notes

---

# Core Features

## 1. User Authentication

Users must create an account to use the platform.

Features:

- User signup
- User login
- User logout

User data stored:

- Name
- Email
- Password
- University
- Branch

---

## 2. Upload Notes

Users can upload study notes.

Supported file types:

- PDF
- DOCX
- PPT
- Images

Metadata required:

- Title
- Subject
- Semester
- Description
- Tags (optional)

Uploaded files are stored in cloud storage.

---

## 3. Browse Notes

Students can browse notes uploaded by other users.

Filters include:

- Subject
- Semester
- Tags

Users can:

- View note details
- Download notes

---

## 4. Note Details Page

Each note page shows:

- Title
- Subject
- Description
- Uploaded by
- Download button
- File preview (if supported)

---

## 5. AI Note Generator

Users can generate notes using AI.

Input:

Topic or concept.

Example:

Operating System Scheduling

AI Output:

- Key concepts
- Bullet point explanations
- Summary notes

---

## 6. User Dashboard

Users can view:

- Notes they uploaded
- AI notes they generated

---

# User Flow

## Uploading Notes

User Login  
↓  
Upload File  
↓  
Add Metadata  
↓  
Submit  

---

## Browsing Notes

Open Browse Page  
↓  
Search or filter notes  
↓  
View note  
↓  
Download note  

---

## AI Notes Generation

Enter topic  
↓  
AI processes prompt  
↓  
Generated notes displayed  

---

# MVP Scope

Included in MVP:

- Authentication
- Upload notes
- Browse notes
- Download notes
- AI note generation
- User dashboard

Excluded features (to keep project simple):

- Comment system
- Ratings
- Collaborative editing
- Recommendation engine

---

# Success Criteria

The project is successful if:

- Users can register and log in
- Notes can be uploaded and downloaded
- AI generates notes successfully
- Application runs smoothly for demonstration