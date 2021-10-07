import {Context} from "koa";
import {getManager} from "typeorm"; 
import { Departamento } from "../../dist/entity/Departamento";

export async function getDepartamentos(context: Context, next) {

  let repositorioRegistro = getManager().getRepository(Departamento);
  let r = await repositorioRegistro.find();
  if (!r) {
    context.status = 404;
    return;
  }

  context.body = r;
  context.status = 201;
  await next();
}