import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IP } from  '../../src/screens/Theme'

export const getDevices = createAsyncThunk("devices/getDevice", async () => {
    try {
        let res = await axios.get(`http://${IP}:3500/device/getdevices`)
        console.log(res.data.data , "rwerweterte");  
        return res.data.data
    }
    catch (err) {
        console.log(err);
    }
})

// Hany
// export const getDeviceById=createAsyncThunk('DeviceSlice/getDeviceById',async (itemId) =>{
//     try{
//     const response=await axios.get(`http://${IP}:3500/device/getdevice/${itemId}`);
// //    console.log(response.data);
//     return response.data.data;
//    }
//     catch(err){
//         console.log(err);
//     }
// })

// export const addDevice = createAsyncThunk("devices/addDevice",async (payload)=>{
//     try{
//         await axios.post('http://localhost:3500/device/addDevice', payload)
//     }
//     catch (err) {
//         console.log(err);
//     }
// })

const DeviceSlice = createSlice({
    name: "device",
    initialState: {
        
        devices: [],
        filteredDevices: [],
        // filteredArr: [],
        // department: [],
        // evaluate: [],
    },
    reducers: {
        // addToCart: (state, action) => {
        //     state.cart.push(action.payload)
        //     console.log("Added");
        // },
        search: (state, action) => {
            // console.log(action.payload);/
            if (action.payload === "") {
                state.filteredDevices = [...state.devices]
            }
            else {
                state.filteredDevices = state.devices.filter(item => item.name.toLowerCase().includes(action.payload) || item.category.toLowerCase().includes(action.payload))
            }
        },

 

       
    },
    extraReducers: {
        [getDevices.pending]: (state) => {
            console.log("pending");
        },
        [getDevices.fulfilled]: (state, action) => {
            state.devices = action.payload;
            console.log( state.devices, "fulfilled");

            state.filteredDevices = action.payload;
        },
        [getDevices.rejected]: (state) => {
            console.log("rejected");
        },
        

        // Hany
        // [getDeviceById.pending]:(state,action)=>{
        //     console.log("pending");
            
        // },
        // [getDeviceById.fulfilled]:(state,action)=>{
        //     console.log("fulfilled");
        //     // console.log(action.payload);
        //     state.device = action.payload;
        //     // console.log(state.cart);
        //     // return state.cart
            
        // },
        // [getDeviceById.rejected]:(state,action)=>{
        //     console.log("rejected");
            
        // },
    }
}
)
export default DeviceSlice.reducer
export const { search  } = DeviceSlice.actions