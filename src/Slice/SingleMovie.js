import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

const initialState = {
    data : {},
    status: 'loading',
    error:{},
}
export const getSingleMovie =  createAsyncThunk(`post/getSingleMovie`, async(movieId,thunkAPI)=>{
    try{
        console.log(2)
        const result = await axios.get(process.env.URL+`api/movies/${movieId}`)
        console.log(result.data[0])
        return result.data[0];
    }
    catch(error)
    {
       return   thunkAPI.rejectWithValue(error.response.data);
    }
})
export const editMovie =  createAsyncThunk(`post/updateMovie`, async(data,thunkAPI)=>{
    try{
        console.log(2)
        const response = await axios.post(process.env.URL+`api/movies/update`,{data:data});
        console.log(response.data)
        console.log(3)
        return response.data[0];
    }
    catch(error)
    {
       return   thunkAPI.rejectWithValue(error.response.data);
    }
})

export const SingleMovie = createSlice({
    name:"SingleMovie",
    initialState,
    reducers:{},
    extraReducers:{
        [getSingleMovie.pending] : (state)=>{
            return {...state,status:"loading"}},
        [getSingleMovie.fulfilled] : (state,action)=>{
           
            state.data = action.payload;
            state.status = "loaded"
        },
        [getSingleMovie.rejected] : (state,action)=>{
            return {...state,status:"loaded",error:action}
        },
        [editMovie.pending] : (state)=>{
            return {...state,status:"loading"}},
        [editMovie.fulfilled] : (state,action)=>{
           
            state.data = action.payload;
            state.status = "loaded"
        },
        [editMovie.rejected] : (state,action)=>{
            return {...state,status:"loaded",error:action}
        },
        
    }
})

export default SingleMovie.reducer;