import { Item, ITEMS_COLLECTION, PopulatedItem } from "@/entities/item";
import { ObjectId } from "@fastify/mongodb";
import {
  FastifyPluginAsyncTypebox,
  Static,
  Type,
} from "@fastify/type-provider-typebox";
import { Permission } from "@shared/enums/permission";

const PAGE_SIZE = 25;

const GetItemsRequestSchema = Type.Object({
  page: Type.Integer({ minimum: 1 }),
});

const AddItemRequestSchema = Type.Object({
  templateId: Type.String(),
});

const SwapItemsRequestSchema = Type.Object({
  fromOrder: Type.Integer({ minimum: 0 }),
  toOrder: Type.Integer({
    minimum: 0,
  }),
});

const inventoryRoutes: FastifyPluginAsyncTypebox = async (app) => {
  app.get(
    "/",
    {
      schema: {
        querystring: GetItemsRequestSchema,
        response: {
          200: Type.Array(Type.Any()),
        },
      },
      preHandler: app.auth([app.verifyPermissions([Permission.Read])]),
    },
    async (request) => {
      const userId = request.identity.sub;
      const { page } = request.query as Static<typeof GetItemsRequestSchema>;
      const itemsCollection = app.mongo.db!.collection<Item>(ITEMS_COLLECTION);
      const items = await itemsCollection
        .aggregate<PopulatedItem>([
          {
            $match: {
              userId,
              order: {
                $gte: (page - 1) * PAGE_SIZE,
                $lt: page * PAGE_SIZE,
              },
            },
          },
          {
            $lookup: {
              from: "item-templates",
              localField: "templateId",
              foreignField: "_id",
              as: "template",
            },
          },
          {
            $unwind: "$template",
          },
          {
            $sort: {
              order: 1,
            },
          },
        ])
        .toArray();

      return items;
    },
  );

  app.post(
    "/",
    {
      schema: {
        body: AddItemRequestSchema,
        response: {
          200: Type.Any(),
        },
      },
      preHandler: app.auth([app.verifyPermissions([Permission.Write])]),
    },
    async (request) => {
      const userId = request.identity.sub;
      const { templateId } = request.body as Static<
        typeof AddItemRequestSchema
      >;
      const itemsCollection = app.mongo.db!.collection<Item>(ITEMS_COLLECTION);
      // mininum unused order
      const orders = await itemsCollection
        .find({ userId })
        .sort({ order: 1 })
        .toArray();
      const order = orders.reduce(
        (acc, item) => (acc === item.order ? acc + 1 : acc),
        0,
      );

      await itemsCollection.insertOne({
        userId,
        templateId: new ObjectId(templateId),
        order,
      });
    },
  );

  app.put(
    "/swap",
    {
      schema: {
        body: SwapItemsRequestSchema,
        response: {
          200: Type.Object({}),
          404: Type.Object({
            message: Type.String(),
          }),
        },
      },
      preHandler: app.auth([app.verifyPermissions([Permission.Write])]),
    },
    async (request) => {
      const userId = request.identity.sub;
      const { fromOrder, toOrder } = request.body as Static<
        typeof SwapItemsRequestSchema
      >;
      const itemsCollection = app.mongo.db!.collection<Item>(ITEMS_COLLECTION);
      const fromItem = await itemsCollection.findOne({
        userId,
        order: fromOrder,
      });
      const toItem = await itemsCollection.findOne({ userId, order: toOrder });

      await itemsCollection.bulkWrite([
        {
          updateOne: {
            filter: { _id: fromItem?._id },
            update: { $set: { order: toOrder } },
          },
        },
        {
          updateOne: {
            filter: { _id: toItem?._id },
            update: { $set: { order: fromOrder } },
          },
        },
      ]);

      return {
        message: "Items swapped",
      };
    },
  );
};

export default inventoryRoutes;
