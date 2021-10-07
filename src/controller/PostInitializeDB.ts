import {Context} from "koa";
import {getManager} from "typeorm";
import {Departamento} from "../entity/Departamento";
import {Municipio} from "../entity/Municipio";
import {RegistroPersona} from "../entity/RegistroPersona";

/**
 * Cargar registro segun cui
 */
export async function postInitializeDB(context: Context) {

  console.log("Inserting a new user into the database...");
  let repositorioDepartamento = getManager().getRepository(Departamento);
  let repositorioMunicipio = getManager().getRepository(Municipio);
  let repositorioRegistro = getManager().getRepository(RegistroPersona);

  // GET OR CREATE DEPARTAMENTO CON ID=1
  let d = await repositorioDepartamento.findOne(1);
  if (!d) {
    d = Departamento.createDepartamento('Guatemala', null);
    await repositorioDepartamento.save(d);
  }

  // GET OR CREATE MUNICIPIO CON ID=1
  let m = await repositorioMunicipio.findOne(1);
  if (!m) {
    m = Municipio.createMunicipio('Ciudad de Guatemala', d);
    await repositorioMunicipio.save(m);
  }

  // GET OR CREATE REGISTRO CON CUI = 2205011
  let r1 = await repositorioRegistro.findOne('2205011');
  if (!r1) {
    r1 = RegistroPersona.createRegistro(
      '2205011',
      'Nombres1',
      'Apelidos1',
      new Date('Aug, 11, 1988'),
      'M',
      '888888',
      null,
      m
    );
    await repositorioRegistro.save(r1);
    console.log("Saved a new user with id: " + r1.cui);
  } 


  // GET OR CREATE REGISTRO CON CUI = 2201150
  let r2 = await repositorioRegistro.findOne('2201150');
  if (!r2) {
    r2 = RegistroPersona.createRegistro(
      '2201150',
      'Nombres2',
      'Apelidos2',
      new Date('Feb, 20, 1990'),
      'F',
      '888888',
      null,
      m
    );
    await repositorioRegistro.save(r2);
    console.log("Saved a new user with id: " + r2.cui);
  } 


  // GET OR CREATE REGISTRO CON CUI = 2201150
  let r3 = await repositorioRegistro.findOne('2201150');
  if (!r2) {
    r2 = RegistroPersona.createRegistro(
      '2201150',
      'Nombres2',
      'Apelidos2',
      new Date('Feb, 20, 1990'),
      'F',
      '888888',
      null,
      m
    );
    r2.comunidad_linguistica = 'Espanol';
    r2.escolaridad = 'Bachiller';
    await repositorioRegistro.save(r2);
    console.log("Saved a new user with id: " + r2.cui);
  } 
  context.status = 200;
}