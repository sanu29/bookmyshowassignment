import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"
const initialState = {
    data : {},
    status: 'loading',
    error:{},
}

export const getTheaterData =  createAsyncThunk(`get/theater`, async(data,thunkAPI)=>{
    try{
        console.log(data)
        const response = await axios.get(process.env.URL+`api/movie/allTheater/${data.location}/${data.movieId}`);
        console.log(response.data.data)
        return response.data;
    }
    catch(error)
    {
       return   thunkAPI.rejectWithValue(error.response.data);
    }
})

export const TheaterData = createSlice({
    name:"TheaterData",
    initialState,
    reducers:{},
    extraReducers:{
        [getTheaterData.pending] : (state)=>{
            return {...state,status:"loading"}},
        [getTheaterData.fulfilled] : (state,action)=>{
            state.data = action.payload.data;
            // console.log(state.data)
            state.status = "loaded"
        },
        [getTheaterData.rejected] : (state,action)=>{
            return {...state,status:"loaded",error:action}
        }
    }
})

export default TheaterData.reducer;