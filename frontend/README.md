# Frontend Developer Assessment – Blog Admin Dashboard

## Overview

This project is a **production-style Blog Admin Dashboard** built using modern frontend engineering principles. It demonstrates UI/UX design skills, scalable component architecture, state management, local data persistence, and problem-solving abilities as outlined in the assessment requirements.

---

## Goals

1. **Build Frontend App**
   Create a structured and scalable frontend application that reflects real-world engineering practices.

2. **UI/UX Evaluation**
   Design clean, responsive, and user-friendly layouts with strong UX principles.

3. **Problem Solving**
   Implement medium-level logic tasks and handle edge cases effectively.

4. **Component Architecture**
   Demonstrate clear understanding of component structure, routing, state handling, and data flow.

5. **Modern Tools Knowledge**
   Use modern frontend tools and best practices for performance and maintainability.

---

## Tech Stack

* **React + Vite**
* **Tailwind CSS**
* **React Router**
* **Context API** for state management
* **LocalStorage** for data persistence

> ⚠️ No UI libraries (MUI, AntD, Bootstrap) were used.

---

## Specifications Followed

* Scalable and reusable component structure
* Fully responsive UI (mobile, tablet, desktop)
* Clean and modern code practices
* Smooth state handling and form management
* Optimized rendering and minimal unnecessary re-renders
* Proper documentation and folder organization

---

## Milestones

### 1. Project Setup

* Initialized project using **React + Vite**
* Configured routing, context, and folder structure
* Integrated Tailwind CSS

### 2. Core UI Implementation

* Responsive Admin Layout (Sidebar + Navbar + Content)
* Reusable UI components
* Consistent visual styling

### 3. Feature Development

* CRUD operations for blogs
* Form handling with validations
* Local state management and persistence

---

## Core Features Implemented

### Admin Dashboard

* Responsive Sidebar + Navbar layout
* Mobile-friendly navigation

### Blog Management (CRUD)

Each blog includes the following fields:

* Title
* Description
* Category
* Author
* Image (JPG / PNG, max 1MB)
* Publish Date
* Status (Draft / Published)
* Main Content

### Image Handling

* Image validation (type & size)
* Image preview before saving
* Images persisted and rendered from **localStorage**

### Search & Filters

* Search by blog title
* Filter by category and status

### Pagination

* Pagination with configurable page size (5 items per page)
* **Persistent pagination** after refresh

---

## Brain Task (Selected)

### ❖ Soft Delete + Auto Purge

**Why this approach?**
Soft delete reflects real-world systems where data is not immediately removed. It allows recovery and better data control.

**Implementation:**

* Blogs are marked as deleted instead of being removed immediately
* Deleted items are excluded from the main UI
* Auto-purge logic removes soft-deleted blogs permanently after a defined condition

---

## Quick Logic Task

### ❖ Selected: Disable Save Unless Form Data Changed

**Why this approach?**
This improves UX and prevents unnecessary updates by ensuring users only save when meaningful changes are made — a common requirement in real-world admin dashboards.

**Implementation:**

* Initial form values are stored on load
* Current form state is compared with the initial state
* **Save button remains disabled** until a change is detected
* Button is re-disabled after successful save

---

### ❖ Extra: Warn on Close if Unsaved Changes

**Why this approach?**
Adds an extra layer of safety by preventing accidental data loss.

**Implementation:**

* Tracks dirty form state
* Shows browser warning on refresh, tab close, or navigation when changes are unsaved
* Warning is removed once data is saved

---

### ❖ Extra: Persistent Pagination

**Why this approach?**
Preserves user context and improves usability when navigating large datasets.

**Implementation:**

* Current page number stored in **localStorage**
* Pagination state restored after refresh
* Prevents resetting to page 1 unintentionally

---

### ❖ Warn on Close if Unsaved Changes

**Why this approach?**
Prevents accidental data loss and improves form safety, which is critical in real-world admin tools.

**Implementation:**

* Tracks form dirty state by comparing initial and current values
* Shows a browser warning when the user tries to refresh, close, or navigate away with unsaved changes
* Warning is removed automatically once data is saved

---

## Data Persistence

* All blog data (including images) is stored in **localStorage**
* Data persists after page refresh

---

## Error & Edge Case Handling

* Invalid image type or size validation
* Required field validation
* Empty state handling

---

## Folder Architecture

```bash
src/
│── assets/
│   │── asset.js            # Centralized asset exports
│   │── blog-icon.png       # Blog related icons/images
│   │── user-icon.png
│
│── components/
│   │── Navbar.jsx          # Top navigation bar
│   │── Sidebar.jsx         # Sidebar navigation for admin layout
│
│── context/
│   │── AppContext.jsx      # Global state management using Context API
│
│── pages/
│   │── BlogForm.jsx        # Create & Edit blog form (validation + image upload)
│   │── BlogList.jsx        # Blog listing with pagination, search & filters
│   │── BlogView.jsx        # Detailed blog view page
│   │── Statistics.jsx     # Dashboard stats / derived counts
│
│── App.jsx                 # Application routes & layout structure
│── main.jsx                # App entry point
│── index.css               # Global styles & Tailwind base imports
```

**Why this structure?**

* Separates concerns clearly (UI, pages, state, assets)
* Encourages reusability and scalability
* Matches real-world frontend architecture used in production dashboards
* Makes the project easy to understand and review

---

## How to Run the Project

```bash
npm install
npm run dev
```

---

## Demo Video

* 3–5 minute Loom video
* Includes:

  * Personal introduction
  * CRUD operations demo
  * Pagination
  * Filters & search
  * Brain task & quick logic task
  * Persistence after refresh
  * Responsive layout
  * Error states

---

## Deployment

* **Live URL:** <add deployed link here>
* Deployed using **Vercel / Netlify / Firebase Hosting**

---

## Submission Checklist

* ✅ Pagination implemented
* ✅ Brain task completed
* ✅ Quick logic task completed
* ✅ Image validation & preview
* ✅ Persistence after refresh
* ✅ Responsive on mobile
* ✅ README with logic explanation

---

## Author

**Name:** <Your Name>
**Location:** <Your Location>

---

📩 After completion, this project is submitted as per instructions with GitHub repo link, live deployment link, and demo video.
