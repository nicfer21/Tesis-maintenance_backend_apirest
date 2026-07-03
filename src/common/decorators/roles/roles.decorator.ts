import { SetMetadata } from '@nestjs/common';

//Se pone nombre a la etiqueta que se buscara en el request-metadata
export const ROLES_KEY = 'roles';
//Para buscar dentro de una lista de roles se pone en parámetro de esta manera
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
