import { GENERATE_SCRIPT_PROMPT } from "@/services/Prompt";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://your-site.com", // Optional
    "X-Title": "AdFlare AI", // Optional
  },
});

export async function POST(req) {
  try {
    const { topic } = await req.json();
    const PROMPT = GENERATE_SCRIPT_PROMPT.replace("{topic}", topic);

    const completion = await openai.chat.completions.create({
      model: "microsoft/phi-4-reasoning-plus:free",
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: PROMPT }],
        },
      ],
      response_format: { type: "json_object" }, // This enforces JSON response
    });

    const message = completion.choices?.[0]?.message;
    if (!message) {
      console.error("Invalid response from OpenRouter:", completion);
      return NextResponse.json({ error: "No message returned" }, { status: 500 });
    }

    // Try to parse the content as JSON if it's a string
    let content;
    try {
      content = typeof message.content === 'string' 
        ? JSON.parse(message.content) 
        : message.content;
    } catch (e) {
      // If parsing fails, wrap it in a JSON object
      content = { generatedScript: message.content };
    }

    return NextResponse.json(content);
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
