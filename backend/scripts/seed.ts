const tf2LogoUrl =
  "https://prenaissance.github.io/inventory-manager/tf2-logo.jpg";

const defaultItemTemplates: ItemTemplate[] = [
  {
    id: "1",
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
    id: "2",
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
