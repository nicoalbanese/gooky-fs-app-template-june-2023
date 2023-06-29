import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
// import { firms } from "./schema";

// inspired by Raphael Moreau @rphlmr for Postgres, extended for Planetscale
const runMigrate = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  const connection = postgres(process.env.DATABASE_URL, { max: 1 });

  const db = drizzle(connection);

  console.log("⏳ Running seed db...");

  const start = Date.now();

  // await db
  //   .insert(firms)
  //   .values([
  //     { name: "Accel" },
  //     { name: "Sequoia" },
  //     { name: "20VC" },
  //     { name: "Ascension" },
  //     { name: "Seedcamp" },
  //   ]);

  const end = Date.now();

  console.log(`🌱✅ Seeded DB in ${end - start}ms`);

  process.exit(0);
};

runMigrate().catch((err) => {
  console.error("❌ Seed failed");
  console.error(err);
  process.exit(1);
});
