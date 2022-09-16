import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

const initialState = {
    data : {},
    status: 'loading',
    error:{},
}

export const getAllMovies =  createAsyncThunk(`get/allMovies`, async(thunkAPI)=>{
    try{
        const response = await axios.get(`https://bookmyshowadmin.saniyashaikh1.repl.co/movies/`);
        console.log(response.data)
        return response.data;
    }
    catch(error)
    {
       return   thunkAPI.rejectWithValue(error.response.data);
    }
})

export const AllMovies = createSlice({
    name:"AllMovies",
    initialState,
    reducers:{},
    extraReducers:{
        [getAllMovies.pending] : (state)=>{
            return {...state,status:"loading"}},
        [getAllMovies.fulfilled] : (state,action)=>{
            state.data = action.payload.data;
            state.status = "loaded"
        },
        [getAllMovies.rejected] : (state,action)=>{
            return {...state,status:"loaded",error:action}
        }
    }
})

export default AllMovies.reducer;