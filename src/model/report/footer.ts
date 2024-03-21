// MongoDB schema
import mongoose, { Schema } from "mongoose";

const footerSchema = new Schema(
  {
    contractor: String,
    client: String,
    customer: String,
    consultant: String,
    contractorName: String,
    clientName: String,
    customerName: String,
    consultantName: String,
    contractorDesignation: String,
    clientDesignation: String,
    customerDesignation: String,
    consultantDesignation: String,
    contractorSignature: String,
    clientSignature: String,
    customerSignature: String,
    consultantSignature: String,
    contractorDate: String,
    clientDate: String,
    customerDate: String,
    consultantDate: String,
  },
  {
    timestamps: true,
  }
);

const Footer = mongoose.models.Footer || mongoose.model("Footer", footerSchema);

export default Footer;