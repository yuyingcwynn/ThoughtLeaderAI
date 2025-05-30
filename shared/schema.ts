import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  totalHoursBalance: decimal("total_hours_balance", { precision: 5, scale: 2 }).default("0").notNull(),
  usedHours: decimal("used_hours", { precision: 5, scale: 2 }).default("0").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userSessions = pgTable("user_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  consultationId: integer("consultation_id").notNull().references(() => consultations.id),
  hoursUsed: decimal("hours_used", { precision: 3, scale: 2 }).notNull(),
  sessionDate: timestamp("session_date").notNull(),
  calendlyEventId: text("calendly_event_id").unique(),
  status: text("status").notNull().default("scheduled"), // "scheduled", "completed", "cancelled", "no-show"
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const consultations = pgTable("consultations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id), // link to user account
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  serviceType: text("service_type").notNull(),
  sessionType: text("session_type").notNull(), // "dial-an-ai-expert", "fractional-caio", "hackathon"
  packageHours: decimal("package_hours", { precision: 3, scale: 2 }).notNull(), // purchased hours
  packageType: text("package_type").notNull(), // "30min", "1hr", "5hr", "10hr"
  amount: integer("amount").notNull(), // in cents
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  status: text("status").notNull().default("pending"), // "pending", "paid", "completed", "cancelled"
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactInquiries = pgTable("contact_inquiries", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  serviceInterest: text("service_interest").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"), // "new", "contacted", "closed"
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertConsultationSchema = createInsertSchema(consultations).omit({
  id: true,
  createdAt: true,
  stripePaymentIntentId: true,
  status: true,
}).partial({
  userId: true,
  company: true,
  notes: true,
});

export const insertContactInquirySchema = createInsertSchema(contactInquiries).omit({
  id: true,
  createdAt: true,
  status: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertConsultation = z.infer<typeof insertConsultationSchema>;
export type Consultation = typeof consultations.$inferSelect;
export type InsertContactInquiry = z.infer<typeof insertContactInquirySchema>;
export type ContactInquiry = typeof contactInquiries.$inferSelect;
export type UserSession = typeof userSessions.$inferSelect;
export type InsertUserSession = typeof userSessions.$inferInsert;
