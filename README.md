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
