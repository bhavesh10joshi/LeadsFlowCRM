import { z } from "zod";

export const RegisterObject = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["admin", "sales"]).optional()
});

export const LoginObject = z.object({
    email: z.string().email(),
    password: z.string().min(1)
});

export const LeadObject = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    status: z.enum(["new", "contacted", "qualified", "lost", "won"]),
    source: z.enum(["website", "referral", "linkedin", "cold-call", "advertisement", "other"]),
    company: z.string().optional(),
    phone: z.string().optional(),
    notes: z.string().optional()
});

export const LeadUpdateObject = z.object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    status: z.enum(["new", "contacted", "qualified", "lost", "won"]).optional(),
    source: z.enum(["website", "referral", "linkedin", "cold-call", "advertisement", "other"]).optional(),
    company: z.string().optional(),
    phone: z.string().optional(),
    notes: z.string().optional()
});
