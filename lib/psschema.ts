import { mysqlTable, serial, text, varchar } from "drizzle-orm/mysql-core";

export const usersps = mysqlTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name"),
  phone: varchar("phone", { length: 256 }),
});
