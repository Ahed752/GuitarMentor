import { VideoLesson } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";
import { Link } from "wouter";

interface VideoLessonCardProps {
  lesson: VideoLesson;
}

export function VideoLessonCard({ lesson }: VideoLessonCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{lesson.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lesson.thumbnailUrl && (
            <img
              src={lesson.thumbnailUrl}
              alt={lesson.title}
              className="w-full aspect-video object-cover rounded-md"
            />
          )}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Duration: {lesson.durationMinutes} mins</span>
            <span className="capitalize">{lesson.difficulty}</span>
          </div>
          <p className="text-sm">{lesson.description}</p>
          <Link href={`/lessons/${lesson.id}`}>
            <Button className="w-full">
              <PlayIcon className="w-4 h-4 mr-2" />
              Start Lesson
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
