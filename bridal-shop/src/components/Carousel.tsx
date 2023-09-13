'use client'
import Image from "next/image";
import dressImage1 from "../../public/dresses/dress-2.jpg"
import dressImage2 from "../../public/dresses/dress-5.jpg"
import dressImage3 from "../../public/dresses/dress-3.jpg"
import { useState } from "react";
import { CarouselModal } from "./CarouselModal";

export function Carousel () {
  const [dresses, setDresses] = useState<string[]>([dressImage1.src, dressImage2.src, dressImage3.src]);
  const [showModal, setShowModal] = useState(false);

  function openModal(index: number){
    if(index == 1) setShowModal(true);
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
          <Image src={dress} alt="vestido" width={200} height={200}
          className={index == 1 ? "w-[252px] h-[200px] sm:h-[250px] rounded-2xl": "rounded-lg h-[150px] sm:h-[200]"}/>
        </div>)
      }
      <button className="absolute right-0 top-1/2 cursor-pointer"
        onClick={handleNextSlide}
        onKeyDown={(e)=> e.key === 'Enter' && handleNextSlide}
      >
        <div className="pl-[5px] w-[25px] rounded-full bg-white border">❯</div>
      </button>
      { showModal && <CarouselModal handleShowModal={()=> setShowModal(false)} dress={dresses[1]}/> }
    </div>
  )
}