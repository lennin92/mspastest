
import {getRegistroCuifromRenap, getStoredRegistroPersona} from "./controller/GetCuiRenapSimulator"
import {RENAP_getRegistroByCui} from "./controller/GetRegistroByCUI"
import {getMunicipos, getMuniciposByDepartamento} from "./controller/GetMunicipios"
import {getDepartamentos} from "./controller/GetDepartamentos"
import {postInitializeDB} from "./controller/PostInitializeDB"
import {postFillRegistroByCui} from "./controller/PostFillRegistroByCUI"

/**
 * All application routes.
 */
 export const AppRoutes = [{
    path: "/get_registro/:cui",
    method: "get",
    action: getRegistroCuifromRenap
  }, {
    path: "/get_registro_almacenado/:cui",
    method: "get",
    action: getStoredRegistroPersona
  }, {
    path: "/RENAP/cui_query/:cui",
    method: "get",
    action: RENAP_getRegistroByCui
  }, {
    path: "/initdb",
    method: "post",
    action: postInitializeDB
  }, {
    path: "/register_cui/:cui",
    method: "post",
    action: postFillRegistroByCui
  }, {
    path: "/municipios/:id_departamento",
    method: "get",
    action: getMuniciposByDepartamento
  }, {
    path: "/municipios",
    method: "get",
    action: getMunicipos
  }, {
    path: "/departamentos",
    method: "get",
    action: getDepartamentos
  }
]