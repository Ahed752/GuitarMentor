import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { VolumeIcon } from "lucide-react";
import { playChord } from "@/lib/audio";
import type { Chord } from "@/lib/chords";
import { Badge } from "@/components/ui/badge";

export function ChordDiagram({ chord }: { chord: Chord }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = svgRef.current;

    // Clear previous content
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    // Draw fretboard
    for (let i = 0; i <= 5; i++) {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", "40");
      line.setAttribute("y1", (i * 40 + 40).toString());
      line.setAttribute("x2", "200");
      line.setAttribute("y2", (i * 40 + 40).toString());
      line.setAttribute("stroke", "currentColor");
      line.setAttribute("stroke-width", i === 0 ? "4" : "2");
      svg.appendChild(line);
    }

    // Draw strings
    for (let i = 0; i < 6; i++) {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", (i * 32 + 40).toString());
      line.setAttribute("y1", "40");
      line.setAttribute("x2", (i * 32 + 40).toString());
      line.setAttribute("y2", "240");
      line.setAttribute("stroke", "currentColor");
      line.setAttribute("stroke-width", "2");
      svg.appendChild(line);
    }

    // Draw finger positions
    chord.fingering.forEach((fret, string) => {
      if (fret === 0) return;
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", (string * 32 + 40).toString());
      circle.setAttribute("cy", (fret * 40 + 20).toString());
      circle.setAttribute("r", "15");
      circle.setAttribute("fill", "hsl(var(--primary))");
      svg.appendChild(circle);
    });
  }, [chord]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Badge variant={
          chord.difficulty === "beginner" ? "default" :
          chord.difficulty === "intermediate" ? "secondary" : "destructive"
        }>
          {chord.difficulty}
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        {chord.description}
      </p>

      <svg
        ref={svgRef}
        viewBox="0 0 240 280"
        className="w-full max-w-md mx-auto"
      />

      <div className="space-y-4">
        <Button
          className="w-full"
          onClick={() => playChord(chord)}
          size="lg"
        >
          <VolumeIcon className="w-4 h-4 mr-2" />
          Play Chord
        </Button>

        <div className="mt-4">
          <h4 className="font-medium mb-2">Common Uses:</h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            {chord.commonUses.map((use, index) => (
              <li key={index}>{use}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}