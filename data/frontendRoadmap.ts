export type TopicPath = 'html' | 'css' | 'javascript' | 'react' | 'libraries' | 'styling';
import { RoadmapStep } from "@/types";

// export interface RoadmapStep {
//   title: string;
//   description: string;
//   path: TopicPath;
// }

export const frontendRoadmap: RoadmapStep[] = [
  {
    title: "HTML",
    description: "Structure the web using tags like <div>, <h1>, <p>.",
    path: "html",
  },
  {
    title: "CSS",
    description: "Style your page layout, color, fonts.",
    path: "css",
  },
  {
    title: "JavaScript",
    description: "Add interactivity using JS, DOM, events.",
    path: "javascript",
  },
  {
    title: "React",
    description: "Build UI using reusable components.",
    path: "react",
  },
  {
    title: "Libraries",
    description: "Redux, Axios, React Router, etc.",
    path: "libraries",
  },
  {
    title: "Styling Tools",
    description: "Tailwind CSS, Bootstrap, Sass.",
    path: "styling",
  },
];
