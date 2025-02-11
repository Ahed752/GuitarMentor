import { VideoLesson } from "@shared/schema";

export const SAMPLE_LESSONS: Omit<VideoLesson, "id">[] = [
  {
    title: "Getting Started with Guitar - Basic Chords",
    description: "Learn your first guitar chords (A, D, and G) with proper finger placement and transitions.",
    videoUrl: "https://www.youtube.com/embed/watch?v=5iYxQCBYxDM",
    thumbnailUrl: "https://img.youtube.com/vi/5iYxQCBYxDM/maxresdefault.jpg",
    difficulty: "beginner",
    category: "basics",
    durationMinutes: 15
  },
  {
    title: "Strumming Patterns for Beginners",
    description: "Master essential strumming patterns that will help you play countless songs.",
    videoUrl: "https://www.youtube.com/embed/watch?v=kV0rhFeL8Gs",
    thumbnailUrl: "https://img.youtube.com/vi/kV0rhFeL8Gs/maxresdefault.jpg",
    difficulty: "beginner",
    category: "technique",
    durationMinutes: 20
  },
  {
    title: "Basic Music Theory for Guitar",
    description: "Understanding scales, chord progressions, and how they work together.",
    videoUrl: "https://www.youtube.com/embed/watch?v=watch?v=qeS8txkoUH4",
    thumbnailUrl: "https://img.youtube.com/vi/qeS8txkoUH4/maxresdefault.jpg",
    difficulty: "intermediate",
    category: "theory",
    durationMinutes: 25
  }
];
