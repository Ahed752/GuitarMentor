export interface Chord {
  name: string;
  fingering: number[];
  notes: string[];
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  commonUses: string[];
}

export const CHORDS: Chord[] = [
  {
    name: "A",
    fingering: [0, 0, 2, 2, 2, 0],
    notes: ["A2", "E3", "A3", "C#4", "E4"],
    description: "A major chord - one of the most common and essential chords in guitar playing.",
    difficulty: "beginner",
    commonUses: ["Country music", "Folk songs", "Pop songs", "Key of A progressions"],
  },
  {
    name: "D",
    fingering: [2, 3, 2, 0, 0, 0],
    notes: ["D3", "A3", "D4", "F#4"],
    description: "D major chord - frequently used in many popular songs and essential for beginners.",
    difficulty: "beginner",
    commonUses: ["Folk music", "Country songs", "Basic chord progressions", "Worship music"],
  },
  {
    name: "G",
    fingering: [3, 2, 0, 0, 0, 3],
    notes: ["G2", "B2", "D3", "G3", "B3", "G4"],
    description: "G major chord - a fundamental chord that forms the basis of many progressions.",
    difficulty: "beginner",
    commonUses: ["Pop music", "Folk songs", "Country music", "Basic G-C-D progression"],
  },
  {
    name: "C",
    fingering: [0, 1, 0, 2, 3, 0],
    notes: ["C3", "E3", "G3", "C4", "E4"],
    description: "C major chord - one of the first chords beginners learn, used in countless songs.",
    difficulty: "beginner",
    commonUses: ["Pop songs", "Folk music", "Basic chord progressions", "Beginner songs"],
  },
  {
    name: "Em",
    fingering: [0, 0, 0, 2, 2, 0],
    notes: ["E2", "B2", "E3", "G3", "B3", "E4"],
    description: "E minor chord - the most common minor chord for beginners, adds emotional depth.",
    difficulty: "beginner",
    commonUses: ["Rock music", "Blues", "Emotional passages", "Minor progressions"],
  },
  {
    name: "Am",
    fingering: [0, 1, 2, 2, 0, 0],
    notes: ["A2", "E3", "A3", "C4", "E4"],
    description: "A minor chord - essential minor chord that adds melancholy to progressions.",
    difficulty: "beginner",
    commonUses: ["Rock songs", "Sad songs", "Minor key progressions", "Spanish guitar"],
  }
];