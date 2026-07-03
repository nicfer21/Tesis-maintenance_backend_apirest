// Decorador para @Public -> solo algunos elementos
import { SetMetadata } from '@nestjs/common';

//Guarda información en metadata
export const IS_PUBLIC_KEY = 'isPublic';

//De esta manera solo se guarda un true or false, sin declarar nada en parámetros
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
