import { configureStore } from '@reduxjs/toolkit'
import AllMovies from '../Slice/AllMovies'
import AllCategory from '../Slice/AllCategory'
import TheaterData  from '../Slice/AllTheaterTimming'
import FilteredSlice from '../Slice/FilteredSlice'
import SingleMovie from '../Slice/SingleMovie'
export const store = configureStore({
    reducer:{
        AllMovies:AllMovies,
        AllCategory:AllCategory,
        TheaterData:TheaterData,
        FilteredSlice:FilteredSlice,
        SingleMovie:SingleMovie
    },
})