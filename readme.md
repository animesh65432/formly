# 📝 fromly

**fromly** is a full-stack form builder and automation tool that helps users create forms, validate inputs, and auto-integrate form submissions with **Google Sheets** and **Notion**. The system also supports email notifications for form updates and provides a seamless UI/UX powered by modern web technologies.

---

## 🌟 Features

- ✅ **Form Builder** – Build customizable and validated forms.
- ⚙️ **Notion & Google Sheets Integrations** – Automatically send submissions to connected services.
- 🔄 **Auto Sync on Update** – Keep data updated across platforms.
- 📧 **Email Notifications** – Get real-time email alerts when responses are updated.
- ☁️ **Cloud Uploads** – Upload files via Cloudinary.
- 🔐 **Secure Auth** – Google OAuth2 login support.
- 🌈 **Modern UI** – Built with Radix UI, TailwindCSS, Framer Motion.

---

## 📂 Project Structure

fromly/
├── backend/ # Express.js + Prisma API
├── frontend/ # React + Vite frontend
├── backend/.env.copy # Sample environment configuration
└── README.md # Project readme



---

## 🔧 Tech Stack

### Frontend
- React 19
- Vite
- TailwindCSS 4
- Zustand (state management)
- React Router v7
- Radix UI
- Zod (form validation)
- React Hook Form
- React Query
- Google OAuth

### Backend
- Node.js with Express
- TypeScript
- Prisma ORM + MongoDB
- Notion SDK
- Google Sheets API
- Upstash Redis
- Cloudinary (file uploads)
- Nodemailer (email)

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/fromly.git
cd fromly

### 2. Setup Environment Variables

cd backend
cp .env.copy .env
cd ..

### 3. Install Dependencies

Frontend

cd frontend
npm install

Backend

cd ../backend
npm install

###4. Run the App
Start backend

cd backend
npm run dev

Start Frontend

cd ../frontend
npm run dev


# 5 Build & Deploy

Frontend
npm run build

Backend
npm run build
npm start

###Prisma Migrations

npx prisma db push --schema=./src/db/prisma/schema.prisma


Built with ❤️ by Animesh Dutta


