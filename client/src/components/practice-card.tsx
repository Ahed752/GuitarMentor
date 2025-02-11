import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlayIcon, SquareIcon } from "lucide-react";

interface PracticeCardProps {
  onComplete: (data: { duration: number; notes: string }) => void;
}

export function PracticeCard({ onComplete }: PracticeCardProps) {
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [notes, setNotes] = useState("");

  const startPractice = () => {
    setIsTracking(true);
    setStartTime(Date.now());
  };

  const endPractice = () => {
    if (!startTime) return;
    const duration = Math.round((Date.now() - startTime) / 60000); // Convert to minutes
    setIsTracking(false);
    setStartTime(null);
    onComplete({ duration, notes });
    setNotes("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Track Practice Session</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            placeholder="Session notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <Button
            className="w-full"
            size="lg"
            variant={isTracking ? "destructive" : "default"}
            onClick={isTracking ? endPractice : startPractice}
          >
            {isTracking ? (
              <>
                <SquareIcon className="w-4 h-4 mr-2" />
                End Practice
              </>
            ) : (
              <>
                <PlayIcon className="w-4 h-4 mr-2" />
                Start Practice
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}