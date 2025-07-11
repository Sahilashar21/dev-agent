export const topicDetails = {
  frontend: {
    title: "Frontend Basics",
    description: "Build the user interface with HTML, CSS, JS, and frameworks.",
    learn: ["Responsive Layout", "Interactivity", "APIs"],
    realWorld: "Used in all full stack apps.",
    project: "Build a portfolio that consumes an API.",
    links: [{ label: "Frontend Roadmap", url: "https://roadmap.sh/frontend" }]
  },
  backend: {
    title: "Backend Logic",
    description: "Write the server code to handle requests, databases, and APIs.",
    learn: ["Node.js", "Express", "Database", "Auth"],
    realWorld: "Server-side logic in full stack apps.",
    project: "Create a blog backend.",
    links: [{ label: "Backend Roadmap", url: "https://roadmap.sh/backend" }]
  },
  devops: {
    title: "DevOps & Deployment",
    description: "Host and manage backend/frontend apps in production.",
    learn: ["CI/CD", "GitHub Actions", "Docker", "Vercel", "Heroku"],
    realWorld: "Used for hosting, automation, scaling apps.",
    project: "Deploy your full stack app on Render or Railway.",
    links: [{ label: "Deploy Node App", url: "https://www.youtube.com/watch?v=71wSzpLyW9k" }]
  },
  security: {
    title: "Web Security",
    description: "Secure your app against common attacks and handle data safely.",
    learn: ["HTTPS", "CORS", "Rate Limiting", "Helmet.js"],
    realWorld: "Must-have for user trust and compliance.",
    project: "Secure your app using helmet and JWTs.",
    links: [{ label: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/" }]
  },
  architecture: {
    title: "App Architecture",
    description: "Learn scalable patterns for building robust apps.",
    learn: ["MVC", "Microservices", "Clean Code"],
    realWorld: "Used in large teams and scalable products.",
    project: "Refactor your app to follow MVC.",
    links: [{ label: "Clean Architecture", url: "https://youtu.be/o_TH-Y78tt4" }]
  },
  deploy: {
    title: "Deployment & Hosting",
    description: "Make your app publicly accessible with cloud platforms.",
    learn: ["Netlify", "Vercel", "Firebase", "GitHub Pages"],
    realWorld: "Final step for product delivery.",
    project: "Deploy your frontend + backend full stack app.",
    links: [{ label: "Vercel Docs", url: "https://vercel.com/docs" }]
  }
};
