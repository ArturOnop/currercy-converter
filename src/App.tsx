import Home from "./components/Home.tsx";
import Navbar from "./components/Navbar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Rates from "./components/Rates";

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="rates" element={<Rates/>}/>
          <Route path="*" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
