/* eslint-disable max-len */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const axios = require('axios');

export const fetchStyleInfo = createAsyncThunk(
  'products/getStyleInfo',
  async (productId, thunkAPI) => {
    const response = await axios.get(`http://ec2-54-241-138-72.us-west-1.compute.amazonaws.com:5000/products/${productId}/styles`);
    return response.data;
  }
);

export const overviewSlice = createSlice({
  name: 'overview',
  initialState: {
    //Initial state here
    currentStyle: null,
    styles: {},
    expanded: false,
    magnified: false
  },
  //A reducer is a function that receives the current state and an action object, decides how to update the state if necessary, and returns the new state
  reducers: {
    selectStyle: (state, action) => {
      state.currentStyle = action.payload;
    },
    expandView: (state, action) => {
      state.expanded = action.payload;
    },
    magnifyView: (state, action) => {
      state.magnified = action.payload;
    }
  },
  extraReducers: {
    [fetchStyleInfo.fulfilled]: (state, action) => {
      state.styles = action.payload[0].results;
      state.currentStyle = action.payload[0].results[0];
    }
  }
});

//Action creators are generated for each reducer function. Add multiple like so { reducer1, reducer2, ...}
export const { selectStyle, expandView, magnifyView } = overviewSlice.actions;

//Makes the reducers defined above available to the store
export default overviewSlice.reducer;
