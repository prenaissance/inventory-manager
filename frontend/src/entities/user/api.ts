import { api } from "@/shared/api";
import { getUserId } from "./model";
import { Permission } from "@shared/enums/permission";

export const login = (permissions: Permission[]) =>
  api
    .post<{ token: string }>("/auth/login", {
      userId: getUserId(),
      permissions,
    })
    .then(({ data }) => data);
