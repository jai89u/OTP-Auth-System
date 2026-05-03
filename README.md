🔐 OTP Auth System

A secure Node.js + Express authentication system with OTP verification, JWT authentication, and role-based access control (Admin/Student).

🚀 Features
📧 OTP based email verification
🔐 Secure login using JWT
🛡️ Role-based access (Admin / Student)
🔑 Password hashing using bcrypt
📬 Email sending using Nodemailer (Gmail SMTP)
🔒 Protected routes using middleware
⚡ REST API ready for frontend integration
🧑‍💻 Tech Stack
Node.js
Express.js
MongoDB + Mongoose
JWT (Authentication)
bcrypt.js (Password Hashing)
Nodemailer (Email Service)
📁 Project Structure

otp-auth-system/
│
├── config/
│   └── database.js
│
├── controller/
│   └── authController.js
│
├── middleware/
│   └── auth.js
│
├── models/
│   └── User.js
│
├── routes/
│   └── authRoutes.js
│
├── utils/
│   └── mailSender.js
│
├── .env
├── index.js
└── package.json

⚙️ Environment Variables

Create a .env file:

PORT=4000

DATABASE_URL=your_mongodb_connection_string

MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password

JWT_SECRET=your_secret_key
📦 Installation
git clone https://github.com/your-username/otp-auth-system.git

cd otp-auth-system

npm install
▶️ Run Project
node index.js

Server runs on:

http://localhost:4000
🔑 API Endpoints
Auth Routes
POST /api/v1/signup
POST /api/v1/verifyOtp
POST /api/v1/login
Protected Routes
GET /api/v1/student
GET /api/v1/admin
🔐 Authentication Flow
Signup → OTP Send → Verify OTP → Login → JWT Token → Access Protected Routes
🧪 Authorization Header
Authorization: Bearer YOUR_JWT_TOKEN
👨‍💼 Roles
Student → Access student routes
Admin → Access admin routes
⭐ Future Improvements
Refresh Token System
Forgot Password Feature
Email templates improvement
Rate limiting
👨‍💻 Author

Jai sahu❤️

⭐ Support

If you like this project, give it a ⭐ on GitHub.
