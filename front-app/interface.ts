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
    nombre?:string;
}

export interface VentanaDeVenta {
    id:number;
    id_cliente:number;
    path:string;
    productos:ProductoDeVenta[];
}

export interface Venta {
    id?:number;
    createdAt?:string;
    cliente: number
    articulos: ProductoDeVenta[]
    tipo_de_venta: string
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
    ventas:Venta[]
    localidad:string
}

//ventas:

export interface BoletaCliente {
    estado:boolean,
    tipoVenta:string  
    cliente:Cliente,
    localidad:string,
    pago:string,
    etc: string
}

export interface BoletaPropietario {
    duenio:string
    direccion:string
    telefono:string
    gmail:string
    tipo:string
    numero:string
    fecha:string
    origen:string
    imagen?:string
}