import {Link} from "react-router-dom";

const Navbar = () => {

  return (
    <>
      <div
        className="h-12 w-screen fixed z-10 bg-white flex items-center border border-b border-t-0 border-x-0 border-black">
        <div className="mx-auto w-5/6 flex h-fit justify-between">
          <Link to="/">
            <button className="text-3xl font-bold text-cyan-500 mb-1 tracking-wider">
              EXRATE
            </button>
          </Link>
          <div className="flex text-xl font-semibold gap-8 text-cyan-500 items-center">
            <Link to="/">
              <button className="hidden sm:block h-fit">
                Convertor
              </button>
            </Link>
            <Link to="/rates">
              <button className="h-fit">Rates</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar