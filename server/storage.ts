import { IStorage } from "./storage";
import session from "express-session";
import createMemoryStore from "memorystore";
import { InsertUser, User, PracticeSession, InsertPracticeSession, VideoLesson, InsertVideoLesson } from "@shared/schema";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createPracticeSession(session: InsertPracticeSession & { userId: number }): Promise<PracticeSession>;
  getPracticeSessions(userId: number): Promise<PracticeSession[]>;
  getVideoLessons(): Promise<VideoLesson[]>;
  getVideoLesson(id: number): Promise<VideoLesson | undefined>;
  createVideoLesson(lesson: InsertVideoLesson): Promise<VideoLesson>;
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private practiceSessions: Map<number, PracticeSession>;
  private videoLessons: Map<number, VideoLesson>;
  sessionStore: session.Store;
  private currentId: number;
  private currentSessionId: number;
  private currentVideoLessonId: number;

  constructor() {
    this.users = new Map();
    this.practiceSessions = new Map();
    this.videoLessons = new Map();
    this.currentId = 1;
    this.currentSessionId = 1;
    this.currentVideoLessonId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = {
      ...insertUser,
      id,
      totalPracticeMinutes: 0,
      currentStreak: 0,
      longestStreak: 0,
    };
    this.users.set(id, user);
    return user;
  }

  async createPracticeSession(session: InsertPracticeSession & { userId: number }): Promise<PracticeSession> {
    const id = this.currentSessionId++;
    const practiceSession: PracticeSession = {
      ...session,
      id,
      date: new Date(),
    };
    this.practiceSessions.set(id, practiceSession);

    const user = await this.getUser(session.userId);
    if (user) {
      user.totalPracticeMinutes += session.duration;
      this.users.set(user.id, user);
    }

    return practiceSession;
  }

  async getPracticeSessions(userId: number): Promise<PracticeSession[]> {
    return Array.from(this.practiceSessions.values())
      .filter(session => session.userId === userId)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  async getVideoLessons(): Promise<VideoLesson[]> {
    return Array.from(this.videoLessons.values());
  }

  async getVideoLesson(id: number): Promise<VideoLesson | undefined> {
    return this.videoLessons.get(id);
  }

  async createVideoLesson(lesson: InsertVideoLesson): Promise<VideoLesson> {
    const id = this.currentVideoLessonId++;
    const videoLesson: VideoLesson = {
      ...lesson,
      id,
    };
    this.videoLessons.set(id, videoLesson);
    return videoLesson;
  }
}

export const storage = new MemStorage();