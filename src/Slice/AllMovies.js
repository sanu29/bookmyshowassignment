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
        const response = await axios.get(`https://boonmyshowadminbackend.herokuapp.com/movies/`);
        console.log(response.data)
        return response.data;
    }
    catch(error)
    {
       return   thunkAPI.rejectWithValue(error.response.data);
    }
})
export const postMovie =  createAsyncThunk(`post/allMovies`, async(data,thunkAPI)=>{
    try{
        console.log(2)
        const response = await axios.post(`https://boonmyshowadminbackend.herokuapp.com/movies/`,data);
        console.log(response.data)
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
        },
        [postMovie.pending] : (state)=>{
            return {...state,status:"loading"}},
        [postMovie.fulfilled] : (state,action)=>{
            state.data = action.payload;
            state.status = "loaded"
        },
        [postMovie.rejected] : (state,action)=>{
            return {...state,status:"loaded",error:action}
        },
        
    }
})

export default AllMovies.reducer;