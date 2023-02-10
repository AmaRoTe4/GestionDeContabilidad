import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { ProductoDeVenta } from '../../../interface'

const initialState: ProductoDeVenta[] = []

export const userSales = createSlice({
    name: 'sales',
    initialState,
    reducers: {
        addProducts: (state , action) => {
            const ids:number[] = state.map(n => n.id)
            if(!(ids.includes(action.payload.id))) state.push(action.payload)
            else {
                const id = ids.indexOf(action.payload.id)
                state[id].cantidad += action.payload.cantidad
            }
        },
        removeProducts: (state , action) => {
            const newState:ProductoDeVenta[] = state.filter(n => n.id !== action.payload); 
            while(state.length > 0) state.shift();
            newState.map(n => state.push(n))
        },
        clean: (state) => {
            while(state.length > 0){
                state.shift()
            }
        }
    },
})

export const { addProducts, removeProducts, clean } = userSales.actions
export default userSales.reducer