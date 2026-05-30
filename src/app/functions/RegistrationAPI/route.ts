import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Define registration item type
interface RegistrationData {
  id: string;
  event_name: string;
  name: string;
  job_title: string;
  company: string;
  number: string;
  email: string;
  company_website_URL: string;
  terms: string;
  registeredAt: string;
}


export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract parameters
    const event_name = searchParams.get("event_name") || "CSEvents Invite";
    const name = searchParams.get("name");
    const job_title = searchParams.get("job_title");
    const company = searchParams.get("company");
    const number = searchParams.get("number");
    const email = searchParams.get("email");
    const company_website_URL = searchParams.get("company_website_URL");
    const terms = searchParams.get("terms");

    // Server-side validation
    if (!name || !job_title || !company || !number || !email || !company_website_URL) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    const registrationItem: RegistrationData = {
      id: Math.random().toString(36).substring(2, 9),
      event_name,
      name,
      job_title,
      company,
      number,
      email,
      company_website_URL,
      terms: terms || "true",
      registeredAt: new Date().toISOString(),
    };

    // Save to local file registrations.json in src/data
    const dataDir = path.join(process.cwd(), "src", "data");
    const filePath = path.join(dataDir, "registrations.json");

    // Ensure directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let existingData: RegistrationData[] = [];
    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        existingData = JSON.parse(fileContent);
      } catch (err) {
        console.error("Error reading registrations file, initializing empty:", err);
      }
    }

    existingData.push(registrationItem);
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), "utf-8");

    // Log registration in terminal console
    console.log("----------------------------------------");
    console.log("New Event Registration Received:");
    console.log(`Event: ${event_name}`);
    console.log(`Name: ${name}`);
    console.log(`Title: ${job_title} at ${company}`);
    console.log(`Contact: ${email} | ${number}`);
    console.log(`Website: ${company_website_URL}`);
    console.log("----------------------------------------");

    return NextResponse.json({ success: true, message: "Registration successful" });
  } catch (error) {
    console.error("Registration API error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}

// Support POST requests as well for robust clients
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event_name, name, job_title, company, number, email, company_website_URL, terms } = body;

    if (!name || !job_title || !company || !number || !email || !company_website_URL) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    const registrationItem: RegistrationData = {
      id: Math.random().toString(36).substring(2, 9),
      event_name: event_name || "CSEvents Invite",
      name,
      job_title,
      company,
      number,
      email,
      company_website_URL,
      terms: String(terms),
      registeredAt: new Date().toISOString(),
    };

    const dataDir = path.join(process.cwd(), "src", "data");
    const filePath = path.join(dataDir, "registrations.json");

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let existingData: RegistrationData[] = [];
    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        existingData = JSON.parse(fileContent);
      } catch (err) {
        console.error("Error reading registrations file, initializing empty:", err);
      }
    }

    existingData.push(registrationItem);
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), "utf-8");

    return NextResponse.json({ success: true, message: "Registration successful" });
  } catch (error) {
    console.error("Registration API error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
