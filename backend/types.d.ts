declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production";
    MONGODB_URI: string;
    JWT_SECRET: string;
  }
}
