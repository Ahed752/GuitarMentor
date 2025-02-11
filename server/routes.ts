import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertPracticeSessionSchema } from "@shared/schema";

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

  const httpServer = createServer(app);
  return httpServer;
}
