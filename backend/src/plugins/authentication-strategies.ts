import { fastifyPlugin } from "fastify-plugin";
import type { FastifyAuthFunction } from "@fastify/auth";

import type { Permission } from "@shared/enums/permission";
import type { JwtData } from "@shared/types/auth";

declare module "fastify" {
  interface FastifyInstance {
    verifyAuthenticated: FastifyAuthFunction;
    verifyPermissions: (permissions: Permission[]) => FastifyAuthFunction;
  }
  interface FastifyRequest {
    identity: JwtData;
  }
}

const authenticationStrategies = fastifyPlugin(async (app) => {
  app.decorate("verifyAuthenticated", async (request, reply, done) => {
    if (!request.headers.authorization) {
      return await reply.code(401).send({
        message: "Unauthorized",
      });
    }
    const data = app.jwt.verify<JwtData>(
      request.headers.authorization.replace("Bearer ", ""),
    );
    if (!data) {
      return await reply.code(401).send({
        message: "Unauthorized",
      });
    }

    request.identity = {
      sub: data.sub,
      permissions: data.permissions,
    };

    done();
  });

  app.decorate("verifyPermissions", (permissions: Permission[]) => {
    return async (request, reply, done) => {
      if (!request.headers.authorization) {
        return await reply.code(401).send({
          message: "Unauthorized",
        });
      }
      const data = app.jwt.verify<JwtData>(
        request.headers.authorization.replace("Bearer ", ""),
      );
      if (!data) {
        return await reply.code(401).send({
          message: "Unauthorized",
        });
      }

      if (
        !permissions.every((permission) =>
          data.permissions.includes(permission),
        )
      ) {
        return await reply.code(403).send({
          message: "Forbidden",
        });
      }

      request.identity = {
        sub: data.sub,
        permissions: data.permissions,
      };

      done();
    };
  });
});

export default authenticationStrategies;
