import { fastifyPlugin } from "fastify-plugin";
import type { Permission } from "@shared/enums/permission";
import type { FastifyAuthFunction } from "@fastify/auth";
import { JwtData } from "@/routes/auth";

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
  app.decorate("verifyAuthenticated", (request, reply, done) => {
    if (!request.headers.authorization) {
      return reply.code(401).send({
        message: "Unauthorized",
      });
    }
    const data = app.jwt.decode<JwtData>(
      request.headers.authorization.replace("Bearer ", ""),
    );
    if (!data) {
      return reply.code(401).send({
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
        return reply.code(401).send({
          message: "Unauthorized",
        });
      }
      const data = app.jwt.decode<JwtData>(
        request.headers.authorization.replace("Bearer ", ""),
      );
      if (!data) {
        return reply.code(401).send({
          message: "Unauthorized",
        });
      }

      if (
        !permissions.every((permission) =>
          data.permissions.includes(permission),
        )
      ) {
        return reply.code(403).send({
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