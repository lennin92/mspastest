import {Context} from "koa";
import {getManager} from "typeorm";
import {RegistroPersona} from "../entity/RegistroPersona";

const superagent = require('superagent');
require('dotenv').config()

export async function getCuiFromRenap(cui :string) {
  let url = process.env.RENAP_URI + cui;
  console.log("HTTP GET: " + url);
  const res = await superagent.get(url);
  if (res.status != 200) return null;
  return res.body;
}

export async function getRegistroCuifromRenap(context: Context, next) {
  let { cui } = context.params
  let registro_cui = await getCuiFromRenap(cui);
  if (!registro_cui) {
    context.status = 404;
    context.body = {error: 'CUI no existe en base de RENAP'};
    return;
  }

  context.status = 200;
  context.body = registro_cui;
  await next();
}


export async function getStoredRegistroPersona(context: Context, next) {
  let { cui } = context.params
  let repositorioRegistro = getManager().getRepository(RegistroPersona);
  let registro_cui = await repositorioRegistro.findOne({cui:cui});
  if (!registro_cui) {
    context.status = 404;
    context.body = {error: 'CUI no registrado en base MSPAS'};
    return;
  }

  context.status = 200;
  context.body = registro_cui;
  await next();
}