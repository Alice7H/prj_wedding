'use client'
import Image from "next/image";
import dressImage1 from "../../public/dresses/image3.svg"
import dressImage2 from "../../public/dresses/image5.svg"
import dressImage3 from "../../public/dresses/image2.svg"
import { useState } from "react";

export function Carousel () {
  const [dresses, setDresses] = useState<string[]>([dressImage1, dressImage2, dressImage3]);

  function openModal(index: number){
    if(index == 1) alert('open modal');
  }

  function handlePreviousSlide() {
    const temp = dresses[0];
    const data = dresses.map((_,index) => {
      if(index !== 2) return dresses[index+1]
      return temp;
    })
    setDresses(data)
  }

  function handleNextSlide() {
    const temp = dresses[2];
    const data = dresses.map((_,index) => {
      if(index !== 0) return dresses[index-1];
      return temp;
    })
    setDresses(data)
  }

  return (
    <div className="w-full flex items-center justify-center gap-1 relative transition-all ease-in-out delay-75">
      <button className="absolute left-0 top-1/2 cursor-pointer"
        onClick={handlePreviousSlide}
        onKeyDown={(e)=> e.key === 'Enter' && handlePreviousSlide }
      >
        <div className="pl-[5px] w-[25px] rounded-full bg-white border">❮</div>
      </button>
      {
        dresses.map((dress, index) =>
        <div
          tabIndex={0}
          key={index}
          onClick={()=> openModal(index)}
          className={index == 1 ? "cursor-pointer w-[252px] z-10": ""}
        >
          <Image src={dress} alt="vestido" width={200} height={200} className={index == 1 ? "w-[252px] rounded-2xl": "rounded-lg"}/>
        </div>)
      }
      <button className="absolute right-0 top-1/2 cursor-pointer"
        onClick={handleNextSlide}
        onKeyDown={(e)=> e.key === 'Enter' && handleNextSlide}
      >
        <div className="pl-[5px] w-[25px] rounded-full bg-white border">❯</div>
      </button>
    </div>
  )
}