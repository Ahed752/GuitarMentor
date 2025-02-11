import { useQuery } from "@tanstack/react-query";
import { VideoLesson } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeftIcon } from "lucide-react";
import { Link, useRoute } from "wouter";

export default function LessonPage() {
  const [, params] = useRoute("/lessons/:id");
  const lessonId = params?.id;

  const { data: lesson } = useQuery<VideoLesson>({
    queryKey: [`/api/lessons/${lessonId}`],
    enabled: !!lessonId,
  });

  if (!lesson) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="ghost" className="pl-0">
              <ChevronLeftIcon className="w-4 h-4 mr-2" />
              Back to Lessons
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>

          <Card className="mb-8">
            <CardContent className="p-0">
              <div className="aspect-video">
                <iframe
                  src={lesson.videoUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div>
              <h2 className="font-semibold mb-2">About this lesson</h2>
              <p className="text-muted-foreground">{lesson.description}</p>
            </div>

            <div className="flex gap-4 text-sm text-muted-foreground">
              <div>
                <span className="font-medium text-foreground">Duration: </span>
                {lesson.durationMinutes} minutes
              </div>
              <div>
                <span className="font-medium text-foreground">Difficulty: </span>
                <span className="capitalize">{lesson.difficulty}</span>
              </div>
              <div>
                <span className="font-medium text-foreground">Category: </span>
                <span className="capitalize">{lesson.category}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
