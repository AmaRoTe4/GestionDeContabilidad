import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { ProductoDeVenta, VentanaDeVenta } from '../../../interface'

const initialState:VentanaDeVenta[] = [
    {
        id:0,
        id_cliente:-1,
        path:"/Ventas/0",
        productos: [],
    }
]

export const userSales = createSlice({
    name: 'sales',
    initialState,
    reducers: {
        //action:
        //id
        //newId_cliente
        modIdCliente: (state , action) => {
            const map = state.map(n => n.id)
            const id = map.indexOf(action.payload.id)
            state[id].id_cliente = action.payload.newId_cliente
        },
        //action:
        //id
        //newPath
        modPath: (state , action) => {
            const map = state.map(n => n.id)
            const id = map.indexOf(action.payload.id)
            state[id].path = action.payload.newPath
        },
        addSales: (state , action) => {
            state.push({
                id:action.payload,
                id_cliente:-1,
                path:`/Ventas/${action.payload}`,
                productos: [],
            })
        },
        removeSales: (state , action) => {
            const newState:VentanaDeVenta[] = state.filter(n => n.id !== action.payload)
            while(state.length > 0) state.shift()
            while(newState.length > 0) {
                let aux = newState.shift()
                if(aux === undefined) return
                state.push(aux)
            }
        },
        //ver que se creo como el objeto payload
        //id
        //productos{
        //  id
        //  cantidad
        //  precio
        //}
        addProducts: (state , action) => {
            const map = state.map(n => n.id)
            const id = map.indexOf(action.payload.id)
            const ids:number[] = state[id].productos.map(n => n.id)

            if(!(ids.includes(action.payload.productos.id))) {
                state[id].productos.push(action.payload.productos)
            }
            else {
                const id = ids.indexOf(action.payload.productos.id)
                state[id].productos[id].cantidad += action.payload.productos.cantidad
            }
        },
        //id
        //id_producto
        removeProducts: (state , action) => {
            const map = state.map(n => n.id)
            const id = map.indexOf(action.payload.id)

            const newState:ProductoDeVenta[] = state[id].productos.filter(n => n.id !== action.payload.id_producto); 
            
            while(state[action.payload.id].productos.length > 0) state[action.payload.id].productos.shift();
            
            newState.map(n => state[action.payload.id].productos.push(n))
        },
        clean: (state , action) => {
            const map = state.map(n => n.id)
            const id = map.indexOf(action.payload.id)
            while(state[id].productos.length > 0) state[id].productos.shift() 
            state[id].path = `/Ventas/${action.payload.id}`
        }
    },
})

        
export const { modPath , addSales , removeSales , addProducts, removeProducts, clean , modIdCliente} = userSales.actions
export default userSales.reducer