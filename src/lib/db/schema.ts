import { pgTable, serial, text, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  password: text("password").notNull(),
});

// export const firms = pgTable("firms", {
//   id: serial("id").primaryKey(),
//   name: text("name").notNull(),
//   website: text("website"),
// });
