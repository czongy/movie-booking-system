# 🎥 Movie Booking System

## Overview

This project is a full-fledged Movie Booking System built using **React** and **React Bootstrap** for the frontend, and **Java** with **Spring Boot**, **Spring Security**, **Spring JPA**, and **PostgreSQL** for the backend. The application provides users with the ability to browse movies, select a movie, choose a time slot, pick seats, and make payments. It also includes an admin panel for managing movies and time slots.

## Features

### User Features
- 🔍 **View Movies**: Browse the list of available movies.
- ⏰ **Select Time Slot**: Choose a suitable time slot for the selected movie.
- 💺 **Select Seats**: Pick preferred seats from available options.
- 💳 **Payment Methods**: Multiple payment methods to choose from.
- 🛒 **Purchase History**: View the history of booked tickets.
- 🔐 **User Authentication**: Register, login, and logout functionalities.

### Admin Features
- 🎬 **Manage Movies**: Create, read, update, and delete movie records.
- 🕒 **Manage Time Slots**: Add, modify, or remove time slots for movies.
- 📅 **View Bookings**: Access and monitor all bookings made by users.

## Tech Stack

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **React Bootstrap**: A front-end framework for building responsive, mobile-first websites.

### Backend
- **Java**: A high-level, class-based, object-oriented programming language.
- **Spring Boot**: A framework for building production-ready applications with minimal configuration.
- **Spring Security**: A powerful and highly customizable authentication and access-control framework.
- **Spring JPA**: Java Persistence API, used for managing relational data in applications.
- **PostgreSQL**: A powerful, open-source object-relational database system.

## Getting Started

### Prerequisites
- **Node.js** and **npm**: To run the React frontend.
- **Java 17**: To run the Spring Boot backend.
- **PostgreSQL**: For the database.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/czongy/movie-booking.git
   cd movie-booking

2. **Frontend Setup**:
- Navigate to the `react-movie-booking` directory:
  ```
  cd react-movie-booking
  ```
- Install the dependencies:
  ```
  npm install
  ```
- Start the React app:
  ```
  npm run dev
  ```
- The frontend will run on `http://localhost:5173`.

3. **Backend Setup**:
- Navigate to the `../` directory:
  ```
  cd ../
  ```
- Create the `application.properties` file with your PostgreSQL credentials:
  ```
  spring.datasource.url=jdbc:postgresql://localhost:5432/movie_booking
  spring.datasource.username=your-username
  spring.datasource.password=your-password
  spring.jpa.show-sql=true
  spring.jpa.hibernate.ddl-auto=update
  spring.jpa.defer-datasource-initialization = true
  ```
- Install the necessary dependencies and run the application:
  ```
  ./mvnw spring-boot:run
  ```
- The backend will run on `http://localhost:8080`.

### Database Setup

1. **Create PostgreSQL Database**:
   ```sql
   CREATE DATABASE movie_booking;

2. **Run Migrations**: The application will automatically run database migrations on startup using Spring JPA.

### Usage

- **User Access**:
- Visit `http://localhost:3000` to access the movie booking application as a user.
- Register or log in to start booking tickets.

- **Admin Access**:
- Admin functionalities are available under `/admin` routes.
- Admin can manage movies, time slots, and view all bookings.

---

Happy Coding! 🎉