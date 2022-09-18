import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'


let initialState = {
    filteredBy : 'All',
    language : 'AllLang'
}


export const FilteredSlice = createSlice({
    name:'FilteredSlice',
    initialState,
    reducers:{
        All: (state)=>{state.filteredBy='All'},
        Adventure:(state)=>{state.filteredBy='Adventure'},
        Comedy : (state)=>{state.filteredBy='Comedy'},
        Drama : (state)=>{state.filteredBy='Drama'},
        Romance : (state)=>{state.filteredBy='Romance'},
        Hindi : (state)=>{state.language='Hindi'},
        English : (state)=>{state.language='English'},
        Marathi : (state)=>{state.language='Marathi'},
        Bengali : (state)=>{state.language='Bengali'},
        Telugu : (state)=>{state.language='Telugu'},
        Punjabi : (state)=>{state.language='Punjabi'},
        Kannada : (state)=>{state.language='Kannada'},
        Tamil : (state)=>{state.language='Tamil'},
        AllLang : (state)=>{state.language='AllLang'},
    }
})

export const {All,Adventure,Comedy,Drama,Romance,English,Hindi,Marathi,Tamil,Telugu,Bengali,Kannada,AllLang,Punjabi} = FilteredSlice.actions
export default FilteredSlice.reducer