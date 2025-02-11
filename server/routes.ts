import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertPracticeSessionSchema, insertVideoLessonSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  app.post("/api/practice", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const data = insertPracticeSessionSchema.parse(req.body);
    const session = await storage.createPracticeSession({
      ...data,
      userId: req.user.id,
    });
    res.json(session);
  });

  app.get("/api/practice", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const sessions = await storage.getPracticeSessions(req.user.id);
    res.json(sessions);
  });

  // Video lesson routes
  app.get("/api/lessons", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const lessons = await storage.getVideoLessons();
    res.json(lessons);
  });

  app.get("/api/lessons/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const lesson = await storage.getVideoLesson(parseInt(req.params.id));
    if (!lesson) return res.sendStatus(404);
    res.json(lesson);
  });

  app.post("/api/lessons", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const data = insertVideoLessonSchema.parse(req.body);
    const lesson = await storage.createVideoLesson(data);
    res.json(lesson);
  });

  const httpServer = createServer(app);
  return httpServer;
}