
# User Registration System with Image Upload

A full-stack React application with Node.js/Express backend for user registration with profile image upload functionality.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MySQL](https://img.shields.io/badge/MySQL-Database-orange)

## Features

- **User Registration**: Register users with username, phone number, email, and profile image
- **Image Upload**: Upload and display profile images with preview
- **Form Validation**: Real-time validation for all form fields
- **Phone Number Validation**: Accepts only numeric input with 11-digit validation
- **Email Validation**: Proper email format validation
- **Responsive Design**: Mobile-friendly interface
- **User Details Display**: Shows all registered user information after successful submission

##  Tech Stack

### Frontend
- React.js
- Axios for API calls
- CSS3 with modern styling

### Backend
- Node.js
- Express.js
- Multer for file uploads
- MySQL database

## Prerequisites

Before running this application, ensure you have installed:
- Node.js (v14 or higher)
- npm or yarn
- MySQL database

## Installation

1. **Clone the repository**

git clone <repository-url>
cd user-registration-app


## Database Setup
  **MySQL Database Schema**

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  phoneNumber VARCHAR(15) NOT NULL,
  email VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL DEFAULT '/default-avatar.png',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

## Project Structure
user-registration-app/
 ├── src/
 │   ├── components/
 │   │   └── ImageUpload.js
 │    ├── styles/
 │   │   └── ImageUpload.css
 │   └── App.js
 ├── backend/
 │   ├── routes/
 │   │   └── upload.js
 │   ├── middleware/
 │   │   └── upload.js
 │   ├── uploads/
 │   └── server.js
 └── README.md

### Running the Application
Start the backend server
cd backend
npm start
Server will run on http://localhost:3000

Start the frontend development server
npm start
Frontend will run on http://localhost:5173/
