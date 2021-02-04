import { IProductos } from "./iproductos";
export interface ICarros {
  car_codigo: number,
  pro_referencia: string,
  usu_codigo:number,
  car_cantidad: number,
  car_total: number,
  car_estado: number
  producto: IProductos,
}

export function getCarros(data:any): Array<ICarros> {
  let carro: Array<ICarros> = data.map((c: { car_codigo?: number; pro_referencia?: string; usu_codigo: number; car_cantidad: number; car_total: number; car_estado: number; pro_descripcion:string; pro_valor:number; }) => <ICarros>{
    car_codigo: c.car_codigo,
    pro_referencia: c.pro_referencia,
    usu_codigo: c.usu_codigo,
    car_cantidad: c.car_cantidad,
    car_total: c.car_total,
    car_estado: c.car_estado,
    producto: <IProductos>{
      pro_referencia : c.pro_referencia,
      pro_descripcion: c.pro_descripcion,
      pro_valor: c.pro_valor
    }
  });
  return carro;
}
