import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchTasks = createAsyncThunk("fetchTasks", async () => {
  const res = await axios.get(`http://localhost:3018/list-All`);
  //console.log(res.data);
  return res.data
});

export const addTask = createAsyncThunk('addTask', async(formData,{rejectWithValue})=> {
  try {
    const res = await axios.post(`http://localhost:3018/addTask`,formData)
    // console.log('response',res.data)
    return res.data
  } catch (e) {
    console.log('fd')

    return rejectWithValue(e.response.data.errors)
    //console.log(e.response.data.errors)
  }
})

export const deleteTask = createAsyncThunk('deleteTask', async(id,{rejectWithValue}) => {
  try {
    const res = await axios.delete(`http://localhost:3018/delete-Task/${id}`)
    return res.data
  } catch (e) {
    console.log('',e)
    return rejectWithValue(e.response.data)
  }
})

export const updateTask = createAsyncThunk('updateTask',async(id,{rejectWithValue})=> {
  try {
    console.log(id)
    const res = await axios.put(`http://localhost:3018/update-Task/${id}`)
    console.log('res',res.data)
    return res.data
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

const initialState = {
  task:[],
  loading : false,
  serverErr : null
}

export const taskSlice = createSlice({
  name: 'task',
  initialState : initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.task = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.task = [];
      });
    builder.addCase(addTask.pending,(state)=>{
      state.loading = true;
      state.serverErr = null
    })
    builder.addCase(addTask.fulfilled,(state,action)=>{
      console.log('som')
      state.loading = false;
      state.task = [...state.task,action.payload]
      
    })
    builder.addCase(addTask.rejected,(state,action)=> {
      console.log('rej',action.payload)
      state.loading = false;
      state.serverErr = action.payload
      
    })
    builder.addCase(deleteTask.pending,(state)=> {
      state.loading = true;
    })
    builder.addCase(deleteTask.fulfilled,(state,action)=> {
      state.loading = false
      state.task = state.task.filter((ele)=> ele._id !== action.payload._id )
    })
    builder.addCase(deleteTask.rejected,(state,action) => {
      state.loading = false
      state.serverErr = action.payload
    })
    builder.addCase(updateTask.pending,(state) => {
      state.loading = true
      
    })
    builder.addCase(updateTask.fulfilled, (state,action) => {
      state.loading = false;
      state.task = state.task.map((ele)=> {
        if(ele._id === action.payload._id){
          return action.payload
        }else {
          return ele
        }
      })
    } )
    builder.addCase(updateTask.rejected, (state,action) => {
      state.loading = false;
      state.serverErr = action.payload
    } )
  }
    
})


// Action creators are generated for each case reducer function

export default taskSlice.reducer