// data/fullstackRoadmap.ts
import { RoadmapStep } from "@/types";

// export type FullstackTopicPath =
//   | 'frontend'
//   | 'backend'
//   | 'devops'
//   | 'security'
//   | 'architecture'
//   | 'deploy';

export const fullstackRoadmap: RoadmapStep[] = [
  {
    title: "Frontend Foundation",
    description: "Understand HTML, CSS, JavaScript, and React basics.",
    path: 'frontend',
  },
  {
    title: "Backend Mastery",
    description: "Build scalable APIs using Node.js, Express, and databases.",
    path: 'backend',
  },
  {
    title: "DevOps Essentials",
    description: "Learn CI/CD, Docker, and deployment workflows.",
    path: 'devops',
  },
  {
    title: "Security Practices",
    description: "Understand HTTPS, CORS, rate limiting, and encryption.",
    path: 'security',
  },
  {
    title: "App Architecture",
    description: "Learn MVC, microservices, and scalable code patterns.",
    path: 'architecture',
  },
  {
    title: "Deployment & Hosting",
    description: "Deploy apps on Vercel, Heroku, Netlify, or cloud platforms.",
    path: 'deploy',
  },
];
