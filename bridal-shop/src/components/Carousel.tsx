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
    <div className="w-full flex items-center justify-center gap-1 relative">
      <div className="absolute left-0 top-1/2 cursor-pointer" onClick={handlePreviousSlide}>
        <div className="pl-[5px] w-[25px] rounded-full bg-white border">❮</div>
      </div>
      {
        dresses.map((dress, index) =>
        <div key={index} onClick={()=> openModal(index)}>
          <Image src={dress} alt="vestido" width={200} height={200} className="rounded-lg"/>
        </div>)
      }
      <div className="absolute right-0 top-1/2 cursor-pointer" onClick={handleNextSlide}>
        <div className="pl-[5px] w-[25px] rounded-full bg-white border">❯</div>
      </div>
    </div>
  )
}