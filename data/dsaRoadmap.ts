// data/dsaRoadmap.ts
import { RoadmapStep } from "@/types";

// export type DSATopicPath =
//   | 'arrays'
//   | 'strings'
//   | 'recursion'
//   | 'linkedlists'
//   | 'trees'
//   | 'graphs'
//   | 'dp';

export const dsaRoadmap: RoadmapStep[] = [
  {
    title: 'Arrays & Hashing',
    description: 'Understand basic data structures, frequency maps, and two pointers.',
    path: 'arrays',
  },
  {
    title: 'Strings',
    description: 'Manipulate substrings, anagrams, palindromes and sliding window.',
    path: 'strings',
  },
  {
    title: 'Recursion & Backtracking',
    description: 'Master recursion tree, subsets, permutations, and backtracking.',
    path: 'recursion',
  },
  {
    title: 'Linked Lists',
    description: 'Work with singly, doubly, and circular linked lists.',
    path: 'linkedlists',
  },
  {
    title: 'Trees',
    description: 'Learn binary trees, DFS, BFS, and tree traversals.',
    path: 'trees',
  },
  {
    title: 'Graphs',
    description: 'Implement BFS, DFS, cycle detection, and shortest paths.',
    path: 'graphs',
  },
  {
    title: 'Dynamic Programming',
    description: 'Solve subproblems using memoization and tabulation.',
    path: 'dp',
  },
];
