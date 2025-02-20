Quantam Talk - Real-Time Chat Application

AIM

Developed a real-time chat application using the MERN stack and Socket.io, enabling seamless one-on-one messaging with real-time updates, media sharing, and online status tracking to enhance user communication.

Features

🛠 Full-Stack Development

Built using the MERN stack (MongoDB, Express.js, React, Node.js) for smooth and efficient communication.

Utilized Socket.io for real-time, bidirectional event-based communication.

🔐 Secure Authentication

Implemented JWT (JSON Web Token) for secure user authentication.

Used Express Validator for robust input validation to prevent security vulnerabilities.

🎨 UI Enhancement

Integrated DaisyUI with React to provide a visually appealing and customizable user interface.

Supports 32 DaisyUI themes, allowing users to personalize their chat experience.

⚡ Real-Time Messaging & Media Sharing

Instant one-on-one messaging powered by Socket.io.

Cloudinary API integration for seamless image uploads and media sharing.

👤 User Profile Customization

Users can change their profile picture to personalize their account.

👥 User Presence Tracking

Developed a backend system that maps User-ID to Socket-ID in a dictionary.

Ensured accurate online/offline status tracking by storing user data upon connection and removing it upon disconnection.

Installation & Setup

🔧 Backend Setup

Clone the repository:

git clone <https://github.com/Anshuk147/Real-Time-Chat-Application.git>
cd backend

Install dependencies:

npm install

Set up environment variables (.env file):

PORT=3000
MONGODB=mongodb://localhost:27017/MernChatApp
JWT_SECRET=
process.env.NODE_ENV=development
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NODE_ENV=production

Start the backend server:

npm start

💻 Frontend Setup

Navigate to the frontend directory:

cd frontend

Install dependencies:

npm install

Start the frontend server:

npm start

🚀 Technologies Used

MongoDB - NoSQL database for storing messages and user data.

Express.js - Backend framework for handling API requests.

React.js - Frontend framework for building a dynamic UI.

Node.js - JavaScript runtime for server-side execution.

Socket.io - Enables real-time, bidirectional communication.

Cloudinary - Cloud-based image and media storage.

JWT - Secure authentication mechanism.

DaisyUI - UI component library for an enhanced visual experience, supporting 32 themes.

📌 Future Enhancements

Group chat functionality.

Message reactions and typing indicators.

End-to-end encryption for secure conversations.

Push notifications for new messages.

📞 Contact

For any queries or contributions, feel free to reach out!

⚡ Quantam Talk - The future of seamless communication! 🚀

