import { configureStore } from '@reduxjs/toolkit'
import Sales from "./elements/sales"
import Producto from "./elements/productos"
import Localidad from "./elements/localidades"
import Cliente from "./elements/clientes"
import Categoria from "./elements/categorias"

export const store = configureStore({
    reducer: {
        sales: Sales,
        productos: Producto,
        localidades: Localidad,
        clientes: Cliente,
        categorias: Categoria,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch