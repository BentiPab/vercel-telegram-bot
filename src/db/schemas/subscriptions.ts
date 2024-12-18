
import { pgTable, uuid } from "drizzle-orm/pg-core";



export const countryTable = pgTable("subcriptions", {
    id: uuid("id").primaryKey(),

});
  