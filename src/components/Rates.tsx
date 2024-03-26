import {fetchCurrencies} from "../redux/currenciesSlide";
import Select from "react-select";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchRates, setCurrency} from "../redux/ratesSlice";

const Rates = () => {

  const currencies = useSelector(state => state.currencies)
  const rates = useSelector(state => state.rates)
  const dispatch = useDispatch()

  const currenciesFormat = currencies => (currencies.map(currency => ({value: currency, label: currency})))

  useEffect(() => {
    dispatch(fetchCurrencies())
    dispatch(fetchRates())
  }, [])

  useEffect(() => {
    console.log(rates)
  }, [rates])

  return (
    <>
      <div className="min-h-screen w-screen flex flex-col relative
                      bg-gradient-to-r from-cyan-600 to-cyan-400" id="home">
        <div className="flex flex-row mx-auto w-5/6 pt-16 lg:pt-20 pb-5 items-center gap-3">
          <div className="text-white font-semibold text-2xl h-fit">1</div>
          <Select
            className="min-w-[100px] rate"
            maxMenuHeight={118}
            value={currenciesFormat([rates.currency])}
            onChange={currency => dispatch(setCurrency(currency.value))}
            options={currenciesFormat(currencies.currencies)}
            isSearchable
            placeholder="USD"
          />
          <div className="text-white font-semibold text-2xl h-fit">=</div>
        </div>
        <div
          className="mx-auto w-5/6 flex flex-col sm:flex-row flex-wrap items-center justify-between text-cyan-600 pt-6 lg:pt-10 pb-5 gap-10">
          {Object.entries(rates.rates).map(([currency, rate], index) => (
            <div key={index} className="bg-white w-32 h-20 rounded-lg shadow-lg flex flex-col items-center">
              <div className="text-xl">{currency}</div>
              <div className="mt-1 font-bold text-2xl">
                {(rate / rates.rates[rates.currency]).toFixed(3)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Rates