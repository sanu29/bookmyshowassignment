import { configureStore } from '@reduxjs/toolkit'
import AllMovies from '../Slice/AllMovies'
import AllCategory from '../Slice/AllCategory'
export const store = configureStore({
    reducer:{
        AllMovies:AllMovies,
        AllCategory:AllCategory
    },
})