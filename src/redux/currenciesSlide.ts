import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

// noinspection TypeScriptValidateTypes
export const fetchCurrencies = createAsyncThunk("fetchCurrencies", async () => (
  (await axios.request({
    method: 'GET',
    url: 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/symbols',
    headers: {
      'X-RapidAPI-Key': '8895cf35b4mshdab0964c83526f9p1cffeajsn44ce5e9e936b',
      'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
    }
  })).data
))

export const currenciesSlice = createSlice({
  name: 'currencies',
  initialState: {
    currencies: []
  },
  reducers: {
    setCurrencies: (state, action) => {
      state.currencies = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrencies.fulfilled, (state, action) => {
      state.currencies = Object.keys(action.payload.symbols)
    })
  }
})

export const {setCurrencies} = currenciesSlice.actions

export default currenciesSlice.reducer