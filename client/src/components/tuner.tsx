import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { Tuner, getClosestNote, STANDARD_TUNING } from "@/lib/tuner";

export function TunerComponent() {
  const [isListening, setIsListening] = useState(false);
  const [tuner, setTuner] = useState<Tuner | null>(null);
  const [currentNote, setCurrentNote] = useState<{
    note: string;
    frequency: number;
    cents: number;
  } | null>(null);

  useEffect(() => {
    const newTuner = new Tuner({
      onPitch: (frequency) => {
        const note = getClosestNote(frequency);
        setCurrentNote({ ...note, frequency });
      },
      onError: (error) => {
        console.error("Tuner error:", error);
        setIsListening(false);
      },
    });

    setTuner(newTuner);

    return () => {
      newTuner.stop();
    };
  }, []);

  const toggleTuner = async () => {
    if (!tuner) return;

    if (isListening) {
      tuner.stop();
      setIsListening(false);
      setCurrentNote(null);
    } else {
      await tuner.start();
      setIsListening(true);
    }
  };

  // Calculate the color based on how close to the target pitch
  const getTuningColor = (cents: number) => {
    const absCents = Math.abs(cents);
    if (absCents < 5) return "text-green-500";
    if (absCents < 15) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Guitar Tuner
          <Button
            variant={isListening ? "destructive" : "default"}
            size="icon"
            onClick={toggleTuner}
          >
            {isListening ? (
              <MicOff className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Current note display */}
          <div className="text-center">
            {currentNote ? (
              <>
                <div className="text-6xl font-bold mb-2">{currentNote.note}</div>
                <div className={`text-xl ${getTuningColor(currentNote.cents)}`}>
                  {currentNote.cents > 0 ? "♯" : "♭"} {Math.abs(Math.round(currentNote.cents))} cents
                </div>
              </>
            ) : (
              <div className="text-muted-foreground">
                {isListening ? "Play a note..." : "Click the microphone to start tuning"}
              </div>
            )}
          </div>

          {/* Tuning guide */}
          <div className="grid grid-cols-6 gap-2">
            {STANDARD_TUNING.map((note) => (
              <div
                key={note.note}
                className={`text-center p-2 rounded-md ${
                  currentNote?.note === note.note
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {note.note}
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="text-sm text-muted-foreground">
            <h4 className="font-medium mb-2">How to use:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Click the microphone button to start</li>
              <li>Play a single string</li>
              <li>Adjust the tuning peg until the note is in tune (green)</li>
              <li>Repeat for each string</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
