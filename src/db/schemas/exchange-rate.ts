
import { pgTable, uuid, text, numeric, timestamp } from "drizzle-orm/pg-core";



export const ExchangeRateModel = pgTable("exchange_rate", {
    id: uuid("id").primaryKey(),
    name: text("name").notNull().unique(),
    currentPrice: numeric("current_price").notNull(),
    prevPrice: numeric("prev_price").notNull(),
    lastUpdate: timestamp("date").notNull(),
});
  

