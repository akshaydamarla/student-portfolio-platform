Student Portfolio Platform

📌 Overview

Student Portfolio Platform is a full-stack web application developed to help students showcase and manage their academic projects and portfolios. The platform allows students to upload project details, track project progress, and present their work professionally, while administrators can review, approve, and provide feedback on submitted projects.

⸻

🚀 Technologies Used

Frontend

* React.js
* React Router DOM
* Axios
* CSS3
* Context API

Backend

* Spring Boot
* Spring Security
* JWT Authentication
* Hibernate / JPA
* Maven

Database

* MySQL
* AWS RDS

Deployment & Services

* Vercel (Frontend Hosting)
* Render (Backend Hosting)
* Brevo Email API (OTP Email Service)
* Google reCAPTCHA

⸻

✨ Features

👨‍🎓 Student Features

* User Registration & Login
* JWT-based Authentication
* Upload Projects with Images
* Add Project Description & Tech Stack
* Track Project Progress
* Update Profile
* Delete Projects
* Forgot Password using OTP Verification

👨‍🏫 Admin Features

* View All Students
* Review Submitted Projects
* Approve or Reject Projects
* Provide Feedback
* Manage Platform Data

🔐 Security Features

* Role-Based Access Control
* Password Encryption using BCrypt
* JWT Authentication
* Protected Routes
* Google reCAPTCHA Integration

⸻

⚙️ Project Workflow

1️⃣ User Registration

* Student/Admin registers using email and password.
* CAPTCHA verification is performed.
* User details are stored securely in the database.

2️⃣ Login Authentication

* User logs in using credentials.
* Backend validates user information.
* JWT token is generated and stored in frontend local storage.

3️⃣ Student Dashboard

* Students can upload projects with:
    * Title
    * Description
    * Tech Stack
    * Progress Status
    * Project Image
* Uploaded projects are stored in AWS RDS.

4️⃣ Admin Review System

* Admin reviews submitted projects.
* Projects can be approved or rejected.
* Feedback can be provided for rejected projects.

5️⃣ Password Recovery

* User clicks “Forgot Password”.
* OTP is generated and sent through Brevo Email API.
* User verifies OTP and resets password securely.

6️⃣ Deployment Architecture

* Frontend deployed on Vercel.
* Backend deployed on Render.
* Database hosted on AWS RDS.

⸻

▶️ Running the Project Locally

📥 Clone the Repository

git clone <repository-url>

⸻

🖥 Frontend Setup

cd frontend
npm install
npm run dev

Frontend will run on:

http://localhost:5173

⸻

⚙️ Backend Setup

cd backend
./mvnw spring-boot:run

Backend will run on:

http://localhost:8080

⸻

🔑 Environment Variables

Configure the following environment variables before running the backend:

SPRING_DATASOURCE_URL=
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=
RECAPTCHA_SECRET=
BREVO_API_KEY=

⸻

🗄 Database Configuration

The project uses MySQL database hosted on AWS RDS.

Example datasource URL:

jdbc:mysql://your-rds-endpoint:3306/student_portfolio_db

⸻

📸 Preview

Student Dashboard

* Upload and manage projects
* Track project status and progress

Admin Dashboard

* Review and approve projects
* Manage users and feedback

Authentication Pages

* Login
* Registration
* Forgot Password with OTP

⸻

🧠 Key Concepts Implemented

* Full Stack Web Development
* REST API Architecture
* JWT Authentication
* Role-Based Authorization
* CRUD Operations
* File Upload Handling
* Cloud Deployment
* Email API Integration
* Session Management
* Responsive UI/UX Design

⸻

👥 Team Contribution

The project was developed collaboratively with task distribution across:

* Frontend Development
* Backend Development
* Database Management
* Deployment & Testing

⸻

📌 Conclusion

The Student Portfolio Platform provides a centralized system for students to showcase their projects and for administrators to monitor and review submissions efficiently. The project demonstrates modern full-stack development concepts along with secure authentication, cloud deployment, and real-world workflow management.
