import {Context} from "koa";
import {getManager} from "typeorm"; 
import {Municipio} from "../entity/Municipio"; 

export async function getMuniciposByDepartamento(context: Context, next) {

  let repositorioRegistro = getManager().getRepository(Municipio);
  let {id_departamento} = context.params;
  let r = await repositorioRegistro.find({departamentoId: id_departamento});
  if (!r) {
    context.status = 404;
    return;
  }

  context.body = r;
  context.status = 201;
  await next();
}

export async function getMunicipos(context: Context, next) {

  let repositorioRegistro = getManager().getRepository(Municipio);
  let r = await repositorioRegistro.find();
  if (!r) {
    context.status = 404;
    return;
  }

  context.body = r;
  context.status = 201;
  await next();
}