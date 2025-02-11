import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MusicIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/schema";
import { Redirect } from "wouter";

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const loginForm = useForm({
    resolver: zodResolver(insertUserSchema),
  });
  const registerForm = useForm({
    resolver: zodResolver(insertUserSchema),
  });

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-6">
              <MusicIcon className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">Guitar Learning Platform</h1>
            </div>

            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={loginForm.handleSubmit((data) => loginMutation.mutate(data))}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input {...loginForm.register("username")} />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input type="password" {...loginForm.register("password")} />
                    </div>
                    <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
                      Login
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={registerForm.handleSubmit((data) => registerMutation.mutate(data))}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input {...registerForm.register("username")} />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input type="password" {...registerForm.register("password")} />
                    </div>
                    <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
                      Register
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="hidden lg:flex flex-1 bg-primary items-center justify-center p-8">
        <div className="max-w-md text-primary-foreground">
          <h2 className="text-3xl font-bold mb-4">Start Your Guitar Journey Today</h2>
          <ul className="space-y-4">
            <li>• Interactive chord library with audio playback</li>
            <li>• Track your practice sessions and progress</li>
            <li>• Earn achievements and maintain practice streaks</li>
            <li>• Access curated video tutorials and lessons</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
