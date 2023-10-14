# Express Message Board Web Application

This is a simple message board web application built with Express.js, MongoDB, and Passport.js for user authentication. Users can create accounts, sign up, log in, and post messages. The application includes role-based access control: 

- **Members** can see both the message content and the authors of the messages.
- **Non-members** can see the message content and the time of the messages.
- **Admins** have the additional privilege of being able to delete messages.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [User Registration](#user-registration)
  - [User Login](#user-login)
  - [Posting Messages](#posting-messages)
  - [Admin Features](#admin-features)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Utilizes Passport.js for user registration and authentication.
- **Role-Based Access Control**:
  - **Members**: Can view authors of messages.
  - **Non-Members**: Can only view message content and time.
  - **Admins**: Can delete messages.
- **Message Posting**: Users can post messages with timestamps.
- **MongoDB Storage**: Utilizes MongoDB to store user data and messages.

## Getting Started

### Prerequisites

Make sure you have the following software installed on your system:

- [Node.js](https://nodejs.org/) and npm
- [MongoDB](https://www.mongodb.com/) (Make sure MongoDB server is up and running)

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/asdhamidi/Da-Club.git
   ```

2. Install the project dependencies:

   ```bash
   cd Da-Club
   npm install
   ```

3. Set up environment variables: Create a `.env` file in the project root and add the following configuration:

   ```
   MONGODB_URI=your_mongodb_uri
   ADMIN_CODE=your_admin_code
   MEMBER_CODE=your_member_code
   ```

   Replace `your_mongodb_uri`, `your_session_secret`, `your_admin_code`, and `your_member_code` with your actual values.

4. Start the application:

   ```bash
   npm start
   ```

The application should now be running locally. You can access it by opening your web browser and navigating to `http://localhost:3000`.

## Usage

### User Registration

1. Access the application in your web browser.
2. Click on the "Sign Up" link to create a new account.
3. Fill in the required information (first name, surname, username, and password).
4. Submit the form to register your account.

### User Login

1. Click on the "Login" link.
2. Enter your username and password.
3. Click the "Login" button to access the message board.

### Posting Messages

1. After logging in, you can post messages by entering your message text and clicking the "Post" button.
2. Your messages will be displayed with your username and a timestamp.

### Admin Features

Admins have the additional privilege of being able to delete messages:

1. To access admin functionality, you need to sign up as an admin (using the `ADMIN_CODE`).
2. Log in as an admin, and you will see a "Delete" button next to each message.
3. Click the "Delete" button to delete a message.

## Tech Stack

- **Node.js** and **Express.js** for building the web application.
- **MongoDB** for data storage.
- **Passport.js** for user authentication.
- **EJS** for rendering dynamic web pages.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please create a GitHub issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.