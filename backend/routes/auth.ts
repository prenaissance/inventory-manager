import { Type } from "@sinclair/typebox";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

const RequestSchema = Type.Object({
  userId: Type.String({ format: "uuid" }),
});

const ResponseSchema = Type.Object({
  token: Type.String({ description: "JWT token" }),
});

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

      return { token };
    },
  );
};

export default authRoutes;
