import {
  ITEM_TEMPLATES_COLLECTION,
  ItemTemplate,
} from "@/entities/item/item-template";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Permission } from "@shared/enums/permission";

const itemsRoutes: FastifyPluginAsyncTypebox = async (app) => {
  app.get(
    "/templates",
    {
      preHandler: app.auth([app.verifyPermissions([Permission.Read])]),
    },
    async () => {
      const itemTemplates = app.mongo.db!.collection<ItemTemplate>(
        ITEM_TEMPLATES_COLLECTION,
      );
      const templates = await itemTemplates.find().toArray();
      return templates;
    },
  );
};

export default itemsRoutes;
