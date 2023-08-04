import { Footer } from "@/components/Footer";
import Image from "next/image";
import imageAboutUs from "../../../public/dresses/about_us.svg";

export default function AboutUs() {
  return (
    <>
      <main className="w-full p-4 mx-auto">
        <h1 className="text-center text-title text-main font-bold my-8">Sobre nós</h1>
        <div className="flex flex-col sm:flex-row justify-center items-start gap-2">
          <div className="max-w-[90%] sm:w-[40vw] text-main mx-auto flex flex-col gap-2">
            <p>
              Aliquam et elit feugiat, pharetra lorem eu, tempor sapien. Sed iaculis congue leo, ac facilisis tellus auctor quis.
              Ipsam, dolor vitae nemo, doloribus sed reiciendis harum commodi minima amet aperiam maxime molestias culpa officiis illo magni ut.
            </p>
            <p>
              Suspendisse consequat, mauris eget maximus vehicula, massa libero molestie libero, in volutpat urna nibh at metus.
              Ipsum, fuga placeat, nemo dignissimos error iure quidem architecto repudiandae explicabo a, vero voluptatibus maxime labore.
            </p>
            <p>
              Integer a diam eu nunc porttitor malesuada. Donec rhoncus est quam. Proin venenatis at risus et imperdiet. Phasellus purus purus,
              varius id libero in, ultrices consequat sapien.
              Deserunt perferendis tenetur veniam voluptatem nemo alias impedit nam atque.
            </p>
          </div>
          <Image src={imageAboutUs} alt="vestido" className="border w-[300px] mx-auto" />
        </div>
      </main>
      <Footer/>
    </>
  )
}