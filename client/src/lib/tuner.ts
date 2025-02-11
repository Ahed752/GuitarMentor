interface TunerOptions {
  onPitch?: (frequency: number) => void;
  onError?: (error: Error) => void;
}

export class Tuner {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private mediaStream: MediaStream | null = null;
  private animationFrame: number | null = null;
  private options: TunerOptions;

  constructor(options: TunerOptions = {}) {
    this.options = options;
  }

  async start() {
    try {
      this.audioContext = new AudioContext();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaStream = stream;

      const source = this.audioContext.createMediaStreamSource(stream);
      source.connect(this.analyser);

      this.update();
    } catch (error) {
      this.options.onError?.(error as Error);
    }
  }

  stop() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }

    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }

  private update = () => {
    if (!this.analyser || !this.options.onPitch) return;

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);
    this.analyser.getFloatTimeDomainData(dataArray);

    const pitch = this.detectPitch(dataArray);
    if (pitch) {
      this.options.onPitch(pitch);
    }

    this.animationFrame = requestAnimationFrame(this.update);
  };

  private detectPitch(buffer: Float32Array): number | null {
    // Autocorrelation-based pitch detection
    const sampleRate = this.audioContext!.sampleRate;
    let maxCorrelation = 0;
    let foundPitch = null;

    // Look for peaks in autocorrelation
    for (let lag = 0; lag < buffer.length / 2; lag++) {
      let correlation = 0;

      for (let i = 0; i < buffer.length / 2; i++) {
        correlation += buffer[i] * buffer[i + lag];
      }

      if (correlation > maxCorrelation) {
        maxCorrelation = correlation;
        foundPitch = sampleRate / lag;
      }
    }

    // Filter out unrealistic guitar frequencies (below 70Hz or above 1000Hz)
    if (foundPitch && foundPitch > 70 && foundPitch < 1000) {
      return foundPitch;
    }

    return null;
  }
}

export const STANDARD_TUNING = [
  { note: 'E2', frequency: 82.41 },
  { note: 'A2', frequency: 110.00 },
  { note: 'D3', frequency: 146.83 },
  { note: 'G3', frequency: 196.00 },
  { note: 'B3', frequency: 246.94 },
  { note: 'E4', frequency: 329.63 },
];

export function getClosestNote(frequency: number) {
  let closestNote = STANDARD_TUNING[0];
  let smallestDifference = Math.abs(Math.log2(frequency / STANDARD_TUNING[0].frequency));

  for (const note of STANDARD_TUNING) {
    const difference = Math.abs(Math.log2(frequency / note.frequency));
    if (difference < smallestDifference) {
      smallestDifference = difference;
      closestNote = note;
    }
  }

  // Calculate cents difference
  const cents = 1200 * Math.log2(frequency / closestNote.frequency);
  return { ...closestNote, cents };
}
