import { drizzle } from "drizzle-orm/postgres-js";
import { drizzle as drizzlePS } from "drizzle-orm/planetscale-serverless";
import postgres from "postgres";
import { connect } from "@planetscale/database";

const client = postgres(process.env["CRDB_DSN"] as string);
export const crdb = drizzle(client);

// create the connection
const connection = connect({
  host: process.env["DATABASE_HOST"],
  username: process.env["DATABASE_USERNAME"],
  password: process.env["DATABASE_PASSWORD"],
});

export const psdb = drizzlePS(connection);
