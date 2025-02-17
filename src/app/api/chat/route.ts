import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

// Helper function to transform messages with role mapping
function transformMessages(messages: any[]) {
    return messages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : msg.role, // Map 'assistant' to 'model'
        parts: [{ text: msg.content }]
    }));
}

export async function POST(req: Request) {
    try {
        const { messages, llm } = await req.json(); //array of messages, model

        if (!messages || !Array.isArray(messages)) {
          return NextResponse.json({ error: "messages are required and must be an array" }, { status: 400 });
        }

        if (!llm) {
          return NextResponse.json({ error: "llm is required" }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
          return NextResponse.json({ error: "GEMINI_API_KEY not found" }, { status: 500 });
        }
        const genAI = new GoogleGenerativeAI(apiKey);

        let modelName = "gemini-1.5-pro-002"; //default

        if (llm === 'gemini') {
            modelName = "gemini-1.5-flash-002";
        }

        const model = genAI.getGenerativeModel({ model: modelName });

        // Transform all messages except the last one for history
        const historyMessages = transformMessages(messages.slice(0, -1));

        const chat = model.startChat({
            history: historyMessages,
            generationConfig: {
              maxOutputTokens: 8192,
            },
        });

        const userMessage = messages[messages.length - 1]?.content; //current message
        if (!userMessage) {
          return NextResponse.json({ error: "User message content is required" }, { status: 400 });
        }
        const result = await chat.sendMessage(userMessage);
        const response = result.response;
        const text = response.text();

        return NextResponse.json({ text });

    } catch (error: any) {
        console.error("Error in chat API route:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}