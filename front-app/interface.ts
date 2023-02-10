export interface Producto {
    id?:number;
    nombre: string
    descripcion: string
    categoria: number
    cantidad: number
    precio: number
    codigo: number
}

export interface Cliente {
    id?:number,
    nombre:string,
    apellido:string,
    localidad:number,
    telefono:string,
    debe:number,
}

export interface ProductoDeVentaVista {
    nombre:string;
    cantidad: number;
    precio:number;
}

export interface ProductoDeVenta {
    id:number;
    cantidad: number;
    precio:number;
}

export interface Venta {
    id?:number;
    cliente: number
    articulos: ProductoDeVenta[]
    tipo_de_venta: number
    valor_total: number
    valor_abonado: number
}

export interface Categoria {
    id?:number,
    nombre:string,
}

export interface Localidad{
    id?:number,
    nombre:string,
}

export interface DataFullCustomar {
    cantidad_de_facturas_sin_pagar:number
    cantidad_de_compras:number
    valorVentasTotal:number
    cantidadPVT:number
    ventas:Venta[]
    localidad:string
}