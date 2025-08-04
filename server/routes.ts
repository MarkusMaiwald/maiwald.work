import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import nodemailer from "nodemailer";
import { CyberpunkTerminal } from "./terminal";
import { generateAIResponse } from './ai';

// Email configuration
const createEmailTransporter = () => {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  
  if (!gmailUser || !gmailAppPassword) {
    console.warn('Gmail credentials not configured. Email notifications will be disabled.');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailAppPassword
    }
  });
};

const sendContactNotification = async (contactData: { name: string; email: string; message: string }) => {
  const transporter = createEmailTransporter();
  if (!transporter) return;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.NOTIFICATION_EMAIL || process.env.GMAIL_USER,
    subject: `New Contact Form Submission from ${contactData.name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${contactData.name}</p>
      <p><strong>Email:</strong> ${contactData.email}</p>
      <p><strong>Message:</strong></p>
      <p>${contactData.message.replace(/\n/g, '<br>')}</p>
      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Contact notification email sent successfully');
  } catch (error) {
    console.error('Failed to send contact notification email:', error);
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      
      // Send email notification (non-blocking)
      sendContactNotification(validatedData).catch(error => {
        console.error('Email notification failed:', error);
      });
      
      res.json({ success: true, message: "Contact form submitted successfully", id: contact.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid form data", errors: error.errors });
      } else {
        console.error('Contact form error:', error);
        res.status(500).json({ success: false, message: "Internal server error" });
      }
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  // Terminal command execution
  const terminal = CyberpunkTerminal.getInstance();

  app.post("/api/terminal/execute", async (req, res) => {
    try {
      const { command } = req.body;
      
      if (!command || typeof command !== 'string') {
        return res.status(400).json({ 
          success: false, 
          message: "Command is required and must be a string" 
        });
      }

      const result = await terminal.executeCommand(command);
      
      res.json({
        success: true,
        output: result.output,
        error: result.error,
        exitCode: result.exitCode,
        duration: result.duration,
        cwd: terminal.getCurrentDirectory()
      });
    } catch (error) {
      console.error('Terminal execution error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Terminal execution failed",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.get("/api/terminal/info", async (req, res) => {
    try {
      const systemInfo = await terminal.getSystemInfo();
      res.json({
        success: true,
        systemInfo,
        cwd: terminal.getCurrentDirectory()
      });
    } catch (error) {
      console.error('Terminal info error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to get terminal info" 
      });
    }
  });

  // AI Chat endpoint
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ 
          success: false, 
          message: "Message is required and must be a string" 
        });
      }

      const response = await generateAIResponse(message);
      
      res.json({
        success: true,
        response
      });
    } catch (error) {
      console.error('AI Chat error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to generate AI response",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
