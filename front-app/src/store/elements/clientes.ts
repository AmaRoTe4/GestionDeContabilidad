import { getAllClientes } from './../../api/clientes';
import { createSlice } from '@reduxjs/toolkit'
import { Cliente} from '../../../interface'

const initialState: Cliente[] = []

export const userCliente = createSlice({
    name: 'clientes',
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

export const { reload } = userCliente.actions
export default userCliente.reducer

//@ts-ignore
export const fetchAllClientes = () => async (dispatch) => {
    const data:Cliente[] | undefined = await getAllClientes()
    if(data !== undefined) dispatch(reload(data))
}