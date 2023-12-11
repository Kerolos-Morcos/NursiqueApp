import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IP } from  '../../src/screens/Theme'

// getAllProducts => action sync or async

export const getAllNurses = createAsyncThunk("nurse/getNurses", async () => {
    try {
        let res = await axios.get(`http://${IP}:3500/nurse/getNurses`);
// console.log(res.data.data)
        return res.data.data;

    }
    catch (err) {
        console.log(err)

    }

})

 

const NurseSlice = createSlice({
    name: 'nurse',
    initialState: {
        nurses: [],
        filteredNerses: [],
      
    },
    reducers: {
       search: (state, action) => {
        if (action.payload === "") {
            state.filteredNerses = [...state.nurses]
        }
        else {
            state.filteredNerses = state.nurses.filter(nurse => nurse.name.includes(action.payload));
            console.log(action.payload);
        }
    },
   
},
extraReducers: {
    [getAllNurses.pending]: (state) => {
      console.log('getAllNurses pending...');
    },
    [getAllNurses.fulfilled]: (state, action) => {
      console.log('getAllNurses fulfilled...');
      state.nurses = action.payload;
      state.filteredNerses = action.payload;
      // console.log(state.nurses, 'kjkjkj');
    },
    [getAllNurses.rejected]: (state, action) => {
      console.log('getAllNurses rejected...');
    },
  }
})


export default NurseSlice.reducer;
export const {  search} = NurseSlice.actions;