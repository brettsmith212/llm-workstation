// <ai_context>
// This file defines the CopyButton component, which provides a button to copy text to the clipboard.
// </ai_context>
import { Button } from "./ui/button";
import { Clipboard, ClipboardCheck } from "lucide-react"; // Import ClipboardCheck
import { useState, useRef, useEffect } from "react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "~/components/ui/tooltip";

interface CopyButtonProps {
  textToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

   useEffect(() => {
        // Clear the timeout if the component unmounts
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setShowCopiedMessage(true);
      timeoutRef.current = setTimeout(() => {
        setShowCopiedMessage(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="absolute bottom-2 right-2 hover:bg-gray-600 [&>svg]:hover:stroke-gray-900"
          >
             {showCopiedMessage ? (
              <ClipboardCheck className="h-4 w-4 stroke-green-500" />
            ) : (
              <Clipboard className="h-4 w-4 stroke-gray-400" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy to Clipboard</p>
        </TooltipContent>
      </Tooltip>
      {showCopiedMessage && (
        <div className="absolute top-0 right-12 bg-popover px-3 py-1.5 text-sm text-popover-foreground rounded-md border">
          Copied to Clipboard!
        </div>
      )}
    </TooltipProvider>
  );
};

export default CopyButton;