
import {getRegistroByCui} from "./controller/GetRegistroByCUI"
import {postInitializeDB} from "./controller/PostInitializeDB"

/**
 * All application routes.
 */
 export const AppRoutes = [
  {
    path: "/cui_query",
    method: "get",
    action: getRegistroByCui
  }, {
    path: "/initdb",
    method: "get",
    action: postInitializeDB
  },
]