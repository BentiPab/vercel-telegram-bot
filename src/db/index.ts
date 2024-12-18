import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import schemas from "./schema";

export const db = drizzle(neon(process.env.POSTGRES_URL!), {
  schema: { ...schemas },
});
