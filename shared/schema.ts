import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  totalPracticeMinutes: integer("total_practice_minutes").notNull().default(0),
  currentStreak: integer("current_streak").notNull().default(0),
  longestStreak: integer("longest_streak").notNull().default(0),
});

export const practiceSessions = pgTable("practice_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  duration: integer("duration").notNull(),
  date: timestamp("date").notNull().defaultNow(),
  notes: text("notes"),
});

export const videoLessons = pgTable("video_lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  videoUrl: text("video_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  difficulty: text("difficulty").notNull(),
  category: text("category").notNull(),
  durationMinutes: integer("duration_minutes").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPracticeSessionSchema = createInsertSchema(practiceSessions).pick({
  duration: true,
  notes: true,
});

export const insertVideoLessonSchema = createInsertSchema(videoLessons).pick({
  title: true,
  description: true,
  videoUrl: true,
  thumbnailUrl: true,
  difficulty: true,
  category: true,
  durationMinutes: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type PracticeSession = typeof practiceSessions.$inferSelect;
export type InsertPracticeSession = z.infer<typeof insertPracticeSessionSchema>;
export type VideoLesson = typeof videoLessons.$inferSelect;
export type InsertVideoLesson = z.infer<typeof insertVideoLessonSchema>;