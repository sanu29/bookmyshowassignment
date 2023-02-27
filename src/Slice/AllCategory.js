import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

const initialState = {
    data : {},
    status: 'loading',
    error:{},
}

export const getAllCategory =  createAsyncThunk(`get/allCategory`, async(thunkAPI)=>{
    try{
        const response = await axios.get(`/api/genere`);
        console.log(response.data)
        return response.data;
    }
    catch(error)
    {
       return   thunkAPI.rejectWithValue(error.response.data);
    }
})

export const AllCategory = createSlice({
    name:"AllCategory",
    initialState,
    reducers:{},
    extraReducers:{
        [getAllCategory.pending] : (state)=>{
            return {...state,status:"loading"}},
        [getAllCategory.fulfilled] : (state,action)=>{
            state.data = action.payload.data;
            state.status = "loaded"
        },
        [getAllCategory.rejected] : (state,action)=>{
            return {...state,status:"loaded",error:action}
        }
    }
})

export default AllCategory.reducer;