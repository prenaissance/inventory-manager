import { Type } from "@sinclair/typebox";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Item, ITEMS_COLLECTION } from "@/entities/item";
import { ObjectId } from "@fastify/mongodb";
import { User, USERS_COLLECTION } from "@/entities/user";

const RequestSchema = Type.Object({
  userId: Type.String({ format: "uuid" }),
});

const ResponseSchema = Type.Object({
  token: Type.String({ description: "JWT token" }),
});

const defaultItems: Omit<Item, "_id" | "userId">[] = [
  {
    templateId: ObjectId.createFromTime(1),
    order: 0,
  },
  {
    templateId: ObjectId.createFromTime(1),
    order: 1,
  },
  {
    templateId: ObjectId.createFromTime(2),
    order: 2,
  },
];

const authRoutes: FastifyPluginAsyncTypebox = async (app) => {
  app.post(
    "/login",
    {
      schema: {
        body: RequestSchema,
        response: {
          200: ResponseSchema,
        },
      },
    },
    async (request) => {
      const { userId } = request.body;
      const token = app.jwt.sign({
        sub: userId,
      });

      const users = app.mongo.db!.collection<User>(USERS_COLLECTION);

      const isNewUser = !(await users.countDocuments({
        id: userId,
      }));

      if (isNewUser) {
        await users.insertOne({
          id: userId,
        });
        await app.mongo.db!.collection<Item>(ITEMS_COLLECTION).insertMany(
          defaultItems.map((item) => ({
            ...item,
            _id: new ObjectId(),
            userId,
          })),
        );
      }

      return { token };
    },
  );
};

export default authRoutes;
