import { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

const user = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin", "sales"], default: "sales" }
}, { timestamps: true });

const lead = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, required: true, enum: ["new", "contacted", "qualified", "lost", "won"] },
    source: { type: String, required: true, enum: ["website", "referral", "linkedin", "cold-call", "advertisement", "other"] },
    company: { type: String },
    phone: { type: String },
    notes: { type: String },
    createdBy: { type: ObjectId, ref: "User", required: true }
}, { timestamps: true });

export const UserModel = model("User", user);
export const LeadModel = model("Lead", lead);
