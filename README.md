<div align="center">

# 📚 Fable - Ebook Sharing Platform

### Discover, Read & Share Original Ebooks

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://your-vercel-url.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![MERN Stack](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/mern)

**Fable** is a modern digital ebook sharing platform that connects readers with talented writers. Browse, discover, and purchase original ebooks with a seamless Stripe payment integration.

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📸 Screenshots](#-screenshots)
- [🚀 Getting Started](#-getting-started)
- [🔐 Admin Credentials](#-admin-credentials)
- [📁 Project Structure](#-project-structure)
- [🔌 API Endpoints](#-api-endpoints)
- [📦 NPM Packages Used](#-npm-packages-used)
- [🌐 Live Links](#-live-links)
- [👨‍💻 Author](#-author)

---

## ✨ Features

### 🔐 Authentication & Authorization
- ✅ Email/Password registration with JWT (7-day expiry)
- ✅ Google OAuth integration using BetterAuth
- ✅ Role-based access control (User, Writer, Admin)
- ✅ Secure password hashing with bcrypt

### 🏠 Home Page
- ✅ Beautiful hero banner with Framer Motion animations
- ✅ Featured Ebooks section (latest 6 from database)
- ✅ Top Writers showcase (3 writers with most sales)
- ✅ Genre grid with quick navigation

### 📖 Browse Ebooks
- ✅ Advanced search by title/writer name
- ✅ Filter by genre, price range, availability
- ✅ Sort by newest, price (low-high/high-low), popularity
- ✅ Pagination (12 items per page)
- ✅ Responsive grid (2 cols mobile, 3 tablet, 4 desktop)
- ✅ Skeleton loaders for smooth UX

### 📕 Ebook Details
- ✅ High-resolution cover images (imgBB)
- ✅ Complete ebook information display
- ✅ Stripe payment integration
- ✅ Bookmark functionality
- ✅ "Already Purchased" state management

### 👤 User Dashboard
- ✅ Purchase history table
- ✅ Purchased ebooks gallery
- ✅ Profile management
- ✅ Bookmarks gallery view

### ✍️ Writer Dashboard
- ✅ Create/Edit/Delete ebooks
- ✅ imgBB image upload for covers
- ✅ Publish/Unpublish toggle
- ✅ Sales history with revenue tracking
- ✅ Bookmarks management

### 👑 Admin Dashboard
- ✅ Analytics overview cards
- ✅ Monthly sales chart (Recharts)
- ✅ Ebooks by genre pie chart
- ✅ Manage users (role change, delete)
- ✅ Manage all ebooks (publish/unpublish, delete)
- ✅ View all transactions

### 💳 Payment System
- ✅ Stripe Checkout integration
- ✅ Secure payment processing
- ✅ Transaction history tracking
- ✅ Publishing fee for writers

### 🎨 UI/UX
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Dark theme with violet/blue gradient
- ✅ Framer Motion animations
- ✅ Custom 404 page
- ✅ Error boundary fallback
- ✅ Global loading spinner
- ✅ Skeleton loaders

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** React Icons
- **Charts:** Recharts
- **HTTP Client:** Axios
- **Notifications:** React Hot Toast
- **Authentication:** BetterAuth (Google OAuth)
- **Payment:** Stripe.js

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT + bcrypt
- **Image Upload:** imgBB API
- **Payment:** Stripe API
- **Environment:** dotenv

---

## 📸 Screenshots

### Home Page
![Home Page](https://via.placeholder.com/800x400?text=Home+Page+Screenshot)

### Browse Ebooks
![Browse Page](https://via.placeholder.com/800x400?text=Browse+Page+Screenshot)

### Writer Dashboard
![Writer Dashboard](https://via.placeholder.com/800x400?text=Writer+Dashboard+Screenshot)

### Admin Dashboard
![Admin Dashboard](https://via.placeholder.com/800x400?text=Admin+Dashboard+Screenshot)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/fable-client.git
cd fable-client
##Project structure

ebook-client/
├── public/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── browse/
│   │   ├── dashboard/
│   │   │   ├── admin/
│   │   │   ├── user/
│   │   │   └── writer/
│   │   ├── ebooks/[id]/
│   │   ├── layout.js
│   │   ├── page.js
│   │   └── not-found.js
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Loading.jsx
│   │   ├── SkeletonCard.jsx
│   │   └── ErrorBoundary.jsx
│   ├── context/
│   │   └── AuthContext.js
│   └── lib/
│       └── axios.js
├── .env.local
├── package.json
└── README.md


🔌 API Endpoints
Authentication
POST /api/auth/register - Register new user
POST /api/auth/login - Login user
GET /api/auth/me - Get current user
Ebooks
GET /api/ebooks - Get all ebooks (with search/filter/sort/pagination)
GET /api/ebooks/:id - Get ebook by ID
POST /api/ebooks - Create ebook (writer)
PUT /api/ebooks/:id - Update ebook (writer)
DELETE /api/ebooks/:id - Delete ebook (writer)
GET /api/ebooks/my-ebooks - Get writer's ebooks
PATCH /api/ebooks/:id/publish - Toggle publish status
Payments
POST /api/payments/create-checkout - Create Stripe session
POST /api/payments/verify - Verify payment
GET /api/payments/writer-sales - Get writer's sales
Admin
GET /api/admin/stats/overview - Overview stats
GET /api/admin/stats/monthly-sales - Monthly sales data
GET /api/admin/stats/ebooks-by-genre - Genre distribution
GET /api/admin/users - Get all users
PATCH /api/admin/users/:id/role - Change user role
DELETE /api/admin/users/:id - Delete user
GET /api/admin/transactions - All transactions



🎯 Key Features Implemented
Role-based authentication (User/Writer/Admin)
Stripe payment integration
imgBB image upload
Advanced search & filtering
Pagination system
Interactive charts (Recharts)
Responsive design
Framer Motion animations
Custom error pages
Loading skeletons
Environment variables security

🙏 Acknowledgments
Next.js Documentation
MongoDB Documentation
Stripe Documentation
Tailwind CSS
Framer Motion


<div align="center">

Made with ❤️ by Tamanna Akter]
⭐ 
</div>