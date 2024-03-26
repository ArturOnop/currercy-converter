import Convertor from "./Convertor";
import Hometop from "./Hometop";

const Home = () => {

  return (
    <>
      <div className="min-h-screen w-screen flex flex-col relative
                      bg-gradient-to-r from-cyan-600 to-cyan-400" id="home">
        <Hometop/>
        <Convertor/>
      </div>
    </>
  )
}

export default Home