import { createSlice } from '@reduxjs/toolkit'
import { Categoria } from '../../../interface'
import { getAllLCategorias } from '../../api/categorias'

const initialState: Categoria[] = []

export const userCategorias = createSlice({
    name: 'categorias',
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

export const { reload } = userCategorias.actions
export default userCategorias.reducer

//@ts-ignore
export const fetchAllCategorias = () => async (dispatch) => {
    const data:Categoria[] | undefined = await getAllLCategorias()
    if(data !== undefined) dispatch(reload(data))
}