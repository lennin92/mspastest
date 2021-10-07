import {Context} from "koa";
import {getManager} from "typeorm";
import {Departamento} from "../entity/Departamento";
import {Municipio} from "../entity/Municipio";
import {RegistroPersona} from "../entity/RegistroPersona";
import {getCuiFromRenap} from "./GetCuiRenapSimulator"

/**
 * Cargar registro segun cui
 */
export async function postFillRegistroByCui(context: Context, next) {

  let repositorioRegistro = getManager().getRepository(RegistroPersona);
  let repositorioMunicipio = getManager().getRepository(Municipio);
  let { cui } = context.params;
  let registroCui = await getCuiFromRenap(cui);

  if (!registroCui) {
    context.status = 404;
    context.body = {error: 'CUI no existe en base de RENAP'};
    return;
  }

  let { 
    departamento_id, 
    municipio_id, 
    escolaridad, 
    comunidad_linguistica, 
    sexo, 
    fecha_parto, 
    telefono 
  } = context.request.body;
  console.log("Searching for cui: " + cui);
  

  let m = await repositorioMunicipio.findOne(municipio_id);
  if (!m) {
    context.status = 404;
    context.body = {error: 'Municipio no existe'};
    return;
  }
  console.log(context.request.body);
  console.log(m.departamentoId);
  console.log(departamento_id);
  if (m.departamentoId != departamento_id){
    context.status = 400;
    context.body = {error: 'Departamento invalido'};
    return;
  }
  if (!(sexo=='M' || sexo=='F')) {
    context.status = 400;
    context.body = {error: 'sexo solo puede ser M o F'};
    return;
  }
  
  if (sexo =='M' && fecha_parto) { 
    context.status = 400;
    context.body = {error: 'Mismatch de datos sexo=M y fecha de parto incluida'};
    return;
  }

  if (sexo == 'F' && fecha_parto) {
    console.log("fecha parto");
    console.log(fecha_parto);
    fecha_parto = new Date(fecha_parto);
    if (fecha_parto < new Date()) {
      context.status = 400;
      context.body = {error: 'Fecha de parto invalida (menor a actual)'};
      return;
    }
    let max_date = new Date();
    max_date.setMonth(max_date.getMonth() + 9);
    if (fecha_parto >  max_date) {
      context.status = 400;
      context.body = {error: 'Fecha de parto invalida'};
      return;
    } 
  }
  let fecha_nacimiento = new Date(registroCui.fecha_nacimiento);

  let r = RegistroPersona.createRegistro(
    registroCui.cui, 
    registroCui.nombres,
    registroCui.apellidos,
    fecha_nacimiento,
    sexo,
    telefono,
    fecha_parto,
    municipio_id
  );
  r.escolaridad = escolaridad;
  r.comunidad_linguistica = comunidad_linguistica;
  r.sexo = sexo;
  r.telefono = telefono;
  r.municipio = m;
  
  r.escolaridad = escolaridad;
  await repositorioRegistro.save(r);

  context.body = r;
  context.status = 201;

  await next();
}