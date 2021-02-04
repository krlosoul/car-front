import { IPersonas } from "./ipersonas";

export interface IUsuarios {
  usu_codigo: number,
  per_codigo:number,
  usu_usuario: string,
  usu_clave: string,
  persona: IPersonas;
}

export function getUsers(data:any): Array<IUsuarios> {
  let usuario: Array<IUsuarios> = data.map((u: { usu_codigo?: number; per_codigo?: number; usu_usuario: string; usu_clave: string; per_nombres: string; per_apellidos: string; }) => <IUsuarios>{
    usu_codigo : u.usu_codigo,
    per_codigo: u.per_codigo,
    usu_usuario: u.usu_usuario,
    usu_clave: u.usu_clave,
    persona: <IPersonas>{
      per_codigo:u.per_codigo,
      per_nombres:u.per_nombres,
      per_apellidos:u.per_apellidos
    }
  });
  return usuario;
}

