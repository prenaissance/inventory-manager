import path from "path";
import { config } from "dotenv";
import Fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import autoLoadPlugin from "@fastify/autoload";
import corsPlugin from "@fastify/cors";
import jwtPlugin from "@fastify/jwt";

config();

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const app = Fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

app.register(corsPlugin, {
  origin: "*",
  credentials: true,
});

app.register(jwtPlugin, {
  secret: process.env.JWT_SECRET!,
});

await app.register(fastifySwagger, {
  swagger: {
    info: {
      title: "Fastify API",
      description: "Backend API for Inventory Manager",
      version: "0.1.0",
    },
  },
});

app.register(autoLoadPlugin, {
  dir: path.join(__dirname, "routes"),
  options: { prefix: "/api" },
});

app.register(fastifySwaggerUi, {
  routePrefix: "/swagger",
});

app
  .listen({
    port: 8080,
  })
  .then(() => {
    const address = app.server.address();
    if (typeof address !== "string") return;

    app.log.info(`server listening on ${address}`);
  });

await app.ready();
app.swagger();
