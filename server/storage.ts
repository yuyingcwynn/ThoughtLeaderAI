import { 
  users, 
  consultations, 
  contactInquiries,
  type User, 
  type InsertUser, 
  type Consultation,
  type InsertConsultation,
  type ContactInquiry,
  type InsertContactInquiry
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserBalance(id: number, hoursToAdd: number): Promise<User>;
  
  // Consultation methods
  getConsultation(id: number): Promise<Consultation | undefined>;
  createConsultation(consultation: InsertConsultation): Promise<Consultation>;
  updateConsultationPaymentIntent(id: number, paymentIntentId: string): Promise<void>;
  updateConsultationStatus(id: number, status: string): Promise<void>;
  getUserConsultations(userId: number): Promise<Consultation[]>;
  
  // Session tracking methods
  createUserSession(session: InsertUserSession): Promise<UserSession>;
  getUserSessions(userId: number): Promise<UserSession[]>;
  updateSessionStatus(id: number, status: string): Promise<void>;
  deductUserHours(userId: number, hours: number): Promise<void>;
  
  // Contact inquiry methods
  getContactInquiry(id: number): Promise<ContactInquiry | undefined>;
  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
  updateContactInquiryStatus(id: number, status: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private consultations: Map<number, Consultation>;
  private contactInquiries: Map<number, ContactInquiry>;
  private currentUserId: number;
  private currentConsultationId: number;
  private currentInquiryId: number;

  constructor() {
    this.users = new Map();
    this.consultations = new Map();
    this.contactInquiries = new Map();
    this.currentUserId = 1;
    this.currentConsultationId = 1;
    this.currentInquiryId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Consultation methods
  async getConsultation(id: number): Promise<Consultation | undefined> {
    return this.consultations.get(id);
  }

  async createConsultation(insertConsultation: InsertConsultation): Promise<Consultation> {
    const id = this.currentConsultationId++;
    const consultation: Consultation = {
      ...insertConsultation,
      id,
      company: insertConsultation.company || null,
      notes: insertConsultation.notes || null,
      packageHours: insertConsultation.packageHours || null,
      stripePaymentIntentId: null,
      calendlyEventId: null,
      status: "pending",
      scheduledDate: null,
      createdAt: new Date()
    };
    this.consultations.set(id, consultation);
    return consultation;
  }

  async updateConsultationPaymentIntent(id: number, paymentIntentId: string): Promise<void> {
    const consultation = this.consultations.get(id);
    if (consultation) {
      consultation.stripePaymentIntentId = paymentIntentId;
      this.consultations.set(id, consultation);
    }
  }

  async updateConsultationStatus(id: number, status: string): Promise<void> {
    const consultation = this.consultations.get(id);
    if (consultation) {
      consultation.status = status;
      this.consultations.set(id, consultation);
    }
  }

  // Contact inquiry methods
  async getContactInquiry(id: number): Promise<ContactInquiry | undefined> {
    return this.contactInquiries.get(id);
  }

  async createContactInquiry(insertInquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const id = this.currentInquiryId++;
    const inquiry: ContactInquiry = {
      ...insertInquiry,
      id,
      company: insertInquiry.company || null,
      status: "new",
      createdAt: new Date()
    };
    this.contactInquiries.set(id, inquiry);
    return inquiry;
  }

  async updateContactInquiryStatus(id: number, status: string): Promise<void> {
    const inquiry = this.contactInquiries.get(id);
    if (inquiry) {
      inquiry.status = status;
      this.contactInquiries.set(id, inquiry);
    }
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values({
      ...insertUser,
      email: insertUser.email || '',
      totalHoursBalance: "0",
      usedHours: "0"
    }).returning();
    return user;
  }

  async updateUserBalance(id: number, hoursToAdd: number): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        totalHoursBalance: sql`${users.totalHoursBalance} + ${hoursToAdd}`
      })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async getConsultation(id: number): Promise<Consultation | undefined> {
    const [consultation] = await db.select().from(consultations).where(eq(consultations.id, id));
    return consultation || undefined;
  }

  async createConsultation(insertConsultation: InsertConsultation): Promise<Consultation> {
    const [consultation] = await db.insert(consultations).values(insertConsultation).returning();
    return consultation;
  }

  async updateConsultationPaymentIntent(id: number, paymentIntentId: string): Promise<void> {
    await db
      .update(consultations)
      .set({ stripePaymentIntentId: paymentIntentId })
      .where(eq(consultations.id, id));
  }

  async updateConsultationStatus(id: number, status: string): Promise<void> {
    await db
      .update(consultations)
      .set({ status })
      .where(eq(consultations.id, id));
  }

  async getUserConsultations(userId: number): Promise<Consultation[]> {
    return await db
      .select()
      .from(consultations)
      .where(eq(consultations.userId, userId))
      .orderBy(desc(consultations.createdAt));
  }

  async createUserSession(session: InsertUserSession): Promise<UserSession> {
    const [userSession] = await db.insert(userSessions).values(session).returning();
    return userSession;
  }

  async getUserSessions(userId: number): Promise<UserSession[]> {
    return await db
      .select()
      .from(userSessions)
      .where(eq(userSessions.userId, userId))
      .orderBy(desc(userSessions.createdAt));
  }

  async updateSessionStatus(id: number, status: string): Promise<void> {
    await db
      .update(userSessions)
      .set({ status })
      .where(eq(userSessions.id, id));
  }

  async deductUserHours(userId: number, hours: number): Promise<void> {
    await db
      .update(users)
      .set({
        usedHours: sql`${users.usedHours} + ${hours}`
      })
      .where(eq(users.id, userId));
  }

  async getContactInquiry(id: number): Promise<ContactInquiry | undefined> {
    const [inquiry] = await db.select().from(contactInquiries).where(eq(contactInquiries.id, id));
    return inquiry || undefined;
  }

  async createContactInquiry(insertInquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const [inquiry] = await db.insert(contactInquiries).values(insertInquiry).returning();
    return inquiry;
  }

  async updateContactInquiryStatus(id: number, status: string): Promise<void> {
    await db
      .update(contactInquiries)
      .set({ status })
      .where(eq(contactInquiries.id, id));
  }
}

export const storage = new DatabaseStorage();
