import { configureStore } from '@reduxjs/toolkit'
import Sales from "./elements/sales"

export const store = configureStore({
    reducer: {
        sales: Sales,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch