import { onRequestPost as __api_auth_login_ts_onRequestPost } from "/home/markus/zWork/_Git/markus/maiwald.work/MaiwaldWebsite/functions/api/auth/login.ts"
import { onRequestPost as __api_auth_register_ts_onRequestPost } from "/home/markus/zWork/_Git/markus/maiwald.work/MaiwaldWebsite/functions/api/auth/register.ts"
import { onRequestGet as __api_health_ts_onRequestGet } from "/home/markus/zWork/_Git/markus/maiwald.work/MaiwaldWebsite/functions/api/health.ts"
import { onRequest as ___middleware_ts_onRequest } from "/home/markus/zWork/_Git/markus/maiwald.work/MaiwaldWebsite/functions/_middleware.ts"

export const routes = [
    {
      routePath: "/api/auth/login",
      mountPath: "/api/auth",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_login_ts_onRequestPost],
    },
  {
      routePath: "/api/auth/register",
      mountPath: "/api/auth",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_register_ts_onRequestPost],
    },
  {
      routePath: "/api/health",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_health_ts_onRequestGet],
    },
  {
      routePath: "/",
      mountPath: "/",
      method: "",
      middlewares: [___middleware_ts_onRequest],
      modules: [],
    },
  ]