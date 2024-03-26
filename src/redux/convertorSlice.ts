import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

export const fetchConvert = createAsyncThunk("fetchConvert", async (_, {getState}) => {
  const {firstAmount, firstCurrency, secondCurrency} = getState().convertor;
  // noinspection TypeScriptValidateTypes
  return (await axios.request({
    method: 'GET',
    url: 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert',
    params: {
      from: firstCurrency,
      to: secondCurrency,
      amount: firstAmount.toString()
    },
    headers: {
      'X-RapidAPI-Key': '8895cf35b4mshdab0964c83526f9p1cffeajsn44ce5e9e936b',
      'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
    }
  })).data
})

export const convertorSlice = createSlice({
  name: 'convertor',
  initialState: {
    firstAmount: 100,
    secondAmount: 100,
    firstCurrency: "USD",
    secondCurrency: "EUR",
    rate: 1
  },
  reducers: {
    setFirstAmount: (state, action) => {
      state.firstAmount = action.payload
    },
    setSecondAmount: (state, action) => {
      state.secondAmount = action.payload
    },
    setFirstCurrency: (state, action) => {
      state.firstCurrency = action.payload
    },
    setSecondCurrency: (state, action) => {
      state.secondCurrency = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConvert.fulfilled, (state, action) => {
      state.rate = action.payload.info.rate
      state.secondAmount = +action.payload.result.toFixed(3)
    })
  }
})

export const {setFirstAmount, setSecondAmount, setFirstCurrency, setSecondCurrency} = convertorSlice.actions

export default convertorSlice.reducer