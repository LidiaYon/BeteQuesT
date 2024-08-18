# BeteQuesT

## Making the World Your Home

BeteQuesT is a comprehensive travel exploration and planning web platform. The name combines "Bete" (meaning "house" or "home" in Tigrinya, an Eritrean language) with "Quest," symbolizing the journey of exploration and making the world feel like home.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Setup and Installation](#setup-and-installation)
6. [Usage](#usage)
7. [API Documentation](#api-documentation)
8. [Contributing](#contributing)

## Project Overview

BeteQuesT aims to provide users with a rich, interactive experience for discovering countries around the world. It facilitates cultural understanding, assists in travel planning, and offers detailed information about countries, including cultural insights, landmarks, and practical travel information.

## Features

- User Authentication: Secure registration and login system
- Country Exploration: Detailed information about countries worldwide
- User Profiles: Personalized profiles with bio and interests
- Wishlist: Users can add countries to their travel wishlist
- Visited Countries: Users can mark countries they've visited
- Comments: Users can leave comments about countries
- Search Functionality: Advanced search options for countries

## Tech Stack

### Frontend
- React
- TypeScript
- Material-UI
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication

## Project Structure

```
BeteQuesT/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── utils/
│       ├── styles/
│       ├── App.tsx
│       └── index.tsx
├── backend/
│   └── src/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       ├── middleware/
│       ├── services/
│       ├── utils/
│       ├── config/
│       ├── app.ts
│       └── server.ts
├── .gitignore
└── README.md
```

### Key Files and Their Roles

#### Frontend

- `src/index.tsx`: Entry point of the React application
- `src/App.tsx`: Main component, sets up routing
- `src/components/`: Reusable UI components
- `src/pages/`: Components for each route/page
- `src/services/api.ts`: Manages API calls to the backend
- `src/services/auth.ts`: Handles authentication logic

#### Backend

- `src/server.ts`: Entry point of the backend
- `src/app.ts`: Configures Express application
- `src/controllers/`: Handle business logic for routes
- `src/models/`: Define MongoDB schemas
- `src/routes/`: Define API endpoints
- `src/middleware/auth.ts`: Handles authentication
- `src/services/chatbotService.ts`: Implements chatbot logic

## Setup and Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/betequest.git
   cd betequest
   ```

2. Install dependencies
   ```
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   ```

3. Set up environment variables
   - Create a `.env` file in the `backend` directory
   - Add the following variables:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. Start the backend server
   ```
   cd backend
   npm start
   ```

5. Start the frontend development server
   ```
   cd frontend
   npm start
   ```

6. Open `http://localhost:3000` in your browser

## Usage

After setting up the project, you can:

1. Register a new account or log in
2. Explore countries from the home page
3. Search for specific countries
4. Add countries to your wishlist
5. Mark countries as visited
6. Update your user profile
7. Use the chatbot for quick queries about countries

## API Documentation

For detailed API documentation, please refer to the [API Documentation](link-to-api-docs) file.

## Contributing

We welcome contributions to BeteQuesT! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

Please ensure your code adheres to our coding standards and include tests for new features.

---

Thank you for your interest in BeteQuesT! We hope this project helps make the world feel a little more like home for everyone.
