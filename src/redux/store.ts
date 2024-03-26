import {configureStore} from '@reduxjs/toolkit'
import convertorReducer from './convertorSlice'
import currenciesReducer from "./currenciesSlide";
import ratesReducer from "./ratesSlice";

export default configureStore({
  reducer: {
    convertor: convertorReducer,
    currencies: currenciesReducer,
    rates: ratesReducer
  }
})