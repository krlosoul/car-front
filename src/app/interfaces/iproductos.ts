export interface IProductos {
  pro_referencia: string,
  pro_descripcion: string,
  pro_valor: number
}

export function getProductos(data:any): Array<IProductos> {
  let producto: Array<IProductos> = data.map((p: { pro_referencia?: string; pro_descripcion?: string; pro_valor: number }) => <IProductos>{
    pro_referencia : p.pro_referencia,
    pro_descripcion: p.pro_descripcion,
    pro_valor: p.pro_valor
  });
  return producto;
}
