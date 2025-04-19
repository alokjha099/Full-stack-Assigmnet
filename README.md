Here’s a properly formatted `README.md` file based on the details you've provided:

```markdown
# Vite Login Page Project

This project consists of both the **frontend** and **backend** components for a login page application. The frontend is built using **React**, **TypeScript**, and **TailwindCSS**, while the backend is developed with **Node.js**, **Express**, and **Prisma**.

---

## Features

### Frontend
- **Login and Signup Pages**: User-friendly interfaces for authentication.
- **Dashboard**: Displays a welcome message for logged-in users.
- **Responsive Design**: Built with **TailwindCSS** for a modern and adaptive UI.

### Backend
- **User Authentication**: APIs for signup and login with **JWT-based** authentication.
- **Password Security**: Passwords are securely hashed using **bcrypt**.
- **Database Integration**: Uses **Prisma ORM** with **PostgreSQL** for data management.

---

## Tech Stack

### Frontend
- **React**: For building the user interface.
- **TypeScript**: For type-safe development.
- **Vite**: For fast development and build tooling.
- **TailwindCSS**: For styling.
- **React Router**: For navigation.

### Backend
- **Node.js**: For building the backend server.
- **Express**: For handling HTTP requests.
- **Prisma**: For database management.
- **PostgreSQL**: As the database.
- **JWT**: For authentication.
- **bcrypt**: For password hashing.

---

## Installation and Setup

### Prerequisites
- **Node.js** installed on your system.
- **PostgreSQL** database set up and running.

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd vite-login-page/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables by creating a `.env` file in the `backend` directory and adding the following:
   ```env
   DATABASE_URL=your_postgresql_database_url
   JWT_SECRET=your_jwt_secret
   ```

4. Run the database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd vite-login-page/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the app in your browser at `http://localhost:5173`.

---

## API Endpoints

### Signup

**POST** `/api/signup`

- **Request Body:**
   ```json
   {
     "uid": "string",
     "password": "string"
   }
   ```

- **Response:**
   ```json
   {
     "message": "User registered successfully"
   }
   ```

### Login

**POST** `/api/login`

- **Request Body:**
   ```json
   {
     "uid": "string",
     "password": "string"
   }
   ```

- **Response:**
   ```json
   {
     "token": "jwt_token"
   }
   ```

---

## Scripts

- **npm run dev**: Start the development server.
- **npm run build**: Build the project for production.
- **npm run preview**: Preview the production build.
- **npm run lint**: Run ESLint to check for code issues.

---

## Configuration

- **TailwindCSS**: Configured in `tailwind.config.js`.
- **TypeScript**: Configured in `tsconfig.app.json` and `tsconfig.node.json`.

### Folder Structure

- `src/components`: Contains React components for Login, Signup, and Dashboard.
- `src/App.tsx`: Defines the routes for the application.
- `index.html`: Entry point for the app.

---

## Dependencies

For a complete list of dependencies, refer to the `package.json` file.

---

## Notes

- Ensure the **backend** server is running on `http://localhost:5000` for API calls to work.
- Update the API URLs in the frontend components if the backend URL changes.
- **PostgreSQL**: Ensure the database is running and accessible.
