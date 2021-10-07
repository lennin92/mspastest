import {Context} from "koa";
import {getManager} from "typeorm";
import { RegistroCUI } from "../entity/RegistroCUI";
import { RegistroPersona } from "../entity/RegistroPersona";

/**
 * Cargar registro segun cui
 */
export async function RENAP_getRegistroByCui(context: Context, next) {

  let repositorioRegistro = getManager().getRepository(RegistroCUI);
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