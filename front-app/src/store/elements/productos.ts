import { createSlice } from '@reduxjs/toolkit'
import { Producto } from '../../../interface'
import { getAllProductos } from '../../api/productos'

const initialState: Producto[] = []

export const userProductos = createSlice({
    name: 'productos',
    initialState,
    reducers: {
        reload: (state , action) => {
            while(state.length > 0) {
                state.shift();
            }
            for(let i = 0 ; i < action.payload.length; i++) {
                state.push(action.payload[i]);
            }
        },
        //action:
        //id
        //cantidad
        modCantidad: (state , action) => {
            let producto:Producto = state.filter(n => n.id === action.payload.id)[0]
            let productos:Producto[] = state.filter(n => n.id !== action.payload.id)
            
            console.log(action.payload)

            producto.cantidad += action.payload.cantidad;
            productos.push(producto);

            while(state.length > 0) {
                state.shift();
            }

            for(let i = 0 ; i < productos.length; i++) {
                state.push(productos[i]);
            }
        }
    },
})

export const { reload , modCantidad} = userProductos.actions
export default userProductos.reducer

//@ts-ignore
export const fetchAllProductos = () => async (dispatch) => {
    const data:Producto[] | undefined = await getAllProductos()
    if(data !== undefined) dispatch(reload(data))
}