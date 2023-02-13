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
        }
    },
})

export const { reload } = userProductos.actions
export default userProductos.reducer

//@ts-ignore
export const fetchAllProductos = () => async (dispatch) => {
    const data:Producto[] | undefined = await getAllProductos()
    if(data !== undefined) dispatch(reload(data))
}