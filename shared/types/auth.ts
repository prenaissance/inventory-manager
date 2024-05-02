import { Permission } from "../enums/permission";

export type JwtData = {
  sub: string;
  permissions: Permission[];
};
