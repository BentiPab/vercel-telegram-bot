
import { pgTable, uuid, text } from "drizzle-orm/pg-core";



export const countryTable = pgTable("subcriptions", {
    id: uuid("id").primaryKey(),
    name: text("name").notNull(),
    mail: text("mail").notNull(),
    phone: text("phone").notNull(),
    cuit: text("cuit").notNull().unique(),
});
  