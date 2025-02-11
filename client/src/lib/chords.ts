export interface Chord {
  name: string;
  fingering: number[];
  notes: string[];
}

export const CHORDS: Chord[] = [
  {
    name: "A",
    fingering: [0, 0, 2, 2, 2, 0],
    notes: ["A2", "E3", "A3", "C#4", "E4"],
  },
  {
    name: "D",
    fingering: [2, 3, 2, 0, 0, 0],
    notes: ["D3", "A3", "D4", "F#4"],
  },
  {
    name: "G",
    fingering: [3, 2, 0, 0, 0, 3],
    notes: ["G2", "B2", "D3", "G3", "B3", "G4"],
  },
  {
    name: "C",
    fingering: [0, 1, 0, 2, 3, 0],
    notes: ["C3", "E3", "G3", "C4", "E4"],
  },
  {
    name: "Em",
    fingering: [0, 0, 0, 2, 2, 0],
    notes: ["E2", "B2", "E3", "G3", "B3", "E4"],
  },
  {
    name: "Am",
    fingering: [0, 1, 2, 2, 0, 0],
    notes: ["A2", "E3", "A3", "C4", "E4"],
  }
];
