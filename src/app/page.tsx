import { env } from "~/env.js";
import HomePageClient from "../components/HomePageClient";

export default function HomePage() {
  const apiKeyExists = !!env.GEMINI_API_KEY;

  return <HomePageClient apiKeyExists={apiKeyExists} />;
}