import db from "#db/client";
import { createEmployee } from "#db/queries/employees";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  // TODO
  for (let i = 1; i <= 10; i++) {
    await createEmployee({
      name: `Employee ${i}`,
      birthday: `1990-01-${String(i).padStart(2, "0")}`,
      salary: 50000 + i * 1000,
    });
  }
}
