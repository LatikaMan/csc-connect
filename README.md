# 🏛️ CSC Connect

CSC Connect is a Full Stack web application that helps citizens find nearby Common Service Centers (CSCs), book appointments, track application status, and access government services online. The platform also provides a dedicated admin dashboard for managing CSC centers, services, appointments, and users.

---

## 🚀 Live Demo

🔗 https://your-vercel-link.vercel.app

---

## 📸 Screenshots

### 🏠 Home Page

![Home](screenshots/home.png)

### 📍 CSC Finder

![CSC Finder](screenshots/csc-finder.png)

### 📅 Appointment Booking

![Appointment](screenshots/appointment.png)

### 📊 Admin Dashboard

![Dashboard](screenshots/dashboard.png)

---

## ✨ Features

- 🏠 Modern Landing Page
- 🔐 Authentication with Clerk
- 👤 Role-based Authentication
- 📍 Find Nearby CSC Centers
- 📅 Online Appointment Booking
- 📄 Application Status Tracking
- 📰 Latest Government Schemes
- 📊 Admin Dashboard
- 📈 Analytics Dashboard
- 📱 Fully Responsive Design
- 🌙 Modern UI
- 📄 PDF Receipt Generation
- 📧 Email Notifications
- 📱 SMS Notifications
- 🗺️ Google Maps Integration
- ☁️ Cloud Image Upload
- 🔍 SEO Friendly

---

## 🛠️ Tech Stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Shadcn UI
- Framer Motion

### Backend
- Next.js API Routes
- Prisma ORM
- Zod Validation
- React Query
- Axios

### Database
- PostgreSQL
- Prisma ORM

### Authentication
- Clerk Authentication

### Maps & Location
- Google Maps API

### Notifications
- Nodemailer
- Twilio SMS

### File & PDF
- Cloudinary
- PDF-Lib
- QR Code

### Charts
- Recharts

### Deployment
- Vercel
- GitHub

---

## 📂 Folder Structure

```
src
 ├── app
 ├── components
 ├── lib
 ├── prisma
 ├── public
 └── middleware.ts
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/LatikaMan/csc-connect.git
```

Go to project folder

```bash
cd csc-connect
```

Install dependencies

```bash
npm install
```

Configure environment variables

```env
DATABASE_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

CLERK_SECRET_KEY=

GOOGLE_MAPS_API_KEY=

CLOUDINARY_CLOUD_NAME=

TWILIO_ACCOUNT_SID=

TWILIO_AUTH_TOKEN=
```

Generate Prisma Client

```bash
npx prisma generate
```

Run migrations

```bash
npx prisma migrate dev
```

Seed database

```bash
npx prisma db seed
```

Run project

```bash
npm run dev
```

---

## 🎯 Future Improvements

- Online Payments
- WhatsApp Notifications
- Multi-language Support
- AI Chat Assistant
- CSC Owner Dashboard
- Document Upload
- Feedback System
- Mobile App
- PWA Support

---

## 👩‍💻 Author

**Latika Mandal**

GitHub: https://github.com/LatikaMan

LinkedIn: https://www.linkedin.com/in/latika-mandal-2ba209338/

---
