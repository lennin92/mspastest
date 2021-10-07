import {Context} from "koa";
import {getManager} from "typeorm";
import { RegistroPersona } from "../entity/RegistroPersona";

/**
 * Cargar registro segun cui
 */
export async function getRegistroByCui(context: Context, next) {

  let repositorioRegistro = getManager().getRepository(RegistroPersona);
  let { cui } = context.params
  console.log("Searching for cui: " + cui);
  let r = await repositorioRegistro.findOne({cui:cui});
  if (!r) {
    context.status = 404;
    return;
  }

  context.body = r;
  await next();
}