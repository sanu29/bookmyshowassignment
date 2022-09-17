import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'


let initialState = {
    filteredBy : 'All'
}


export const FilteredSlice = createSlice({
    name:'FilteredSlice',
    initialState,
    reducers:{
        All: (state)=>{state.filteredBy='All'},
        Adventure:(state)=>{state.filteredBy='Adventure'},
        Comedy : (state)=>{state.filteredBy='Comedy'},
        Drama : (state)=>{state.filteredBy='Drama'},
        Romance : (state)=>{state.filteredBy='Romance'}
    }
})

export const {All,Adventure,Comedy,Drama,Romance} = FilteredSlice.actions
export default FilteredSlice.reducer