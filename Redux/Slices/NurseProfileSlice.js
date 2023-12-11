import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IP } from '../../src/screens/Theme';

export const getNurse = createAsyncThunk("nurse/getNurse", async (_, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const decoded = jwtDecode(token);
    const id = decoded.userid;
    console.log(id)

    const response = await axios.get(`http://${IP}:3500/nurse/nurseProfile/${id}`);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateNurseEducation = createAsyncThunk(
  "nurse/updateNurseEducation",
  async (
    { nurseEducation_id, index, values },
    { rejectWithValue }
  ) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const decoded = jwtDecode(token);
      const id = decoded.userid;

      const response = await axios.put(
        `http://${IP}:3500/nurse/${id}/education/${nurseEducation_id}`,
        values
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteNurseEducation = createAsyncThunk(
  "nurse/deleteNurseEducation",
  async ({ nurse_id, educationIndex }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://${IP}:3500/nurse/${nurse_id}/education/${educationIndex}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateNurseExperience = createAsyncThunk(
  "nurse/updateNurseExperience",
  async (
    { nurseExperience_id, index, values },
    { rejectWithValue }
  ) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const decoded = jwtDecode(token);
      const id = decoded.userid;

      const response = await axios.put(
        `http://${IP}:3500/nurse/${id}/experience/${nurseExperience_id}`,
        values
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteNurseExperience = createAsyncThunk(
  "nurse/deleteNurseExperience",
  async (
    { nurse_id, experience_id },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.delete(
        `http://${IP}:3500/nurse/${nurse_id}/experience/${experience_id}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateNurseInfo = createAsyncThunk(
  "nurse/updateNurseInfo",
  async (
    form,
    config,
    { rejectWithValue }
  ) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const decoded = jwtDecode(token);
      const id = decoded.userid;

      const response = await axios.put(
        `http://${IP}:3500/nurse/editNurseProf/${id}`,
        form,config
      );
      console.log(response)

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addRateToNurse = createAsyncThunk('PatientSlice/addRateToNurse', async ({ NurseProfileId, ratenumbering }) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const decoded = jwtDecode(token);
    const patientId = decoded.userid;

    const response = await axios.put(`http://${IP}:3500/patient/addrate/${patientId}/${NurseProfileId}`, { rate: ratenumbering }, {
      headers: { authorization: `Bearer ${token}` },
    });

    return response.data.data;
  } catch (err) {
    console.log(err);
  }
});

const nurseProfileSlice = createSlice({
  name: "nurseProfile",
  initialState: {
    nurseProfile: {},
  },
  reducers: {},
  extraReducers: {
    [getNurse.pending]: (state) => {
      console.log("pending");
    },
    [getNurse.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.nurseProfile = action.payload;
    },
    [getNurse.rejected]: (state, action) => {
      console.log("rejected");
    },

    [addRateToNurse.pending]: (state, action) => {
      console.log("pending");
    },
    [addRateToNurse.fulfilled]: (state, action) => {
      console.log("fulfilled");
      state.nurseProfile = action.payload;
    },
    [addRateToNurse.rejected]: (state, action) => {
      console.log("rejected");
    },
  }
});

export default nurseProfileSlice.reducer;
