// data/backendRoadmap.ts
import { RoadmapStep } from "@/types";

// export type BackendTopicPath =
//   | 'node'
//   | 'express'
//   | 'database'
//   | 'authentication'
//   | 'api'
//   | 'errorHandling';

export const backendRoadmap: RoadmapStep[] = [
  {
    title: "Node.js Basics",
    description: "Understand core Node concepts like event loop, modules, and file system.",
    path: 'node',
  },
  {
    title: "Express.js Framework",
    description: "Learn routing, middleware, and setting up a basic server.",
    path: 'express',
  },
  {
    title: "Database Integration",
    description: "Connect your app to MongoDB, MySQL, or PostgreSQL.",
    path: 'database',
  },
  {
    title: "Authentication",
    description: "Handle login, signup, JWT, OAuth, and session management.",
    path: 'authentication',
  },
  {
    title: "RESTful APIs",
    description: "Build and test clean APIs for client-server communication.",
    path: 'api',
  },
  {
    title: "Error Handling & Logs",
    description: "Manage errors and logs using best practices and libraries.",
    path: 'errorHandling',
  },
];
