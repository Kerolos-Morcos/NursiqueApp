import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP } from  '../../src/screens/Theme'
export const getPatient = createAsyncThunk (
  "patient/getPatient",
  async (_, thunkAPI) => {
    const patient = await AsyncStorage.getItem('data');
    const data = JSON.parse(patient);
    try {
      console.log("loging patient");
      const tokenString = await AsyncStorage.getItem('token');
      const token = JSON.parse(tokenString);
      console.log(token);
      const decoded = jwtDecode(token);
      const patientId = decoded.userid;
      console.log(patientId);
      const response = await axios.get(
        `http://${IP}:3500/patient/patientProfile/?patientId=${patientId}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      // console.log(response.data);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
////
export const updatePatientInfo = createAsyncThunk(
  "patient/updatePatientInfo",
  async (
    values, 
    { rejectWithValue }
  ) => {
    try {
      alert();
      // console.log(values);
      const tokenString = await AsyncStorage.getItem('token');
      const token = JSON.parse(tokenString);
      const decoded = jwtDecode(token);
      const patientId = decoded.userid;
      // console.log(values);
      const response = await axios.put(
        `http://${IP}:3500/patient/editPatientProf/${patientId}`,
        values
      );
      // console.log(response.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Kerolos
export const getNurseById=createAsyncThunk('PatientSlice/getNurseById',async (NurseProfileId) =>{
  try{
  const response = await axios.get(`http://${IP}:3500/nurse/nurseProfile/${NurseProfileId}`);
 console.log(response.data.data,'hihihj');
  return response.data.data;
 }
  catch(err){
      console.log(err);
  }
})
// by H
export const getBookingNurse = createAsyncThunk(
  "PatientSlice/getBookingNurse",
  async () => {
    try {
      const tokenString = await AsyncStorage.getItem('token');
      const token = JSON.parse(tokenString);
      const decoded = jwtDecode(token);
      const patientId = decoded.userid;
      const response = await axios.get(
        `http://${IP}:3500/book/NursebookingNative?patientId=${patientId}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      // console.log(response.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);




const PatientSlice = createSlice({
    name: 'patient',
    initialState: {
        patient: [],
        booking:[],
    },
    reducers: {
    //    addnurse:(state,action)=>{

    //    }

    },
    extraReducers: {
        [getPatient.pending]: (state) => {
            console.log("pending");
        },
        [getPatient.fulfilled]: (state, action) => {
            console.log("fulfilled")
          
            state.patient = action.payload;
            // console.log( state.patient)
        },
        [getPatient.rejected]: (state) => {
            // console.log(action);
            console.log("rejected")
        },

        
        // Kerolos
        [getNurseById.pending]:(state,action)=>{
          console.log("pending");
          
      },
      [getNurseById.fulfilled]:(state,action)=>{
          console.log("fulfilled");
          // console.log(action.payload);
          state.device = action.payload;
          // console.log(state.cart);
          // return state.cart
          
      },
      [getNurseById.rejected]:(state,action)=>{
          console.log("rejected");
          
      },
            // Hany
            [getBookingNurse.pending]:(state,action)=>{
              console.log("pending");
              
          },
          [getBookingNurse.fulfilled]:(state,action)=>{
              console.log("fulfilled");
              // console.log(action.payload);
              state.booking = action.payload;
              // console.log(state.cart);
              // return state.cart
              
          },
          [getBookingNurse.rejected]:(state,action)=>{
              console.log("rejected");
              
          },
    }
})


export const { addnurse } = PatientSlice.actions;
export default PatientSlice.reducer;