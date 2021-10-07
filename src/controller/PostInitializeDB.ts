import {Context} from "koa";
import {getManager} from "typeorm";
import {Departamento} from "../entity/Departamento";
import {Municipio} from "../entity/Municipio";
import { RegistroCUI } from "../entity/RegistroCUI";
import {RegistroPersona} from "../entity/RegistroPersona";

/**
 * Cargar registro segun cui
 */
export async function postInitializeDB(context: Context) {

  console.log("Inserting a new user into the database...");
  let repositorioDepartamento = getManager().getRepository(Departamento);
  let repositorioMunicipio = getManager().getRepository(Municipio);
  let repositorioRegistro = getManager().getRepository(RegistroPersona);
  let repositorioRegistroCUI = getManager().getRepository(RegistroCUI);

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
  // GET OR CREATE MUNICIPIO CON ID=2
  let m2 = await repositorioMunicipio.findOne(2);
  if (!m2) {
    m2 = Municipio.createMunicipio('Amatitlan', d);
    await repositorioMunicipio.save(m2);
  }

  // GET OR CREATE DEPARTAMENTO CON ID=2
  let d2 = await repositorioDepartamento.findOne(2);
  if (!d2) {
    d2 = Departamento.createDepartamento('Escuintla', null);
    await repositorioDepartamento.save(d2);
  }
  // GET OR CREATE MUNICIPIO CON ID=3
  let m3 = await repositorioMunicipio.findOne(3);
  if (!m3) {
    m3 = Municipio.createMunicipio('Iztapa', d2);
    await repositorioMunicipio.save(m3);
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



  // Populando registros del CUI
  let cui1 = await repositorioRegistroCUI.findOne('1111111');
  if (!cui1) {
    cui1 = RegistroCUI.createRegistro(
      '1111111',
      'Nombres2',
      'Apelidos2',
      new Date('Feb, 20, 1990')
    );
    await repositorioRegistroCUI.save(cui1);
    console.log("Saved a new user with id: " + cui1.cui);
  } 
  let cui2 = await repositorioRegistroCUI.findOne('1111111');
  if (!cui2) {
    cui2 = RegistroCUI.createRegistro(
      '1111111',
      '222222',
      'Apelidos2221111',
      new Date('Feb, 20, 1991')
    );
    await repositorioRegistroCUI.save(cui2);
    console.log("Saved a new user with id: " + cui2.cui);
  } 
  let cui3 = await repositorioRegistroCUI.findOne('040411');
  if (!cui3) {
    cui3 = RegistroCUI.createRegistro(
      '040411',
      'NOMBRES !11',
      'Apelid 221111',
      new Date('Feb, 20, 1991')
    );
    await repositorioRegistroCUI.save(cui3);
    console.log("Saved a new user with id: " + cui3.cui);
  } 
  let cui4 = await repositorioRegistroCUI.findOne('04A--1');
  if (!cui4) {
    cui4 = RegistroCUI.createRegistro(
      '04A--1',
      'ASDFGG AA',
      'Apelid 221111',
      new Date('Feb, 20, 1991')
    );
    await repositorioRegistroCUI.save(cui4);
    console.log("Saved a new user with id: " + cui4.cui);
  } 

  context.status = 200;
}