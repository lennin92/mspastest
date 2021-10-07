
import {getRegistroByCui} from "./controller/GetRegistroByCUI"
import {postInitializeDB} from "./controller/PostInitializeDB"
import {getMunicipos, getMuniciposByDepartamento} from "./controller/GetMunicipios"
import {getDepartamentos} from "./controller/GetDepartamentos"

/**
 * All application routes.
 */
 export const AppRoutes = [
  {
    path: "/cui_query/:cui",
    method: "get",
    action: getRegistroByCui
  }, {
    path: "/initdb",
    method: "get",
    action: postInitializeDB
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