# Rentify Server

![Node.js](https://img.shields.io/badge/Node.js-v16.x-green)
![Express.js](https://img.shields.io/badge/Express.js-4.x-blue)
![Swagger](https://img.shields.io/badge/Swagger-OpenAPI-yellow)

The **Rentify Server** is a backend application designed to manage users, properties, and interactions for a real estate platform. It provides APIs for user authentication, property management, and user interactions such as showing interest or liking properties.

---

## Features

- **User Management**:
  - Register users as buyers or sellers.
  - Login and token-based authentication.
  - Refresh tokens for session management.

- **Property Management**:
  - Add, update, delete, and retrieve property details.
  - Pagination, filtering, and sorting for property listings.

- **User Interactions**:
  - Show interest in properties.
  - Like or dislike properties.
  - Retrieve a list of interested properties.

- **Swagger API Documentation**:
  - Fully documented API using Swagger (OpenAPI).

---

## Tech Stack

- **Node.js**: JavaScript runtime for building scalable server-side applications.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing user and property data.
- **Mongoose**: ODM for MongoDB to manage database operations.
- **JWT**: JSON Web Tokens for secure authentication.
- **Swagger**: API documentation and testing.

---

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/srrathi/Rentify.git
    cd Rentify
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables: Create a `.env` file in the root directory and add the following:
    ```bash
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/presido
    JWT_SECRET=your_jwt_secret
    ```
4. Start the server:
    ```bash
    npm start
    ```

## API Documentation
The API is documented using Swagger. Once the server is running, you can access the documentation at:

  ```bash
  http://localhost:5000/api-docs
  ```

## Directory Structure
  ```bash
    server/
  ├── controllers/       # Business logic for API routes
  ├── models/            # Mongoose models for MongoDB
  ├── routes/            # API route definitions
  ├── services/          # Service layer for database operations
  ├── utils/             # Utility functions
  ├── app.js             # Main application entry point
  └── README.md          # Project documentation
  ```

## Available Scripts
- Start Server:
  ```bash
  npm start
  ```
- Run in Development Mode:
  ```bash
  npm run dev
  ```
- Lint Code:
  ```bash
  npm run lint
  ```

## Key API Endpoints

### User Routes

- **POST** `/users/register`: Register a new user.  
- **POST** `/users/login`: Login and get an access token.  
- **POST** `/users/refresh-token`: Refresh the access token.  
- **GET** `/users/{id}`: Get user details by ID.  

### Property Routes

- **POST** `/property/all`: Get all properties with filters and pagination.  
- **GET** `/property/{id}`: Get property details by ID.  
- **POST** `/property/create`: Add a new property.  
- **POST** `/property/{id}`: Update a property by ID.  
- **DELETE** `/property/{id}`: Delete a property by ID.  

### Interested Properties Routes

- **POST** `/interest/show`: Show interest in a property.  
- **POST** `/interest/remove`: Remove interest in a property.  
- **POST** `/interest/all`: List all interested properties.  

### Interaction Routes

- **POST** `/interaction/like`: Like or dislike a property.  

## Technologies Used

![Node.js](https://img.shields.io/badge/Node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-%23000000.svg?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-%23Clojure.svg?style=for-the-badge&logo=swagger&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-%23FF5733.svg?style=for-the-badge&logo=jsonwebtokens&logoColor=white)




## Contact
[![srrathi github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/srrathi)
[![Sitaram Rathi Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sitaram-rathi-519152197/)
[![Sitaram Rathi email](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:srrathi2000@gmail.com)
[![Sitaram Rathi twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/SitaramRathi5)