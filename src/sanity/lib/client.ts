import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "dnc5n1py",
  dataset: "production",
  apiVersion: "2023-10-01",
  token: process.env.SANITY_API_TOKEN, // ✅ MUST be set!
  useCdn: false,
});