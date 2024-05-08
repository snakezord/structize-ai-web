import { getServerSession } from "next-auth/next";

import authOptions from "@/lib/auth/next-auth";

export async function getUserSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user || null;
}
