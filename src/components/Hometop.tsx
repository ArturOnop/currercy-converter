import {useEffect, useState} from "react";

const Hometop = () => {

  const [currentDate, setCurrentDate] = useState("")
  const [currentTime, setCurrentTime] = useState("")

  const setTime = () => {
    const today = new Date();
    const date = String(today).split(" ").slice(1, 3).join(" ")
    const year = String(today).split(" ").slice(3, 4).join(" ")
    const time = String(today).split(" ").slice(4, 5).join(" ").split(":").slice(0, 2).join(":")
    setCurrentDate(`${date}, ${year}`)
    setCurrentTime(`${time}`)
  }

  useEffect(() => {
    setTime()
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime()
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="mx-auto w-5/6 flex flex-col md:flex-row justify-between text-white pt-16 lg:pt-20 pb-5 lg:my-[20px] gap-2">
      <div className="font-semibold text-2xl md:text-3xl md:w-[300px]">Exchange currency rates widget</div>
      <div className="flex flex-col md:items-end hidden md:flex font-semibold">
        <div className="text-xl md:text-3xl">{currentDate}</div>
        <div className="text-lg">{currentTime}</div>
      </div>
    </div>
  )
}

export default Hometop