"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
export const updateName = async (data: FormData) => {
  const session = await getServerSession(authOptions);
  const name = data.get("name");
  const [updatedUser] = await db
    .update(users)
    .set({ name: name as string })
    .where(eq(users.id, session?.user.id))
    .returning();
  return updatedUser;
};
