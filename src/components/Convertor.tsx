import Select from "react-select";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  setFirstAmount,
  setSecondAmount,
  setFirstCurrency,
  setSecondCurrency,
  fetchConvert
} from "../redux/convertorSlice";
import {fetchCurrencies} from "../redux/currenciesSlide";

const Convertor = () => {

  const convertor = useSelector(state => state.convertor)
  const currencies = useSelector(state => state.currencies)
  const dispatch = useDispatch()

  const firstAmountCheck = amount => (/^[1-9][0-9]*$/.test(amount))
    ? dispatch(setFirstAmount(amount))
    : dispatch(setFirstAmount(""))

  const secondAmountCheck = amount => (/^[1-9][0-9]*$/.test(amount))
    ? dispatch(setSecondAmount(amount))
    : dispatch(setSecondAmount(""))

  const currenciesFormat = currencies => (currencies.map(currency => ({value: currency, label: currency})))

  const currencyChange = () => {
    const tempCurrency = convertor.firstCurrency
    const tempAmount = convertor.firstAmount
    dispatch(setFirstCurrency(convertor.secondCurrency))
    dispatch(setSecondCurrency(tempCurrency))
    dispatch(setFirstAmount(convertor.secondAmount))
    dispatch(setSecondAmount(tempAmount))
  }

  useEffect(() => {
    dispatch(fetchCurrencies())
  }, [])

  return (
    <div className="mx-auto w-5/6 bg-white rounded-xl shadow-lg flex flex-col py-10 lg:py-15 lg:gap-10 gap-5 mb-5">
      <div className="mx-auto w-5/6 flex flex-col lg:flex-row justify-between gap-3 items-center">
        <div className="flex flex-col gap-1 w-full sm:w-fit">
          <div className="text-sm">Amount</div>
          <div className="flex gap-2 flex-col sm:flex-row">
            <input type="number"
                   min={0}
                   value={convertor.firstAmount}
                   onChange={e => firstAmountCheck(+e.target.value)}
                   placeholder="100"
                   required
                   className="font-medium border border-b-2 border-t-0 border-x-0 focus:outline-0 text-xl"/>
            <Select
              className="min-w-[100px] my-select"
              maxMenuHeight={118}
              value={currenciesFormat([convertor.firstCurrency])}
              onChange={currency => dispatch(setFirstCurrency(currency.value))}
              options={currenciesFormat(currencies.currencies)}
              isSearchable
              placeholder="USD"
            />
          </div>
        </div>
        <button
          className="flex justify-center min-w-[50px]"
          onClick={() => currencyChange()}
        >
          <img src="public/direction-arrow.png" className="w-10 h-10"/>
        </button>
        <div className="flex flex-col gap-1 w-full sm:w-fit">
          <div className="text-sm">Converted to</div>
          <div className="flex gap-2 flex-col sm:flex-row">
            <input type="number"
                   min={0}
                   value={convertor.secondAmount}
                   onChange={e => secondAmountCheck(+e.target.value)}
                   placeholder="100"
                   required
                   readOnly
                   className="font-medium border border-b-2 border-t-0 border-x-0 focus:outline-0 text-xl"/>
            <Select
              className="min-w-[100px] my-select"
              maxMenuHeight={118}
              value={currenciesFormat([convertor.secondCurrency])}
              onChange={currency => dispatch(setSecondCurrency(currency.value))}
              options={currenciesFormat(currencies.currencies)}
              isSearchable
              placeholder="EUR"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto w-5/6 flex flex-col lg:flex-row gap-3 justify-between items-center">
        <div className="flex gap-3 text-sm text-slate-700">
          <div>1 {convertor.firstCurrency} = {(1 * convertor.rate).toFixed(3)} {convertor.secondCurrency}</div>
          <div>1 {convertor.secondCurrency} = {(1 / convertor.rate).toFixed(3)} {convertor.firstCurrency}</div>
        </div>
        <button
          className="h-9 px-5 w-fit bg-cyan-500 hover:bg-cyan-600 text-white rounded font-medium"
          onClick={() => dispatch(fetchConvert())}
        >
          Convert
        </button>
      </div>
    </div>
  )
}

export default Convertor