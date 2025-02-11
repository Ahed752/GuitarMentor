import type { Chord } from "./chords";

let audioContext: AudioContext | null = null;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

function noteToFrequency(note: string): number {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const octave = parseInt(note.slice(-1));
  const noteIndex = notes.indexOf(note.slice(0, -1));
  return 440 * Math.pow(2, (noteIndex - 9) / 12 + (octave - 4));
}

export async function playChord(chord: Chord) {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  chord.notes.forEach((note, i) => {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    
    oscillator.type = 'triangle';
    oscillator.frequency.value = noteToFrequency(note);
    
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
    
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    
    oscillator.start(now);
    oscillator.stop(now + 1.5);
  });
}
