import { Item } from "@/entities/item";
import { ItemTemplate } from "@/entities/item/item-template";
import { User } from "@/entities/user";
import { mongodb } from "@fastify/mongodb";
import { config } from "dotenv";

config();

const mongoClient = new mongodb.MongoClient(process.env.MONGODB_URI);
const db = mongoClient.db("inventory-manager");

const itemTemplates = db.collection<ItemTemplate>("item-templates");
const items = db.collection<Item>("items");
const users = db.collection<User>("users");

await users.createIndex({ id: 1 }, { unique: true });
await items.createIndex({ userId: "hashed", order: 1 });
await items.createIndex({ templateId: "hashed" });
await itemTemplates.createIndex({ name: "text" });

console.info("Indexes applied successfully");
process.exit(0);
