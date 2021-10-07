import {Context} from "koa";
import {getManager} from "typeorm";
import { RegistroPersona } from "../entity/RegistroPersona";

/**
 * Cargar registro segun cui
 */
export async function getRegistroByCui(context: Context, next) {

  let repositorioRegistro = getManager().getRepository(RegistroPersona);
  const r = await repositorioRegistro.findOne((context as any).params.cui);
  if (!r) {
    context.status = 404;
    return;
  }

  context.body = r;
  await next();
}