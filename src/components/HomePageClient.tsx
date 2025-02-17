"use client";

import { useState } from "react";
import FileSystemBrowser from "./FileSystemBrowser";
import { ApplyChangesForm } from "./apply-changes-form";
import LLMChatbox from "./LLMChatbox";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface HomePageClientProps {
  apiKeyExists: boolean;
}

export default function HomePageClient({ apiKeyExists }: HomePageClientProps) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewChat = () => {
    setMessages([]);
    setIsLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <FileSystemBrowser />

      <Card className="w-[90%] max-w-3xl mt-4">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <CardTitle className="text-2xl font-bold text-center">LLM Chatbox</CardTitle>
            <Button variant="destructive" onClick={handleNewChat}>New Chat</Button>
          </div>
        </CardHeader>
        <LLMChatbox
          messages={messages}
          setMessages={setMessages}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          apiKeyExists={apiKeyExists}
        />
      </Card>

      <Card className="w-[90%] max-w-3xl mt-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">LLM XML Parser</CardTitle>
        </CardHeader>
        <ApplyChangesForm />
      </Card>
    </main>
  );
}
