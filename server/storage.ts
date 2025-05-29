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
  createUser(user: InsertUser): Promise<User>;
  
  // Consultation methods
  getConsultation(id: number): Promise<Consultation | undefined>;
  createConsultation(consultation: InsertConsultation): Promise<Consultation>;
  updateConsultationPaymentIntent(id: number, paymentIntentId: string): Promise<void>;
  updateConsultationStatus(id: number, status: string): Promise<void>;
  
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
      stripePaymentIntentId: null,
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

export const storage = new MemStorage();
