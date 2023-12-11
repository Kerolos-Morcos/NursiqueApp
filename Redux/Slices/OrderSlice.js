import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP } from  '../../src/screens/Theme'

export const checkOutOrder = createAsyncThunk(
    "OrderSlice/checkOutOrder",
    async (orderId, thunkAPI) => {
        try {
            console.log(orderId)
            const tokenString = await AsyncStorage.getItem('token');
            const token = JSON.parse(tokenString);
            const decoded = jwtDecode(token);
               const patientId = decoded.userid;
            console.log(patientId)
            const response = await axios.put(
                `http://${IP}:3500/order/${orderId}?patientId=${patientId}`,
                {patientStatus:"inprogress"},
                {
                    headers: { authorization: `Bearer ${token}` },
                }
            );
            console.log(response.data);
            return response.data.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);




const OrderSlice = createSlice({
    name: "order",
    initialState: {
        order: [],
    },
    reducers: {

    },
    extraReducers: {
        [checkOutOrder.pending]: (state, action) => {
            console.log("pending");
        },
        [checkOutOrder.fulfilled]: (state, action) => {
            // remove all deleted devices from the cart array
            console.log(action.payload);
            state.order=action.payload;

        },
        [checkOutOrder.rejected]: (state, action) => {
            console.log("rejected");
        },

    },
})


// export const { addtoCart } = CartSlice.actions;
export default OrderSlice.reducer;