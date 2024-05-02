import { ItemTemplate } from "@/entities/item/item-template";
import { mongodb, ObjectId } from "@fastify/mongodb";
import { Rarity } from "@shared/enums/rarity";
import { config } from "dotenv";

config();

const mongoClient = new mongodb.MongoClient(process.env.MONGODB_URI);
const db = mongoClient.db("inventory-manager");
const itemTemplates = db.collection<ItemTemplate>("item-templates");

const tf2LogoUrl =
  "https://prenaissance.github.io/inventory-manager/tf2-logo.jpg";

const mannCoSupplyCrateKeyId = ObjectId.createFromTime(1);
const tourOfDutyTicketId = ObjectId.createFromTime(2);

const defaultItemTemplates: ItemTemplate[] = [
  {
    _id: mannCoSupplyCrateKeyId,
    name: "Mann Co. Supply Crate Key",
    imageUrl:
      "https://prenaissance.github.io/inventory-manager/mann-co-supply-crate-key.png",
    game: {
      name: "Team Fortress 2",
      logoUrl: tf2LogoUrl,
    },
    description:
      "Used to open locked supply crates.\n\nThis is a limited use item. Uses: 1",
    rarity: Rarity.COMMON,
  },
  {
    _id: tourOfDutyTicketId,
    name: "Tour of Duty Ticket",
    imageUrl:
      "https://prenaissance.github.io/inventory-manager/tour-of-duty-ticket.png",
    game: {
      name: "Team Fortress 2",
      logoUrl: tf2LogoUrl,
    },
    description:
      "Grants access to a Tour of Duty in Mann vs. Machine mode.\n\nThis is a limited use item. Uses: 1",
    rarity: Rarity.UNCOMMON,
  },
];

// upsert default item templates
await itemTemplates.bulkWrite(
  defaultItemTemplates.map((itemTemplate) => ({
    updateOne: {
      filter: { _id: itemTemplate._id },
      update: { $set: itemTemplate },
      upsert: true,
    },
  })),
);

console.info("Item templates seeded successfully");
process.exit(0);
