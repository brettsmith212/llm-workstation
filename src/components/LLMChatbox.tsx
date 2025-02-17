"use client";

import { useState, useRef, useEffect, KeyboardEvent, ComponentPropsWithoutRef } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import LoadingSpinner from "./LoadingSpinner";
import CopyButton from "./CopyButton";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface CodeProps extends ComponentPropsWithoutRef<'code'> {
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface LLMChatboxProps {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  apiKeyExists: boolean;
}

const LLMChatbox: React.FC<LLMChatboxProps> = ({
  messages,
  setMessages,
  isLoading,
  setIsLoading,
  apiKeyExists
}) => {
  const [input, setInput] = useState("");
  const [selectedLLM, setSelectedLLM] = useState("gemini");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasMounted = useRef(false);

  const handleSubmit = async () => {
    if (input.trim() === "" || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, userMessage], llm: selectedLLM }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: Message = { role: "assistant", content: data.text };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);

    } catch (error: any) {
      console.error("Error:", error);
      setMessages((prevMessages) => [...prevMessages, { role: "assistant", content: `Error: ${error.message}` }]);

    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-scroll to the bottom when new messages are added
    useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    if (messagesEndRef.current) {
      const shouldScroll =
        messagesEndRef.current.scrollHeight - messagesEndRef.current.scrollTop <=
        messagesEndRef.current.clientHeight + 10; // Tolerance

      if (shouldScroll) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[500px] rounded-md border">
      {apiKeyExists ? (
        <>
          <div
            ref={messagesEndRef}
            className="flex-1 overflow-auto p-4"
            style={{ scrollBehavior: 'smooth' }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-lg ${
                    message.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  } max-w-full`}
                >
                  <ReactMarkdown
                    components={{
                      code({
                        node,
                        inline,
                        className,
                        children,
                        ...props
                      }: CodeProps) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <div style={{ position: "relative" }}>
                            <SyntaxHighlighter
                              style={{
                                ...gruvboxDark,
                                maxWidth: "100%", // Ensure it doesn't exceed parent
                                whiteSpace: "pre-wrap", // Wrap long lines
                                wordBreak: "break-all", // Break words if needed
                                display: "block",
                                overflowX: "auto", // Add horizontal scroll if needed
                                paddingBottom: "20px", //add some bottom padding
                              }}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                            <CopyButton
                              textToCopy={String(children).replace(/\n$/, "")}
                            />
                          </div>
                        ) : (
                          <code className={`${className} break-all`} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && <LoadingSpinner />}
          </div>
          <div className="p-4 flex items-start gap-2">
            <Textarea
              ref={textareaRef}
              className="resize-none flex-1"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="flex flex-col gap-2">
              <Select
                value={selectedLLM}
                onValueChange={(value) => setSelectedLLM(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select LLM" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gemini">Gemini Flash 2.0</SelectItem>
                  {/* Future models can be added here */}
                </SelectContent>
              </Select>
              <Button onClick={handleSubmit} disabled={isLoading}>
                Submit
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 overflow-auto p-4">
            <p className="text-center text-muted-foreground">
                Please add a GEMINI_API_KEY to your environment variables to use the chatbox.
            </p>
        </div>
      )}
    </div>
  );
};

export default LLMChatbox;