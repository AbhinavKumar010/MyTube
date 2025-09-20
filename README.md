<<<<<<< HEAD
youtube-clone/
│── backend/                  # Express + MongoDB (API server)
│   ├── src/
│   │   ├── config/           # DB, cloud config
│   │   │   └── db.js
│   │   │   └── cloud.js
│   │   ├── models/           # Mongoose schemas
│   │   │   └── User.js
│   │   │   └── Video.js
│   │   │   └── Comment.js
│   │   │   └── Like.js
│   │   ├── controllers/      # Business logic
│   │   │   └── auth.controller.js
│   │   │   └── video.controller.js
│   │   │   └── comment.controller.js
│   │   │   └── user.controller.js
│   │   ├── routes/           # API routes
│   │   │   └── auth.routes.js
│   │   │   └── video.routes.js
│   │   │   └── comment.routes.js
│   │   │   └── user.routes.js
│   │   ├── middlewares/      # Auth, error handling, uploads
│   │   │   └── auth.middleware.js
│   │   │   └── error.middleware.js
│   │   │   └── upload.middleware.js
│   │   ├── jobs/             # Background workers
│   │   │   └── video.job.js
│   │   │   └── thumbnail.job.js
│   │   ├── utils/            # Helpers
│   │   │   └── generateToken.js
│   │   │   └── s3Upload.js
│   │   │   └── ffmpegHelper.js
│   │   ├── app.js            # Express app config
│   │   └── server.js         # Start server
│   │
│   ├── .env
│   ├── package.json
│   └── README.md
│
│── frontend/                 # React + Vite (UI)
│   ├── public/               # Static files (logo, icons)
│   ├── src/
│   │   ├── assets/           # Images, CSS
│   │   ├── components/       # Navbar, Sidebar, VideoCard, etc.
│   │   ├── pages/            # Home, VideoPlayer, Upload, Login, Register
│   │   ├── context/          # AuthContext, ThemeContext
│   │   ├── hooks/            # useAuth, useFetch
│   │   ├── services/         # API calls (axios)
│   │   │   └── api.js
│   │   ├── App.jsx           # Root routes
│   │   ├── main.jsx          # Entry point
│   │   └── index.css
│   │
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
│
│── .gitignore
│── README.md
=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
>>>>>>> 87242f82151e73030e84310ec42fa8acb9aaa44f
