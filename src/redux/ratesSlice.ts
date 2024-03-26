import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

// noinspection TypeScriptValidateTypes
export const fetchRates = createAsyncThunk("fetchRates", async () => (
  (await axios.request({
    method: 'GET',
    url: 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest',
    headers: {
      'X-RapidAPI-Key': '8895cf35b4mshdab0964c83526f9p1cffeajsn44ce5e9e936b',
      'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
    }
  })).data
))

export const ratesSlice = createSlice({
  name: 'convertor',
  initialState: {
    currency: "USD",
    rates: {}
  },
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload
    },
    setRates: (state, action) => {
      state.rates = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRates.fulfilled, (state, action) => {
      state.rates = action.payload.rates
    })
  }
})

export const {setCurrency, setRates} = ratesSlice.actions

export default ratesSlice.reducer