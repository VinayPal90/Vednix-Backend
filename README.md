# 🚀 Node.js Vednix Backend API

A secure, production-ready backend API built with Node.js and Express to handle contact form submissions. It uses Nodemailer to send professional HTML-formatted emails and includes rate limiting for spam protection.

## ✨ Features

* **Automated Email Notifications:** Sends beautifully formatted HTML emails instantly upon form submission.
* **Reply-To Functionality:** Seamlessly reply directly to the client from your inbox.
* **Spam Protection:** Integrated Express Rate Limit to prevent abuse and DDoS attacks.
* **Strict Validation:** Ensures all required fields (Name, Email, Message) are present and formats are valid before processing.
* **Secure Environment:** Uses `.env` for securing sensitive credentials like App Passwords.

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Email Service:** Nodemailer (Gmail)
* **Security:** express-rate-limit, CORS
* **Environment Configuration:** dotenv

## ⚙️ Prerequisites

Before you begin, ensure you have met the following requirements:
* You have installed the latest version of [Node.js](https://nodejs.org/en/).
* You have a Gmail account with **2-Step Verification** enabled and an **App Password** generated.

## 🚀 Installation & Setup

**1. Clone the repository:**
\`\`\`bash
git clone https://github.com/YourUsername/YourRepoName.git
cd YourRepoName
\`\`\`

**2. Install dependencies:**
\`\`\`bash
npm install
\`\`\`

**3. Set up environment variables:**
Create a `.env` file in the root directory and add your email credentials:
\`\`\`env
PORT=5000
EMAIL_USER=your_company_email@gmail.com
EMAIL_PASS=your_16_digit_app_password
RECEIVER_EMAIL=where_to_receive_emails@gmail.com
\`\`\`

## 💻 Running the Server

To start the server in development mode (using nodemon):
\`\`\`bash
npm run dev
\`\`\`
The server will start running at `http://localhost:5000`.

## 📡 API Endpoints

### Submit Contact Form
* **URL:** `/api/contact`
* **Method:** `POST`
* **Content-Type:** `application/json`

**Request Body Example:**
\`\`\`json
{
  "name": "Rahul Verma",
  "email": "rahul.client@example.com",
  "phone": "9876543210",
  "message": "Hi, we need a custom CRM system built for our startup."
}
\`\`\`

**Success Response (200 OK):**
\`\`\`json
{
  "success": true,
  "message": "Your message has been sent successfully!"
}
\`\`\`

## 📁 Project Structure

\`\`\`text
├── index.js               # Application Entry Point
├── controllers/           # Business logic and email templates
│   └── contactController.js
├── routes/                # API route definitions
│   └── contactRoutes.js
├── .env                   # Environment variables (Ignored in Git)
├── .gitignore             # Ignored files and folders
├── package.json           # Project metadata and scripts
└── README.md              # Project documentation
\`\`\`

---
**Developed with ❤️ by Vinay Kumar**
