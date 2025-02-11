import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation } from "@tanstack/react-query";
import { PracticeSession } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ChordDiagram } from "@/components/chord-diagram";
import { PracticeCard } from "@/components/practice-card";
import { CHORDS } from "@/lib/chords";
import { useState } from "react";

export default function HomePage() {
  const { user, logoutMutation } = useAuth();
  const [selectedChord, setSelectedChord] = useState(CHORDS[0]);

  const { data: practiceSessions } = useQuery<PracticeSession[]>({
    queryKey: ["/api/practice"],
  });

  const practiceMutation = useMutation({
    mutationFn: async (data: { duration: number; notes: string }) => {
      const res = await apiRequest("POST", "/api/practice", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/practice"] });
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Guitar Learning Platform</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, {user?.username}</span>
            <Button variant="outline" onClick={() => logoutMutation.mutate()}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="chords">
          <TabsList className="mb-8">
            <TabsTrigger value="chords">Chord Library</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="chords">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Chord Library</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {CHORDS.map((chord) => (
                      <Button
                        key={chord.name}
                        variant={chord === selectedChord ? "default" : "outline"}
                        onClick={() => setSelectedChord(chord)}
                      >
                        {chord.name}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{selectedChord.name} Chord</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChordDiagram chord={selectedChord} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="practice">
            <div className="grid md:grid-cols-3 gap-8">
              <PracticeCard onComplete={(data) => practiceMutation.mutate(data)} />
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Total Practice Time</div>
                      <div className="text-2xl font-bold">{user?.totalPracticeMinutes} minutes</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Current Streak</div>
                      <div className="text-2xl font-bold">{user?.currentStreak} days</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {practiceSessions?.map((session) => (
                      <div key={session.id} className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{session.duration} minutes</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(session.date).toLocaleDateString()}
                          </div>
                        </div>
                        {session.notes && (
                          <div className="text-sm text-muted-foreground">{session.notes}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
