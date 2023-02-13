import { createSlice } from '@reduxjs/toolkit'
import { Localidad } from '../../../interface'
import { getAllLocalidades } from '../../api/localidades'

const initialState: Localidad[] = []

export const userLocalidades = createSlice({
    name: 'localidades',
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

export const { reload } = userLocalidades.actions
export default userLocalidades.reducer

//@ts-ignore
export const fetchAllLocalidades = () => async (dispatch) => {
    const data:Localidad[] | undefined = await getAllLocalidades()
    if(data !== undefined) dispatch(reload(data))
}