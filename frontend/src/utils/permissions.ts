import { RolesEnum } from "src/types";

export const hasRole = (requiredRoles: RolesEnum[], role: string) => {
    return requiredRoles.includes(role as RolesEnum);
}