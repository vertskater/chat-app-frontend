# Mini Chat App Frontend

This is the frontend for the Mini Chat App, built with **Vite**, **React**, and **TypeScript**. The app allows users to register, log in, and participate in real-time chat rooms. It communicates with the backend via **socket.io-client** for real-time chat functionality and uses **react-router-dom** for client-side routing.

## Features

- **User Authentication**: Login, logout, and register functionality.
- **Real-Time Chat**: Join chat rooms and send/receive messages in real time using **socket.io-client**.
- **Room Management**: Switch between different chat rooms.
- **Responsive UI**: A clean and intuitive user interface optimized for desktop and mobile devices.

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: To ensure type safety and better developer experience.
- **Vite**: For fast builds and hot module replacement during development.
- **socket.io-client**: For real-time communication with the backend.
- **react-router-dom**: For client-side routing.
- **CSS**: Custom styling for components.

## Installation and Setup

Follow these steps to get the frontend running on your local machine:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/chat-app-frontend.git
   cd chat-app-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add the following variables:

   ```env
   VITE_BACKEND_URL=http://localhost:3000
   ```

   Replace `http://localhost:3000` with your backend URL if different.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and go to `http://localhost:5173`.

## Folder Structure

```
src/
├── components/          # Reusable React components (e.g., Chat, Login, Register)
├── hooks/               # Custom hooks (if any)
├── pages/               # Top-level pages for react-router-dom
├── styles/              # CSS/SCSS files for styling
├── App.tsx              # Root component
├── main.tsx             # Entry point of the app
└── vite-env.d.ts        # Vite environment typing
```

## Available Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run preview`: Preview the production build.

## Usage

1. **Register a new user**:

    - Fill in the registration form with your details.
    - Submit to create a new account.

2. **Login**:

    - Use your registered credentials to log in.
    - Upon successful login, you will be redirected to the chat room.

3. **Chat**:

    - Join the `general` chat room or switch to a different room.
    - Type messages and send them in real time.
    - Messages will automatically appear for all users in the room.

4. **Logout**:

    - Use the logout button to end your session.

## Contributing

If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are welcome.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Socket.IO](https://socket.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [react-router-dom](https://reactrouter.com/)

