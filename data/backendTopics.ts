export const topicDetails = {
  node: {
    title: "Node.js - Backend JS Runtime",
    description: "Use JavaScript on the server side to build backend apps.",
    learn: ["Event Loop", "Modules", "fs", "http", "npm"],
    realWorld: "Used in building APIs, real-time apps, CLIs.",
    project: "Build a CLI-based calculator or file reader.",
    links: [
      { label: "Node.js Docs", url: "https://nodejs.org/en/docs" }
    ]
  },
  express: {
    title: "Express - Node Web Framework",
    description: "Minimal and flexible Node.js web framework for building APIs.",
    learn: ["Routing", "Middleware", "Controllers", "Error Handling"],
    realWorld: "Used to build REST APIs, web servers.",
    project: "Build a REST API for a todo app.",
    links: [
      { label: "Express Guide", url: "https://expressjs.com/" }
    ]
  },
  database: {
    title: "Database Integration",
    description: "Learn how to connect backend apps to a database.",
    learn: ["MongoDB", "Mongoose", "MySQL", "PostgreSQL"],
    realWorld: "Used for data storage in all full stack apps.",
    project: "Connect your todo app to MongoDB.",
    links: [
      { label: "MongoDB Docs", url: "https://www.mongodb.com/docs/" }
    ]
  },
  authentication: {
    title: "User Authentication",
    description: "Secure your app with login/signup and user identity.",
    learn: ["JWT", "OAuth", "Passport.js", "Sessions"],
    realWorld: "Used in all apps with user accounts.",
    project: "Build auth for your todo app.",
    links: [
      { label: "JWT Auth Tutorial", url: "https://www.youtube.com/watch?v=mbsmsi7l3r4" }
    ]
  },
  api: {
    title: "REST API Design",
    description: "Build clean APIs with routes, methods, status codes, and versioning.",
    learn: ["GET/POST/PUT/DELETE", "Status Codes", "CRUD APIs"],
    realWorld: "Used to build client-server architecture.",
    project: "Build a blog API with CRUD routes.",
    links: [
      { label: "RESTful Guide", url: "https://restfulapi.net/" }
    ]
  },
  errorHandling: {
    title: "Error Handling & Logging",
    description: "Handle server errors gracefully and log info for debugging.",
    learn: ["try/catch", "custom error classes", "winston", "morgan"],
    realWorld: "Used in production for debugging and maintenance.",
    project: "Add error handling to your API with logs.",
    links: [
      { label: "Winston Logger", url: "https://github.com/winstonjs/winston" }
    ]
  }
};
